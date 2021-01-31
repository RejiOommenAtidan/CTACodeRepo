import { STORE_SESSION } from '../../actions/transactions/SessionAction';
import { REMOVE_SESSION } from '../../actions/transactions/SessionAction';

const initialSessionState = {
    oSession: null
};

export const SessionReducer = (state = initialSessionState, action) => {
    switch (action.type) {
        case STORE_SESSION:
            return { ...state, oSession: action.oSession };
        case REMOVE_SESSION:
            return { ...state, oSession: null };
        default:
            return state;
    }
};