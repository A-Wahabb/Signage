import React, { Component } from 'react';
import UserListContainer from '../containers/UserListContainer.js';

class UserListPg extends Component {

  render() {

    return (
      <div>
        <UserListContainer 
        	usersList={this.props.usersList}
        	appsList= {this.props.appsList}
        	playersList={this.props.playersList}
          rootModal={this.props.rootModal}
          user = {this.props.user}
          allSubscriptions= {this.props.allSubscriptions}
        />
      </div>
    );
  }
}

export default UserListPg;
