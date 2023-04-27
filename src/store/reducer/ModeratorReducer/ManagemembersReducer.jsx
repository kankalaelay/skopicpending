//action imports
import * as allActions from "../../actions/actions.constants";

const initialState = {
  isLoaded: false,

  ManagemebersData: [],
};
export default function ModeratorReducer(state = initialState, action) {
  switch (action.type) {
    case allActions.FETCH_MANAGE_MEMBERS_DATA:
      return action;
    case allActions.RECIEVE_MANAGE_MEMBERS_DATA:
      return {
        ...state,
        ManagemebersData: action.payload,
        isLoaded: true,
      };

    default:
      return state;
  }
}
