import React from 'react';
import ReactMixin from 'react-mixin';
import LoginActionCreators from '../actions/LoginActionCreators';

import AccountFields from './AccountFields';
//import PracticeFields from './PracticeFields';
//import BillingFields  from './BillingFields';
//import Confirmation  from './Confirmation';
//import Success  from './Success';
//var SurveyFields  = require('./SurveyFields')
import  assign from 'object-assign';


var fieldValues = {
    name: 'hemal',
    email: null,
    password: null,
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

 
 
  //this.state.step = 1;

  }

  signup(e) {
    e.preventDefault();
    LoginActionCreators.signup(this.state.user, this.state.password, this.state.extra)
  }


  saveValues(field_value) {
    alert("In save value");
    return function() {
      fieldValues = assign({}, fieldValues, field_value)
    }.bind(this)();
  }

  nextStep() {
    //this.setState({
    //  step : this.state.step + 1
    //})
    var state = {user: '', password: '', extra: '', step: this.state.step+1};
    this.setState(state);
    alert(this.state.step);
    //this.showStep();
  }

  previousStep() {
    //this.setState({
    //  step : this.state.step - 1
    //})
    this.state.step-=1;
  }

  submitRegistration() {
    // Handle via ajax submitting the user data, upon
    // success return this.nextStop(). If it fails,
    // show the user the error but don't advance

    this.nextStep();
  }

  showStep() {
    switch (this.state.step) {
      case 1:
        return <AccountFields fieldValues={fieldValues}
                              nextStep={this.nextStep.bind(this)}
                              previousStep={this.previousStep.bind(this)}
                              saveValues={this.saveValues.bind(this)} />
      case 2:
         return <AccountFields fieldValues={fieldValues}
                              nextStep={this.nextStep.bind(this)}
                              previousStep={this.previousStep.bind(this)}
                              saveValues={this.saveValues.bind(this)} />
      case 3:
       return <BillingFields fieldValues={fieldValues}
                             nextStep={this.nextStep}
                             previousStep={this.previousStep}
                             saveValues={this.saveValues} />
      case 4:
        return <Confirmation fieldValues={fieldValues}
                             previousStep={this.previousStep}
                             submitRegistration={this.submitRegistration} />
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
        <span className="progress-step">Step {this.state.step}</span>
        <progress className="progress" style={style}></progress>
        {this.showStep()}
      </main>
    );
  }
}

//ReactMixin(Signup.prototype, React.addons.LinkedStateMixin);
