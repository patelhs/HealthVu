import React from 'react';
import ReactMixin from 'react-mixin';
import { Route, RouteHandler, Link } from 'react-router';

export default class AccountFields extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            name: props.fieldValues.name
        };
  }

  nextStep(e) {
    e.preventDefault();
    console.log(this);

    //alert(this.props.fieldValues.name);
    // Get values via this.refs

    var data = {
      name     : this.refs.name.getDOMNode().value,
      password : this.refs.password.getDOMNode().value,
      email    : this.refs.email.getDOMNode().value
    };

    this.props.saveValues(data);
    this.props.nextStep();
  }

   render() {
    return (
      <div>
        <ul className="form-fields center_div">
          <li>
            <label>Full Name</label>
            <input className="input -primary" type="text" ref="name" defaultValue={this.props.fieldValues.name} />
          </li>
          <li>
            <label>Email Address</label>
            <input className="input -primary" type="email" ref="email" defaultValue={this.props.fieldValues.email} />
          </li>
          <li>
            <label>Password</label>
            <input className="input -primary" type="password" ref="password" defaultValue={this.props.fieldValues.password} />
          </li>
          <li>
            <label>Confirm Password</label>
            <input className="input -primary" type="password" ref="password" defaultValue={this.props.fieldValues.password} />
          </li>
          <li>
            <button className="btn -continueBtn center-block" onClick={this.nextStep.bind(this)}>Continue</button>
          </li>
          <Link className="btn -backBtn pull-left" to="login">Login</Link>
        </ul>
      </div>
    )
  }
}
