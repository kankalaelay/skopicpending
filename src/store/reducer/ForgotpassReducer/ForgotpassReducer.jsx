import * as allActions from "../../actions/actions.constants"

const initialState = {
    message: "",
    isLoading:true
}

const NewforgotpassReducer = (state = initialState, action) => {
    switch (action.type) {

        case allActions.FETCH_NEW_FORGOT_PASS:
            return action;


        case allActions.RECEIVE_NEW_FORGOT_PASS:
            return {
                ...state,
                message: action.payload,
                isLoading:false
            };

            

        default:
            return state;
    }
    

}

export default NewforgotpassReducer