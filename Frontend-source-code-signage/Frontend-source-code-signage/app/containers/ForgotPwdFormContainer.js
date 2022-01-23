import ForgotPwdForm from '../components/ForgotPwdForm.js';
import { connect } from 'react-redux';
import { signUpUser, signUpUserSuccess, signUpUserFailure,signInUserSuccess, validateOpt,validateOptSuccess, validateOptFailure,resendOTP,editingUserSuccess } from '../actions/users';
import { changeSelectedConsole, changeParentConsole,selectedConsole } from '../actions/popup';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
   resetMe: () =>{
    //sign up is not reused, so we dont need to resetUserFields
    //in our case, it will remove authenticated users
     // dispatch(resetUserFields());
    },
    changeConsole: (consoleName) =>{
      console.log("--CHANGE CONSOLE--", consoleName);
         dispatch(changeSelectedConsole(''));
      return dispatch(changeParentConsole(consoleName));
    },

    sendForgotPwdOTP: (forgotPwdObj) => {

      dispatch(resendOTP(forgotPwdObj.mobile, forgotPwdObj.email));
    },

    setEditingUser: (userToEdit) => {
     return dispatch(editingUserSuccess(userToEdit));
    },

    asyncVerifyOtp:  (mob,otp, email) => {

    return dispatch(validateOpt(mob, otp, email))
    .then((result) => {
     console.log('result', result);
      if (!result.payload) { //1st onblur
        return;
      }

      let {data, status, response} = result.payload;

      console.log('data', data);
      if (status != 200 || !data.user || !data.user.isMobileVerified) {
        toast.error('WRONG OTP!!');
        dispatch(validateOptFailure(response.data));
        //throw data;
      } else {
       if(data.token){
          if(localStorage.getItem('temptknsv')){
          localStorage.setItem('temptkn',data.token);
         }
         sessionStorage.setItem('jwtToken', data.token);
         dispatch(editingUserSuccess(data.user));
         dispatch(validateOptSuccess(data)); 
         dispatch(signInUserSuccess(data));
       
        }
        

      }
      });
      }

  }
}


function mapStateToProps(state, ownProps) {
  return { 
    common: ownProps.common,
    user: state.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwdForm);
