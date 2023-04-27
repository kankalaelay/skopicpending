//action imports
import * as allActions from "../../actions/actions.constants";

const initialState = {
  isLoaded: false,

  ManagemebersData: [],
  isBlockusers: [],
  Blockedusersdata: "",
  InviteAsModerator: [],
  RemoveAsModerator: [],
};
export default function ModeratorReducer(state = initialState, action) {
  switch (action.type) {
    //   Block member actions are here
    case allActions.FETCH_BLOCK_MEMBERS_DATA:
      return action;
    case allActions.RECIEVE_BLOCK_MEMBERS_DATA:
      return {
        ...state,
        ManagemebersData: action.payload,
        isLoaded: true,
      };

    // Manage members community getBlockUserData in members moderators actions

    case allActions.FETCH_BLOCKED_USERS_DATA:
      return action;
    case allActions.RECIEVE_BLOCKED_USERS_DATA:
      return {
        ...state,
        ManagemebersData: action.payload,
        isLoaded: true,
      };

    // Manage members community warnUserCommunity in members moderators actions

    case allActions.FETCH_WARN_USER_COMMUNITY:
      return action;
    case allActions.RECIEVE_WARN_USER_COMMUNITY:
      return {
        ...state,
        ManagemebersData: action.payload,
        isLoaded: true,
      };

    // Manage members community Invite Members in submenu of ManageMembers actions

    case allActions.FETCH_INVITE_MEMBERS_DATA:
      return action;
    case allActions.RECIEVE_INVITE_MEMBERS_DATA:
      return {
        ...state,
        ManagemebersData: action.payload,
        isLoaded: true,
      };

    // Manage members community Invite as Moderator in submenu of ManageMembers actions

    case allActions.FETCH_INVITE_AS_MODERATOR:
      return action;
    case allActions.RECIEVE_INVITE_AS_MODERATOR:
      return {
        ...state,
        ManagemebersData: action.payload,
        isLoaded: true,
      };

    // Manage members community Remove as Moderator in submenu of ManageMembers actions

    case allActions.FETCH_REMOVE_AS_MODERATOR:
      return action;
    case allActions.RECIEVE_REMOVE_AS_MODERATOR:
      return {
        ...state,
        ManagemebersData: action.payload,
        isLoaded: true,
      };

    default:
      return state;
  }
}
