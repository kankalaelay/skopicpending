import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Map from "./Map";
import PolygonMap from "../Moderator/EditCommunity/Polygon";
import Marker from "./Marker";
import TransitLayer from "./TransitLayer";
import getPlaces from "../utils/getPlaces";
import styles from "../../Assets/css/maps/mapstyles.module.css"
import skopiclogo from "../../Assets/images/skopic.png"
import mapscommunityimage from "../../Assets/images/mapscommunityimage.png"
import makedefault from "../../Assets/images/makedefault.png"
import Header from "../header/header.js"
import communitysfolder from "../../Assets/images/communitysfolder.png"

export default function Consumer() {
  const nearByCommuntysData = useSelector((state) => state.mapReducer.getNearByCommunitysData)

  localStorage.setItem('issign', true);
  const loc = getPlaces();
  const [placeIndex, setPlaceIndex] = useState(0);
  const [coords, setCoords] = useState([]);
  const [bound, setBound] = useState({});
  const [transitLayerEnabled, setTransitLayerEnabled] = useState(false);
  const [isFocus, setisFocus] = useState('');
  const issign = !!JSON.parse(String(localStorage.getItem('issign')).toLowerCase());


  let places = loc.singleCoords;
  loc.multiCoords.forEach((item) => {
    places.push(item[0])
  })


  const formattedCommunityList = nearByCommuntysData?.physicalTenantList.map((item, idx) => {
    const desc = nearByCommuntysData?.physicalTenantDescs[idx];
    const img = nearByCommuntysData?.physicalTenantThumbLogos[idx];
    return ({
      name: item,
      description: desc,
      img: img
    })
  });


  return (

    <React.Fragment>
      {

        (issign)
          ?
          <Header />
          :

          <div className={styles.headerforsignin}>

            <img src={skopiclogo} alt="skopic" />
            <div> <h4>Choose your default community</h4></div>
            <div></div>
          </div>

      }

      <div className={`row ${styles.maprow}`}>
        <div className={`col-sm-4`}>
          <div>
            <input type="text" placeholder="Search Community..." className={styles.inputcommunitys} />
            <button className={styles.communityfolder}><img src={communitysfolder} /></button>
          </div>
          {formattedCommunityList.length && formattedCommunityList.map((community) => (
            <div className={`${styles.communitymapimage} ${styles.communityinmap} ${isFocus == 'text_1' && styles.FocusAppearence}`}>
              <img src={community.img} alt="community image" />
              <div className={styles.communitycontent}>
                <h5>{community.name}</h5>
                <p>{community.description}</p>
                <div className={styles.communitymapimage}>
                  {
                    (issign)
                      ? <>
                        <button>Follow</button>
                        <button>View Activity</button>
                        <button><img src={makedefault} /></button>
                      </>
                      : <>
                        <button><img src={makedefault} />Make Default</button>
                        <button>View Activity</button>
                      </>
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={`col-sm-8 ${styles.mapcontainer}`}>
          <PolygonMap markers={places} polygonCoords={loc.multiCoords}/>
        </div>

        {/* <Map
          zoom={5}
          center={{ lat: Number(places[placeIndex].lat), lng: Number(places[placeIndex].lng) }}
          events={{ onBoundsChangerd: arg => setBound(arg) }}
          coords={coords}
        >
          <TransitLayer enabled={transitLayerEnabled} />
          {places.map((m, index) => (
            <Marker
              key={m?.id}
              active={placeIndex === index}
              title={"Community"}
              position={{ lat: Number(m.lat), lng: Number(m.lng) }}
              icon
              events={{
                // onClick: () => window.alert(`marker ${index} clicked`)
                onClick: () => { showPolygon(m.lat) }
              }}
            />
          ))}
        </Map> */}




        {/* <button
        className={styles.btn}
        onClick={() => setPlaceIndex((placeIndex + 1) % places.length)}
      >
        Next place
      </button>
      <br />
      <button
        className="btn"
        onClick={() => setTransitLayerEnabled(!transitLayerEnabled)}
      >
        Toggle transit layer
      </button>
      <br />
      Current place id: {places[placeIndex].id}
      <br />
      Map bounds: {bound.toString()} */}
      </div>

    </React.Fragment>

  );
}
