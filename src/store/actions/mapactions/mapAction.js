import * as allActions from '../actions.constants';



//near by communitys data
export function receiveNearByCommunitysData(data) {
  return {
    type: allActions.RECIEVE_NEAR_BY_COMMUNITYS,
    payload: data
  };
}

export function fetchNearByCommunitysData(id) {
  return {
    type: allActions.FETCH_NEAR_BY_COMMUNITYS,
    payload: id
  };
}

export function getNearByCommunitysData(data) {
  return {
    type: allActions.GET_NEAR_BY_COMMUNITYS,
    payload: data
  };
}

//edit community update maps boundaries 

export function fetchUpdatemapsBoundariesData(id) {
  return {
    type: allActions.FETCH_UPDATE_MAPS_BOUNDARIES_DATA,
    payload: id
  };
}
export function recieveUpdatemapsBoundariesData(id) {
  return {
    type: allActions.RECIEVE_UPDATE_MAPS_BOUNDARIES_DATA,
    payload: id
  };
}

