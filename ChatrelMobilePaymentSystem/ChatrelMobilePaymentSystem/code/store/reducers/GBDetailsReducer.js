import {STORE_GBDETAILS} from '../actions/GBDetailsAction';
import {REMOVE_GBDETAILS} from '../actions/GBDetailsAction';
import {STORE_JWTTOKEN} from '../actions/GBDetailsAction';
import {REMOVE_JWTTOKEN} from '../actions/GBDetailsAction';
import {STORE_PAIDUNTIL} from '../actions/GBDetailsAction';
import {REMOVE_PAIDUNTIL} from '../actions/GBDetailsAction';

const initialGBDetailsState = {
  oGBDetails: null,
  sJwtToken: null,
  sPaidUntil: null,
};

export const GBDetailsReducer = (state = initialGBDetailsState, action) => {
  switch (action.type) {
    case STORE_GBDETAILS:
      return {...state, oGBDetails: action.oGBDetails};
    case REMOVE_GBDETAILS:
      return {...state, oGBDetails: null};
    case STORE_JWTTOKEN:
      return {...state, sJwtToken: action.sJwtToken};
    case REMOVE_JWTTOKEN:
      return {...state, sJwtToken: null};
    case STORE_PAIDUNTIL:
      return {...state, sPaidUntil: action.sPaidUntil};
    case REMOVE_PAIDUNTIL:
      return {...state, sPaidUntil: null};
    default:
      return state;
  }
};
