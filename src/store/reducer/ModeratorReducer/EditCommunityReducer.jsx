//action imports
import * as allActions from "../../actions/actions.constants";

const initialState = {
  isLoaded: false,

  timeLineImagesList: {},
  moderatorTenantList: [],
  communityTenantList: {},
  UpdateMapsBoundaries:[],
};
export default function ModeratorReducer(state = initialState, action) {
  switch (action.type) {
    case allActions.FETCH_TIMELINE_IMAGES_LIST:
      return action;
    case allActions.RECIEVE_TIMELINE_IMAGES_LIST:
      return {
        ...state,
        timeLineImagesList: action.payload,
        isLoaded: true,
      };
    case allActions.FETCH_TENANT_LIST:
      return action;
    case allActions.RECIEVE_TENANT_LIST:
      return {
        ...state,
        moderatorTenantList: action.payload,
        isLoaded: true,
      };
    case allActions.GET_TENANT_LIST:
      return {
        ...state,
        communityTenantList: action.payload,
        isLoaded: true,
      };
      
      //Edit community Update maps boundaries 
      case allActions.RECIEVE_UPDATE_MAPS_BOUNDARIES_DATA:
      return {
        ...state,
        UpdateMapsBoundaries: action.payload,
        isLoaded: true,
      };

    default:
      return state;
  }
}
