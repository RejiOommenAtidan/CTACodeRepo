export const STORE_DATAAPI = 'STORE_DATAAPI';

export const storeDataAPI = (lFeature) => {
    return { type: STORE_DATAAPI, lFeature: lFeature };
};