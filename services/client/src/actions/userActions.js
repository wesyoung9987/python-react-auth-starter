import axios from 'axios';



import {
  USER_FETCHED,
  USER_FETCH_ERROR,
  USER_PROFILE_PIC_SUCCESS,
  USER_PROFILE_PIC_ERROR,
  SET_USER_IMAGE_LOADER,
  PASSWORD_UPDATED_AUTHED,
  PASSWORD_UPDATED_FAILED,
  RESET_PASSWORD_MESSAGE_AUTHED
} from './types';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

export function getUserData(history) {
  return async function(dispatch) {
    let userData = localStorage.getItem('userData');
    let parsedData = JSON.parse(userData);
    if (!parsedData) {
      history.push('/signout');
      return {};
    }

    try {
      let response = await axios.get(`${process.env.REACT_APP_USERS_SERVICE_URL}/user`, {headers: { authorization: localStorage.getItem('user')}});
      if (response.data && response.data.user) {
        dispatch({
          type: USER_FETCHED,
          payload: response.data.user
        });
        return;
      }
      dispatch({
        type: USER_FETCH_ERROR,
        payload: response.data
      });
    } catch (err) {
      if (err.message === 'Request failed with status code 401') {
        history.push('/signout');
        return {};
      }
      dispatch({
        type: USER_FETCH_ERROR,
        payload: 'Error getting user data'
      });
    }
  }
}

export const setUserImageLoader = isLoading => ({
  type: SET_USER_IMAGE_LOADER,
  payload: isLoading
});

export function uploadUserPicture(file, history) {
  return async function(dispatch) {
    let userData = localStorage.getItem('userData');
    let parsedData = JSON.parse(userData);
    if (!parsedData) {
      history.push('/signout');
      return {};
    }
    const base64 = await getBase64(file);
    const data = {
      file: base64
    };
    try {
      let response = await axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/upload-user-picture`, data, {headers: { authorization: localStorage.getItem('user') }});
      if (response.data && response.data.profilePictureUrl) {
        dispatch({
          type: USER_PROFILE_PIC_SUCCESS,
          payload: response.data.profilePictureUrl
        });
        return;
      }
      dispatch({
        type: USER_PROFILE_PIC_ERROR,
        payload: 'An error occured uploading your file. Please try again.'
      });
    } catch (err) {
      if (err.message === 'Request failed with status code 401') {
        history.push('/signout');
        return {};
      }
      dispatch({
        type: USER_PROFILE_PIC_ERROR,
        payload: 'An error occured uploading your file. Please try again.'
      });
    }
  }
}

export const resetPasswordMessageAuthed = () => ({
  type: RESET_PASSWORD_MESSAGE_AUTHED
});

export function updateUserPasswordAuthed(newPassword, history) {
  return async function(dispatch) {
    let userData = localStorage.getItem('userData');
    let parsedData = JSON.parse(userData);
    if (!parsedData) {
      history.push('/signout');
      return {};
    }
    try {
      let response = await axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/reset-password-authed`, { newPassword }, { headers: { authorization: localStorage.getItem('user') }});
      if (response.data && response.data.message === 'Success') {
        dispatch({
          type: PASSWORD_UPDATED_AUTHED
        });
        return;
      }
      dispatch({
        type: PASSWORD_UPDATED_FAILED,
        payload: 'An error occured updating your password. Please try again.'
      });
    } catch (err) {
      if (err.message === 'Request failed with status code 401') {
        history.push('/signout');
        return {};
      }
      dispatch({
        type: PASSWORD_UPDATED_FAILED,
        payload: 'An error occured updating your password. Please try again.'
      });
    }
  }
}
