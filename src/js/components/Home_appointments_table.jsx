
'use strict';
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

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

addProducts(5);


export default class BasicTable extends React.Component{

 constructor() {
    super()
    this.state = {
      appointments: ''
    };
    AppointmentActionCreator.getAppointments();
  }

  render(){
    return (
      <div>dsdsdcxcxcxcs</div>
    );
  }
};
