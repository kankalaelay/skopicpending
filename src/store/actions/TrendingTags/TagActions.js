import * as allActions from "../actions.constants";

//search data 
export function receiveTagData(data) {
  return {
    type: allActions.RECIEVE_TAG_DATA,
    payload: data
  };
}

export function fetchTagData() {
  return {
    type: allActions.FETCH_TAG_DATA,
  };
}