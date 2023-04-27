//action imports
import * as allActions from "../../actions/actions.constants";

const initialState = {
  isLoaded: false,

  followData: {},
  FollowerCountData: {},
  DeleteStatus: {},
  ReportStatus: {},
  ReportData: {},
  postedChildSayDataResponse: {},
  mailDataResponse: {},
  postDataResponse: {},
  changeCommunityData: {},
  editBioData: {},
  sayData: {},
  askData: {},
  communitiesData: {},
  hashType: {},
  updatePostData: {},
  hashData: {},
  errorMessage: "",
};
export default function followReducer(state = initialState, action) {
  switch (action.type) {
    case allActions.FETCH_FOLLOW_DATA:
      return action;
    case allActions.RECIEVE_FOLLOW_DATA:
      return {
        ...state,
        followData: action.payload,
      };

    case allActions.FETCH_FOLLOWER_COUNT:
      return action;
    case allActions.RECIEVE_FOLLOWER_COUNT:
      return {
        ...state,
        FollowerCountData: action.payload,
      };

    case allActions.FETCH_DELETE_STATUS:
      return action;
    case allActions.RECIEVE_DELETE_STATUS:
      return {
        ...state,
        DeleteStatus: action.payload,
      };

    case allActions.FETCH_REPORT_STATUS:
      return action;
    case allActions.RECIEVE_REPORT_STATUS:
      return {
        ...state,
        ReportStatus: action.payload,
      };

    case allActions.POST_CHILDSAY_DATA:
      return action;
    case allActions.RECIEVE_RESPONSE_OF_POSTED_CHILDSAY_DATA:
      return {
        ...state,
        postedChildSayDataResponse: action.payload,
      };

    case allActions.POST_A_MAIL_DATA:
      return action;
    case allActions.RECIEVE_RESPONSE_OF_A_MAIL_DATA:
      return {
        ...state,
        mailDataResponse: action.payload,
      };

    case allActions.EDIT_A_POST:
      return action;
    case allActions.RECIEVE_RESPONSE_OF_EDIT_A_POST:
      return {
        ...state,
        postDataResponse: action.payload,
      };

    //for community change
    case allActions.CHANGE_COMMUNITY:
      return action;
    case allActions.RESPONSE_OF_CHANGE_COMMUNITY:
      return {
        ...state,
        changeCommunityData: action.payload,
      };

    //for editBio
    case allActions.FETCH_EDIT_BIO:
      return action;
    case allActions.RECEIVE_EDIT_BIO_RESPONSE:
      return {
        ...state,
        editBioData: action.payload,
      };

    //ask u can answer
    case allActions.FETCH_SAY_ASK_DATA:
      return action;

    case allActions.RECIEVE_SAY_ASK_DATA:
      return {
        ...state,
        sayData: action.payload,
        isLoaded: true,
      };

    //Says u can answer
    case allActions.FETCH_ASK_SAY_DATA:
      return action;

    case allActions.RECIEVE_ASK_SAY_DATA:
      return {
        ...state,
        askData: action.payload,
        isLoaded: true,
      };
    //communitys data
    case allActions.GET_MODERATE_COMMUNITYS:
      return action;

    case allActions.RECIEVE_MODERATE_COMMUNITYS:
      return {
        ...state,
        communitiesData: action.payload,
        isLoaded: true,
      };

    //hash(#) check
    case allActions.GET_HASH_CHECK:
      return action;

    case allActions.RECIEVE_HASH_CHECK:
      return {
        ...state,
        hashType: action.payload,
        isLoaded: true,
      };

    case allActions.EXISTING_HASH:
      return {
        ...state,
        errorMessage: "This #TAG already exists",
      };
    case allActions.NOT_HASH:
      return {
        ...state,
        errorMessage: "#TAG missing",
      };
    //fetch hash
    case allActions.FETCH_HASH:
      return action;

    case allActions.RECIEVE_HASH:
      return {
        ...state,
        hashData: action.payload,
      };
    case allActions.NEW_HASH:
      return {
        ...state,
        errorMessage: "You can't create new #TAG here",
      };
    //UpdatePost
    case allActions.GET_UPDATE_POST:
      return action;

    case allActions.RECIEVE_UPDATE_POST:
      return {
        ...state,
        updatePostData: action.payload,
        isLoaded: true,
      };

    default:
      return state;
  }
}
