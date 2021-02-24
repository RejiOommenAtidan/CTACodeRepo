export const STORE_SESSION = 'STORE_SESSION';

export const storeSession = (oSession) => {
  return {type: STORE_SESSION, oSession: oSession};
};

export const REMOVE_SESSION = 'REMOVE_SESSION';

export const removeSession = () => {
  return {type: REMOVE_SESSION};
};
