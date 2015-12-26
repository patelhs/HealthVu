import React from 'react/addons';
import {Input, Button, ButtonInput} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn, TableDataSet} from 'react-bootstrap-table';
import AppointmentStore from '../stores/AppointmentStore';
import ReactMixin from 'react-mixin';
import dateFormat from 'dateformat';

import { Form, ValidatedInput } from 'react-bootstrap-validation';

// There's also a wrapper for radio inputs that react-bootstrap
// doesn't (yet) have
import { Radio, RadioGroup } from 'react-bootstrap-validation';


export default class EditAppointent extends React.Component {
  constructor(props) {
    super(props);
    console.log("ON Edit: " + props.appointment);

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

  }

  _handleInvalidSubmit(errors, values) {
    // Errors is an array containing input names
    // that failed to validate
  }

  _loadForm(){
    alert("loading");

  }


render(){
  return (
    <Form

      onload={this._loadForm.bind(this)}
      // Supply callbacks to both valid and invalid
      // submit attempts
      onValidSubmit={this._handleValidSubmit.bind(this)}
      onInvalidSubmit={this._handleInvalidSubmit.bind(this)}>

      <ValidatedInput
        type='text'
        label='Email'

        // Each input that you need validated should have
        // the "name" prop
        name='email'
        id='email'
        // Validation rules separated with comma
        validate='required,isEmail'
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
        validate='required,isLength:6:60'
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
        validate={(val, context) => val === context.password}
        // If errorHelp property is a string, then it is used
        // for all possible validation errors
        errorHelp='Passwords do not match'
      />

                {/* Custom component to supply a couple of bootstrap
                 wrappers around radio inputs to look pretty */}
     <ValidatedInput
       type="date"
       name="mylist"
       label="my list"
       validate = 'required'
       errorHelp='date is required'
       />

      <ValidatedInput type="select" label="Select" placeholder="select"
        name="myselect" validate="required"  errorHelp="select is required">
        <option value="select">Mr.</option>
        <option value="other">...</option>
      </ValidatedInput>

      <ValidatedInput
        type='checkbox'
        name='agree'
        label='I agree to the terms and conditions'
        // Validation rules is easily extendable to fit
        // your needs. There are only two custom rules,
        // 'isChecked' and 'required', others are stock
        // validator.js methods
        validate='isChecked'
      />

      <ButtonInput
        type='submit'
        bsSize='large'
        bsStyle='primary'
        value='Register'
      />
    </Form>
  );
}
}
