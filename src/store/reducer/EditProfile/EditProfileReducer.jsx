import * as allActions from "../../actions/actions.constants" 

const initialState={
    profileInfo:[]
}

const EditProfileReducer=(state=initialState,action)=>{

switch(action.type){
    case allActions.FETCH_PROFILE_DATA:
    return action;

    case allActions.RECIEVE_PROFILE_DATA:
    return {
        ...state,
        profileInfo:action.payload
    }
                default:
                return state;
}
};
export default EditProfileReducer