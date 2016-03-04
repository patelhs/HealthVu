import { dispatch, dispatchAsync } from '../dispatchers/AppDispatcher';
import ActionTypes from '../constants/ActionTypes';
import AuthService from '../services/AuthService';

export default {
  loginUser: (username, password) => {
    let promise = AuthService.login(username, password);
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_LOGIN_USER,
      success: ActionTypes.REQUEST_LOGIN_USER_SUCCESS,
      failure: ActionTypes.REQUEST_LOGIN_USER_ERROR
    }, { username, password });
  },

  signup: (username, password, extra) => {
    let promise = AuthService.signup(username, password, extra);
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_LOGIN_USER,
      success: ActionTypes.REQUEST_LOGIN_USER_SUCCESS,
      failure: ActionTypes.REQUEST_LOGIN_USER_ERROR
    }, { username, password, extra });
  },

  logoutUser: () => {
    dispatch(ActionTypes.LOGOUT_USER);
  },

  googleLogin: (googleUser) => {
    console.log("actionc: " + googleUser);
    //dispatch(ActionTypes.GOOGLE_LOGIN, {googleUser: googleUser});

    let promise = AuthService.signup(googleUser);
    dispatchAsync(promise, {
        request: ActionTypes.REQUEST_SIGNIN_USER,
        success: ActionTypes.REQUEST_SIGNIN_USER_SUCCESS,
        failure: ActionTypes.REQUEST_SIGNIN_USER_ERROR
      }, {googleUser});
  },

  signIn: (id_token) => {
    let promise = AuthService.signup(id_token);
    dispatchAsync(promise, {
      request: ActionTypes.REQUEST_SIGNIN_USER,
      success: ActionTypes.REQUEST_SIGNIN_USER_SUCCESS,
      failure: ActionTypes.REQUEST_SIGNIN_USER_ERROR
    }, {id_token});
  }
}
