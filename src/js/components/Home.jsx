import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent'
import BasicTable from './Home_appointments_table'
import { Link } from 'react-router';

import EditAppointent from './Edit_appointment';

export default AuthenticatedComponent(class Home extends React.Component {
  render() {
    return (
      <div>

        <BasicTable />
      </div>
    );
  }
});
