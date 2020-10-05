import { STORE_DATAAPI } from '../../actions/masters/regionAction';
import { SET_CURRENT_SELECTED_REGION } from '../../actions/masters/regionAction';


const initialRegionState = {
    lRegion: [],
    oCurrentRegion: {}
};

const RegionReducer = (state = initialRegionState, action) => {
    switch (action.type) {
        case STORE_DATAAPI:
            return { ...state, lRegion: action.lRegion };
        case SET_CURRENT_SELECTED_REGION:
            return { ...state, oCurrentRegion: action.oCurrentRegion };
        default:
            return state;
    }
}

export default RegionReducer;