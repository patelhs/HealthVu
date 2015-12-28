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
    console.log(values);
  }

  _handleInvalidSubmit(errors, values) {
    // Errors is an array containing input names
    // that failed to validate
    console.log(errors);
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
        type="datetime-local"
        name="appointmentDateTime"
        id='appointmentDateTime'
        label="Appointment Date-Time"
        validate = 'required'
        errorHelp='date is required'
      />

      <ValidatedInput type="select" label="Provider Prefix" placeholder="Provider Prefix"
        name="providerPrefix"
        id='providerPrefix'
        validate="required"
        errorHelp="Provider Prefix is required">
        <option value="Dr.">Dr.</option>
      </ValidatedInput>

      <ValidatedInput
        type='text'
        label='Provider Firstname'

        // Each input that you need validated should have
        // the "name" prop
        name='providerFirst'
        id='providerFirst'
        // Validation rules separated with comma
        validate='required'
        // Error messages for each error type
        errorHelp={{
          required: 'Please enter valid Provider first name'
        }}
      />

      <ValidatedInput
        type='text'
        label='Provider Middle Name'
        name='providerMiddle'
        id='providerMiddle'
      />

      <ValidatedInput
        type='text'
        label='Provider Lastname'

        // Each input that you need validated should have
        // the "name" prop
        name='providerLast'
        id='providerLast'
        // Validation rules separated with comma
        validate='required'
        // Error messages for each error type
        errorHelp={{
          required: 'Please enter valid Provider last name'
        }}
      />

      <ValidatedInput type="select" label="Provider Suffix" placeholder="Provider Suffix"
        name="providerSuffix"
        id='providerSuffix'
      >
        <option value="Sr.">Sr.</option>
        <option value="Jr.">Jr.</option>
      </ValidatedInput>

      <ValidatedInput
        type='text'
        label='Appointment Location'

        // Each input that you need validated should have
        // the "name" prop
        name='appointmentLocationName'
        id='appointmentLocationName'
        // Validation rules separated with comma
        validate='required'
        // Error messages for each error type
        errorHelp={{
          required: 'Please enter valid Appointment Location name'
        }}
      />

      <ValidatedInput type="select" label="Message Delivery Preference"
        name="messageDeliveryPreference"
        id='messageDeliveryPreference'
        validate="required"
        errorHelp="Message Delivery preference is required">
        <option value="ALL">ALL</option>
        <option value="SMS">SMS</option>
        <option value="EMAIL">EMAIL</option>
        <option value="PHONE">PHONE</option>
      </ValidatedInput>

      <ValidatedInput
        type='text'
        label='Patient Email'
        name='patientEmail'
        id='patientEmail'
        // Validation rules separated with comma
        validate='required,isEmail'
        // Error messages for each error type
        errorHelp={{
          required: 'Please enter patient email',
          isEmail: 'Email is invalid'
        }}
      />
      <ValidatedInput
        type='text'
        label='Patient Cellphone'
        name='patientMobile'
        id='patientMobile'
        // Validation rules separated with comma
        validate='required'
        // Error messages for each error type
        errorHelp={{
          required: 'Please enter valid cell phone number'
        }}
      />

      <ValidatedInput
        type='text'
        label='Patient Firstname'

        // Each input that you need validated should have
        // the "name" prop
        name='patientFirst'
        id='patientFirst'
        // Validation rules separated with comma
        validate='required'
        // Error messages for each error type
        errorHelp={{
          required: 'Please enter valid Patient first name'
        }}
      />

      <ValidatedInput
        type='text'
        label='Patient Lastname'

        // Each input that you need validated should have
        // the "name" prop
        name='patientLast'
        id='patientLast'
        // Validation rules separated with comma
        validate='required'
        // Error messages for each error type
        errorHelp={{
          required: 'Please enter valid Patient last name'
        }}
      />

      <ValidatedInput
        type='hidden'
        name='appointmentId'
        id='appointmentId'
        validate='required'
      />

      <ValidatedInput type="select" label="Current Status"
        name="isActive" id='isActive'>
        <option value="true">Active</option>
        <option value="false">Cancelled or Completed</option>
      </ValidatedInput>

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
