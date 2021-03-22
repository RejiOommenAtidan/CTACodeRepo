export const STORE_SIGNIN_TYPE = 'STORE_SIGNIN_TYPE';

export const storeSignInType = (sType) => {
  return {type: STORE_SIGNIN_TYPE, sType: sType};
};

export const REMOVE_SIGNIN_TYPE = 'REMOVE_SIGNIN_TYPE';

export const removeSignInType = () => {
  return {type: REMOVE_SIGNIN_TYPE};
};
