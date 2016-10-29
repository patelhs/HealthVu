import React from 'react/addons';
import {Input, DatePicker} from 'react-bootstrap';
//import {BootstrapTable, TableHeaderColumn, TableDataSet} from 'react-bootstrap-table';
import BootstrapTable from '../react-bootstrap-table/lib/BootstrapTable';
import TableHeaderColumn from '../react-bootstrap-table/lib/TableHeaderColumn';
//import TableDataSet from '../react-bootstrap-table/lib/BootstrapTable';
import AppointmentStore from '../stores/AppointmentStore';
import LoginStore from '../stores/LoginStore';
import ReactMixin from 'react-mixin';
import dateFormat from 'dateformat';
import uuid from 'node-uuid';
import AppointmentActionCreator from '../actions/AppointmentActionCreators';
import LoginActionCreator from '../actions/LoginActionCreators';
import EditAppointent from './Edit_appointment';
import AppointmentService from '../services/AppointmentService';

import moment from 'moment';

export default class BasicTable extends React.Component{
  constructor(props) {
    console.log("appointments table constructor");
    super(props);
    this.loggedOnUser = LoginStore.loggedOnUser;
    //Make request to get total
    if (AppointmentStore.totalResultCount == 0){
      //AppointmentService.getAppointmentsTotal(this.loggedOnUser.practiceId, -1, 10);
    }
    console.log(AppointmentStore.totalResultCount);

    this.state = this._getAppointments();
    this.options = {
      onPageChange: this.onPageChange.bind(this),
      onSizePerPageList: this.onSizePerPageList.bind(this),
      page: 0,
      sizePerPageList: [10,15,20,30], //you can change the dropdown list for size per page
      afterInsertRow: this.onAfterInsertRow.bind(this),
      sizePerPage: 10,
      dataTotalSize: 0//AppointmentStore.totalResultCount
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
      pageNumber: AppointmentStore.resultPage,
      pageSize: AppointmentStore.maxResults
    };
  }

  componentDidMount(){
    console.log("in componentDidMount()")
    this.queryData(this.state.pageNumber+1,this.state.pageSize);
    this.changeListener = this._onChange.bind(this);
    AppointmentStore.addChangeListener(this.changeListener);
  }

  _onChange() {
    //console.log(this.refs.table);

    //Verify this..... on time outs.
    if (AppointmentStore.error != null) {
      var message = AppointmentStore.error.message;
      var alertMsg = "";
      if (message == 'Invalid ID token.') {
        BootstrapDialog.alert({
          message: 'Session Expired. Login again',
          title: 'Failed',
          type: BootstrapDialog.TYPE_WARNING
        });
        LoginActionCreator.logoutUser();
        return;
      }else{
        BootstrapDialog.alert({
          message: 'Unknown error occured saving data.',
          title: 'Failed',
          type: BootstrapDialog.TYPE_WARNING
        });
        return;
      }
    }

    AppointmentService.getAppointmentsTotal(this.loggedOnUser.practiceId, -1, 10);
    this.refs.table.store.dataSize = AppointmentStore.totalResultCount;
    //console.log(this.refs.table);
    console.log("in _onChange")
    this.setState({
      data: AppointmentStore.appointments,
      selected: AppointmentStore.appointment
    });
    console.log("in main " + this.state.edit);
    if (this.refs.editComp.state.edit) {
      //AppointmentActionCreator.getHealthVuAppointments(AppointmentStore.practiceId, AppointmentStore.resultPage, AppointmentStore.maxResults);
    }
  }



  componentWillUnmount() {
    console.log("in componnetWillUnmount");
    AppointmentStore.removeChangeListener(this.changeListener);
  }

  queryData(page, sizePerPage){
    if (this.state.pageSize != sizePerPage){
      page = 1;
    }
    this.state.pageNumber = page - 1;
    this.state.pageSize = sizePerPage;
    this.options.sizePerPage = sizePerPage;
    AppointmentActionCreator.getHealthVuAppointments(AppointmentStore.practiceId, this.state.pageNumber, this.state.pageSize);
  }

  onPageChange(page, sizePerPage) {
    //alert('page: ' + page + ', sizePerPage: ' + sizePerPage);
    this.queryData(page, sizePerPage);
  }

