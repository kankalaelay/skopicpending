
import * as allActions from "../actions.constants"



export function NewForgotpass(emailValue){
    return{
        type:allActions.FETCH_NEW_FORGOT_PASS,
        payload:emailValue
    }
}
export function reciveNewForgotpass(data){
    return{
        type:allActions.RECEIVE_NEW_FORGOT_PASS,
        payload:data
    }
}