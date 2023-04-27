
import React, { useState, useRef } from "react";

import { MapContainer, TileLayer, FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// AIzaSyD73RTFYJm6Kxwer1CmpjqqNJAlRSifzVo

const PolygonMap = () => {
  const [center, setCenter] = useState({ lat: 24.4539, lng: 54.3773 });
  const [mapLayers, setMapLayers] = useState([]);
  [
    // { lat: 25.774, lng: -80.190 },
    // { lat: 18.466, lng: -66.118 },
    // { lat: 32.321, lng: -64.757 },
    // { lat: 25.774, lng: -80.190 }
]

  const ZOOM_LEVEL = 12;
  const mapRef = useRef();

  const _onCreate = (e) => {
    console.log(e);

    const { layerType, layer } = e;
    if (layerType === "polygon") {
      const { _leaflet_id } = layer;

      setMapLayers((layers) => [
        ...layers,
        { id: _leaflet_id, latlngs: layer.getLatLngs()[0] },
      ]);
    }
  };

  const _onEdited = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id, editing }) => {
      return setMapLayers((layers) =>
        layers.map((l) =>
          l.id === _leaflet_id
            ? { ...l, latlngs: { ...editing.latlngs[0] } }
            : l
        )
      );
    });
  };

  const _onDeleted = (e) => {
    console.log(e);
    const {
      layers: { _layers },
    } = e;

    Object.values(_layers).map(({ _leaflet_id }) => {
      return setMapLayers((layers) => layers.filter((l) => l.id !== _leaflet_id));
    });
  };

  return (
    <>

      <div className="row">
        <div className="col text-center">
          <h2>React-leaflet - Create, edit and delete polygon on map</h2>

          <div className="col">
            <MapContainer style={{ height: "450px", width: "100%" }} center={center} zoom={ZOOM_LEVEL} ref={mapRef}>
              <FeatureGroup>
                <EditControl
                  position="topright"
                  onCreated={_onCreate}
                  onEdited={_onEdited}
                  onDeleted={_onDeleted}
                  draw={{
                    rectangle: false,
                    polyline: false,
                    circle: false,
                    circlemarker: false,
                    marker: false,
                  }}
                />
              </FeatureGroup>

              <TileLayer
                 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                 attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
            </MapContainer>

            <pre className="text-left">{JSON.stringify(mapLayers, 0, 2)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default PolygonMap;








import React, { useState, useEffect, useRef, useCallback } from "react";
import { LoadScript, GoogleMap, Polygon, useGoogleMap, DrawingManager } from "@react-google-maps/api";
import { Button } from "@mui/material";
// import DrawingManager from '@react-google-maps/api/dist/components/drawing/DrawingManager';

const containerStyle = {
    width: '100%',
    height: '80vh'
};

const center = { lat: 25.0014163, lng: -72.1208432 };

function PolygonMap() {

    // const { isLoaded } = useJsApiLoader({
    //     id: 'google-map-script',
    //     googleMapsApiKey: "AIzaSyAXEHjz5uTArWEC0q8-zpu_xXuHXJ2zOl8",
    //     // libraries: ['drawing']
    // })

    const MapControl = (props) => {
        const map = useGoogleMap();
        const ref = useRef();
        useEffect(() => {
            if (map && ref) {
                map.controls[window.google.maps.ControlPosition[props.position]].push(
                    ref.current
                );
            }
        }, [map, ref]);
        return <div ref={ref}>{props.children}</div>;
    };

    const MapControl1 = (props) => {
      const map = useGoogleMap();

      useEffect(() => {
          return () => {
              if (controlIndex !== undefined) map?.controls[window.google.maps.ControlPosition[props.position]].removeAt(controlIndex);
          };
      }, [controlIndex,
          map,
          props.position]);

      return (<div ref={el => {
          console.log(el)
          if (!firstRender) return;
          setFirstRender(false);
          setControlIndex(map?.controls[window.google.maps.ControlPosition[props.position]].push(el));
      }}>
          {props.children}
      </div>);
  };

  const onLoadMap = (map) => {
    const controlButtonDiv = document.createElement('div');
    ReactDOM.render(
        <>
            <Button
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
        </>
        , controlButtonDiv);
    // map.controls[window.google.maps.ControlPosition.BOTTOM_LEFT].push(controlButtonDiv);
};


    // Store Polygon path in state
    const [coords, setCoords] = useState([
        // { lat: 25.774, lng: -80.190 },
        // { lat: 18.466, lng: -66.118 },
        // { lat: 32.321, lng: -64.757 },
        // { lat: 25.774, lng: -80.190 }
    ]);

    // Define refs for Polygon instance and listeners
    const polygonRef = useRef(null);
    const listenersRef = useRef([]);
    const [state, setState] = useState({
        drawingMode: 'polygon'
    });
    const libraries = ['drawing']

    const options = {
        drawingControl: true,
        drawingControlOptions: {
            drawingMode: ['Polygon']
        },
        polygonOptions: {
            fillColor: '#2196F3',
            strokeColor: '#2196F3',
            fillOpacity: 0.5,
            strokeWeight: 2,
            clickable: true,
            editable: true,
            draggable: true,
            zindex: 1
        }
    }

    const onPolygonComplete = useCallback(
        function onPolygonComplete(poly) {
            const polyArray = poly.getPath().getArray();
            let paths = [];
            polyArray.forEach(function (path) {
                paths.push({ lat: path.lat(), lng: path.lng() });
            })
            setCoords(paths);
            console.log(coords)
            // point(paths);
            poly.setMap(null);
        },
        []
    )

    // Call setPath with new edited path
    const onEdit = useCallback(() => {
        if (polygonRef.current) {
            const nextPath = polygonRef.current
                .getPath()
                .getArray()
                .map(latLng => {
                    return { lat: latLng.lat(), lng: latLng.lng() };
                });
            setCoords(nextPath);
        }
    }, [setCoords]);

    // Bind refs to current Polygon and listeners
    const onLoad = useCallback(
        polygon => {
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

    const getPaths = (polygon) => {
        console.log('sdfgthyjukilkjhgfdcsxazadsgrthyjik,jmhvf')
        var polygonCount = coords.length == 0 ? 1 : coords.length + 1
        var polygonBounds = polygon.getPath();
        var bounds = [];
        for (var i = 0; i < polygonBounds.length; i++) {
            var point = {
                lat: polygonBounds.getAt(i).lat(),
                lng: polygonBounds.getAt(i).lng()
            };
            bounds.push(point);
        }

        // localCoordinates?.push({
        //     "id_polygon": polygonCount,
        //     "coord": bounds
        // });
        // localStorage.setItem('polygons', JSON.stringify(localCoordinates))
        console.log("bounds", bounds);
        // // mainStore.coorindates.push(bounds);
        // mainStore.isLatLng = true;
        polygonCount++
    }

    // Clean up refs
    const onUnmount = useCallback(() => {
        listenersRef.current.forEach(lis => lis.remove());
        polygonRef.current = null;
    }, []);

    console.log("The path state is", coords);

    return (
        <>
            <LoadScript
                id="script-loader"
                googleMapsApiKey="AIzaSyAXEHjz5uTArWEC0q8-zpu_xXuHXJ2zOl8"
                libraries={libraries}
                language="en"
                region="us"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={4}
                >

                    {
                        coords.length === 0
                            ?
                            (<DrawingManager
                                drawingMode={state.drawingMode}
                                options={options}
                                editable
                                draggable
                                onPolygonComplete={onPolygonComplete}
                                onMouseUp={onEdit}
                                onDragEnd={onEdit}
                            />)
                            :
                            (
                                <Polygon
                                    options={{
                                        fillColor: '#2196F3',
                                        strokeColor: '#2196F3',
                                        fillOpacity: 0.5,
                                        strokeWeight: 2
                                    }}
                                    editable
                                    path={coords}
                                    onLoad={onLoad}
                                    onUnmount={onUnmount}
                                    onMouseUp={onEdit}
                                    onDragEnd={onEdit}
                                />
                            )
                    }
                    {/* <Polygon
                    path={coords}
                    key={1}
                    editable
                    draggable
                    ref={polygonRef}
                    onMouseUp={onEdit}
                    onDragEnd={onEdit}
                    options={{
                        strokeColor: "#FF0000",
                        strokeOpacity: 0.8,
                        strokeWeight: 2,
                        fillColor: "#FF0000",
                        fillOpacity: 0.35,
                        geodesic: true,
                        editable: true
                    }}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                /> */}
                    {/* {isNewPolygon && (
                        <DrawingManager
                            defaultDrawingMode={window?.google?.maps.drawing.OverlayType.POLYGON}
                            defaultOptions={{
                                drawingControl: true,
                                drawingControlOptions: {
                                    position: window?.google?.maps.ControlPosition.TOP_CENTER,
                                    drawingModes: [window?.google?.maps.drawing.OverlayType.POLYGON]
                                },
                                polygonOptions: { editable: true, draggable: true }
                            }}
                            onPolygonComplete={value => getPaths(value)}
                        />)} */}
                    <MapControl position="LEFT_BOTTOM">
                        <Button
                            sx={{ marginLeft: '8px' }}
                            variant="contained"
                            size="small"
                            onClick={() => console.log('Hi Im Here')}
                        >
                            Submit Boundary
                        </Button>
                        <Button
                            sx={{ marginLeft: '8px' }}
                            variant="contained"
                            size="small"
                            onClick={() => polygonRef.current.setMap(null)}
                        >
                            Remove Boundary
                        </Button>
                    </MapControl>
                </GoogleMap >
            </LoadScript>
        </>
    )
}

export default PolygonMap;



  // const MapControl = ({ position, children, zIndex = 0 }) => {
  //   const map = useGoogleMap();
  //   // const ref = useRef();
  //   const [container] = useState(document.createElement('div'));

  //   useEffect(() => {
  //     // let controlsContainer;
  //     // if (map) {
  //     const controlsContainer = map.controls[window.google?.maps.ControlPosition[position]].
  //       push(container);
  //     // }

  //     return () => {
  //       console.log('sss', controlsContainer)
  //       // if (controlsContainer) {
  //       const index = controlsContainer.indexOf(container);
  //       console.log(index)
  //       if (index !== -1) {
  //         controlsContainer.removeAt(index);
  //       }
  //       // }

  //     };
  //   }, [map]);

  //   useEffect(() => {
  //     container.style.zIndex = zIndex;
  //   }, [zIndex]);

  //   return createPortal(children, container);
  // };

    {/* <MapControl> // position="LEFT_BOTTOM"
            <Button
              variant="contained"
              size="small"
              onClick={onSubmitBoundary}
              disabled={coords.length === 0}
            // style={{ marginLeft: "8px", background: "lightgray" }}
            >
              Submit Boundary
            </Button>
            <Button
              style={{ marginLeft: "8px" }}
              variant="contained"
              size="small"
              onClick={removeBoundary}
              disabled={coords.length === 0}
            >
              Remove Boundary
            </Button>
          </MapControl> */}
          {/* <OverlayView
            position={curLocation}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div style={{ transform: "translate(-100%, 33vh)" }}>

            </div>
          </OverlayView> */}
