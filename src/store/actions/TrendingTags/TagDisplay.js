import * as allActions from "../actions.constants"


export function fecthDisplayData(tagValue){
    return{
        type:allActions.FETCH_SAY_TAG_DATA,
        payload:tagValue
    }
}

export function reciveDisplayData(data){
return{
    type:allActions.RECIEVE_SAY_TAG_DATA,
    payload:data
}
}