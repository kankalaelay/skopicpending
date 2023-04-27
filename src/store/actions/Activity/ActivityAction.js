 import * as allActions from "../actions.constants"


 export function receiveActivityData(data) {
    return {
      type: allActions.RECIEVE_ACTIVITY_DATA,
      payload: data
    };
  }
  
  export function fetchActivityData() {
    return {
      type: allActions.FETCH_ACTIVITY_DATA,
  }
}