import * as allActions from '../actions.constants';



//child says data on search
export function receiveChildSayData(data) {
  return {
    type: allActions.RECIEVE_CHILDSAY_DATA,
    payload: data
  };
}

export function fetchChildSayData(id) {
  return {
    type: allActions.FETCH_CHILDSAY_DATA,
    payload: id
  };
}

