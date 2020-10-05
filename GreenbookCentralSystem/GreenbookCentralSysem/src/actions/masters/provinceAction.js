export const STORE_DATAAPI = 'STORE_DATAAPI';

export const storeDataAPI = (lProvince) => {
    return { type: STORE_DATAAPI, lProvince: lProvince };
};

export const SET_CURRENT_SELECTED_PROVINCE = 'SET_CURRENT_SELECTED_PROVINCE';

export const setCurrentSelectedProvince = (oCurrentProvince) => {
    return { type: SET_CURRENT_SELECTED_PROVINCE, oCurrentProvince: oCurrentProvince };
};