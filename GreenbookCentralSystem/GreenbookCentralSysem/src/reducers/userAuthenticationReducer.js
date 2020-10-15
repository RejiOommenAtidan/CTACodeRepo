import { STORE_AUTH_DETAILS } from '../actions/userAuthenticateAction';
import { REMOVE_AUTH_DETAILS } from '../actions/userAuthenticateAction';


const initialUserAuthState = {
    oUserAuth: null
};

const UserAuthenticationReducer = (state = initialUserAuthState, action) => {
    switch (action.type) {
        case STORE_AUTH_DETAILS:
            return { ...state, oUserAuth: action.oUserAuth };
        case REMOVE_AUTH_DETAILS:
            return { ...state, oUserAuth: null };
        default:
            return state;
    }
}

export default UserAuthenticationReducer;

