import * as allActions from "../../actions/actions.constants";

const initialState = {
  isLoaded: false,

  PrivateTagsData: [],
};

const PrivateTagsReducer = (state = initialState, action) => {
  // console.log(action)
  switch (action.type) {
    //Manage content community PrivateTagsData in Moderator

    case allActions.FETCH_PRIVATE_TAG_DATA:
      return { ...initialState };
    case allActions.RECIEVE_PRIVATE_TAG_DATA:

      return {
        ...state,
        PrivateTagsData: [...action.payload.privateTagList],

        isLoaded: true,
      };

    default:
      return state;
  }
};
export default PrivateTagsReducer;