  onSizePerPageList(sizePerPage){
    console.log("sizePerPage: " + sizePerPage);
    //alert(sizePerPage);
  }

  onAfterInsertRow(row){
    var newRowStr = "";

    for(var prop in row){
      newRowStr += prop+": " + row[prop] + " \n";
    }
    //alert("The new row is:\n " + newRowStr);
  }

  onRowSelect(row, isSelected){

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

    $(".modal-body #notificationResponseStatus").val(row.notificationResponseStatus);
    $(".modal-body #notificationType").val(row.notificationType);

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

  importAppointments(e){
    console.log("in import");
    console.log(e);
    console.log(e.target.files[0].webkitRelativePath);

    var reader = new FileReader();

    // inject an image with the src url
    reader.onload = function(event) {
      var data = event.target.result
      //console.log('data' + data);

      var xlsx = XLSX;
      var workbook = xlsx.read(data, {type: 'binary'});

      var result = {};
      workbook.SheetNames.forEach(function(sheetName) {
        var roa = xlsx.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if(roa.length > 0){
          result[sheetName] = roa;
        }
      });
      console.log(result);
      var msg = " ";
      $.each(result.Sheet1, function(i, item){
        item.appointmentId = uuid.v4();
        //console.log(item);
        //AppointmentActionCreator.saveAppointment(item);
        var r = AppointmentService.saveAppointmentSync(item);
        if (r != null){
          msg = msg + item.patientEmail  + 'was failed during import';
        }
      });

      if (msg == " "){
        msg = "Data Imported successfully!";
        BootstrapDialog.alert({
          message: msg,
          title: 'Success',
          type: BootstrapDialog.TYPE_SUCCESS
        });
        //e.target.files[0] = null;
        $('input[type="file"]').val(null);
      }else{
          BootstrapDialog.alert({
          message: msg,
          title: 'Failed',
          type: BootstrapDialog.TYPE_WARNING
        });
        $('input[type="file"]').val(null);
    }

      //AppointmentActionCreator.getHealthVuAppointments(1, 1, 25);
  }
    // when the file is read it triggers the onload event above.
    reader.readAsBinaryString(e.target.files[0]);
    console.log("import completing");


  }

  render(){

    $(document).on('click', '.open-AddBookDialog', function(){
      $(".modal-body #patientEmail").val('');
      $(".modal-body #providerPrefix").val('');
      $(".modal-body #providerFirst").val('');
      $(".modal-body #providerMiddle").val('');
      $(".modal-body #providerLast").val('');
      $(".modal-body #providerPrefix").val('');
      $(".modal-body #appointmentLocationName").val('');
      $(".modal-body #messageDeliveryPreference").val('');
      $(".modal-body #patientMobile").val('');
      $(".modal-body #patientFirst").val('');
      $(".modal-body #patientLast").val('');
      $(".modal-body #appointmentId").val('');
      $(".modal-body #appointmentDateTime").val('');
      $(".modal-body #appointmentId").val(uuid.v4());

    });


    function nameFormatter(cell, row){
      return cell + " " + row.patientLast;
    }

    function providerFormatter(cell, row){
      return cell + " " + row.providerMiddle + " " + row.providerLast;
    }

    function dateFormatter(value){

      var d = Date.parse(value);
      //var m = moment().format();
      //console.log("db value " + value);
      //var t1 = moment.utc(value).local().format('YYYY-MM-DD HH:mm:ss');
      //  console.log("moment ddds " + t1);

      var t = dateFormat(d, "dddd, mmmm dS, yyyy, h:MM:ss TT");

      return t;
    }


    function statusFormatter(cell, row){
      var text = '<button type="button" className="btn btn-info"><i className="glyphicon"></i><span>'+row.notificationResponseStatus+'</span></button>';

      text = (row.notificationResponseStatus == "NEW") ? '<button type="button" class="btn btn-info" style="background-color: #0e3380;height: 30px;width: 100px;"><i class="glyphicon"></i><span>NEW</span></button>' : text;
      text = (row.notificationResponseStatus == "DELIVERED") ? '<button type="button" class="btn btn-info" style="background-color: #0c6966;height: 30px;width: 100px;"><i class="glyphicon"></i><span>DELIVERED</span></button>' : text;
      text = (row.notificationResponseStatus == "CONFIRMED") ? '<button type="button" class="btn btn-info" style="background-color: #0c6966;height: 30px;width: 100px;"><i class="glyphicon"></i><span>PATIENT CONFIRMED</span></button>' : text;
      text = (row.notificationResponseStatus == "CONFIRMED") ? '<button type="button" class="btn btn-info" style="background-color: #117c20;height: 30px;width: 100px;"><i class="glyphicon"></i><span>PATIENT CONFIRMED</span></button>' : text;
      text = (row.notificationResponseStatus == "CANCELLED") ? '<button type="button" class="btn btn-info" style="background-color: #ff0000;height: 30px;width: 100px;"><i class="glyphicon"></i><span>CANCELLED</span></button>' : text;
      return text;
    }

    function notificationFormatter(cell, row){
      var text = '<button type="button" className="btn btn-info"><i className="glyphicon"></i><span>'+row.notificationType+'</span></button>';

      text = (row.notificationType == "NEW") ? '<button type="button" class="btn btn-info" style="background-color: #0e3380;height: 30px;width: 110px;"><i class="glyphicon"></i><span>NEW</span></button>' : text;
      text = (row.notificationType == "CONFIRMATION") ? '<button type="button" class="btn btn-info" style="background-color: #0c6966;height: 30px;width: 110px;"><i class="glyphicon"></i><span>CONFIRMATION</span></button>' : text;
      text = (row.notificationType == "REMINDER") ? '<button type="button" class="btn btn-info" style="background-color: #117c20;height: 30px;width: 110px;"><i class="glyphicon"></i><span>REMINDER</span></button>' : text;
      return text;
    }

    return (

      <div className="container">
      {/*
        <button onClick={this.queryData.bind(this)}>Get More Data</button>
        <button onClick={this.addAppointment.bind(this)}> Add </button>
       */}


        <br />

        <BootstrapTable data={this.state.data}
          selectRow={this.selectRowProp}
          insertRow={false}
          pagination={true}
          search={true}
          ref='table'
          options={this.options}
        >
          <TableHeaderColumn type="date" dataField="appointmentDateTime" dataFormat={dateFormatter} dataSort={true}>Appointment Date</TableHeaderColumn>
          <TableHeaderColumn dataField="patientFirst" dataSort={true} dataFormat={nameFormatter}>Patient Name</TableHeaderColumn>
          <TableHeaderColumn type="text" dataField="providerFirst" dataSort={true} dataFormat={providerFormatter}>Provider</TableHeaderColumn>
          <TableHeaderColumn type="text" dataField="appointmentLocationName" dataSort={true}>Appointment Location</TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataField="notificationResponseStatus" dataFormat={statusFormatter}>Status</TableHeaderColumn>
          <TableHeaderColumn dataSort={true} dataField="notificationType" dataFormat={notificationFormatter}>Notification Type</TableHeaderColumn>

          <TableHeaderColumn dataField="appointmentId" isKey={true} hidden={true}>Appointment ID</TableHeaderColumn>
        </BootstrapTable>
        <br />

        <div style={{display:"table", margin:"0 auto"}}>
          <div style={{float:"left", padding:"20px"}}>
            <button type="button" className="open-AddBookDialog btn btn-info btn-lg" style={{height: "69px"}} data-toggle="modal" data-target="#myModal">Add Appointment</button>
          </div>
          <div style={{float:"left", padding:"20px"}}>
            <div className="fileinput fileinput-new " data-provides="fileinput">
              <span className="btn btn-info btn-lg btn-file" style={{"padding-top":"20px"}}>
                <span>Import from Excel</span>
                <Input type="file" onChange={this.importAppointments.bind(this)} />
              </span>
              <span className="fileinput-filename"></span>
              <span className="fileinput-new"></span>
            </div>
          </div>
        </div>
        <div id="myModal" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div class="modal-header">
                <button type="button" className="close" data-dismiss="modal">&times;</button>
                <h2 className="modal-title">Add/Edit Appointment</h2>
              </div>
              <br />
              <div className="modal-body">
                <EditAppointent ref="editComp" appointment={this.state.selected} />
              </div>
            {/*
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            */}
            </div>
          </div>
        </div>
      </div>
    );
  }
};


ReactMixin(BasicTable.prototype, React.addons.LinkedStateMixin);
