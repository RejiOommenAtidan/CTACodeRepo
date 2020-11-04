export const STORE_GBDETAILS = 'STORE_GBDETAILS';

export const storeGBDetails = (oGBDetails) => {
    return { type: STORE_GBDETAILS, oGBDetails: oGBDetails };
};

export const REMOVE_GBDETAILS = 'REMOVE_GBDETAILS';

export const removeGBDetails = () => {
    return { type: REMOVE_GBDETAILS };
};