import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  REQUEST_RESET_PASSWORD_MESSAGE,
  CONFIRM_RESET_PASSWORD_MESSAGE,
  SIGNUP_ERROR
} from '../actions/types';

export default function(state={}, action) {
  switch(action.type) {
    case AUTHENTICATED:
      return { ...state, authenticated: true };
    case UNAUTHENTICATED:
      return { ...state, authenticated: false };
    case AUTHENTICATION_ERROR:
      return { ...state, error: action.payload };
    case REQUEST_RESET_PASSWORD_MESSAGE:
      return { ...state, requestResetPasswordMessage: action.payload };
    case CONFIRM_RESET_PASSWORD_MESSAGE:
      return { ...state, confirmResetPasswordMessage: action.payload };
    case SIGNUP_ERROR:
    return { ...state, signupError: action.payload };
    default:
      return state;
  }
}
