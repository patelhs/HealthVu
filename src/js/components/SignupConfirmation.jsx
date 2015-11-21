import React from 'react';
import ReactMixin from 'react-mixin';

export default class SignupConfirmation extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            name: props.fieldValues.name
        };
  }

   render() {
    return (
      <div>
        <h2>Account Details</h2>
        <ul className="form-fields">
          <li><b>Name:</b> {this.props.fieldValues.name}</li>
          <ul className="form-fields">
            <li className="form-footer">
              <button className="btn -default pull-left" onClick={this.props.previousStep.bind(this)}>Back</button>
              <button className="btn -primary pull-right" onClick={this.props.submitRegistration.bind(this)}>Submit Registration</button>
            </li>
          </ul>
        </ul>
      </div>
    )
  }
}
