import { STORE_GOOGLECREDS } from '../actions/GLoginAction';

const initialGLoginState = {
    oGoogle: {}
};

export const GLoginReducer = (state = initialGLoginState, action) => {
    switch (action.type) {
        case STORE_GOOGLECREDS:
            return { ...state, oGoogle: action.oGoogle };
        default:
            return state;
    }
};