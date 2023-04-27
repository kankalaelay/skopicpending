import * as allActions from '../actions.constants';

//search data 
export function receiveSearchData(data) {
  return {
    type: allActions.RECIEVE_SEARCH_DATA,
    payload: data
  };
}

export function fetchSearchData(paramssetvalue) {
  return {
    type: allActions.FETCH_SEARCH_DATA,
    payload: paramssetvalue
  };
}


