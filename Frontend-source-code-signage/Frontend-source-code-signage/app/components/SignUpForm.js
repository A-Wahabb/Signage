import React, { Component, PropTypes } from 'react';
import {  Link } from 'react-router-dom';
import { reduxForm, Field, SubmissionError,reset } from 'redux-form';
import renderField from './renderField';
import renderSelect from './renderSelect';
import renderNumber from './renderNumber';
import { validateUserFields, validateUserFieldsSuccess, validateUserFieldsFailure, resetValidateUserFields } from '../actions/validateUserFields';
import { signUpUser, signUpUserSuccess, signUpUserFailure,signInUserSuccess } from '../actions/users';
import { toast } from 'react-toastify';
import {BizTypes,Provider,PrimaryColor} from '../constants/Config';
import OtpInput from "react-otp-input";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

let phonWithCode="";
//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;
  let phonePattern = /^\+[1-9]{1}[0-9]{3,14}$/;
  console.log('----signup values--', values);
  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter a name';
    hasErrors = true;

  }
  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username';
    hasErrors = true;
  }
  if (!phonWithCode || phonWithCode.trim() === '' ) {
    errors.mobile = 'Enter valid mobile number';
    hasErrors = true;
  }
  if (!values.password || values.password.trim() === '') {
    errors.password = 'Enter password';
    hasErrors = true;
  }
  if (!values.confirmPassword || values.confirmPassword.trim() === '') {
    errors.confirmPassword = 'Enter Confirm Password';
    hasErrors = true;
  }

  if (values.confirmPassword && values.confirmPassword.trim() !== '' && values.password && values.password.trim() !== '' && values.password !== values.confirmPassword) {
    errors.password = 'Password And Confirm Password don\'t match';
    errors.password = 'Password And Confirm Password don\'t match';
    hasErrors = true;
  }
  return hasErrors && errors;
}



// //For instant async server validation
const asyncValidate = (values, dispatch) => {
  values.isActive=true;
  values.age=values.age?values.age:2;
  values.mobile = phonWithCode;
  return dispatch(validateUserFields(values))
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload.response) { //1st onblur
        return;
      }

      let {data, status} = result.payload.response;

      //if status is not 200 or any one of the fields exist, then there is a field error
      if (status != 200 || data.username || data.mobile) {
        //let other components know of error by updating the redux` state
        dispatch(validateUserFieldsFailure(data));
        //throw data;
      } else {
        //let other components know that everything is fine by updating the redux` state
        
              //ps: this is same as dispatching RESET_USER_FIELDS
        //setTimeout(function(){toast.dismiss();},3000);
        dispatch(validateUserFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
      }
    });
};



//For any field errors upon submission (i.e. not instant check)
const validateAndSignUpUser = (values, dispatch) => {
   let token = sessionStorage.getItem('jwtToken');
  return dispatch(signUpUser(token,values))
    .then((result) => {

      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        toast.error("SIGN UP FAILED!");
        console.log(result.payload.response.data);
        dispatch(signUpUserFailure(result.payload.response.data));
        //throw new SubmissionError(result.payload.response.data);
      }
      else{
        let suc_message= '';
        if(!suc_message){
          suc_message ="USER SIGNED-UP SUCCESSFULLY!";
        }
        toast.success(suc_message);
        dispatch(signUpUserSuccess(result.payload.data)); 
    }
      
    });
};


class SignUpForm extends Component {
  constructor(){
    super();
    this.state ={signupMsg:"", isOptView:false,otp: '', mobile:''};
    this.verifyOtp= this.verifyOtp;
    this.setPhoneNumber = this.setPhoneNumber.bind(this);
    this.resendCount = 0;
    phonWithCode='';
  }

  componentWillMount() {
    this.props.resetMe();
  }

  setPhoneNumber(mobile){
    this.setState({mobile:mobile});
    console.log('---code--',mobile);
    phonWithCode = mobile;
  }

  componentDidUpdate(prevProps) {
    console.log(this.props.user)
    if (this.props.user && (this.props.user.actionType=='signup_success' || this.props.user.actionType=='otp_success')  && !(this.props.user.error) && this.props.user.usersList.users[0]) {
      
      this.props.resetMe();
      this.props.reset("form_singup");

      if(this.props.user.user && this.props.user.user.admin){
      this.props.changeConsole("ADMIN_DASHBOARD");
      }else if(!this.state.isOptView && !this.props.user.usersList.users[0].isMobileVerified){
        this.setState({
          isOptView:true,
          mobile:this.props.user.usersList.users[0].mobile
        });
       
      }else if(this.props.user.usersList.users[0].isMobileVerified){
         let welcomemsg =  'Welcome to '+Provider+' digital signage dashboard!'; 
         toast.success(welcomemsg);
         this.props.changeConsole("USER_DASHBOARD");
      }
    }
    
  }

  handleOtpChange = otp => this.setState({ otp });

  render() {
    
    const {asyncValidating, handleSubmit, submitting, asyncValidate, validate, asyncVerifyOtp} = this.props;
    console.log('--now signed up--', this.props)
    return (
      <div className="col-sm-12 col-md-10 col-lg-10 form">

       {!this.state.isOptView && <form onSubmit={ handleSubmit(validateAndSignUpUser) } name="form_singup" className="form-add">
          <Field
                 name="name"
                 type="text"
                 component={ renderField }
                 label="Full Name*" />
          <Field
                 name="username"
                 type="text"
                 component={ renderField }
                 label="Username*" />

          <PhoneInput
                placeholder="Enter phone number"
                value={this.state.mobile}
                defaultCountry="US"
                onChange={this.setPhoneNumber}/>

          <Field
                 name="password"
                 type="password"
                 component={ renderField }
                 label="Password*" />
          <Field
                 name="confirmPassword"
                 type="password"
                 component={ renderField }
                 label="Confirm Password*" />
          <Field
                 name="customer"
                 type="select"
                 component={ renderSelect }
                 label="Purpose "
                 ddValues={BizTypes} />

          {this.props.user.user && <div><Field
                 name="age"
                 type="number"
                 component={ renderNumber }
                 label="#Screens Allowed " />
                 </div>}

          <div style={{textAlign:'right'}}>
            <button
                    type="submit"
                    style={{float:'right',marginTop:'10px',marginBottom:'10px'}}
                    className="btn btn-primary"
                    disabled={ submitting }>
              Submit
            </button>
            
          </div>
          
        </form>}

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
                    onClick={() =>asyncVerifyOtp(this.state.mobile,this.state.otp)}
                    className="btn btn-primary"
                    style={{float:'right',marginTop:'30px'}}
                    >
                    Confirm
            </button>
            </div>
        </div>}

        { this.props.user && this.props.user.error && this.props.user.error.message  && <label style={{color:'red'}}>{this.props.user.error.message}</label>}
      
      
      
      </div>
    )
  }
}

export default reduxForm({
  form: 'SignUpForm', // a unique identifier for this form
  validate,
  reset,
  // <--- validation function given to redux-form
  asyncValidate
})(SignUpForm)
