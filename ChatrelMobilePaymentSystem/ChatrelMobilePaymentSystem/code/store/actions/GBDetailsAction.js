export const STORE_GBDETAILS = 'STORE_GBDETAILS';

export const storeGBDetails = (oGBDetails) => {
  return {type: STORE_GBDETAILS, oGBDetails: oGBDetails};
};

export const REMOVE_GBDETAILS = 'REMOVE_GBDETAILS';

export const removeGBDetails = () => {
  return {type: REMOVE_GBDETAILS};
};

export const STORE_JWTTOKEN = 'STORE_JWTTOKEN';

export const storeJWTToken = (sJwtToken) => {
  return {type: STORE_JWTTOKEN, sJwtToken: sJwtToken};
};

export const REMOVE_JWTTOKEN = 'REMOVE_JWTTOKEN';

export const removeJWTToken = () => {
  return {type: REMOVE_JWTTOKEN};
};

export const STORE_PAIDUNTIL = 'STORE_PAIDUNTIL';

export const storePaidUntil = (sPaidUntil) => {
  return {type: STORE_PAIDUNTIL, sPaidUntil: sPaidUntil};
};

export const REMOVE_PAIDUNTIL = 'REMOVE_PAIDUNTIL';

export const removePaidUntil = () => {
  return {type: REMOVE_PAIDUNTIL};
};
