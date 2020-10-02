import { STORE_DATAAPI } from '../../actions/masters/featureAction'


const initialFeatureState = {
    lFeature: [],
    oCurrentFeature: {}
};

const FeatureReducer = (state = initialFeatureState, action) => {
    switch (action.type) {
        case STORE_DATAAPI:
            return { ...state, lFeature: action.lFeature };
        default:
            return state;
    }
}

export default FeatureReducer;