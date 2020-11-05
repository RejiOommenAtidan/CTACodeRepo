import { STORE_GOOGLECREDS } from '../../actions/transactions/GLoginAction';
import { REMOVE_GOOGLECREDS } from '../../actions/transactions/GLoginAction';

const initialGLoginState = {
    oGoogle: null
};

export const GLoginReducer = (state = initialGLoginState, action) => {
    switch (action.type) {
        case STORE_GOOGLECREDS:
            return { ...state, oGoogle: action.oGoogle };
        case REMOVE_GOOGLECREDS:
            return { ...state, oGoogle: null };
        default:
            return state;
    }
};