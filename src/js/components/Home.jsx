import React from 'react';
import AuthenticatedComponent from './AuthenticatedComponent'
import BasicTable from './Home_appointments_table'

import { Link } from 'react-router';

export default AuthenticatedComponent(class Home extends React.Component {
  render() {
    return (
      <div>
        <h1> {this.props.user ? 'Hello ' + this.props.user.username : ''}</h1>
        <Link to="/private">Private page</Link>

    	<BasicTable />
	

      </div>
    );
  }
});
