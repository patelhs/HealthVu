
import React from 'react';
import LoginActionCreators from '../actions/LoginActionCreators';
import RouterActionCreators from '../actions/RouterActionCreators';
import LoginStore from '../stores/LoginStore';
import router from '../router';
import RouterStore from '../stores/RouterStore';

export default class GoogleLoginButton extends React.Component{

  constructor(){
    super();
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    };
  }

  _onLoginChange() {
    //get a local up-to-date record of the logged-in state
    //see https://facebook.github.io/react/docs/component-api.html
    let userLoggedInState = this._getLoginState();
    this.setState(userLoggedInState);

    //get any nextTransitionPath - NB it can only be got once then it self-nullifies
    let transitionPath = RouterStore.nextTransitionPath || '/';

    //trigger router change
    alert("IN google login");
    console.log("&*&*&* App onLoginChange event: loggedIn=", userLoggedInState.userLoggedIn,
      "nextTransitionPath=", transitionPath);

    if(userLoggedInState.userLoggedIn){
      router.transitionTo(transitionPath);
    }else{
      router.transitionTo('/login');
    }
  }

  onSignIn(googleUser) {
    console.log("user signed in"); // plus any other logic here
    let profile = googleUser.getBasicProfile();
    console.log(profile.getId());
    console.log(googleUser);
    //localStorage.setItem("jv_jwt", googleUser.po.id_token);
    //LoginStore.user

    LoginActionCreators.googleLogin(googleUser);
    //this._onLoginChange();
    //router.transitionTo("/");

  }

  renderGoogleLoginButton(){
    console.log('rendering google signin button');
    gapi.signin2.render('my-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 200,
      'height': 50,
      'longtitle': true,
      'theme': 'light',
      'onsuccess': this.onSignIn.bind(this)
    });
  }

  componentDidMount(){
    window.addEventListener('google-loaded',this.renderGoogleLoginButton.bind(this));
    //register change listener with LoginStore
    this.changeListener = this._onLoginChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
  }

  render(){
    let displayText = "Sign in with Google";
    return (
      <div id="my-signin2"></div>
    );
  }
}
