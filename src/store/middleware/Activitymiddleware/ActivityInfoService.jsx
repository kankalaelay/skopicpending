import axios from "axios";
import * as Cookies from "js-cookie";
//Action imports
import * as ActivityInfoActions from"../../actions/Activity/ActivityAction"
import * as allActions from "../../actions/actions.constants"

const ActivityInfoService = (store) => (next) => (action) => {
  next(action);
  switch (action.type) {
    case allActions.FETCH_ACTIVITY_DATA:
      axios
        .request({
          url: ` 	http://dev.skopic.com:9090/skopicportal/jsonuser/activity.html`,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          next(ActivityInfoActions.receiveActivityData(res.data));
        });
      break;

    default:
      break;
  }
};
export default ActivityInfoService;
