import React, { Component } from 'react';
import HeaderContainer from '../containers/HeaderContainer.js';
import ForgotPwdFormContainer from '../containers/ForgotPwdFormContainer.js';

class ForgotPwd extends Component {
  render() {
    return (
      <div className="login-bg">
      <div className="col-sm-12 col-md-4 col-lg-5 center-container">
        <ForgotPwdFormContainer common={this.props.common}/>
      </div>
      </div>
    );
  }
}


export default ForgotPwd;
