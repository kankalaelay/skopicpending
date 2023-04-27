import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import { useHistory, useLocation } from "react-router-dom";
import axios from "axios";
import * as Cookies from "js-cookie";
import { Button } from "@mui/material";
import { createPortal } from "react-dom";
import {
  LoadScript,
  GoogleMap,
  Polygon,
  useGoogleMap,
  DrawingManager,
  MarkerF,
  InfoWindowF,
  StandaloneSearchBox,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "80vh",
};

function PolygonMap(props = {}) {
  const history = useHistory();
  const location = useLocation();

  const { id,
    name,
    description,
    city,
    country,
    state,
    address1,
    zipcode,
    tenantLatitude,
    tenantLangitude,
    newsletterFrequency,
    markers,
    polygonCoords } = props

    const formattedList = (data) => {
      return data.map((obj) => {
        return ({
          lat: Number(obj.lat),
          lng: Number(obj.lng),
        });
      })
    }

  const allMarkers = formattedList(markers);

  const latArry = tenantLatitude?.split(",");
  const lngArry = tenantLangitude?.split(",");

  const latlng = latArry?.map((latItem, index) => {
    const lngItem = lngArry[index];
    return {
      lat: Number(latItem),
      lng: Number(lngItem),
    };
  });

  // Store Polygon path in state
  const [coords, setCoords] = useState([]);
  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);
  const [drawingState, setDrawingState] = useState({
    drawingMode: "polygon",
  });
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const libraries = ["drawing", "places"];
  const [curLocation, setCurLocation] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState(null);
  const [searchBoxRef, setSearchBoxRef] = useState(null);
  const [searchLoc, setSearchLoc] = useState(null);

  const options = {
    drawingControl: false,
    drawingControlOptions: {
      drawingMode: ["Polygon"],
    },
    polygonOptions: {
      fillColor: "#2196F3",
      strokeColor: "#2196F3",
      fillOpacity: 0.5,
      strokeWeight: 2,
      clickable: true,
      editable: true,
      draggable: true,
      zindex: 1,
    },
  };

  const MapControl = (props) => {
    const map = useGoogleMap();
    const controlButtonDiv = document.createElement('div');

    useEffect(() => {
      const controls = map.controls[window.google?.maps.ControlPosition[props.position]]
      const index = controls.length;
      controls.push(controlButtonDiv)
      return () => {
        controls.removeAt(index);
      };
    }, [map]);

    return createPortal(
      <div>{props.children}</div>,
      controlButtonDiv
    );
  }

  useEffect(() => {
    if (tenantLatitude && tenantLatitude) {
      setCoords(latlng)
    } else {
      setCoords([])
    }
  }, [])

  const removeBoundary = () => {
    polygonRef.current.setMap(null);
    setCoords([]);
    if (props.getLatLng) {
      props.getLatLng({})
    }
  };
  const onSubmitBoundary = () => {
    let req = new FormData()
    const lat = coords.map((item) => {
      return item.lat;
    });
    const lng = coords.map((item) => {
      return item.lng;
    });
    if (props.getLatLng && props.type === 'add') {
      props.getLatLng({ lat: lat, lng: lng })
      props.onMapClose();
      return
    }

    req.append("id", id)
    req.append("name", name)
    req.append("description", description)
    req.append("tenantLatitude", lat.toString())
    req.append("tenantLangitude", lng.toString())
    req.append("city", city)
    req.append("state", state)
    req.append("country", country)
    req.append("zipcode", zipcode)
    req.append("newsLetterFrequency", newsletterFrequency)
    req.append("address1", address1)

    axios
      .request({
        url: `http://dev.skopic.com:9090/skopicportal/jsonuser/updateTenantById`,
        method: "POST",
        data: req,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Set-Cookie": Cookies.get("JSESSIONID"),
        },
        withCredentials: true,
      })
      .then((res) => {
        if (res?.data && res.data.status === 'success') {
          props.onMapClose();
          history.go(0);
        }
      })
  };

  // Call setCoords with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setCoords(nextPath);
    }
  }, [setCoords]);

  // Bind refs to current Polygon and listeners
  const onPolygonLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },
    [onEdit]
  );

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);


  const onPolygonComplete = (polygon) => {
    const polyArray = polygon.getPath().getArray();
    let paths = [];
    polyArray.forEach(function (path) {
      paths.push({ lat: path.lat(), lng: path.lng() });
    });
    polygon.setMap(null);
    setCoords(paths);
    setShowInfoWindow(true);
  };

  const onMapLoad = (map) => {
    if (coords.length !== 0 && !markers) {
      setCurLocation(coords[0]);
    } else if (allMarkers.length !== 0) {
      setCurLocation(allMarkers[0]);
    } else {
      navigator?.geolocation.getCurrentPosition(
        ({ coords: { latitude: lat, longitude: lng } }) => {
          const pos = { lat, lng };
          setCurLocation(pos);
        }
      );
      window.google?.maps.event.addListener(map, "bounds_changed", () => {
        setBounds(map.getBounds());
      });
      setCoords([]);
    }

  };

  const onSearchBoxLoad = (ref) => {
    setSearchBoxRef(ref);
  };

  const onPlacesChanged = () => {
    setSearchLoc(searchBoxRef?.getPlaces());
    let results = searchBoxRef.getPlaces();
    const loc = results[0].geometry.location;
    const pos = { lat: loc.lat(), lng: loc.lng() }
    setCurLocation(pos);
  };

  const showPolygon = (obj) => {
    const polygonItem = polygonCoords.find(coord => coord.some(item => Number(item.lat) === obj.lat));
    if (polygonItem) {
      const paths = formattedList(polygonItem);
      setCoords(paths)
    }
  }


  return (
    <>
      <LoadScript
        id="script-loader"
        googleMapsApiKey="AIzaSyD73RTFYJm6Kxwer1CmpjqqNJAlRSifzVo"
        libraries={libraries}
        language="en"
        region="us"
      >
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={curLocation}
          zoom={5}
          onLoad={onMapLoad}
        >
          {(coords.length === 0 && !markers) ? (
            <StandaloneSearchBox
              onLoad={onSearchBoxLoad}
              onPlacesChanged={onPlacesChanged}
              bounds={bounds}
            >
              <input
                type="text"
                placeholder="Search location"
                style={{
                  boxSizing: `border-box`,
                  border: `1px solid transparent`,
                  width: `240px`,
                  height: `40px`,
                  padding: `12px 12px`,
                  borderRadius: `2px`,
                  boxShadow: `rgba(0, 0, 0, 0.3) 0px 1px 4px -1px`,
                  fontSize: `14px`,
                  outline: `none`,
                  textOverflow: `ellipses`,
                  position: "absolute",
                  left: "50%",
                  marginLeft: "-120px",
                  marginTop: "10px",
                }}
              />
            </StandaloneSearchBox>
          ) : null}
          {!markers && (<MapControl position="LEFT_BOTTOM">
            <Button
              sx={{ marginLeft: '8px' }}
              variant="contained"
              size="small"
              onClick={onSubmitBoundary}
              disabled={coords.length === 0}
            >
              Submit Boundary
            </Button>
            <Button
              sx={{ marginLeft: '8px' }}
              variant="contained"
              size="small"
              onClick={removeBoundary}
              disabled={coords.length === 0}
            >
              Remove Boundary
            </Button>
          </MapControl>)}

          {(coords.length === 0 && allMarkers.length === 0) ? (
            <DrawingManager
              drawingMode={drawingState.drawingMode}
              options={options}
              editable
              draggable
              onPolygonComplete={onPolygonComplete}
              onMouseUp={onEdit}
              onDragEnd={onEdit}
            />
          ) : (
            <Polygon
              options={{
                strokeColor: "#FF0000",
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: "#FF0000",
                fillOpacity: 0.35,
                geodesic: true,
                editable: true,
              }}
              ref={polygonRef}
              editable
              path={coords}
              onLoad={onPolygonLoad}
              onUnmount={onUnmount}
              onMouseUp={onEdit}
              onDragEnd={onEdit}
            >
              {showInfoWindow && (
                <InfoWindowF
                  // position={center}
                  zIndex="10"
                  onCloseclick={(e) => setShowInfoWindow(false)}
                  options={{ maxWidth: 300 }}
                >
                  content here
                </InfoWindowF>
              )}
            </Polygon>
          )}
          {markers ? (
            <>
              {allMarkers.map((marker) => (
                <MarkerF
                  position={marker}
                  onClick={() => showPolygon(marker)}
                />

              ))}
            </>
          ) : (
            <MarkerF
              position={curLocation}
            // onClick={(e) => setShowInfoWindow(true)}
            />
          )}


        </GoogleMap>
      </LoadScript>
    </>
  );
}

export default PolygonMap;
