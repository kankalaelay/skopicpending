import axios from "axios"
import * as Cookies from "js-cookie"

import * as SignInActions from "../../actions/SignInActions/SignInAction"
import * as feedactions from '../../actions/feedactions/feedActionCreator';

import * as allActions from "../../actions/actions.constants"

const SignInservice = (store) => next => action => {
    next(action)
    next(SignInActions.loading())
    switch (action.type) {
        case allActions.DO_SIGNIN:
            axios.request({
                url: `http://dev.skopic.com:9090/skopicportal/jsonindex/securityCheck.html?source=null`,
                method: "POST",
                data: action.payload,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Set-Cookie": Cookies.get("JSESSIONID"),
                },
                withCredentials: true,
                
            })
                .then((res) => {
                    next(SignInActions.receivesigninUserData(res.data))
                    if (res.data.status === "AUTHORIZED") {
                        next(SignInActions.authUser())
                        axios.request({
                            url: `http://dev.skopic.com:9090/skopicportal/jsonuser/land?redirectTenantId=${res.data.userTenantId}&name=${res.data.userTenant}`,
                            method: "POST",
                            headers: {
                                "Access-Control-Allow-Origin": "*",
                                "Set-Cookie": Cookies.get("JSESSIONID"),
                            },

                            withCredentials: true,
                        })
                        .then((res)=>{
                            if(res.data.userCommunityStatus==="Y"){
                              axios.request({
                            url:`http://dev.skopic.com:9090/skopicportal/jsonuser/getUserData`,
                            method:"GET",
                            headers: {  "Access-Control-Allow-Origin": "*",
                            "Set-Cookie":Cookies.get("JSESSIONID"),
                            },
                            withCredentials: true, 
                        })
                        .then((res)=>{
                            next(SignInActions.loginUser(res.data))
                        })
                        }
                    })
                        
                    }
                    else if (res.data.status === "NewUser") {
                        next(SignInActions.newUser())
                    }
                    else {
                        next(SignInActions.unauthUser())
                    }
                    next(SignInActions.stopLoading())
                })
            break;

            case allActions.SiGNoUT_STATUS:
                axios.request({
                    url:`http://dev.skopic.com:9090/skopicportal/jsonindex/signOut`,
                    method:"GET",
                    headers: { 'content-type': 'application/x-www-form-urlencoded; charset=UTF-8', "Access-Control-Allow-Origin": "*",
                    'Set-Cookie':Cookies.get("JSESSIONID")
                    },
                    withCredentials: true,
                })
                .then((res)=>{
                    if(res.data.status==="SignedOut"){
                       next(SignInActions.signOutData())
                    }
                    next(SignInActions.stopLoading())
                })
                break;
            default:
            break;

    }
}
export default SignInservice