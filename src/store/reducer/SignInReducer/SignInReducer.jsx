import * as allActions from "../../actions/actions.constants";

const initialState = {
  isAuthorized: false,
  userDetails: {},
  errorMessage: "",
  isloading: false,
  SignInCheckData: {},
  authorizedStatus: {},
  isLogout: false,
};

const SignInReducer = (state = initialState, action) => {
  switch (action.type) {
    case allActions.DO_SIGNIN:
      return action;
    case allActions.RECEIVE_SIGN_IN_DATA:
      return {
        ...state,
        SignInCheckData: action.payload,
      };
    case allActions.AUTHORIZED_USER:
      return {
        ...state,
        isAuthorized: true,
      };
    case allActions.RECIEVE_SIGNIN_STATUS:
      return {
        ...state,
        userDetails: action.payload,
      };
    case allActions.UNAUTHORIZED_USER:
      return {
        ...state,
        isAuthorized: false,
        errorMessage: "Incorrect Email or Password",
      };
    case allActions.NEW_USER:
      return {
        ...state,
        isAuthorized: false,
        errorMessage: "You don't seem to have an account!",
      };
    case allActions.LOADING_VALUE:
      return {
        ...state,
        isloading: true,
      };
    case allActions.LOADING_VALUE_STOP:
      return {
        ...state,
        isloading: false,
      };
    case allActions.SiGNoUT_STATUS:
      return action;
    case allActions.SIGNOUT:
      return {
        ...state,
        isAuthorized: false,
        isLogout: true,
      };
      break;
    default:
      return state;
  }
};
export default SignInReducer;
