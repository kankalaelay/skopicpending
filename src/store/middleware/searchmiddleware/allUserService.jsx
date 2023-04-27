//axios dependencies
import axios from 'axios';

//Action imports
import * as userActions from '../../actions/searchactions/userActionCreator';
import * as allActions from '../../actions/actions.constants';

const userService = (store) => next => action => {
  next(action)
  const devURL=`http://dev.skopic.com:9090/skopicportal`

  switch (action.type) {

    case allActions.FETCH_SEARCH_DATA:

      axios.request({
        url: `${devURL}/jsonmessage/hSearch.html?q=${action.payload}`,
        method: "POST",
        headers: {
          // 'Set-Cookie': 'JSESSIONID=8db9877f-d652-483c-a80a-efc3a89518e8;SESSION=8db9877f-d652-483c-a80a-efc3a89518e8',

        },

        withCredentials: true,


      })
        .then((response) => {
          next(userActions.receiveSearchData(response.data))


        })
        .catch((error) => {
          //  next({ type: "FETCH_SEARCH_DATA_ERROR", error });
          console.log(error)

        });
      break;


   
    default: break;
  }
}
export default userService;