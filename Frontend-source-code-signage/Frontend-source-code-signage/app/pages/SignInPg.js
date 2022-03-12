import React from 'react';
import { Component } from 'react';
import SignInFormContainer from '../containers/SignInFormContainer.js';
import '../style/newStyles.css'


export default class SignInPg extends Component {
  render() {
    console.log('--SignIn page--');
    return (
      <div className="login_bg">
        <div className="row w-100">
          <div className="col-12 col-md-5 col-lg-4">
            <div className="p-3">
              <SignInFormContainer
                user={this.props.user}
              />
            </div>
          </div>

          <div className="col-12 col-md-7 col-lg-8">
            <div className='ps-5 text-start text-light h-100 d-flex'>
              <div className='my-auto w-50'>
                <div className='text_spacing'>
                  <h1>Welcome</h1>
                  <h1>to the</h1>
                  <h1>SUMMITSIGNAGE</h1>
                </div>
                <p className='w-75'>Powerful and professional admin template for web applications, CRM, CMS, Admin Panels and more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

