import React from 'react/addons';
import { Input, Button }     from 'react-bootstrap';
import ReactMixin from 'react-mixin';
import LoginActionCreators from '../actions/LoginActionCreators';

import GoogleLoginButton from './GoogleLoginButton'

export default class Login extends React.Component {

  constructor() {
    super()
    this.state = {
      user: '',
      password: ''
    };
  }

  //action
  login(e) {
    e.preventDefault();
    LoginActionCreators.loginUser(this.state.user, this.state.password);
  }



  render() {
    return (
      <div className="login">
         <GoogleLoginButton />
    </div>
    );
  }
}

ReactMixin(Login.prototype, React.addons.LinkedStateMixin);
