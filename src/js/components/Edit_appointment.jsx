import React from 'react/addons';
import {Input, Button, ButtonInput} from 'react-bootstrap';
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
      errors: {},
      edit: false
    }
  }

  componentDidMount(){
    console.log("in componentDidMount_edit")
    this.changeListener = this._onChangeEdit.bind(this);
    AppointmentStore.addChangeListener(this.changeListener);
  }

  _onChangeEdit() {
    console.log("in _onChange_edit");
    console.log("after edit: " + this.state.edit);

    if (this.state.edit) {
      console.log("Result " + AppointmentStore.error);

      if (AppointmentStore.error == null) {
        BootstrapDialog.alert({
          message: 'Data Saved Successfully',
          title: 'Success',
          type: BootstrapDialog.TYPE_SUCCESS
        });
        $('#myModal').modal('hide');
        //AppointmentActionCreator.getHealthVuAppointments(AppointmentStore.practiceId, AppointmentStore.resultPage, AppointmentStore.maxResults);
      } else {
        BootstrapDialog.alert({
          message: 'There was an error saving data',
          title: 'Failed',
          type: BootstrapDialog.TYPE_WARNING
        });
      }
    }
    this.setState({
      edit: false
    });
  }

  _handleValidSubmit(values) {
    // Values is an object containing all values
    // from the inputs
    console.log(values);
    console.log("before save");
    this.setState({
      edit: true
    });
    AppointmentActionCreator.saveAppointment(values);
    AppointmentActionCreator.getHealthVuAppointments(AppointmentStore.practiceId, AppointmentStore.resultPage, AppointmentStore.maxResults);

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

    function specialValidation(e){
      //console.log("element " + e);

    }

    $(document).ready(function($){
      //$('#patientMobile').mask('99-99-999');
      // $('#patientMobile')
      //   .click(function(e){
      //     //alert("hello");
      //   })
      //
      // .keydown(function (e) {
      //   //alert("heloo");
      //   var key = e.charCode || e.keyCode || 0;
      //   //$patientMobile = $('#patientMobile');  //$(this);
      //
      //   // Auto-format- do not expose the mask as the user begins to type
      //   if (key !== 8 && key !== 9) {
      //     if ($('#patientMobile').val().length === 4) {
      //       $('#patientMobile').val($('#patientMobile').val() + ')');
      //     }
      //     if ($('#patientMobile').val().length === 5) {
      //       $('#patientMobile').val($('#patientMobile').val() + ' ');
      //     }
      //     if ($('#patientMobile').val().length === 9) {
      //       $('#patientMobile').val($('#patientMobile').val() + '-');
      //     }
      //   }
      //
      //   // Allow numeric (and tab, backspace, delete) keys only
      //   return (key == 8 ||
      //   key == 9 ||
      //   key == 46 ||
      //   (key >= 48 && key <= 57) ||
      //   (key >= 96 && key <= 105));
      // })
      //
      //   .bind('focus click', function () {
      //     //$('#patientMobile') = $(this);
      //
      //     if ($('#patientMobile').val().length === 0) {
      //       $('#patientMobile').val('(');
      //     }
      //     else {
      //       var val = $('#patientMobile').val();
      //       $('#patientMobile').val('').val(val); // Ensure cursor remains at the end
      //     }
      //   })
      //
      //   .blur(function () {
      //     //$('#patientMobile') = $(this);
      //
      //     if ($('#patientMobile').val() === '(') {
      //       $('#patientMobile').val('');
      //     }
      //   });
    });

    return (
      <div className="container" style={{width: "100%"}}>
        <Form id="appointmentForm"
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
                  onChange={specialValidation}
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
                <ValidatedInput
                  label='Current Status'
                  type='text'
                  name='notificationResponseStatus'
                  id='notificationResponseStatus'
                  readOnly='true'
                />

              </div>
            </div>
            <div className='col-md-3'>
              <div className="form-group">
                <ValidatedInput
                  type='text'
                  label='Patient Cellphone (xxx-xxx-xxxx)'
                  name='patientMobile'
                  id='patientMobile'
                  pattern="^(\d{3}-|\(\d{3}\)\s)\d{3}-\d{4}$"
                  maxlength="30"
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
                <ValidatedInput
                  label='Notification Type'
                  type='text'
                  name='notificationType'
                  id='notificationType'
                  readOnly='true'
                  />

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
