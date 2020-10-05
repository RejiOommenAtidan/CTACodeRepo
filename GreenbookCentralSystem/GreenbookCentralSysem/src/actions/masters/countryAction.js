export const STORE_DATAAPI = 'STORE_DATAAPI';

export const storeDataAPI = (lCountry) => {
    return { type: STORE_DATAAPI, lCountry: lCountry };
};

export const SET_CURRENT_SELECTED_COUNTRY = 'SET_CURRENT_SELECTED_COUNTRY';

export const setCurrentSelectedCountry = (oCurrentCountry) => {
    return { type: SET_CURRENT_SELECTED_COUNTRY, oCurrentCountry: oCurrentCountry };
};