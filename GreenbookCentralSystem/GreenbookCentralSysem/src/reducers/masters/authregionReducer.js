import { STORE_DATAAPI } from '../../actions/masters/authregionAction';
import { SET_CURRENT_SELECTED_AUTHREGION } from '../../actions/masters/authregionAction';


const initialAuthRegionState = {
    lAuthRegion: [],
    oCurrentAuthRegion: {}
};

const AuthRegionReducer = (state = initialAuthRegionState, action) => {
    switch (action.type) {
        case STORE_DATAAPI:
            return { ...state, lAuthRegion: action.lAuthRegion };
        case SET_CURRENT_SELECTED_AUTHREGION:
            return { ...state, oCurrentAuthRegion: action.oCurrentAuthRegion };
        default:
            return state;
    }
}

export default AuthRegionReducer;