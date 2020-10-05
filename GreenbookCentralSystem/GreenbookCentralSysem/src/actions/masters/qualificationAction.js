export const STORE_DATAAPI = 'STORE_DATAAPI';

export const storeDataAPI = (lQualification) => {
    return { type: STORE_DATAAPI, lQualification: lQualification };
};

export const SET_CURRENT_SELECTED_QUALIFICATION = 'SET_CURRENT_SELECTED_QUALIFICATION';

export const setCurrentSelectedQualification = (oCurrentQualification) => {
    return { type: SET_CURRENT_SELECTED_QUALIFICATION, oCurrentQualification: oCurrentQualification };
};