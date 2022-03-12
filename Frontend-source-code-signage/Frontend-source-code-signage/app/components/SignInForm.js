
import React, { Component, PropTypes } from 'react';
import { reduxForm, Field, SubmissionError, initialize } from 'redux-form';
import renderField from './renderField';
import renderCheckbox from './renderCheckbox';
import { signInUser, signInUserSuccess, signInUserFailure, resetUserFields, fetchUserMedia, fetchUserMediaSuccess, fetchUserMediaFailure, fetchSettings, fetchSettingsSuccess, fetchSettingsFailure, fetchFoldersSuccess, fetchFoldersFailure, fetchFolders } from '../actions/users';
import OtpInput from "react-otp-input";
import { Loading, Error } from './commonDumbs';
import { IsPublicSignup, PrimaryColor } from '../constants/Config';
//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter a username';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  return hasErrors && errors;
}

//For any field errors upon submission (i.e. not instant check)
const validateAndSignInUser = (values, dispatch) => {
  return dispatch(signInUser(values))
    .then((result) => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(signInUserFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      else if (result.error) {
        dispatch(signInUserFailure(result.payload));
        throw new SubmissionError(result.payload);
      }

      //Store JWT Token to browser session storage
      //If you use localStorage instead of sessionStorage, then this w/ persisted across tabs and new windows.
      //sessionStorage = persisted only in current tab
      if (localStorage.getItem('temptknsv')) {
        localStorage.setItem('temptkn', result.payload.data.token);
      }
      sessionStorage.setItem('jwtToken', result.payload.data.token);

      dispatch(signInUserSuccess(result.payload.data));
    });
};



class SignInForm extends Component {
  constructor() {
    super();
    this.state = { isOptView: false, otp: '', mobile: '' };
    this.gotoSignup = this.gotoSignup.bind(this);
    this.handleOtpChange = this.handleOtpChange.bind(this);
    this.verifyOtp = this.verifyOtp;
    this.resendCount = 0;
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.user.user && nextProps.user.user.admin) {
      this.props.changeConsole("ADMIN_CONSOLE");
    }
    else if (nextProps.user.status === 'authenticated' && nextProps.user.user && !nextProps.user.error && !nextProps.user.user.admin) {
      if (nextProps.user.user.isIAMUser || sessionStorage.getItem('isIAMUser')) {
        sessionStorage.setItem('isIAMUser', nextProps.user.user.isIAMUser);
        sessionStorage.setItem('iAmUsers', nextProps.user.user.iAmUsers);
      }
      if (IsPublicSignup && !nextProps.user.user.isMobileVerified && !this.state.isOptView) {
        this.setState({
          isOptView: true,
          mobile: nextProps.user.user.mobile
        });
      } else if (!IsPublicSignup || (IsPublicSignup && nextProps.user.user.isMobileVerified)) {

        this.props.changeConsole("USER_DASHBOARD");
      }
    }


  }

  focusChanged(evt) {
    evt.preventDefault();
    if (evt.target.value) {
      evt.target.className = evt.target.className + " has-content";
    } else {

    }
  }

  gotoSignup() {
    this.props.changeConsole("SIGNUP");
  }

  handleOtpChange = otp => this.setState({ otp });
  savePassChange(e) {
    localStorage.setItem('temptknsv', e.target.checked);
    localStorage.removeItem('temptkn');
  }

  updateContent(evt) {
    evt.preventDefault();
  }

  render() {

    const { handleSubmit, submitting, user, asyncVerifyOtp } = this.props;
    var chckInput = { value: false };
    let err = user && user.error;
    return (
      <div className='card brdr_left card_height p-2 p-md-5'>
        <div className=''>
          <div className="small-header">
            <span className='logo' ></span>
            <div className='d-inline-flex '>
              <h3 className='Bold text_spacing'>SUMMIT </h3> <h3 className='text_spacing'> SIGNAGE</h3>
            </div>
          </div>
        </div>
        {!this.state.isOptView && <div><Loading isLoading={user.loading} />
          <Error error={err} />
          <div className='p-2 p-md-5'>
            <form onSubmit={handleSubmit(validateAndSignInUser)} autoComplete="on">
              <div>
                <Field
                  name="username"
                  type="text"
                  placeholder="Username"
                  component={renderField}
                  label='Username*' />
              </div>
              <div>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  component={renderField}
                  label='Password*' />
              </div>
              <div>
                <button
                  type="submit"
                  className="text-white btn_theme w-100 my-3"
                  disabled={submitting}>
                  Log In
                </button>
              </div>
            </form>
            <div className='save-pass' style={{ textAlign: 'left' }}><label style={{ color: '#adaaaa', marginRight: '10px' }}> {"Remember Me"}</label><input type="checkbox" name="savePass" onChange={this.savePassChange} id='save-pass' />
              <div className='signIn_a'>
                <p>Dont have an account?<a href='' className='ms-2'>Register</a></p>
                <a href=''>Back to Dashboard</a>
              </div>

              <div className='my-5 d-md-none'>
                <div className='text_spacing'>
                  <h1>Welcome</h1>
                  <h1>to the</h1>
                  <h1>SUMMITSIGNAGE</h1>
                </div>
                <p className='w-75'>Powerful and professional admin template for web applications, CRM, CMS, Admin Panels and more</p>
              </div>
            </div>

          </div>

          {IsPublicSignup && <div style={{ padding: '5px 15px', wordSpacing: '-2px' }}> <button
            className="btn-primary-link" style={{ color: PrimaryColor, float: 'left', marginLeft: '5px' }} onClick={() => this.props.changeConsole("FORGOT_PASSWORD")} >
            Forgot Password?
          </button>
            <span style={{ float: 'right' }}><label style={{ color: '#adaaaa' }}>New user? please,</label><button
              className="btn-primary-link" style={{ color: PrimaryColor }} onClick={() => this.gotoSignup()} >
              Sign Up
            </button></span></div>}
        </div>
        }

        {this.state.isOptView && <div className='otp-form'>
          <label>{this.state.mobile ? 'OTP sent to ' + this.state.mobile : ''} </label>
          <OtpInput
            onChange={this.handleOtpChange}
            numInputs={4}
            value={this.state.otp}
            separator={<span>-</span>}
          />
          <div style={{ textAlign: 'right' }}>
            <button
              onClick={() => (this.resendCount < 3 && this.props.resendOTP(this.state.mobile, this.resendCount), this.resendCount++)}
              className="btn btn-primary-link"
              style={{ marginTop: '30px', marginRight: '20px', color: PrimaryColor }}
              disabled={this.resendCount > 3 ? true : false}
            >
              RESEND
            </button>
            <button
              onClick={() => asyncVerifyOtp(this.state.mobile, this.state.otp)}
              className="btn btn-primary"
              style={{ float: 'right', marginTop: '30px' }}
            >
              Confirm
            </button>
          </div>
        </div>}

      </div>
    )
  }
}

export default reduxForm({
  form: 'SignInForm',

  Field,
  // a unique identifier for this form
  validate // <--- validation function given to redux-form
})(SignInForm)
