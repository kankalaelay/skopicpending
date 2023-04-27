//action imports
import * as allActions from '../../actions/actions.constants';

const initialState = {
  isLoaded: false,

  nearByCommunitysData: {},
  getNearByCommunitysData: {}
}
const mapReducer=(state = initialState, action)=> {

  switch (action.type) {
    
   
      case allActions.FETCH_NEAR_BY_COMMUNITYS:
        return action;
      case allActions.RECIEVE_NEAR_BY_COMMUNITYS:
        return {
          ...state,
          nearByCommunitysData: action.payload,
        };
        case allActions.GET_NEAR_BY_COMMUNITYS:
        return {
          ...state,
          getNearByCommunitysData: action.payload,
        };

    default: return state;
  } 
  
}

export default mapReducer