import { STORE_GBDETAILS } from '../actions/GBDetailsAction';
import { REMOVE_GBDETAILS } from '../actions/GBDetailsAction';

const initialGBDetailsState = {
    oGBDetails: {
        sGBID: "1234567"
    }
};

export const GBDetailsReducer = (state = initialGBDetailsState, action) => {
    switch (action.type) {
        case STORE_GBDETAILS:
            return { ...state, oGBDetails: action.oGBDetails };
        case REMOVE_GBDETAILS:
            return { ...state, oGBDetails: null };
        default:
            return state;
    }
};