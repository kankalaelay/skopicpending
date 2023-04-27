//action imports
import * as allActions from '../../actions/actions.constants';

const initialState = {
  isLoaded: false,

  notificationData: [],

}
export default function notificationReducer(state = initialState, action) {

  switch (action.type) {
    
    case allActions.FETCH_NOTIFICATIONS:
      return action;
    case allActions.RECIEVE_NOTIFICATIONS:
      return {
        ...state,
        notificationData: action.payload,
        isLoaded:true
      };
    default: return state;
  } 
  
}
