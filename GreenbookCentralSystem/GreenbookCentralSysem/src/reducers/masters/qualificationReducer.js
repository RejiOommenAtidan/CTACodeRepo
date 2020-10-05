import { STORE_DATAAPI } from '../../actions/masters/qualificationAction';
import { SET_CURRENT_SELECTED_QUALIFICATION } from '../../actions/masters/qualificationAction';


const initialQualificationState = {
    lQualification: [],
    oCurrentQualification: {}
};

const QualificationReducer = (state = initialQualificationState, action) => {
    switch (action.type) {
        case STORE_DATAAPI:
            return { ...state, lQualification: action.lQualification };
        case SET_CURRENT_SELECTED_QUALIFICATION:
            return { ...state, oCurrentQualification: action.oCurrentQualification };
        default:
            return state;
    }
}

export default QualificationReducer;