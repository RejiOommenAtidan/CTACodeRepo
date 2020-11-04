import { STORE_GBDETAILS } from '../actions/GBDetailsAction';

const initialGBDetailsState = {
    oGBDetails: null
};

export const GBDetailsReducer = (state = initialGBDetailsState, action) => {
    switch (action.type) {
        case STORE_GBDETAILS:
            return { ...state, oGBDetails: action.oGBDetails };
        default:
            return state;
    }
};