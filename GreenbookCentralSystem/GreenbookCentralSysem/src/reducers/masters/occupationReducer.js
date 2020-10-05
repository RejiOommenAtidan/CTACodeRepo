import { STORE_DATAAPI } from '../../actions/masters/occupationAction';
import { SET_CURRENT_SELECTED_OCCUPATION } from '../../actions/masters/occupationAction';


const initialOccupationState = {
    lOccupation: [],
    oCurrentOccupation: {}
};

const OccupationReducer = (state = initialOccupationState, action) => {
    switch (action.type) {
        case STORE_DATAAPI:
            return { ...state, lOccupation: action.lOccupation };
        case SET_CURRENT_SELECTED_OCCUPATION:
            return { ...state, oCurrentOccupation: action.oCurrentOccupation };
        default:
            return state;
    }
}

export default OccupationReducer;