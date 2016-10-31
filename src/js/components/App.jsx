import React from 'react';
import LoginStore from '../stores/LoginStore';
import RouterStore from '../stores/RouterStore';
import LoginActionCreators from '../actions/LoginActionCreators';
import { Route, RouteHandler, Link } from 'react-router';
import router from '../router';

export default class App extends React.Component {

  constructor() {
    super();

    //set initial state dircetly when extending React.Component
    //use getInitialState hook when using React.createClass();
    this.state = this._getLoginState();
  }

  _getLoginState() {
    return {
      userLoggedIn: LoginStore.isLoggedIn()
    };
  }

  componentDidMount() {
    //console.log("App did mount");
    //register change listener with LoginStore
    this.changeListener = this._onLoginChange.bind(this);
    LoginStore.addChangeListener(this.changeListener);
    $('#loading-indicator').hide();
  }

  /*
    This event handler deals with all code-initiated routing transitions
    when logging in or logging out
  */
  _onLoginChange() {
    //get a local up-to-date record of the logged-in state
    //see https://facebook.github.io/react/docs/component-api.html
    let userLoggedInState = this._getLoginState();
    this.setState(userLoggedInState);

    //get any nextTransitionPath - NB it can only be got once then it self-nullifies
    let transitionPath = RouterStore.nextTransitionPath || '/';

    //trigger router change
    //console.log("&*&*&* App onLoginChange event: loggedIn=", userLoggedInState.userLoggedIn,
    //  "nextTransitionPath=", transitionPath);

    if(userLoggedInState.userLoggedIn){
      router.transitionTo(transitionPath);
    }else{
      router.transitionTo('/login');
    }
  }

  componentWillUnmount() {
    LoginStore.removeChangeListener(this.changeListener);
  }

  render() {
   return (
      <div className="container">
        <nav className="naviBar">
          <div className="navbar-header">
            <a href="/"><img src ="styles/images/healthvue.png"></img></a>
            </div>
          {this.headerItems}
        </nav>
        <div className="titleBorder"><div className="titleBorderMask"></div></div>

        <RouteHandler/>
      </div>
    );
  }

  logout(e) {
    //alert("clicked");
    //If there is internet connection, do following

    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      //console.log('User signed out.');
    });


    //e.preventDefault();
    LoginActionCreators.logoutUser();
    //alert("done");
  }

  get headerItems() {
    if (!this.state.userLoggedIn) {
      return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="login">Login</Link>
        </li>
        {/*
        <li>
          <Link to="signup">Signup</Link>
        </li>
        */}
      </ul>)
    } else {
      return (
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Link to="/">{LoginStore.loggedOnUser ? LoginStore.loggedOnUser.emailAddress : ''}</Link>
        </li>
        <li>
          <a href="" onClick={this.logout.bind(this)}>Logout</a>
        </li>
      </ul>)
    }
  }
}
