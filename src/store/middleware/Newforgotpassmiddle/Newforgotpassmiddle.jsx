import axios from "axios"
import * as Cookies from "js-cookie"
import * as allActions from "../../actions/actions.constants"
import * as ForgotpassAction from "../../actions/Forgotpassword/ForgotpassAction"

const ForgotpasswordService = (store) => next => action => {
    next(action)
    switch (action.type) {
        case allActions.FETCH_NEW_FORGOT_PASS:
            axios.request({
                url: `http://dev.skopic.com:9090/skopicportal/index/getUserPassword.html?emailId=${action.payload}`,
                method: "POST"
            })
                .then((response) => {
                    next(ForgotpassAction.reciveNewForgotpass(response.data))
                })
                .catch((error) => {
                    console.log(error);
                })
            break;

            default:break;
    }
}
export default ForgotpasswordService