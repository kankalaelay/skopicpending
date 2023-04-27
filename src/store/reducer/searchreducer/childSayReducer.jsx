//action imports
import * as allActions from '../../actions/actions.constants';

const initialState = {
  isLoaded: false,

  userChildSayData: {},
}
const childSayReducer=(state = initialState, action)=> {

  switch (action.type) {
    
   
      case allActions.FETCH_CHILDSAY_DATA:
        return action;
      case allActions.RECIEVE_CHILDSAY_DATA:
        return {
          ...state,
          userChildSayData: action.payload,
          isLoaded:true
        };

    default: return state;
  } 
  
}

export default childSayReducer