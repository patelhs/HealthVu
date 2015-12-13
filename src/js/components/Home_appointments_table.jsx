import React from 'react/addons';
import {Input} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn, TableDataSet} from 'react-bootstrap-table';
import AppointmentStore from '../stores/AppointmentStore';
import ReactMixin from 'react-mixin';
import dateFormat from 'dateformat';

import AppointmentActionCreator from '../actions/AppointmentActionCreators';

export default class BasicTable extends React.Component{

  constructor(props) {
    console.log("appointments table constructor");
    super(props);
    //this.props.index = 1;
    this.state = this._getAppointments();
    //this.dataSet = new TableDataSet(this.state.data);

    this.options = {
      onPageChange: this.onPageChange.bind(this),
      page: 1,
      sizePerPageList: [5,10,15,20,25], //you can change the dropdown list for size per page
      sizePerPage: 10,  //which size per page you want to locate as default
      paginationSize: 100,
      afterInsertRow: this.onAfterInsertRow.bind(this)
      //totalPages: 100
    };
  }

  _getAppointments() {
    return {
      data: [],
      pageNumber: 1,
      pageSize: 15
    };
  }


  componentDidMount() {
    console.log("in componentDidMount()")
    //AppointmentActionCreator.getAppointments(this.state.pageNumber, this.state.pageSize);
    AppointmentActionCreator.getHealthVuAppointments(1, 1, 25);
    //this.dataSet = new TableDataSet(this.state.data);
    this.changeListener = this._onChange.bind(this);
    AppointmentStore.addChangeListener(this.changeListener);
    //this.queryData();
  }

  _onChange() {
    console.log("in _onChange")
    this.setState({
      data: AppointmentStore.appointments
    });
  }

  componentWillUnmount() {
    console.log("in componnetWillUnmount");
    AppointmentStore.removeChangeListener(this.changeListener);
  }

  queryData(){
    this.state.pageNumber+=1;
    //AppointmentActionCreator.getAppointments(this.state.pageNumber, this.state.pageSize);
    //this.dataSet.setData(this.state.data);

    AppointmentActionCreator.getHealthVuAppointments(1, 1, 25);
    this.dataSet.setData(this.state.data);

  }

  onPageChange(page, sizePerPage) {
    //alert('page: ' + page + ', sizePerPage: ' + sizePerPage);
  }
  onAfterInsertRow(row){
    var newRowStr = "";

    for(var prop in row){
      newRowStr += prop+": " + row[prop] + " \n";
    }
    alert("The new row is:\n " + newRowStr);
  }


  render(){
    //var dateFormat = require('dateformat');
    function nameFormatter(cell, row){
      return cell + " " + row.patientLast;
    }
    function dateFormatter(cell, row){
      var date = Date.parse(cell);
      return dateFormat(date, "dddd, mmmm dS, yyyy, h:MM:ss TT");
      //return date;
    }
    return (
      <div>
        <button onClick={this.queryData.bind(this)}>Get More Data</button>
        <BootstrapTable data={this.state.data}
          insertRow={false}
          pagination={false}
          search={true}
          options={this.options}
          height="240">

          <TableHeaderColumn dataField="patientFirst" dataSort={true} dataFormat={nameFormatter}>Patient Name</TableHeaderColumn>
          <TableHeaderColumn type="date" dataField="appointmentDateTime" dataFormat={dateFormatter} dataSort={true}>Appointment Date</TableHeaderColumn>
          <TableHeaderColumn type="text" dataField="appointmentLocationName" dataSort={true}>Appointment Location</TableHeaderColumn>

          <TableHeaderColumn type="text" dataField="patientLast" hidden={true}>Last Name</TableHeaderColumn>
          <TableHeaderColumn dataField="appointmentId" isKey={true} hidden={true}>Appointment ID</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
};

ReactMixin(BasicTable.prototype, React.addons.LinkedStateMixin);
