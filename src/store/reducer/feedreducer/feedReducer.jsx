//action imports
import * as allActions from '../../actions/actions.constants';

const initialState = {
  isLoaded: false,

  feedData: {},
  contibutorsData: {}


}
export default function feedReducer(state = initialState, action) {

  switch (action.type) {

    case allActions.FETCH_FEED_DATA:
      return action;
    case allActions.RECIEVE_FEED_DATA:
        return {
          ...state,
          feedData: action.payload,
          isLoaded: true
        };

    case allActions.FETCH_CONTRIBUTORS:
      return action;
    case allActions.RECEIVE_CONTIRBUTORS_RESPONSE:
      return {
        ...state,
        contibutorsData: action.payload,
        isLoaded: true
      };
    default: return state;
  }

}
