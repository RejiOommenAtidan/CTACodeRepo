import { STORE_CURRENTGBDETAILS } from '../../actions/transactions/CurrentGBDetailsAction';
import { REMOVE_CURRENTGBDETAILS } from '../../actions/transactions/CurrentGBDetailsAction';

const initialCurrentGBDetailsState = {
    oCurrentGBDetails: null
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