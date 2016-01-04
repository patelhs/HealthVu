import React from 'react';
import ReactMixin from 'react-mixin';
import {Input, Button, ButtonInput} from 'react-bootstrap';
import { Route, RouteHandler, Link } from 'react-router';
import { Form, ValidatedInput } from 'react-bootstrap-validation';

export default class AccountFields extends React.Component {
  constructor(props) {
        super(props);

    this.state = {
      disabled: true,
      style: null,
      value: "",
      username: "",
      email: "",
      password: "",
      loading: false,
      errors: {}
    }
  }


  _handleValidSubmit(values) {
    // Values is an object containing all values
    // from the inputs

    this.props.saveValues(values);
    this.props.nextStep();
  }

  _handleInvalidSubmit(errors, values) {
    // Errors is an array containing input names
    // that failed to validate
    console.log("testing2");

  }

  _loadForm(){
    alert("loading");
  }

   render() {
    return (
      <Form

        onload={this._loadForm.bind(this)}
        // Supply callbacks to both valid and invalid
        // submit attempts
        onValidSubmit={this._handleValidSubmit.bind(this)}
        onInvalidSubmit={this._handleInvalidSubmit.bind(this)}>

        <ValidatedInput
          type='text'
          name='name'
          label='Full Name'
          // You can pass params to validation rules
          //validate='required,isLength:3:60'
          errorHelp={{
          required: 'Please enter your full name',
          isLength: 'Name must be at least 3 characters long'
        }}
          />

        <ValidatedInput
          type='text'
          name='email'
          label='Email'
          //className='input -primary'
          //placeholder="testing"
          // Each input that you need validated should have
          // the "name" prop
          // Validation rules separated with comma
          //validate='required,isEmail'
          // Error messages for each error type
          errorHelp={{
          required: 'Please enter your email',
          isEmail: 'Email is invalid'
        }}
          />

        <ValidatedInput
          type='password'
          name='password'
          label='Password'
          // You can pass params to validation rules
          //validate='required,isLength:6:60'
          errorHelp={{
          required: 'Please specify a password',
          isLength: 'Password must be at least 6 characters'
        }}
          />

        <ValidatedInput
          type='password'
          name='password-confirm'
          label='Confirm Password'
          // Validate can be a function as well
          //validate={(val, context) => val === context.password}
          // If errorHelp property is a string, then it is used
          // for all possible validation errors
          errorHelp='Passwords do not match'
          />

        <ButtonInput
          type='submit'
          bsSize='large'
          bsStyle='primary'
          value='Continue'
          />

      </Form>
    )
  }
}
