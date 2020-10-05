import { STORE_DATAAPI } from '../../actions/masters/typeissuedAction';
import { SET_CURRENT_SELECTED_TYPEISSUED } from '../../actions/masters/typeissuedAction';


const initialTypeIssuedState = {
    lTypeIssued: [],
    oCurrentTypeIssued: {}
};

const TypeIssuedReducer = (state = initialTypeIssuedState, action) => {
    switch (action.type) {
        case STORE_DATAAPI:
            return { ...state, lTypeIssued: action.lTypeIssued };
        case SET_CURRENT_SELECTED_TYPEISSUED:
            return { ...state, oCurrentTypeIssued: action.oCurrentTypeIssued };
        default:
            return state;
    }
}

export default TypeIssuedReducer;