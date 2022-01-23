import React, { Component } from 'react';
import UserContainer from '../containers/UserContainer.js';

class UserDashboard extends Component {

  render() {

    return (

        <UserContainer 
        rootModal={this.props.rootModal} 
        closeModalPopup={this.props.closeModalPopup}
        />

    );
  }
}


export default UserDashboard;
