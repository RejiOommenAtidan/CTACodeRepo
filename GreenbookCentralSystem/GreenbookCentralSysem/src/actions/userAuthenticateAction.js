export const STORE_AUTH_DETAILS = 'STORE_AUTH_DETAILS';

export const storeAuthDetails = (oUserAuth) => {
    return { type: STORE_AUTH_DETAILS, oUserAuth: oUserAuth };
};

export const REMOVE_AUTH_DETAILS = 'REMOVE_AUTH_DETAILS';

export const removeAuthDetails = () => {
    return { type: REMOVE_AUTH_DETAILS};
};