//axios dependencies
import axios from 'axios';

//Action imports
import * as mapActions from '../../actions/mapactions/mapAction';
import * as allActions from '../../actions/actions.constants';

const mapService = (store) => next => action => {
  next(action)
  const devURL = `http://dev.skopic.com:9090/skopicportal`

  switch (action.type) {

    case allActions.FETCH_NEAR_BY_COMMUNITYS:
      axios.request({
        url: `${devURL}/jsonuser/tenantMap.html${action.payload}`,
        method: "GET",
        headers: {

        },

        withCredentials: true,


      })
        .then((response) => {
          next(mapActions.receiveNearByCommunitysData(response.data))


        })
        .catch((error) => {
          //  next({ type: "FETCH_SEARCH_DATA_ERROR", error });
          console.log(error)

        });
      break;

    ////edit community update maps boundaries 

    case allActions.FETCH_UPDATE_MAPS_BOUNDARIES_DATA:
      axios.request({
        url: `${devURL}/jsonuser/updateTenantById.html${action.payload}`,
        method: "GET",
        headers: {

        },

        withCredentials: true,


      })
        .then((response) => {
          next(mapActions.recieveUpdatemapsBoundariesData(response.data))


        })
        .catch((error) => {
          //  next({ type: "FETCH_SEARCH_DATA_ERROR", error });
          console.log(error)

        });
      break;
      
    case allActions.GET_NEAR_BY_COMMUNITYS:
      axios.request({
        url: `${devURL}/jsonuser/tenant-map`,
        method: "GET",
        headers: {

        },

        withCredentials: true,


      })
        .then((response) => {
          next(mapActions.getNearByCommunitysData(response.data))


        })
        .catch((error) => {
          //  next({ type: "FETCH_SEARCH_DATA_ERROR", error });
          console.log(error)

        });
      break;


    default: break;
  }
}
export default mapService;