import * as allActions from "../../actions/actions.constants"
import * as EditProfileActions from "../../actions/EditProfile/EditProfileActions.js"

import axios from "axios"
import * as Cookies from "js-cookie";

const EditProfileService=(store)=>(next)=>(action)=>{
    next(action)
    switch(action.type){
        case allActions.FETCH_PROFILE_DATA:
        axios.request({
              url: ` 	http://dev.skopic.com:9090/skopicportal/jsonuser/profile.html?profileimgerr=undefined`,
          method: "GET",
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Set-Cookie": Cookies.get("JSESSIONID"),
          },
          withCredentials: true,
        })
        .then((res) => {
           next( EditProfileActions.receiveProfileData(res.data));
          // console.log(res.data+"editData")
        })
        break;
            default:
      break;
    }
}
export default EditProfileService;