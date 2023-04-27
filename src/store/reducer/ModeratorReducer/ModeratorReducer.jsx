//action imports
import * as allActions from "../../actions/actions.constants";

const initialState = {
  isLoaded: false,

  moderatingCommunitysData: {},
  ActivityLogdata: [],
  ActionItemsData: [],
};
export default function ModeratorReducer(state = initialState, action) {
  switch (action.type) {
    case allActions.FETCH_MODERATING_COMMUNITYS_LIST:
      return action;
    case allActions.RECIEVE_MODERATING_COMMUNITYS_LIST:
      return {
        ...state,
        moderatingCommunitysData: action.payload,
        isLoaded: true,
      };

    //////Manage content Modearator section  calls start from here

    //Manage content community ActionItems in Moderator
    case allActions.FETCH_ACTION_ITEMS_DATA:
      return { ...state };
    case allActions.RECIEVE_ACTION_ITEMS_DATA:
      return {
        ...state,
        ActionItemsData: [...action.payload.messageList],
        isLoaded: true,
      };

    //Manage content community ActivityLog in Moderator

    case allActions.FETCH_ACTIVITY_LOG_DATA:
      return { ...state };
    case allActions.RECIEVE_ACTIVITY_LOG_DATA:
      return {
        ...state,
        ActivityLogdata: action.payload.messageList,
        isLoaded: true,
      };
    case allActions.UPDATE_COMMUNITY_RULE:
      const communityData = { ...state.moderatingCommunitysData };
      const updatedCommunityIndex = communityData.restrictions.findIndex(
        (x) => x.tenantId === action.payload.tenantId
      );
      communityData.restrictions.splice(
        updatedCommunityIndex,
        1,
        action.payload
      );
      return {
        ...state,
        moderatingCommunitysData: { ...communityData },
      };
    default:
      return state;
  }
}
