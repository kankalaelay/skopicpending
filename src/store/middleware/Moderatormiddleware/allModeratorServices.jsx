//axios dependencies
import axios from "axios";

//Action imports
import * as moderatoractions from "../../actions/Moderator/moderatoractions";
import * as allActions from "../../actions/actions.constants";

const moderatorService = (store) => (next) => (action) => {
  next(action);
  const devURL = `http://dev.skopic.com:9090/skopicportal`;

  //service for moderating community list
  switch (action.type) {
    case allActions.FETCH_MODERATING_COMMUNITYS_LIST:
      axios
        .request({
          url: `${devURL}/jsonuser/moderating-Comm.html`,
          method: "POST",
          data: action.payload,
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(moderatoractions.receiveModeratingCommunityList(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_SEARCH_DATA_ERROR", error });
          console.log(error);
        });
      break;

    //fetching timeline imagelist
    case allActions.FETCH_TIMELINE_IMAGES_LIST:
      axios
        .request({
          url: `${devURL}/jsonuser/timeline-images?${action.payload}`,
          method: "POST",
          // data:action.payload,
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(moderatoractions.receivePhotoTimeLineList(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_TIMELINE_IMAGES_ERROR", error });
          console.log(error);
        });
      break;

    //upload photo to photo timeline
    case allActions.UPLOAD_PHOTO_TO_PHOTO_TIMELINE:
      axios
        .request({
          url: `${devURL}/index/uploadTimeLineImages?tenentId=${action.payload.id}`,
          method: "POST",
          data: action.payload.formData,
          headers: {
            "content-type": "image/png",
          },
          withCredentials: true,
        })
        .then((response) => {
          console.log("Photo upload", action);
          next(moderatoractions.receivePhotoUploadstatus(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_TIMELINE_IMAGES_ERROR", error });
          console.log(error);
        });
      break;

    //get moderator tenantlist
    case allActions.FETCH_TENANT_LIST:
      //dev.skopic.com:9090/skopicportal/jsonuser/tenant-list
      http: axios
        .request({
          url: `${devURL}/jsonuser/tenant-list`,
          method: "GET",
          data: action.payload,
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(moderatoractions.receiveTenantList(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_TIMELINE_IMAGES_ERROR", error });
          console.log(error);
        });
      break;

      case allActions.GET_TENANT_LIST:
        //dev.skopic.com:9090/skopicportal/jsonuser/tenant-list
        http: axios
          .request({
            url: `${devURL}/jsonuser/getTenantList`,
            method: "GET",
            data: action.payload,
            headers: {},
  
            withCredentials: true,
          })
          .then((response) => {
            next(moderatoractions.getTenantList(response.data));
          })
          .catch((error) => {
            //  next({ type: "FETCH_TIMELINE_IMAGES_ERROR", error });
            console.log(error);
          });
        break

    //Delete Tenant Images
    case allActions.DELETE_TIMELINE_IMAGE:
      axios
        .request({
          url: `${devURL}/jsonuser/deleteTimelineImage.html`,
          method: "POST",
          data: action.payload,
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(
            moderatoractions.receiveDeletedTimeLineImagesResponse(response.data)
          );
        })
        .catch((error) => {
          //  next({ type: "FETCH_TIMELINE_IMAGES_ERROR", error });
          console.log(error);
        });
      break;

    //Update Tenant Images Description
    case allActions.UPDATE_TIMELINE_IMAGE_DESC:
      axios
        .request({
          url: `${devURL}/jsonuser/updateTimeLinePhotoDesc.html`,
          method: "POST",
          data: action.payload,
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(
            moderatoractions.receiveTimeLineImagesUpdateResponse(response.data)
          );
        })
        .catch((error) => {
          //  next({ type: "FETCH_TIMELINE_IMAGES_ERROR", error });
          console.log(error);
        });
      break;

    //ManageMembers community moderator middlewear

    case allActions.FETCH_MANAGE_MEMBERS_DATA:
      axios
        .request({
          url: ` 	http://dev.skopic.com:9090/skopicportal/jsonuser/getFollowingUsers.html?tenantId=${action.payload}`,
          method: "POST",

          headers: {},
          withCredentials: true,
        })
        .then((response) => {
          //  console.log(response.data.userList)
          next(
            moderatoractions.receiveManageMembersData(response.data.userList)
          );
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    // Managemembers community block member moderator middlewear

    case allActions.FETCH_BLOCK_MEMBERS_DATA:
      axios
        .request({
          url: `${devURL}/user/blockUserCommunity.html${action.payload}`,
          method: "POST",
          headers: {},
          // data: action.payload,
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);

          // next(moderatoractions.receiveManageMembersData(response.data))
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    // Manage members community getBlockUserData in members moderators actions

    case allActions.FETCH_BLOCKED_USERS_DATA:
      axios
        .request({
          url: `${devURL}/jsonuser/getBlockUsers.html`,
          method: "POST",
          headers: {},
          data: action.payload,
          withCredentials: true,
        })
        .then((response) => {
          console.log(response.data);

          // next(moderatoractions.receiveManageMembersData(response.data))
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    // // Manage members community warnUserCommunity in members moderators actions

    case allActions.FETCH_WARN_USER_COMMUNITY:
      axios
        .request({
          url: `${devURL}/jsonuser/warn-user-community`,

          method: "POST",
          headers: {},
          data: action.payload,
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    //  Manage members community Invite Members in submenu of ManageMembers actions

    case allActions.FETCH_INVITE_MEMBERS_DATA:
      axios
        .request({
          url: `${devURL}/jsonuser/invite-friend`,

          method: "POST",
          headers: {},
          data: action.payload,
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    // Manage members community Invite as Moderator in submenu of ManageMembers actions

    case allActions.FETCH_INVITE_AS_MODERATOR:
      axios
        .request({
          url: `${devURL}/jsonuser/add-remove-moderator`,

          method: "POST",
          headers: {},
          data: action.payload,
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    // Manage members community Remove as Moderator in submenu of ManageMembers actions

    case allActions.FETCH_REMOVE_AS_MODERATOR:
      axios
        .request({
          url: `${devURL}/jsonuser/add-remove-moderator`,

          method: "POST",
          headers: {},
          data: action.payload,
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    //////////////Manage Content Api Modearator calls starts from here ////////////

    //Manage content community ActionItems in Moderator
    case allActions.FETCH_ACTION_ITEMS_DATA:
      axios
        .request({
          // url: `${devURL}/jsonuser/tid`,skopicportal/jsonuser/moderator

          // url: `${devURL}/jsonuser/moderator`,
          url: `http://dev.skopic.com:9090/skopicportal/jsonuser/moderator-access`,

          method: "GET",
          headers: {},
          data: action.payload,
          withCredentials: true,
        })
        .then((response) => {
          // console.log(response);
          next(moderatoractions.recieveActionItemsData(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    //Manage content community PrivateTags in Moderator

    case allActions.FETCH_PRIVATE_TAG_DATA:
      // console.log("RohitRRRRRRRRRRR", action);
      axios
        .request({
          url: `${devURL}/jsonmessage/private-hash?${action.payload}`,

          method: "GET",
          headers: {},
          // data: action.payload,
          withCredentials: true,
        })
        .then((response) => {
          // console.log(response)
          // return response
          next(moderatoractions.recievePrivateTagsData(response.data));
        })
        .catch((error) => {
          console.log("helloPPPPPPPPPPPPPP", error);
        });
      break;

    ////Manage content community ActivityLog in Moderator

    case allActions.FETCH_ACTIVITY_LOG_DATA:
      axios
        .request({
          //  url: `${devURL}/skopicportal/jsonuser/report?isNewUiVersion=yes&tenantId=${tId}&type=${message}`,
          url: `${devURL}/jsonuser/report?${action.payload}`,

          method: "GET",
          headers: {},
          // data: action.payload,
          withCredentials: true,
        })
        .then((response) => {
          console.log(response);
          next(moderatoractions.recieveActivityLogData(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    default:
      break;
  }
};
export default moderatorService;
