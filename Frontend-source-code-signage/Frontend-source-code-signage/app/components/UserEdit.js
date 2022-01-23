import React , { Component } from 'react';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import renderField from './renderField';
import renderSelect from './renderSelect';
import renderNumber from './renderNumber';
import { validateUserFields, validateUserFieldsSuccess, validateUserFieldsFailure, resetValidateUserFields } from '../actions/validateUserFields';
import { editingUser, editingUserSuccess, editingUserFailure, } from '../actions/users';
import { toast } from 'react-toastify';


//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;

  if (!values.name || values.name.trim() === '') {
    errors.name = 'Enter a name';
    hasErrors = true;
  }
  if (!values.username || values.username.trim() === '') {
    errors.username = 'Enter username';
    hasErrors = true;
  }
  if (!values.email || values.email.trim() === '') {
    errors.email = 'Enter email';
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
  console.log(values);
  return true;
  // return dispatch(validateUserFields(values))
  //   .then((result) => {
  //     //Note: Error's "data" is in result.payload.response.data
  //     // success's "data" is in result.payload.data
  //     if (!result.payload.response) { //1st onblur
  //       return;
  //     }

  //     let {data, status} = result.payload.response;

  //     if (status != 200 || data.username || data.email) {
  //       dispatch(validateUserFieldsFailure(data));
  //       throw data;
  //     } else {
  //       dispatch(validateUserFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
  //     }
  //   });
};

//For any field errors upon submission (i.e. not instant check)
const validateAndUpdateEditUser = (values, dispatch) => {
  let token =sessionStorage.getItem('jwtToken');
  return dispatch(editingUser(values,token))
    .then((result) => {

      if (result.payload.response && result.payload.response.status !== 200) {
        toast.error("CLIENT UPDATE FAILED!!")
        dispatch(editingUserFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }

      toast.success("CLIENT UPDATED!!")
      dispatch(editingUserSuccess(result.payload.data)); 
      
    });
};


class UserEdit extends Component {
  constructor(){
    super();
    this.state ={editUserMsg:""};
  }

  componentWillMount() {
    this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    
    if (this.props.user.actionType==='edit_user' && nextProps.user.actionType === 'edit_user_success' && nextProps.editingUser.user && !nextProps.editingUser.error) {
      this.setState({
        editUserMsg:"Client updated Successfully!!"
      });
    }
    else if(this.props.user.actionType==='edit_user' && nextProps.user.actionType === 'edit_user_failed' && nextProps.editingUser.error){
      this.setState({
        editUserMsg:"Client update Failed!!"
      });
    }
  }

  goToDashboard(evt) {
    evt && evt.preventDefault();
    this.props.resetMe();
    this.setState({
      editUserMsg:""
    });
    this.props.changeConsole('USER_LIST');
  }

  render() {
    const {asyncValidating, handleSubmit, submitting, asyncValidate, validate} = this.props;
    let optionsIsActive=['True','False'];
    let optionsMobileVerify= ['true','false'];
    let optionsStatus = ['DEMO', 'PAID'];
    let bizType=['Corporates','Education','Entertainment','Events','Fitness','Financial', 'Healthcare', 'Hospitality','Manufacturing','Restaurant','Retails','Supermarket','Salon','Transport','Others'];
    return (
      <div className="col-sm-12 col-md-10 col-lg-6 form">
        <form onSubmit={ handleSubmit(validateAndUpdateEditUser) } className="form-add">
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
          <Field
                 name="email"
                 type="email"
                 component={ renderField }
                 label="Email*" />
          <Field
                 name="website"
                 type="website"
                 component={ renderField }
                 label="Website" />
          <Field
                 name="mobile"
                 type="text"
                 component={ renderField }
                 label="Phone Number" />

          <Field
                 name="isMobileVerified"
                 type="select"
                 component={ renderSelect }
                 label="Mobile Number Verified ?"
                 ddValues={optionsMobileVerify} />
                 <h2>{''}</h2>

          <Field
                 name="address"
                 type="text"
                 component={ renderField }
                 label="Address" />


          <Field
                 name="isActive"
                 type="select"
                 component={ renderSelect }
                 label="Is User Active?"
                 ddValues={optionsIsActive} />
                 <h2>{''}</h2>
          <Field
                 name="customer"
                 type="select"
                 component={ renderSelect }
                 label="Biz Domain"
                 ddValues={bizType} />

         <Field
                 name="age"
                 type="number"
                 component={ renderNumber }
                 label="Total Screens Allowed " />

          <Field
                 name="status"
                 type="select"
                 component={ renderSelect }
                 label="Billing Status"
                 ddValues={optionsStatus} />


          <Field
                 name="numberOfDemoDays"
                 type="number"
                 component={ renderNumber }
                 label="Number of Demo Days (if under Demo) " />

          
                 
          <div>
                
            <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={ submitting }>Submit
            </button>
            
            
            
          </div>
          <div className={this.props.user.actionType === 'edit_user_success'?"orange":"green"}><h3>{this.state.editUserMsg}</h3></div>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'UserEdit', // a unique identifier for this form
  validate
})(UserEdit);
