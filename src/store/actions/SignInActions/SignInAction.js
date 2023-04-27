import * as allActions from "../actions.constants"

export function signinUser(formData){
    return{
        type:allActions.DO_SIGNIN,
        payload:formData
    }
}

export function receivesigninUserData(signindata){
    return{
        type:allActions.RECEIVE_SIGN_IN_DATA,
        payload:signindata
    }
}

export function authUser(){
    return{
        type:allActions.AUTHORIZED_USER,
       
    }
}

//get user data functionality
export function fetchloginUser(loginparams){
    return{
        type:allActions.FETCH_SIGNIN_STATUS,
        payload:loginparams
    }
}
export function loginUser(data){
    return{
        type:allActions.RECIEVE_SIGNIN_STATUS,
        payload:data
    }
}

export function unauthUser(){
    return{
        type:allActions.UNAUTHORIZED_USER,
    }
}

export function newUser(){
return{
    type:allActions.NEW_USER,
}
}

export function loading(){
    return{
        type:allActions.LOADING_VALUE
    }
}

export function stopLoading(){
    return{
        type: allActions.LOADING_VALUE_STOP
    }
}

export function signOut(){
    return{
        type:allActions.SiGNoUT_STATUS
    }
}

export function signOutData(){
    return{
        type:allActions.SIGNOUT
    }
}
