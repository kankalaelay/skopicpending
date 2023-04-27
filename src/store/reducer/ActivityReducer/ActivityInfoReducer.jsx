import *  as allActions from "../../actions/actions.constants"

const initialState={
    activityInfo:{}
}

const ActivityInfoReducer =(state=initialState,action)=>{
    switch(action.type){
        case allActions.FETCH_ACTIVITY_DATA:
            return action;

        case allActions.RECIEVE_ACTIVITY_DATA:
            return{
                ...state,
                activityInfo:action.payload
            }
            default:
                return state;
    }

}

export default ActivityInfoReducer