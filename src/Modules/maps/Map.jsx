import React, { useEffect } from "react";
import useGoogleMap from "./GoogeMap";
import styles from "../../Assets/css/maps/mapstyles.module.css"
import { Link } from "react-router-dom";
import AddCommunity from '../../Assets/images/AddCommunity.png'
import usaimage from '../../Assets/images/download.png'

export default function Map({ center, zoom, coords, children, events }) {
  const { maps, map, mapRef, loading } = useGoogleMap({ zoom, center, events });

  useEffect(
    () => {
      map && map.panTo(center);
    },
    [center.lat, center.lng, coords]
  );

  return (
    // ${styles.mapcontainer}
    <div className={`col-sm-8 ${styles.mapcontainer}`}>
      <div ref={mapRef} className={styles.mapref} >
        {!loading &&
          React.Children.map(children, child => {
            return React.cloneElement(child, { map, maps });
          })}
      </div>
      <div className={styles.startcommunity}>

        <img src={AddCommunity}></img>
        <Link>
          <h4>
            Start Community</h4>
        </Link>
      </div>
      <div className={styles.countrytag}>
        <p>USA</p>
        <img src={usaimage}></img>
      </div>
    </div>
  );
}
