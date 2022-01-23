import React , { Component } from 'react';
import { reduxForm, Field, SubmissionError,reset } from 'redux-form';
import renderField from './renderField';
import { validateUserFields, validateUserFieldsSuccess, validateUserFieldsFailure, resetValidateUserFields } from '../actions/validateUserFields';
import { editingUser, editingUserSuccess, editingUserFailure, } from '../actions/users';
import { toast } from 'react-toastify';


//Client side validation
function validate(values) {
  var errors = {};
  var hasErrors = false;

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
  return dispatch(validateUserFields(values))
    .then((result) => {
      //Note: Error's "data" is in result.payload.response.data
      // success's "data" is in result.payload.data
      if (!result.payload.response) { //1st onblur
        return;
      }

      let {data, status} = result.payload.response;

      if (status != 200 || data.username || data.email) {
        dispatch(validateUserFieldsFailure(data));
        throw data;
      } else {
        dispatch(validateUserFieldsSuccess(data)); //ps: this is same as dispatching RESET_USER_FIELDS
      }
    });
};

//For any field errors upon submission (i.e. not instant check)
const validateAndUpdateNewPassword = (values, dispatch) => {
let token = sessionStorage.getItem('jwtToken');
  return dispatch(editingUser(values,token))
    .then((result) => {

      if (result.payload.response && result.payload.response.status !== 200) {
        toast.error('NEW PASSWORD SAVE FAILED!!');
        dispatch(editingUserFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }

      toast.success('NEW PASSWORD SAVED!!');
      dispatch(editingUserSuccess(result.payload.data)); 
      
    });
};


class UserNewPassword extends Component {
  constructor(){
    super();
    this.state ={editUserMsg:"",userName:""};
  }

  componentWillMount() {
    //this.props.resetMe();
  }

  componentWillReceiveProps(nextProps) {
    
    if (this.props.user.actionType==='edit_user' && nextProps.user.actionType === 'edit_user_success' && nextProps.editingUser.user && !nextProps.editingUser.error) {
      this.setState({
        editUserMsg:"New Password updated Successfully!!"
      });

      this.props.reset("form_new_password");
      if(!this.props.user.user.admin){
      this.props.changeParentConsole("USER_DASHBOARD");
      }
    }
    else if(this.props.user.actionType==='edit_user' && nextProps.user.actionType === 'edit_user_failed' && nextProps.editingUser.error){
      this.setState({
        editUserMsg:"New Password update Failed!!"
      });
    }
    if(this.props.editingUser && this.props.editingUser.user && this.props.editingUser.user.name){
      this.setState({
userName:this.props.editingUser.user.name
      });
    }
  }

  goToDashboard(evt) {
    evt && evt.preventDefault();
    this.props.resetMe();
    this.setState({
      editUserMsg:""
    });
    this.props.fetchUsers();
    this.props.changeConsole('USER_LIST');
  }

  render() {
    const {asyncValidating, handleSubmit, submitting, asyncValidate, validate,editingUser} = this.props;
    
    return (
      <div className="col-sm-12 col-md-10 col-lg-6 form">
        <form onSubmit={ handleSubmit(validateAndUpdateNewPassword) } name="form_new_password">
        <h4>{'Set New Password for User - '+ this.state.userName}</h4>
        <br/>
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
  form: 'UserNewPassword', // a unique identifier for this form
  validate,
  reset,
  // <--- validation function given to redux-form
  asyncValidate
})(UserNewPassword);
