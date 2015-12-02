import React from 'react';
import ReactMixin from 'react-mixin';

export default class PracticeFields extends React.Component {
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
      practiceName     : this.refs.practiceName.getDOMNode().value,
      practicePhone : this.refs.practicePhone.getDOMNode().value,
      practiceWebsite    : this.refs.practiceWebsite.getDOMNode().value
    };

    this.props.saveValues(data);
    this.props.nextStep();
  }

   render() {
    return (
      <div>
      <div>
        <h2>Practice Details</h2>
        <ul className="form-fields center_div">
          <li>
            <label>Practice Name</label>
            <input className="input -primary" type="text" ref="practiceName" defaultValue={this.props.fieldValues.practiceName} />
          </li>

          <li>
            <label>Email</label>
            <input className="input -primary" type="phone" ref="practicePhone" defaultValue={this.props.fieldValues.practicePhone} />
          </li>
          <li>
            <label>Website</label>
            <input className="input -primary" type="text" ref="practiceWebsite" defaultValue={this.props.fieldValues.practiceWebsite} />
          </li>
        </ul>
      </div>
      <div>
        <h2>Practice Locations</h2>
        <ul className="form-fields center_div">
          <li>
            <label>Practice Address</label>
            <input className="input -primary" type="text" ref="practiceAddress" defaultValue={this.props.fieldValues.practiceAddress} />
          </li>
          <li className="form-footer">
            <button className="btn -continueBtn center-block" onClick={this.nextStep.bind(this)}>Continue</button>
          </li>
          <button className="btn -backBtn pull-left" onClick={this.props.previousStep.bind(this)}>Back</button>
        </ul>
      </div>
      </div>
    )
  }
}
