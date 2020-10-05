export const STORE_DATAAPI = 'STORE_DATAAPI';

export const storeDataAPI = (lRegion) => {
    return { type: STORE_DATAAPI, lRegion: lRegion };
};

export const SET_CURRENT_SELECTED_REGION = 'SET_CURRENT_SELECTED_REGION';

export const setCurrentSelectedRegion = (oCurrentRegion) => {
    return { type: SET_CURRENT_SELECTED_REGION, oCurrentRegion: oCurrentRegion };
};