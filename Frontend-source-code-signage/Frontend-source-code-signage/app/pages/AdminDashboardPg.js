import React, { Component } from 'react';
import AdminContainer from '../containers/AdminContainer.js';

class AdminDashboardPg extends Component {
  
  render() {
console.log('admin pg', this.props);
    return (
      <div>
        <AdminContainer 
	        user= {this.props.user}
	    	  common= {this.props.common}
          rootModal= {this.props.rootModal}
    	/>
      </div>
    );
  }
}

export default AdminDashboardPg;
