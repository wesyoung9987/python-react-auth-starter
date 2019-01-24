import {
  USER_FETCHED,
  USER_FETCH_ERROR,
  USER_PROFILE_PIC_SUCCESS,
  USER_PROFILE_PIC_ERROR,
  SET_USER_IMAGE_LOADER,
  PASSWORD_UPDATED_AUTHED,
  PASSWORD_UPDATED_FAILED,
  RESET_PASSWORD_MESSAGE_AUTHED
} from '../actions/types';

export default function(state = {}, action) {
  switch(action.type) {
    case USER_FETCHED:
      return { ...state, userData: action.payload, errorMessage: '' };
    case USER_FETCH_ERROR:
      return { ...state, errorMessage: action.payload };
    case USER_PROFILE_PIC_SUCCESS:
      return { ...state, profilePictureUrl: action.payload, uploadErrorMessage: '', userImageLoading: false };
    case USER_PROFILE_PIC_ERROR:
      return { ...state, uploadErrorMessage: action.payload, userImageLoading: false };
    case SET_USER_IMAGE_LOADER:
      return { ...state, userImageLoading: true };
    case PASSWORD_UPDATED_AUTHED:
      return { ...state, userImageLoading: false, passwordUpdateMessage: 'Password successfully updated' };
    case PASSWORD_UPDATED_FAILED:
      return { ...state, userImageLoading: false, passwordUpdateMessage: action.payload };
    case RESET_PASSWORD_MESSAGE_AUTHED:
      return { ...state, passwordUpdateMessage: '' };
    default:
      return state;
  }
}
