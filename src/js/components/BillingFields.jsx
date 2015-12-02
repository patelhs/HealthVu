import React from 'react';
import ReactMixin from 'react-mixin';

export default class BillingFields extends React.Component {
  constructor(props) {
        super(props);
        this.state = {
            name: props.fieldValues.name
        };
  }

  nextStep(e) {
    e.preventDefault();
    //console.log(this);

    //alert(this.props.fieldValues.name);
    // Get values via this.refs

    var data = {
      cardNumber     : this.refs.ccName.getDOMNode().value,
      expirationDate : this.refs.ccExpDate.getDOMNode().value,
      secuirtyCode    : this.refs.ccSecurityCode.getDOMNode().value,
    };

    this.props.saveValues(data);
    this.props.nextStep();
  }

   render() {
    return (
      <div>
        <h2>Billing Details</h2>
        <ul className="form-fields center_div">
          <li>
            <label>Card Holder</label>
            <input className="input -primary" type="text" ref="ccName" defaultValue={this.props.fieldValues.ccName} />
          </li>
          <li>
            <label>Expiration Date</label>
            <input className="input -primary" type="date" ref="ccExpDate" defaultValue={this.props.fieldValues.ccExpDate} />
          </li>
          <li>
            <label>Security Code</label>
            <input className="input -primary" type="text" ref="ccSecurityCode" defaultValue={this.props.fieldValues.ccSecurityCode} />
          </li>
          <li className="form-footer">
            <button className="btn -continueBtn center-block" onClick={this.nextStep.bind(this)}>Continue</button>
          </li>
          <button className="btn -backBtn pull-left" onClick={this.props.previousStep.bind(this)}>Back</button>
        </ul>
      </div>
    )
  }
}
