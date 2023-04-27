//npm dependencies
import { createStore, applyMiddleware, compose } from "redux";
//reducer imports
import rootReducer from "../reducer/rootReducer";

import thunkMiddleware from "redux-thunk";
//service imports
import userMiddleware from "../middleware/searchmiddleware/allUserService";
import notificationMiddleware from "../middleware/notificationmiddleware/allNotificationService";
import allChildSayMiddleware from "../middleware/searchmiddleware/allChildSayService";
import feedmiddleware from "../middleware/feedmiddleware/allFeedService";
import mapmiddleware from "../middleware/googlemapmiddleware/allMapsService";
import SignInService from "../middleware/SignInmiddleware/SignInService";
import TrendingTagService from "../middleware/TrendingTags/TredingTagService";
import TagDisplayService from "../middleware/TrendingTags/TagDisplayService";
import ActivityInfoService from "../middleware/Activitymiddleware/ActivityInfoService";
import EditProfileService from "../middleware/EditProfile/EditProfileService";
import allModeratorServices from "../middleware/Moderatormiddleware/allModeratorServices";
import Newforgotpassmiddle from "../middleware/Newforgotpassmiddle/Newforgotpassmiddle";
import { composeWithDevTools } from "redux-devtools-extension";

export default function configureStore() {
  return createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        EditProfileService,
        ActivityInfoService,
        TagDisplayService,
        TrendingTagService,
        userMiddleware,
        notificationMiddleware,
        allChildSayMiddleware,
        feedmiddleware,
        mapmiddleware,
        SignInService,
        allModeratorServices,
        Newforgotpassmiddle
      )
    )
  );
}
