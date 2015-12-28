import React from 'react/addons';
import {Input, DatePicker} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn, TableDataSet} from 'react-bootstrap-table';
import AppointmentStore from '../stores/AppointmentStore';
import ReactMixin from 'react-mixin';
import dateFormat from 'dateformat';

import AppointmentActionCreator from '../actions/AppointmentActionCreators';

import EditAppointent from './Edit_appointment';

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

    this.selectRowProp = {
      mode: "radio",
      clickToSelect: true,
      bgColor: "rgb(238, 193, 213)",
      onSelect: this.onRowSelect.bind(this)
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
      data: AppointmentStore.appointments,
      selected: AppointmentStore.appointment
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

  onRowSelect(row, isSelected){

    console.log(row.patientFirst);

    $(".modal-body #patientEmail").val(row.patientEmail);
    $(".modal-body #providerPrefix").val(row.providerPrefix);
    $(".modal-body #providerFirst").val(row.providerFirst);
    $(".modal-body #providerMiddle").val(row.providerMiddle);
    $(".modal-body #providerLast").val(row.providerLast);
    $(".modal-body #providerPrefix").val(row.providerPrefix);
    $(".modal-body #appointmentLocationName").val(row.appointmentLocationName);
    $(".modal-body #messageDeliveryPreference").val(row.messageDeliveryPreference);
    $(".modal-body #patientMobile").val(row.patientMobile);
    $(".modal-body #patientFirst").val(row.patientFirst);
    $(".modal-body #patientLast").val(row.patientLast);
    $(".modal-body #appointmentId").val(row.appointmentId);
    var date = new Date(row.appointmentDateTime);
    console.log(date);
    date = date.toLocaleString();
    var d = dateFormat(date, "yyyy-mm-dd");
    var t = dateFormat(date, 'hh:MM:ss');
    var dt = d + "T" + t;
    console.log(dt);
    //date = '2015-12-08T12:55:00'
    $(".modal-body #appointmentDateTime").val(dt);


    if (row.isActive){
      $(".modal-body #isActive").val('true');
    }else{
      $(".modal-body #isActive").val('false');
    }
    $('#myModal').modal('show');
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
    function statusFormatter(cell, row){
      if (row.isActive){
        return '<button type="button" class="btn btn-info"><i class="glyphicon"></i><span>Active</span></button>';
      }
    }
    function onAdd(){
      console.log("onadd");
    }
    return (
      <div>
        <button type="button" className="open-AddBookDialog btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add Appointment</button>
      {/*
        <button onClick={this.queryData.bind(this)}>Get More Data</button>
        <button onClick={this.addAppointment.bind(this)}> Add </button>
       */}

        <BootstrapTable data={this.state.data}
          selectRow={this.selectRowProp}
          insertRow={false}
          pagination={false}
          search={true}
          options={this.options}
          height="240">

          <TableHeaderColumn dataField="patientFirst" dataSort={true} dataFormat={nameFormatter}>Patient Name</TableHeaderColumn>
          <TableHeaderColumn type="date" dataField="appointmentDateTime" dataFormat={dateFormatter} dataSort={true}>Appointment Date</TableHeaderColumn>
          <TableHeaderColumn type="text" dataField="appointmentLocationName" dataSort={true}>Appointment Location</TableHeaderColumn>
          <TableHeaderColumn dataFormat={statusFormatter}>Status</TableHeaderColumn>

          <TableHeaderColumn type="text" dataField="patientLast" hidden={true}>Last Name</TableHeaderColumn>
          <TableHeaderColumn dataField="appointmentId" isKey={true} hidden={true}>Appointment ID</TableHeaderColumn>
        </BootstrapTable>

        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div class="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h4 className="modal-title">Add/Edit Appointment</h4>
              </div>
              <div className="modal-body">
                <EditAppointent appointment={this.state.selected} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

ReactMixin(BasicTable.prototype, React.addons.LinkedStateMixin);
