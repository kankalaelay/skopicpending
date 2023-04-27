 import axios from "axios";
import * as Cookies from "js-cookie";
//Action imports
import * as TagActions from "../../actions/TrendingTags/TagActions";
import * as allActions from "../../actions/actions.constants";

const TrendingTagService = (store) => (next) => (action) => {
  next(action);
  switch (action.type) {
    case allActions.FETCH_TAG_DATA:
      axios
        .request({
          url: `http://dev.skopic.com:9090/skopicportal/jsonmessage/trending-items.html?task=tags&data=all`,
          method: "post",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data.followmsgList);
          //  receiveTagData
          next(TagActions.receiveTagData(res.data.trendingTags));
        });
      break;

    default:
      break;
  }
};
export default TrendingTagService;
