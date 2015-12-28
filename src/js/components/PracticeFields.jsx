import React from 'react';
import ReactMixin from 'react-mixin';
import {Input, Button, ButtonInput} from 'react-bootstrap';
import { Route, RouteHandler, Link } from 'react-router';
import { Form, ValidatedInput } from 'react-bootstrap-validation';

export default class PracticeFields extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            name: props.fieldValues.name
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
      <Form

        onload={this._loadForm.bind(this)}
        // Supply callbacks to both valid and invalid
        // submit attempts
        onValidSubmit={this._handleValidSubmit.bind(this)}
        onInvalidSubmit={this._handleInvalidSubmit.bind(this)}>

        <h2>Practice Details</h2>

        <ValidatedInput
          type='text'
          name='practiceName'
          label='Practice Name'
          // You can pass params to validation rules
          validate='required,isLength:2:60'
          errorHelp={{
          required: 'Please enter the Practice Name',
          isLength: 'Name must be at least 2 characters long'
        }}
          />

        <ValidatedInput
          type='number'
          name='practicePhone'
          label='Practice Phone'
          //className='input -primary'
          //placeholder="testing"
          // Each input that you need validated should have
          // the "name" prop
          // Validation rules separated with comma
          validate='required,isNumeric,isLength:10:15' //will come back to this*
          // Error messages for each error type
          errorHelp={{
          required: 'Please enter the Practice Phone number',
          isNumeric: 'Number is invalid',
          isLength: 'Number is invalid'
        }}
          />

        <ValidatedInput
          type='text'
          name='practiceWebsite'
          label='Practice Website'
          // You can pass params to validation rules
          validate='required,isURL' // Need to come back to this**
          errorHelp={{
          required: 'Please enter Practice Website',
          isURL: 'Please enter a valid website'
        }}
          />

        <ValidatedInput
          type="select"
          name="practiceType"
          label="Practice Type"
          placeholder="select"
          validate="required"
          errorHelp="select is required">
          <option value="select">Medical</option>
          <option value="other">...</option>
        </ValidatedInput>

        <h2>Practice Location</h2>

        <ValidatedInput
          type='text'
          name='practiceAddress'
          label='Practice Address'
          validate='required,isLength:2:100'
          errorHelp={{
            required: 'Please enter Practice Address',
            isLength: 'Please enter a valid address'
          }}
          />

        <ButtonInput
          type='submit'
          bsSize='large'
          bsStyle='primary'
          value='Register'
          />

      </Form>
    )
  }
}
