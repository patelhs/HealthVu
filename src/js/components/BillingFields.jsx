import React from 'react';
import ReactMixin from 'react-mixin';
import {Input, Button, ButtonInput} from 'react-bootstrap';
import { Route, RouteHandler, Link } from 'react-router';
import { Form, ValidatedInput } from 'react-bootstrap-validation';

export default class BillingFields extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            name: props.fieldValues.name,
        };
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

      <div className="container center">

      <Form

        onload={this._loadForm.bind(this)}
        // Supply callbacks to both valid and invalid
        // submit attempts
        onValidSubmit={this._handleValidSubmit.bind(this)}
        onInvalidSubmit={this._handleInvalidSubmit.bind(this)}>

        <div className="row">
          <div className="col-md-5">
        <ValidatedInput
          type='text'
          name='billingContact'
          label='Billing Contact'
          // You can pass params to validation rules
          validate='required,isLength:3:60'
          errorHelp={{
          required: 'Please enter the billing contact name',
          isLength: 'Please enter a valid name'
        }}
          />

        <ValidatedInput
          type='text'
          name='billingAddress'
          label='Practice Billing Address'
          validate='required,isLength:6:100'
          // Error messages for each error type
          errorHelp={{
          required: 'Please enter the billing address',
          isLength: 'Address is not valid'
        }}
          />

        <ValidatedInput
          type='text'
          name='billingPhone'
          label='Practice Billing Phone'
          // You can pass params to validation rules
          validate='required,isLength:10:15'
          errorHelp={{
          required: 'Please enter the billing phone number',
          isLength: 'Phone number is not valid'
        }}
          />
      </div>
          <div className="col-xs-1">
            </div>
          <div className="col-md-5">

        <ValidatedInput
          type='number'
          name='cardNumber'
          label='Card Number'
          // You can pass params to validation rules
          validate='required,isLength:16:16'
          errorHelp={{
          required: 'Please enter the credit card number',
          isLength: 'Card number is not valid'
        }}
          />

        <ValidatedInput
          type='number'
          name='securityCode'
          label='Security Code'
          // You can pass params to validation rules
          validate='required,isLength:3:5,isNumeric'
          errorHelp={{
          required: 'Please enter the Security Code',
          isLength: 'Security code is not valid',
          isNumeric: 'Security code is not valid'
        }}
          />

        <ValidatedInput
          type="date"
          name="expirationDate"
          label="Expiration Date"
          validate = 'required'
          errorHelp='date is required'
          />


            </div>

        </div>

        <div className="row">
        <div className="center">
          <div className="center -button">
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

            <ButtonInput
              type='button'
              bsSize='large'
              bsStyle='secondary'
              value='Back'
              onClick={this.props.previousStep.bind(this)}
              />
            </div>
          </div>
          </div>


      </Form>

        </div>
    )
  }
}
