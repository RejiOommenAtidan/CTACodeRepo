export const STORE_DATAAPI = 'STORE_DATAAPI';

export const storeDataAPI = (lAuthRegion) => {
    return { type: STORE_DATAAPI, lAuthRegion: lAuthRegion };
};

export const SET_CURRENT_SELECTED_AUTHREGION = 'SET_CURRENT_SELECTED_AUTHREGION';

export const setCurrentSelectedAuthRegion = (oCurrentAuthRegion) => {
    return { type: SET_CURRENT_SELECTED_AUTHREGION, oCurrentAuthRegion: oCurrentAuthRegion };
};