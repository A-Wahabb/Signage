import React, { Component, PropTypes } from 'react';

import { forgotPwd, forgotPwdSuccess, forgotPwdFailure, resetUserFields } from '../actions/users';
import { connect } from 'react-redux';
import {IsPublicSignup,PrimaryColor} from '../constants/Config';
import OtpInput from "react-otp-input";

//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  if (!values.email || values.email.trim() === '' ) {
    errors.email = 'Enter email';
    hasErrors = true;
  }
  return hasErrors && errors;
}


//For any field errors upon submission (i.e. not instant check)
const validateAndForgotPwd = (values, dispatch) => {
  return dispatch(forgotPwd(values))
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload.response) { //1st onblur
        return;
      }

      let {data, status} = result.payload.response;
      //if status is not 200 or any one of the fields exist, then there is a field error
      if (response.payload.status != 200) {
        //let other components know of error by updating the redux` state
        dispatch(forgotPwdFailure(data));
        throw data; //throw error
      } else {
        //let other components know that everything is fine by updating the redux` state
        dispatch(forgotPwdSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
      }
    });

};

class ForgotPwdForm extends Component {
  constructor() {
    super();
    this.state ={email:'',
      isOptView:false,otp: '', mobile:'',error:""};
    this.updateInput = this.updateInput.bind(this);
    this.validateAndSendOTP = this.validateAndSendOTP.bind(this);
    this.verifyOtp= this.verifyOtp;
    this.resendCount = 0;
  }

  componentDidMount() {
    this.props.resetMe();
  }

   componentDidUpdate(prevProps) {
    console.log(this.props.user);
    if (this.props.user && (this.props.user.actionType=='signup_success' || this.props.user.actionType=='otp_success')  && !(this.props.user.error) && this.props.user.usersList.users[0]) {
      this.props.setEditingUser(this.props.user.usersList.users[0]);
      this.props.changeConsole("RESET_PASSWORD");
    }
  }

  validateAndSendOTP(){
    console.log('validete and send');
  if(this.isInputsValid()){
    
    let forgotPwdObj= {
      email: this.state.email,
      mobile : this.state.mobile
    };
    this.props.sendForgotPwdOTP(forgotPwdObj);
     this.setState({
    isOptView: true
  });
  }
}
handleOtpChange = otp => this.setState({ otp });
//Client side validation
isInputsValid() {
  let error=null;
  
  if (!this.state.mobile && !this.state.email) {
    error = '* Please enter your registered email or mobile number';
  }
  console.error('err', error);
  this.setState({
    error: error
  });
  return !error?true:false;
}

  updateInput(e){
      console.log(e.target.name);
      if(e.target.name =='email'){
      this.setState({
        email : e.target.value,
        error: null
      });
      }
      else if(e.target.name =='mobile'){
        this.setState({
          mobile : e.target.value,
          error: null
        });
    }
}

  render() {

    return (
      <div>
      <ul className="nav  nav-pills ">
      <li className="small-header" role="presentation">
      <span  className='logo' ></span>
      <div style={{textAlign:'center'}}>
      <label style={{color:'#adaaaa'}}>
      {!this.state.isOptView?"Enter your registered email or phone number to receive OTP.":"Confirm OTP"}</label>
      </div>
      </li>

      </ul>
       {!this.state.isOptView && <div>
        
        <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom:'10px'}}>
         <label style={{marginBottom:'0px',color:'#6f6f6f'}} htmlFor='email'>Email Id </label>
        <input
        name="email"
        type="text"
        placeholder = "Enter your registered email Id"
        defaultValue= {this.state.email}
        onChange={e=>this.updateInput(e)}
        className={this.state.errors&&this.state.errors.email?"effect-16 has-error":"effect-16"}
        />

        <div style={{textAlign:'center',padding:'10px'}}><label style={{marginBottom:'0px',color:'#6f6f6f',position:'static'}}>OR</label></div>

       <label style={{marginBottom:'0px',color:'#6f6f6f',position:'static'}} htmlFor='mobile'>Mobile Number</label>
        <input
        name="mobile"
        type="text"
        placeholder = "Enter your registered mobile number"
        defaultValue= {this.state.mobile}
        onChange={e=>this.updateInput(e)}
        className={this.state.errors&&this.state.errors.mobile?"effect-16 has-error":"effect-16"}

        />
        </div>
        <span style={{marginTop:'10px',color:'red'}}>{this.state.error}</span>
        <div style={{textAlign:'right'}}>

          <button
                className="btn btn-primary-link" style={{marginRight:'20px'}}> CANCEL
          </button>
            <button
                  style={{marginRight:'10px'}}
                  onClick={e => this.validateAndSendOTP()}
                  className="btn btn-primary"
                  >
            SEND OTP
          </button>
          </div>
      
      </div>}

       {this.state.isOptView && <div className='otp-form'>
        <label>{this.state.mobile?'OTP sent to '+this.state.mobile:''} </label>
        <OtpInput
          onChange={this.handleOtpChange}
          numInputs={4}
          value={this.state.otp}
          separator={<span>-</span>}
        />
          <div style={{textAlign:'right'}}>
          <button
                    onClick={() => (this.resendCount <3 && this.props.resendOTP(this.state.mobile, this.resendCount), this.resendCount++)}
                    className="btn btn-primary-link"
                    style={{marginTop:'30px',marginRight:'20px',color:PrimaryColor}}
                    disabled= {this.resendCount >3 ? true :false}
                    >
                    RESEND
            </button>
           <button
                    onClick={() =>this.props.asyncVerifyOtp(this.state.mobile,this.state.otp, this.state.email)}
                    className="btn btn-primary"
                    style={{float:'right',marginTop:'30px'}}
                    >
                    Confirm
            </button>
            </div>
        </div>}
        </div>
      );

     

  }
}

export default ForgotPwdForm;
  
