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
          <div className="col-12 col-md-6 col-lg-4 col-lg-4 h-100 d-md-flex">
            <div className="p-0 p-md-4 bg-transparent my-auto">
              <SignInFormContainer
                user={this.props.user}
              />
            </div>
          </div>

          <div className="d-none d-md-block col-md-6 col-lg-7 col-lg-8">
            <div className='ms-5 ps-5 text-light h-100 d-md-flex bg-theme'>
              <div className='my-auto w-100'>
                <div className='text_spacing'>
                  <h1>Welcome</h1>
                  <h1>to the</h1>
                  <h1>SUMMITSIGNAGE</h1>
                </div>
                <p className='w-25'>Powerful and professional admin template for web applications, CRM, CMS, Admin Panels and more</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

