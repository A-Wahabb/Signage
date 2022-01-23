import SignUpForm from '../components/SignUpForm.js';
import { resetValidateUserFields } from '../actions/validateUserFields';
import { connect } from 'react-redux';
import { changeSelectedConsole, changeParentConsole,selectedConsole } from '../actions/popup';
import { signUpUser, signUpUserSuccess, signUpUserFailure,signInUserSuccess, validateOpt,validateOptSuccess, validateOptFailure,resendOTP } from '../actions/users';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetValidateUserFields());
    },
    changeConsole: (consoleName) =>{
      console.log("--CHANGE CONSOLE--", consoleName);
         dispatch(changeSelectedConsole(''));
      return dispatch(changeParentConsole(consoleName));
    },

    resendOTP: (mob, count) => {

      dispatch(resendOTP(mob));
    },
    
    asyncVerifyOtp:  (mob,otp) => {

    return dispatch(validateOpt(mob, otp))
    .then((result) => {
     console.log('result', result);
      if (!result.payload) { //1st onblur
        return;
      }

      let {data, status, response} = result.payload;

      console.log('data', data);
      if (status != 200 || !data.user || !data.user.isMobileVerified) {
        
        dispatch(validateOptFailure(response.data));
        //throw data;
      } else {
       if(data.token){
          if(localStorage.getItem('temptknsv')){
          localStorage.setItem('temptkn',data.token);
         }
          sessionStorage.setItem('jwtToken', data.token);
         dispatch(validateOptSuccess(data)); 
         dispatch(signInUserSuccess(data))
        }
        

      }
      });
      }
  }
}


function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    validateFields: state.validateFields,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);