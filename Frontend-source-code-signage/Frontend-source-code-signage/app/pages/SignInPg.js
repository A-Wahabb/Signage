import React from 'react';
import { Component } from 'react';
import SignInFormContainer from '../containers/SignInFormContainer.js';

export default class SignInPg extends Component {
  render() {
    console.log('--SignIn page--');
    return (
      <div className="login-bg">
      <div className="col-sm-12 col-md-4 col-lg-5 center-container">
        <SignInFormContainer 
            user= {this.props.user}
          />
      </div>
      </div>
    );
  }
}

