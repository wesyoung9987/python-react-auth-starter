import axios from 'axios';



import * as _ from 'lodash';

import {
  AUTHENTICATED,
  UNAUTHENTICATED,
  AUTHENTICATION_ERROR,
  REQUEST_RESET_PASSWORD_MESSAGE,
  CONFIRM_RESET_PASSWORD_MESSAGE,
  SIGNUP_ERROR
} from './types';

export function signupAction({ username, email, password }, history) {
  return async function(dispatch) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/auth/register`, { username, email, password });
      dispatch({ type: AUTHENTICATED });
      localStorage.setItem('user', response.data.token);
      let userData = JSON.stringify(response.data.userData);
      localStorage.setItem('userData', userData);
      window.location.href = '/main';
    } catch (err) {
      dispatch({
        type: SIGNUP_ERROR,
        payload: 'Invalid data. A user with this email address may already exist. Please try again.'
      });
    }

  }
}

export function signInAction({ email, password }, history) {
  return function(dispatch) {
      axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/auth/login`, { email, password })
        .then(response => {
          let removed = _.get(response, 'data.userData.removed', false);
          if (removed) {
            dispatch({
              type: AUTHENTICATION_ERROR,
              payload: 'Your account has been removed by your team administrator.'
            });
            return;
          }
          dispatch({ type: AUTHENTICATED });
          localStorage.setItem('user', response.data.token);
          let userData = JSON.stringify(response.data.userData);
          localStorage.setItem('userData', userData);
          window.location.href = '/main';
        })
        .catch(response => {
          // console.log('response2', response);
          dispatch({
            type: AUTHENTICATION_ERROR,
            payload: 'Invalid email or password'
          });
        });
    }
}

// TODO: Figure out how signup will be implemented. For example if payment is required on sign up

export function signOutAction() {
  localStorage.clear();
  return {
    type: UNAUTHENTICATED
  };
}

export function resetPasswordAction({ email }, history) {
  return async function(dispatch) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/request-password-reset`, { email });
      dispatch({
        type: REQUEST_RESET_PASSWORD_MESSAGE,
        payload: 'An email containing a link to reset your password has been sent.'
      });
    } catch (err) {
      dispatch({
        type: REQUEST_RESET_PASSWORD_MESSAGE,
        payload: 'A user with the provided email was not found.'
      });
    }
  }
}

export function confirmResetPasswordAction({ email, password, resetCode }, history) {
  return async function(dispatch) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_USERS_SERVICE_URL}/reset-password`, { email, password, resetCode });
      dispatch({
        type: CONFIRM_RESET_PASSWORD_MESSAGE,
        payload: 'Password reset success.'
      });
      window.location.href = '/main';
    } catch (err) {
      dispatch({
        type: CONFIRM_RESET_PASSWORD_MESSAGE,
        payload: 'Incorrect email or reset code provided.'
      });
    }
  }
}
