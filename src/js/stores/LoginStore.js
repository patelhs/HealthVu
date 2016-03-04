import ActionTypes from '../constants/ActionTypes';
import BaseStore from './BaseStore';
import jwt_decode from 'jwt-decode';


class LoginStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this._registerToActions.bind(this));
    this._user = null;
    this._error = null;
    this._jwt = null;
    this._loggedInUser = null;
    this._practiceId = null;

    //attempt auto-login
    console.log('&*&*&*& attempting auto-login in LoginStore');
    this._autoLogin();
  }

  _registerToActions(action) {
    switch (action.type) {

      case ActionTypes.REQUEST_LOGIN_USER_SUCCESS:
        this._jwt = action.body.id_token;

        //console.log(action.body.id_token);
        localStorage.setItem("jv_jwt", this._jwt);
        this._user = jwt_decode(this._jwt);
        this._error = null;
        this.emitChange();
        break;

      case ActionTypes.REQUEST_LOGIN_USER_ERROR:
        this._error = action.error;
        this.emitChange();
        break;

      case ActionTypes.LOGOUT_USER:
        this._user = null;
        this._error = null;
        this._jwt = null;
        localStorage.setItem("jv_jwt", "");
        this.emitChange();
        break;

      case ActionTypes.REQUEST_SIGNIN_USER:
        break;
      case ActionTypes.REQUEST_SIGNIN_USER_SUCCESS:
        console.log("sign in success: " + action.body.firstName);
        this._loggedInUser = action.body;
        localStorage.setItem("loggedInUser", action.body);
        localStorage.setItem("practiceId", action.body.practiceId);
        this._practiceId = action.body.practiceId;

        this._jwt = action.googleUser.getAuthResponse().id_token;

        localStorage.setItem("jv_jwt", this._jwt);
        localStorage.setItem("token_expires_at", action.googleUser.getAuthResponse().expires_at);
        //localStorage.setItem("lastLoginTime",)
        this._user = jwt_decode(this._jwt);
        this._error = null;
        this.emitChange();

        break;
      case ActionTypes.REQUEST_SIGNIN_USER_ERROR:
        break;

      case ActionTypes.GOOGLE_LOGIN:
        this._jwt = action.googleUser.getAuthResponse().id_token;

        localStorage.setItem("jv_jwt", this._jwt);
        localStorage.setItem("token_expires_at", action.googleUser.getAuthResponse().expires_at);
        //localStorage.setItem("lastLoginTime",)
        this._user = jwt_decode(this._jwt);
        this._error = null;
        this.emitChange();
        break;
      //alert("goole login");
      //console.log("In store" + action.googleUser);
      default:
        break;
    }
    ;
  }

  _autoLogin() {
    let jwt = localStorage.getItem("jv_jwt");
    let loggedInUser = localStorage.getItem("loggedInUser");
    let token_expires_at = localStorage.getItem("token_expires_at");
    let practiceId = localStorage.getItem("practiceId");
    let d = Date.parse(Date());
    if ((d < token_expires_at) && jwt){
      this._jwt = jwt;
      //console.log(jwt);
      this._user = jwt_decode(this._jwt);
      this._loggedInUser = loggedInUser;
      this._practiceId = practiceId;
      console.log("&*&*&* autologin success")
    }
  }

  get user() {
    return this._user;
  }

  get error() {
    return this._error;
  }

  get jwt() {
    return this._jwt;
  }

  get loggedInUser(){
    console.log("getting logged in user: " + this._loggedInUser);
    return this._loggedInUser;
  }

  get practiceId(){
    return this._practiceId;
  }

  isLoggedIn() {
    return !!this._user;
  }
}
export default new LoginStore();
