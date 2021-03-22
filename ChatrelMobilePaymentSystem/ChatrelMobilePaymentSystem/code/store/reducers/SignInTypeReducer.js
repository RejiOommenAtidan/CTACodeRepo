import {STORE_SIGNIN_TYPE} from '../actions/SignInTypeAction';
import {REMOVE_SIGNIN_TYPE} from '../actions/SignInTypeAction';

const initialSessionState = {
  sType: null,
};

export const SignInTypeReducer = (state = initialSessionState, action) => {
  switch (action.type) {
    case STORE_SIGNIN_TYPE:
      return {...state, sType: action.sType};
    case REMOVE_SIGNIN_TYPE:
      return {...state, sType: null};
    default:
      return state;
  }
};
