import { useSelector, useDispatch } from 'react-redux'

const base = { lat: 39, lng: -100 };

export default function GetMarkers() {
  const nearByCommuntysData = useSelector((state) => state.mapReducer.getNearByCommunitysData)
  const singleLatsArr = [];
  const multiLatsArr = [];
  const singleLngsArr = [];
  const multiLngsArr = [];

  nearByCommuntysData.tenantNeighberLats.map((item) => {
    if (item.length > 1) {
      multiLatsArr.push(item);
    } else {
      singleLatsArr.push(item);
    }
  })

  nearByCommuntysData.tenantNeighberLags.map((item) => {
    if (item.length > 1) {
      multiLngsArr.push(item);
    } else {
      singleLngsArr.push(item);
    }
  })

  const flatObj = (list1, list2) => {
    return list1.map((lat, idx) => {
      const lng = list2[idx]
      return {
        lat: lat,
        lng: lng
      }
    });
  }

  const singleCoords = singleLatsArr.map(([item], idx) => {
    return ({
      lat: item,
      lng: singleLngsArr[idx][0]
    })
  });

  const multiCoords = multiLatsArr.map((latItem, idx) => {
      const latlngObj = flatObj(latItem, multiLngsArr[idx])
      return latlngObj;
  })

  return {singleCoords, multiCoords};
}

