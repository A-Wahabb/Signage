import React, { Component } from 'react';
import UserNewPasswordContainer from '../containers/UserNewPasswordContainer.js';

class UserNewPasswordPg extends Component {
  render() {
    return (
    	<div className="login-bg">
      <div className="col-sm-12 col-md-4 col-lg-5 center-container">
        <UserNewPasswordContainer common={this.props.common} />
        </div>
        </div>
    );
  }
}

export default UserNewPasswordPg;
