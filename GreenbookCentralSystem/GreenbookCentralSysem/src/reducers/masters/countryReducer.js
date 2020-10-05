import { STORE_DATAAPI } from '../../actions/masters/countryAction';
import { SET_CURRENT_SELECTED_COUNTRY } from '../../actions/masters/countryAction';


const initialCountryState = {
    lCountry: [],
    oCurrentCountry: {}
};

const CountryReducer = (state = initialCountryState, action) => {
    switch (action.type) {
        case STORE_DATAAPI:
            return { ...state, lCountry: action.lCountry };
        case SET_CURRENT_SELECTED_COUNTRY:
            return { ...state, oCurrentCountry: action.oCurrentCountry };
        default:
            return state;
    }
}

export default CountryReducer;