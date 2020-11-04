import { STORE_CURRENTGBDETAILS } from '../actions/CurrentGBDetailsAction';
import { REMOVE_CURRENTGBDETAILS } from '../actions/CurrentGBDetailsAction';

const initialCurrentGBDetailsState = {
    oCurrentGBDetails: {
        sGBID:"7654321"
    }
};

export const CurrentGBDetailsReducer = (state = initialCurrentGBDetailsState, action) => {
    switch (action.type) {
        case STORE_CURRENTGBDETAILS:
            return { ...state, oCurrentGBDetails: action.oCurrentGBDetails };
        case REMOVE_CURRENTGBDETAILS:
            return { ...state, oCurrentGBDetails: null };
        default:
            return state;
    }
};