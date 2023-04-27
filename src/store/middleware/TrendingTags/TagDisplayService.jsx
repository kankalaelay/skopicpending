import axios from "axios"
import * as Cookies from "js-cookie";

import * as TagDisplay from "../../actions/TrendingTags/TagDisplay"
import * as allActions from "../../actions/actions.constants"

const TagDispalyService=(store)=>(next)=>(action)=>{
    next(action)
    switch(action.type){
        case allActions.FETCH_SAY_TAG_DATA:
            axios.request({
                url:`http://dev.skopic.com:9090/skopicportal/jsonmessage/showHashList.html?limiter=one&tag=%23TredTest&opt=OPEN&tenantID=4&hashCount=4&countPosition=hCount${action.payload}&id=${action.payload}`,
                method:"get",
                headers: {  "Access-Control-Allow-Origin": "*",
                "Set-Cookie":Cookies.get("JSESSIONID"),
                },
                withCredentials: true, 
            })
            .then((res) => {
                console.log(res.data.messageList	);
                //  receiveTagData
                next( TagDisplay.reciveDisplayData(res.data.messageList));
              });
            break;
      
          default:
            break;
    }
}
export default TagDispalyService