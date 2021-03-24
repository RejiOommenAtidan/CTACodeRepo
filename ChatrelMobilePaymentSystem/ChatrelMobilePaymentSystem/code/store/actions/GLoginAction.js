export const STORE_GOOGLECREDS = 'STORE_GOOGLECREDS';

export const storeGoogleCreds = (oGoogle) => {
  return {type: STORE_GOOGLECREDS, oGoogle: oGoogle};
};

export const REMOVE_GOOGLECREDS = 'REMOVE_GOOGLECREDS';

export const removeGoogleCreds = () => {
  return {type: REMOVE_GOOGLECREDS};
};
