//action imports
import * as allActions from "../../actions/actions.constants";

const initialState = {
  isLoaded: false,

  tredingTagsResults: {},
};
const TagReducer = (state = initialState, action) => {
  switch (action.type) {
    case allActions.FETCH_TAG_DATA:
      return action;

    case allActions.RECIEVE_TAG_DATA:
      return {
        ...state,
        tredingTagsResults: action.payload,
      };

    default:
      return state;
  }
};

export default TagReducer;
