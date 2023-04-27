//action imports
import * as allActions from '../../actions/actions.constants';

const initialState = {
  isLoaded: false,


  notificationStatus:{},
  notificationRemoveStatus:{},
  notificationUnfollowStatus:{}


}
export default function notificationStatusReducer(state = initialState, action) {
  switch (action.type) {
      case allActions.FETCH_NOTIFICATIONS_STATUS:
        return action;
      case allActions.RECIEVE_NOTIFICATIONS_STATUS:
        return {
          ...state,
          notificationStatus: action.payload,
        };
        case allActions.FETCH_REMOVED_NOTIFICATIONS_STATUS:
          return action;
        case allActions.RECIEVE_REMOVED_NOTIFICATIONS_STATUS:
          return {
            ...state,
            notificationRemoveStatus: action.payload,
          };
          case allActions.FETCH_UNFOLLOW_NOTIFICATIONS_STATUS:
            return action;
          case allActions.RECIEVE_UNFOLLOW_NOTIFICATIONS_STATUS:
            return {
              ...state,
              notificationUnfollowStatus: action.payload,
            };
    default: return state;
  } 
  
}
