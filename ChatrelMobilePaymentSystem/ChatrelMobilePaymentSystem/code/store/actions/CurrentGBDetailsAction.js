export const STORE_CURRENTGBDETAILS = 'STORE_CURRENTGBDETAILS';

export const storeCurrentGBDetails = (oCurrentGBDetails) => {
  return {type: STORE_CURRENTGBDETAILS, oCurrentGBDetails: oCurrentGBDetails};
};

export const REMOVE_CURRENTGBDETAILS = 'REMOVE_CURRENTGBDETAILS';

export const removeCurrentGBDetails = () => {
  return {type: REMOVE_CURRENTGBDETAILS};
};
