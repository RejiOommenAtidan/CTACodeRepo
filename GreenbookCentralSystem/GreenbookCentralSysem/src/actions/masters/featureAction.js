export const STORE_DATAAPI = 'STORE_DATAAPI';

export const storeDataAPI = (lFeature) => {
    return { type: STORE_DATAAPI, lFeature: lFeature };
};

export const SET_CURRENT_SELECTED_FEATURE = 'SET_CURRENT_SELECTED_FEATURE';

export const setCurrentSelectedFeature = (oCurrentFeature) => {
    return { type: SET_CURRENT_SELECTED_FEATURE, oCurrentFeature: oCurrentFeature };
};