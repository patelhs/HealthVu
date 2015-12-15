import React from 'react/addons';
import {Input, Button, ButtonInput} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn, TableDataSet} from 'react-bootstrap-table';
import AppointmentStore from '../stores/AppointmentStore';
import ReactMixin from 'react-mixin';
import dateFormat from 'dateformat';


export default class EditAppointent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      disabled: true,
      style: null,
      value: "",
      username: "",
      email: "",
      password: "",
      loading: false,
      errors: {}
    }
  }

  resetValidation() {
    this.setState({
      disabled: true,
      style: null
    });
  }

  validationState() {
    let length = this.refs.input.getValue().length;
    //
    let style = 'danger';
    //
    //let length = this.state.value.length;
    if (length > 10) style = 'success';
    else if (length > 5) style = 'warning';
    //
    //if (length > 10) style = 'success';
    //else if (length > 5) style = 'warning';
    //
    let disabled = style !== 'success';y

    return {style, disabled};
  }

  handleChange() {
    //this.setState({
    //  email: this.refs.userEmail.getValue()
    //});
    this.setState( this.validationState() );
  }

render(){
  return (
    <form>
      <Input type="text" ref="input" onChange={this.handleChange.bind(this)} />

      <Input type="date" ref="submitDate" onChange={this.handleChange.bind(this)} />



      <ButtonInput bsSize="small">Child Text</ButtonInput>
      <ButtonInput type="reset" bsStyle="primary" onClick={this.resetValidation.bind(this)} />
      <ButtonInput type="submit" value="Submit Your Input" bsStyle={this.state.style} bsSize="large" disabled={this.state.disabled} />
    </form>
  );
}
}
