import { useEffect, useState } from "react";
import markerpin from "../../Assets/images/Pin.png"
const eventMapping = {
  onClick: "click",
  onDoubleClick: "dblclick"
};
const image =markerpin

export default function useGoogleMapMarker({
  position,
  type,
  maps,
  map,
  events,
  title,
  icon=image
}) {
  const [marker, setMarker] = useState();
  useEffect(() => {
    // const styles = markerStyle(type);
    const marker = new maps.Marker({
      position,
      map,
      title,
      icon
    });
    Object.keys(events).forEach(eventName =>
      marker.addListener(eventMapping[eventName], events[eventName])
    );
    setMarker(marker);
  }, []);

  return marker;
}
