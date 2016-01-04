import React from 'react';
import ReactMixin from 'react-mixin';
import LoginActionCreators from '../actions/LoginActionCreators';

import AccountFields from './AccountFields';
import PracticeFields from './PracticeFields';
import BillingFields  from './BillingFields';
import SignupConfirmation  from './SignupConfirmation';
//import Success  from './Success';
import  assign from 'object-assign';


var fieldValues = {
    fullName: 'null',
    email: null,
    password: null,
    confirmPassword: null,
    practiceName: null,
    practicePhone: null,
    practiceWebsite: null,
    practiceType: null,
    practiceLocation: null,
    practiceAddress: null,
    billingContact: null,
    billingAddress: null,
    billingPhonbe: null,
    cardNumber: null,
    securityCode: null,
    expirationDate: null
  };

export default class Signup extends React.Component {
  constructor() {
    super()
    this.state = {
      user: '',
      password: '',
      extra: '',
      step: 1
      //fieldValues: fieldValues

    };
    this.onChange = this.nextStep.bind(this);

  }

  /*

  signup(e) {
    e.preventDefault();
    LoginActionCreators.signup(this.state.user, this.state.password, this.state.extra)
  }
*/

  saveValues(field_value) {
    //alert("In save value");
    return function() {
      fieldValues = assign({}, fieldValues, field_value)
    }.bind(this)();
  }

  nextStep() {
    var state = {user: '', password: '', extra: '', step: this.state.step+1};
    this.setState(state);
  }

  previousStep() {
    var state = {user: '', password: '', extra: '', step: this.state.step-1};
    this.setState(state);
  }

  submitRegistration() {
    // Handle via ajax submitting the user data, upon
    // success return this.nextStop(). If it fails,
    // show the user the error but don't advance
    console.log("registering");
    //e.preventDefault();
    //console.log("name: " + fieldValues.name);
    LoginActionCreators.signup('hemal', 'hemal', this.state.extra);
  }

  showStep() {
    switch (this.state.step) {
      case 1:
        return <AccountFields fieldValues={fieldValues}
                              nextStep={this.nextStep.bind(this)}
                              saveValues={this.saveValues.bind(this)} />
      case 2:
         return <PracticeFields fieldValues={fieldValues}
                              nextStep={this.nextStep.bind(this)}
                              previousStep={this.previousStep.bind(this)}
                              saveValues={this.saveValues.bind(this)} />
      case 3:
       return <BillingFields fieldValues={fieldValues}
                             nextStep={this.nextStep.bind(this)}
                             previousStep={this.previousStep.bind(this)}
                             saveValues={this.saveValues.bind(this)} />
      case 4:
        return <SignupConfirmation fieldValues={fieldValues}
                                    previousStep={this.previousStep.bind(this)}
                                    submitRegistration={this.submitRegistration.bind(this)} />
      case 5:
        return <Success fieldValues={fieldValues} />
    }
  }

  render() {
     var style = {
      width : (this.state.step / 4 * 100) + '%'
    };

    return (
      <main>
        <span className="progress-step center-block">Step {this.state.step}</span>
        <progress className="progress  center-block" style={style}></progress>
        {this.showStep()}

      </main>

    );
  }
}

//ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
