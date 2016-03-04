import React from 'react/addons';
import {Input, Button, ButtonInput} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn, TableDataSet} from 'react-bootstrap-table';
import AppointmentStore from '../stores/AppointmentStore';
import ReactMixin from 'react-mixin';
import dateFormat from 'dateformat';
import { Form, ValidatedInput } from 'react-bootstrap-validation';
import { Radio, RadioGroup } from 'react-bootstrap-validation';

import AppointmentActionCreator from '../actions/AppointmentActionCreators';

export default class EditAppointent extends React.Component {
  constructor(props) {
    super(props);
    console.log("ON Edit: " + props.appointment);
    this.state = {
      disabled: true,
      style: null,
      value: "",
      loading: false,
      errors: {}
    }
  }

  _handleValidSubmit(values) {
    // Values is an object containing all values
    // from the inputs
    console.log(values);
    console.log("before save");
    AppointmentActionCreator.saveAppointment(values);
    console.log("Result " + AppointmentStore.error);
    if (AppointmentStore.error == null){
      $('#myModal').modal('hide');
      AppointmentActionCreator.getHealthVuAppointments(AppointmentStore.practiceId, AppointmentStore.resultPage, AppointmentStore.maxResults);
    }
    console.log("after save");
  }

  _handleInvalidSubmit(errors, values) {
    // Errors is an array containing input names
    // that failed to validate
    console.log(errors);
  }

  _loadForm() {
    alert("loading");

  }


  render() {
    return (
      <div className="container">
        <Form
          onload={this._loadForm.bind(this)}
          // Supply callbacks to both valid and invalid
          // submit attempts
          onValidSubmit={this._handleValidSubmit.bind(this)}
          onInvalidSubmit={this._handleInvalidSubmit.bind(this)}>

          <div className="row">
            <div className='col-md-3'>
              <div className="form-group">
                <ValidatedInput
                  type="datetime-local"
                  name="appointmentDateTime"
                  id='appointmentDateTime'
                  label="Appointment Date-Time"
                  validate = 'required'
                  errorHelp='date is required'
                />
              </div>
              <div className="form-group">
                <ValidatedInput type="select" label="Provider Prefix" placeholder="Provider Prefix"
                  name="providerPrefix"
                  id='providerPrefix'
                  validate="required"
                  errorHelp="Provider Prefix is required">
                  <option value="Dr.">Dr.</option>
                </ValidatedInput>
              </div>
              <div className="form-group">
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
              </div>
              <div className="form-group">
                <ValidatedInput
                  type='text'
                  label='Provider Middle Name'
                  name='providerMiddle'
                  validate='required'
                  id='providerMiddle'
                />
              </div>
              <div className="form-group">
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
              </div>
            </div>
            <div className='col-md-3'>
              <div className="form-group">
                <ValidatedInput type="select" label="Provider Suffix" placeholder="Provider Suffix"
                  name="providerSuffix"
                  id='providerSuffix'
                >
                  <option value="Sr.">Sr.</option>
                  <option value="Jr.">Jr.</option>
                </ValidatedInput>
              </div>
              <div className="form-group">
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
              </div>
              <div className="form-group">
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
              </div>
              <div className="form-group">
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
              </div>
              <div className="form-group">
                <ValidatedInput type="select" label="Current Status"
                  name="notificationResponseStatus"
                  id='notificationResponseStatus'
                  validate="required"
                  errorHelp="Status Required">
                  <option value="NEW">NEW</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </ValidatedInput>
              </div>
            </div>
            <div className='col-md-3'>
              <div className="form-group">
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
              </div>
              <div className="form-group">
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
              </div>
              <div className="form-group">
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
              </div>
              <div className="form-group">
                <ValidatedInput
                  type='hidden'
                  name='appointmentId'
                  id='appointmentId'
                  validate='required'
                />
              </div>
              <div className="form-group">
                <ValidatedInput type="select" label="Is Active?"
                  name="isActive" id='isActive'>
                  <option value="true">YES</option>
                  <option value="false">NO</option>
                </ValidatedInput>
              </div>
              <div className="form-group">
                <ValidatedInput type="select" label="Notification Type"
                  name="notificationType"
                  id='notificationType'
                  validate="required"
                  errorHelp="Status Required">
                  <option value="NEW">NEW</option>
                  <option value="CONFIRMATION">CONFIRMATION</option>
                  <option value="REMINDER">REMINDER</option>
                </ValidatedInput>
              </div>
            </div>
          </div>
          <div className="row">
            <div className='col-md-3'>
            </div>
              <div className='col-md-3'>
                <ButtonInput
                  type='submit'
                  bsSize='large'
                  bsStyle='primary'
                  value='Save'
                />
              </div>
            <div className='col-md-3'>
            </div>
          </div>
        </Form>
        </div >
    );}
}
