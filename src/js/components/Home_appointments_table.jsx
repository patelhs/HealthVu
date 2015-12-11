import React from 'react/addons';
import {Input} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn, TableDataSet} from 'react-bootstrap-table';
import AppointmentStore from '../stores/AppointmentStore';
import ReactMixin from 'react-mixin';

import AppointmentActionCreator from '../actions/AppointmentActionCreators';

var products = [];

function addProducts(quantity) {
  var startId = products.length;
  for (var i = 0; i < quantity; i++) {
    var id = startId + i;
    products.push({
      id: id,
      name: "Item name " + id,
      price: 2100 + i
    });
  }
}

addProducts(10);



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
      paginationSize: 100
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
    AppointmentActionCreator.getAppointments(this.state.pageNumber, this.state.pageSize);
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
    AppointmentActionCreator.getAppointments(this.state.pageNumber, this.state.pageSize);
    //this.dataSet.setData(this.state.data);
  }

  onPageChange(page, sizePerPage) {
    //alert('page: ' + page + ', sizePerPage: ' + sizePerPage);
  }


  render(){
    //var options = {
    //  page: 1,
    //  sizePerPageList: [5,10,15,20,25], //you can change the dropdown list for size per page
    //  sizePerPage: 5,  //which size per page you want to locate as default
    //  paginationSize: 10
    //}
    return (
      <div>
        <button onClick={this.queryData.bind(this)}>Get More Data</button>
        <label htmlFor="startDate">Start Date</label>
        <input type="date" valueLink={this.linkState('startDate')} className="form-control" id="startDate" placeholder="Start Date" />
        <label htmlFor="endDate">End Date</label>
        <input type="date" valueLink={this.linkState('endDate')} className="form-control" id="endDate" placeholder="End Date" />
        <BootstrapTable data={this.state.data}
          pagination={false}
          search={true}
          options={this.options}
          height="240">
          <TableHeaderColumn dataField="id" isKey={true} dataSort={true}>Appointment ID</TableHeaderColumn>
          <TableHeaderColumn dataField="patientName" dataSort={true}>Patient Name</TableHeaderColumn>
          <TableHeaderColumn type="date" dataField="appointmentDate" dataSort={true}>Date</TableHeaderColumn>
          <TableHeaderColumn type="text" dataField="location" dataSort={true}>Location</TableHeaderColumn>
          <TableHeaderColumn type="date" dataField="status" dataSort={true}>Status</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
};

ReactMixin(BasicTable.prototype, React.addons.LinkedStateMixin);
