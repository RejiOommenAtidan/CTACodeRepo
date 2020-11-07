import { STORE_GBDETAILS } from '../../actions/transactions/GBDetailsAction';
import { REMOVE_GBDETAILS } from '../../actions/transactions/GBDetailsAction';

 

const initialGBDetailsState = {
    oGBDetails: null
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

 