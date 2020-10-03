import { STORE_DATAAPI } from '../../actions/masters/featureAction';
import { SET_CURRENT_SELECTED_FEATURE } from '../../actions/masters/featureAction';


const initialFeatureState = {
    lFeature: [],
    oCurrentFeature: {}
};

const FeatureReducer = (state = initialFeatureState, action) => {
    switch (action.type) {
        case STORE_DATAAPI:
            return { ...state, lFeature: action.lFeature };
        case SET_CURRENT_SELECTED_FEATURE:
            return { ...state, oCurrentFeature: action.oCurrentFeature };
        default:
            return state;
    }
}

export default FeatureReducer;