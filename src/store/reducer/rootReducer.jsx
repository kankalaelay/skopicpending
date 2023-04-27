// npm dependencies
import { combineReducers } from "redux";
//reducer imports

import userReducer from "./searchreducer/userReducer";
import notificationReducer from "./notificationreducer/notificationReducer";
import notificationStatusReducer from "./notificationreducer/notificationstatusReducer";
import childSayReducer from "./searchreducer/childSayReducer";
import feedReducer from "./feedreducer/feedReducer";
import followReducer from "./feedreducer/followReducer";
import voteupReducer from "./feedreducer/voteupReducer";
import mapReducer from "./mapreducer/mapReducer";
import SignInReducer from "./SignInReducer/SignInReducer";
import TagReducer from "./TrendingTags/TagReducer";
import TagDisplayReducer from "./TrendingTags/TagDisplayReducer";
import ActivityInfoReducer from "./ActivityReducer/ActivityInfoReducer";
import EditProfileReducer from "./EditProfile/EditProfileReducer";
import ModeratorReducer from "./ModeratorReducer/ModeratorReducer";
import EditCommunityReducer from "./ModeratorReducer/EditCommunityReducer";
import NewforgotpassReducer from "./ForgotpassReducer/ForgotpassReducer";
import ManagemembersReducer from "./ModeratorReducer/ManagemembersReducer";
import PrivateTagsReducer from "./ModeratorReducer/PrivateTagsReducer";

const rootReducer = combineReducers({
  userReducer,
  notificationReducer,
  childSayReducer,
  notificationStatusReducer,
  feedReducer,
  followReducer,
  voteupReducer,
  mapReducer,
  SignInReducer,
  TagReducer,
  TagDisplayReducer,
  ActivityInfoReducer,
  EditProfileReducer,
  ModeratorReducer,
  EditCommunityReducer,
  NewforgotpassReducer,
  ManagemembersReducer,
  PrivateTagsReducer,
});

export default rootReducer;
