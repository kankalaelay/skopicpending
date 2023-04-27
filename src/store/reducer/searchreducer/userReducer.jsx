//action imports
import * as allActions from '../../actions/actions.constants';

const initialState = {
  isLoaded: false,

  userSearchData: {}
}
const userReducer=(state = initialState, action)=> {

  switch (action.type) {
    
    case allActions.FETCH_SEARCH_DATA:
      return action;
    case allActions.RECIEVE_SEARCH_DATA:
      return {
        ...state,
        userSearchData: action.payload,
      };

      
    default: return state;
  } 
  
}

export default userReducer