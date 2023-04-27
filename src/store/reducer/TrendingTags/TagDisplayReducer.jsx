import * as allActions from "../../actions/actions.constants"


 const initialState={
    displayTag:{}
}

const TagDisplayReducer=(state=initialState,action)=>{
    switch (action.type){
    case allActions.FETCH_SAY_TAG_DATA:
    return action;
    
    case allActions.RECIEVE_SAY_TAG_DATA:
        return{
            ...state,
            displayTag:action.payload
        }
       
        default:
            return state;
}
}
export default TagDisplayReducer;