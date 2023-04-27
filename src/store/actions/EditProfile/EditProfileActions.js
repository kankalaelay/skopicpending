import * as allActions from "../actions.constants"

export function fetchProfileData() {
  return {
    type: allActions.FETCH_PROFILE_DATA,
}

}


 export function receiveProfileData(data) {
    return {
      type: allActions.RECIEVE_PROFILE_DATA,
      payload: data
    };
  }
  

