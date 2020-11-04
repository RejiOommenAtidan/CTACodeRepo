export const STORE_GOOGLECREDS = 'STORE_GOOGLECREDS';

export const storeGoogleCreds = (oGoogle) => {
    return { type: STORE_GOOGLECREDS, oGoogle: oGoogle };
};