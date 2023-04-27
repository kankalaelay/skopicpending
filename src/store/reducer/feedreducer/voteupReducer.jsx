//action imports
import * as allActions from '../../actions/actions.constants';

const initialState = {
  

voteupstatus:{},
settingsData:{},
usernameData:{},
hashData:{},
ContactPostMessageData:{}

}
export default function voteupReducer(state = initialState, action) {

  switch (action.type) {
    
      case allActions.FETCH_VOTEUP_STATUS:
        return action;
      case allActions.RECIEVE_VOTEUP_STATUS:
    //  console.log(action.payload)
      return {
          ...state,
          voteupstatus: action.payload,
        };

         //settings
    case allActions.FETCH_SETTINGS:
      return action;

    case allActions.RECIEVE_SETTINGS:
      return {
        ...state,
        settingsData: action.payload
      };

          //@username
    case allActions.FETCH_USERNAME:
      return action;

    case allActions.RECIEVE_USERNAME:
      return {
        ...state,
        usernameData: action.payload
      };

        //Contact Message Post
    case allActions.GET_CONTACT_SUBMIT:
      return action;

    case allActions.RECIEVE_CONTACT_SUBMIT:
      return {
        ...state,
        ContactPostMessageData: action.payload
      };
    default: return state;
  } 
  
}
