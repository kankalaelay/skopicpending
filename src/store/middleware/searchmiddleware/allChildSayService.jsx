//axios dependencies
import axios from "axios";

//Action imports
import * as childSayActions from "../../actions/searchactions/childsayActionCreator";
import * as allActions from "../../actions/actions.constants";

const childSayService = (store) => (next) => (action) => {
  next(action);
  const devURL = `http://dev.skopic.com:9090/skopicportal`;

  switch (action.type) {
    case allActions.FETCH_CHILDSAY_DATA:
      axios
        .request({
          url: `${devURL}/jsonuser/childSays.html${action.payload}`,
          method: "POST",
          headers: {
            // 'Set-Cookie': 'JSESSIONID=8db9877f-d652-483c-a80a-efc3a89518e8;SESSION=8db9877f-d652-483c-a80a-efc3a89518e8',
          },

          withCredentials: true,
        })
        .then((response) => {
          next(childSayActions.receiveChildSayData(response.data));
        })
        .catch((error) => {
          // next({ type: "FETCH_CHILD_SAY_DATA_ERROR", error });
          console.log(error);
        });
      break;

    default:
      break;
  }
};
export default childSayService;
