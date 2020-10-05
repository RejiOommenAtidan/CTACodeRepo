export const STORE_DATAAPI = 'STORE_DATAAPI';

export const storeDataAPI = (lTypeIssued) => {
    return { type: STORE_DATAAPI, lTypeIssued: lTypeIssued };
};

export const SET_CURRENT_SELECTED_TYPEISSUED = 'SET_CURRENT_SELECTED_TYPEISSUED';

export const setCurrentSelectedTypeIssued = (oCurrentTypeIssued) => {
    return { type: SET_CURRENT_SELECTED_TYPEISSUED, oCurrentTypeIssued: oCurrentTypeIssued };
};