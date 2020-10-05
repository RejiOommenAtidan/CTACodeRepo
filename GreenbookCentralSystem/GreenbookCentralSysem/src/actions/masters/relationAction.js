export const STORE_DATAAPI = 'STORE_DATAAPI';

export const storeDataAPI = (lRelation) => {
    return { type: STORE_DATAAPI, lRelation: lRelation };
};

export const SET_CURRENT_SELECTED_RELATION = 'SET_CURRENT_SELECTED_RELATION';

export const setCurrentSelectedRelation = (oCurrentRelation) => {
    return { type: SET_CURRENT_SELECTED_RELATION, oCurrentRelation: oCurrentRelation };
};