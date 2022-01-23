import React, { Component } from 'react';
import SignUpFormContainer from '../containers/SignUpFormContainer.js';

class SignUpPg extends Component {

  render() {
  	let isAdmin = this.props.user && this.props.user.user? this.props.user.user.admin: false;
    let isUserSignedUp =this.props.user.usersList.users.length>0?true:false;
  	let isMobileVerified = isUserSignedUp? this.props.user.usersList.users[0].isMobileVerified: false;
    console.log('--sign up--',this.props.user);
    let comp=null;
  	if(!isAdmin){
  		comp = <div className="login-bg">

      <div className="col-sm-12 col-md-4 col-lg-5 center-container">
  		{!isUserSignedUp && <h4 style={{textAlign:'center'}}>{"Sign Up"}</h4>}
  		{isUserSignedUp && !isMobileVerified && <h4 style={{textAlign:'center'}}>{"Confirm OTP"}</h4>}
      <SignUpFormContainer user= {this.props.user}  common={this.props.common}/>
  		</div>
  		</div>

  	}
  	else{
    return (
      
      comp=  <SignUpFormContainer />
    );
    }
    return comp;
  }
}


export default SignUpPg;
