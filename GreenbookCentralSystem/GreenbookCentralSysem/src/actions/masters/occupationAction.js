export const STORE_DATAAPI = 'STORE_DATAAPI';

export const storeDataAPI = (lOccupation) => {
    return { type: STORE_DATAAPI, lOccupation: lOccupation };
};

export const SET_CURRENT_SELECTED_OCCUPATION = 'SET_CURRENT_SELECTED_OCCUPATION';

export const setCurrentSelectedOccupation = (oCurrentOccupation) => {
    return { type: SET_CURRENT_SELECTED_OCCUPATION, oCurrentOccupation: oCurrentOccupation };
};