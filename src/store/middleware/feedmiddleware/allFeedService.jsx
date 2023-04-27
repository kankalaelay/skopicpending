//axios dependencies
import axios from "axios";

//Action imports
import * as feedactions from "../../actions/feedactions/feedActionCreator";
import * as SignInActions from "../../actions/SignInActions/SignInAction";
import * as allActions from "../../actions/actions.constants";

const allFeedService = (store) => (next) => (action) => {
  const devURL = `http://dev.skopic.com:9090/skopicportal`;
  next(action);
  switch (action.type) {
    case allActions.FETCH_FEED_DATA:
      axios
        .request({
          url: `${devURL}/jsonmessage/all-feed.html${action.payload}`,
          method: "GET",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(feedactions.receiveFeedData(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_FEED_DATA_ERROR", error });
          console.log(error);
        });
      break;
    case allActions.FETCH_FOLLOW_DATA:
      axios
        .request({
          url: `${devURL}/message/followUnfollow.html${action.payload}`,
          method: "POST",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          console.log("response", response)
          next(feedactions.receiveFollowData(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_FOLLOW_DATA_ERROR", error });
          console.log(error);
        });
      break;

    case allActions.FETCH_VOTEUP_STATUS:
      axios
        .request({
          url: `${devURL}/message/voteUp.html${action.payload}`,
          method: "POST",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          // console.log("response", response);
          next(feedactions.receiveVoteUpStatus(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_FOLLOW_DATA_ERROR", error });
          console.log(error);
        });
      break;

    case allActions.FETCH_FOLLOWER_COUNT:
      axios
        .request({
          url: `${devURL}/jsonuser/message-id/${action.payload.id}/type/${action.payload.type}`,
          method: "GET",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(feedactions.receiveFollowerCount(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_FOLLOW_DATA_ERROR", error });
          console.log(error);
        });
      break;

    case allActions.FETCH_DELETE_STATUS:
      axios
        .request({
          url: `${devURL}/jsonmessage/deleteMessageByUser.html${action.payload}`,
          method: "POST",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(feedactions.receiveDeleteStatus(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_FOLLOW_DATA_ERROR", error });
          console.log(error);
        });
      break;

    case allActions.FETCH_REPORT_STATUS:
      axios
        .request({
          url: `${devURL}/user/getReportAbuseStatus.html${action.payload}`,
          method: "POST",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(feedactions.receiveReportStatus(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_FOLLOW_DATA_ERROR", error });
          console.log(error);
        });
      break;

    case allActions.FETCH_REPORT_DATA:
      axios
        .request({
          url: `${devURL}/user/reportAbuse${action.payload}`,
          method: "POST",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(feedactions.fetchReportData(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_FOLLOW_DATA_ERROR", error });
          console.log(error);
        });
      break;

    case allActions.POST_CHILDSAY_DATA:
      axios
        .request({
          url: `${devURL}/jsonmessage/addMessageSayBottom.html${action.payload}`,
          method: "POST",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(feedactions.receiveChildSayResponseData(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_FOLLOW_DATA_ERROR", error });
          console.log(error);
        });
      break;

    case allActions.POST_A_MAIL_DATA:
      axios
        .request({
          url: `${devURL}/user/sendMessagetoUser.html${action.payload}`,
          method: "POST",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(feedactions.receiveMailData(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_FOLLOW_DATA_ERROR", error });
          console.log(error);
        });
      break;

    case allActions.EDIT_A_POST:
      axios
        .request({
          url: `${devURL}/jsonmessage/updateMessage.html${action.payload}`,
          method: "POST",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(feedactions.receiveEditPostResponse(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_FOLLOW_DATA_ERROR", error });
          console.log(error);
        });
      break;

    case allActions.EDIT_A_UPDATE:
      axios
        .request({
          url: `${devURL}/jsonuser/updateAnnouncements.html${action.payload}`,
          method: "POST",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(feedactions.receiveEditUpdateResponse(response.data));
        })
        .catch((error) => {
          //  next({ type: "FETCH_FOLLOW_DATA_ERROR", error });
          console.log(error);
        });
      break;

    //Community Change
    case allActions.CHANGE_COMMUNITY:
      axios
        .request({
          url: `${devURL}/jsonuser/land.html?name=${action.payload.name}&redirectTenantId=${action.payload.id}`,
          method: "POST",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(feedactions.responseofCommunityChange(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    //get userdata
    case allActions.FETCH_SIGNIN_STATUS:
      axios
        .request({
          url: `${devURL}/jsonuser/getUserData`,
          method: "GET",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(SignInActions.loginUser(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;
    //get contributorsdata
    case allActions.FETCH_CONTRIBUTORS:
      axios
        .request({
          url: `${devURL}/jsonuser/contribute.html`,
          method: "GET",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(feedactions.responseofContributors(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    //edit bio
    case allActions.FETCH_EDIT_BIO:
      axios
        .request({
          url: `${devURL}/user/updateUserBio.html?${action.payload}`,
          method: "POST",
          headers: {},

          withCredentials: true,
        })
        .then((response) => {
          next(feedactions.responseOfEditBio(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      break;

    //asks u can answer

    case allActions.FETCH_SAY_ASK_DATA:
      axios
        .request({
          url: `${devURL}/jsonmessage/addMessageAsk.html?`,
          method: "POST",
          data: action.payload,
          headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          next(feedactions.recieveSayAskData(res.data));
        });
      break;

    //Says u can answer
    case allActions.FETCH_ASK_SAY_DATA:
      axios
        .request({
          url: `${devURL}/jsonmessage/addMessageSayTop.html?`,
          method: "POST",
          data: action.payload,
          headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          next(feedactions.recieveAskSayData(res.data));
        });
      break;

    //settings
    case allActions.FETCH_SETTINGS:
      axios
        .request({
          url: `${devURL}/jsonuser/userSettings.html`,
          method: "GET",
          headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          next(feedactions.recieveSettings(res.data));
        });
      break;

    //@username
    case allActions.FETCH_USERNAME:
      axios
        .request({
          url: `${devURL}/jsonmessage/searchUserNames.html?searchChars=${action.payload}`,
          method: "GET",
          headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          next(feedactions.recieveUserNames(res.data));
        });
      break;

    //Ask your community
    case allActions.ASK_YOUR_COMMUNITY:
      axios
        .request({
          url: `${devURL}/jsonmessage/addOpenQuestion.html?messageId=${action.payload}`,
          method: "POST",
          headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          next(feedactions.recieveaskYourCommunity(res.data));
        });
      break;

    //get community
    case allActions.GET_MODERATE_COMMUNITYS:
      axios
        .request({
          url: `${devURL}/jsonuser/getModeratingCommunity?flag=myCommunities`,
          method: "POST",
          headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          next(feedactions.receiveModeratingCommunitys(res.data));
        });
      break;

    //get Hash
    case allActions.FETCH_HASH:
      axios
        .request({
          url: `${devURL}/user/hashFind.html?`,
          method: "POST",
          data: action.payload,
          headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res.data === "Go") {
            axios
              .request({
                url: `${devURL}/jsonuser/postOnMultiCommunity.html?`,
                method: "POST",
                data: action.payload,
                headers: {
                  // "Access-Control-Allow-Origin": "*",
                  // "Set-Cookie": Cookies.get("JSESSIONID"),
                },
                withCredentials: true,
              })
              .then((res) => {
                next(feedactions.receiveUpdatePost(res.data));
              });
          }
          next(feedactions.receiveHash(res.data));
        });
      break;

    // case allActions.GET_POST_TAG:
    // axios.request({
    //     url: `${devURL}/jsonuser/postOnMultiCommunity.html?`,
    //     method: "POST",
    //     data: action.payload,
    //     headers: {
    //       // "Access-Control-Allow-Origin": "*",
    //       // "Set-Cookie": Cookies.get("JSESSIONID"),
    //     },
    //     withCredentials: true,
    //   })
    //     .then((res) => {
    //       next(feedactions.receiveUpdatePost(res.data))
    //     })
    // break;

    //get Hash(#) check
    case allActions.GET_HASH_CHECK:
      axios
        .request({
          url: `${devURL}/message/hashCheck.html?`,
          method: "POST",
          data: action.payload,
          headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          if (res) {
            if (res.data === "Available" || res.data === "SKIP") {
              // if(res.data==="Available"){
              //   next(feedactions.existingHash())
              // }
              // else{
              //   next(feedactions.notHash())
              // }
            } else {
              axios
                .request({
                  url: `${devURL}/message/postTag.html?rtrValue=${res.data}`,
                  method: "POST",
                  headers: {
                    // "Access-Control-Allow-Origin": "*",
                    // "Set-Cookie": Cookies.get("JSESSIONID"),
                  },
                  withCredentials: true,
                })
                .then((res) => {
                  next(feedactions.receivePostTag(res.data));
                });
            }
            next(feedactions.receiveHashCheck(res.data));
          }
        });
      break;

    //ContactMessage Post
    case allActions.GET_CONTACT_SUBMIT:
      axios
        .request({
          url: `${devURL}/user/userSurvey.html`,
          method: "POST",
          data: action.payload,
          headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          next(feedactions.receiveContactSubmit(res.data));
        });
      break;

    default:
      break;
  }
};
export default allFeedService;
