import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {Loading,Title,Error} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER, PrimaryColor} from '../../constants/Config';

class NewIamUser extends Component {

  constructor (props) {
    super(props);
    this.state={
      iamUserName:'',
      password:'',
      errors:null
    }
    this.updateInput = this.updateInput.bind(this);
    this.validateAndSaveIamUser = this.validateAndSaveIamUser.bind(this);
    this.isInputsValid = this.isInputsValid.bind(this);
  }

  componentWillMount(){
    this.props.resetMe();
  }

  validateAndSaveIamUser(){
  console.log(this.props.user);
  if(this.isInputsValid()){
    let newIamUserObj= {
      iamUserName: this.state.iamUserName,
      iamPassword: this.state.password,
      _id: this.props.user.user._id,
      username: this.props.user.user.username,
      email: this.props.user.user.email,
      mobile: this.props.user.user.mobile,
      action:'NEW_IM'
    };
    this.props.saveIamUser(newIamUserObj);
  }
}

//Client side validation
isInputsValid() {
  let errors={};
  
  if (!this.state.iamUserName || this.state.iamUserName.trim() === '' || this.state.iamUserName.trim().length <6 ) {
    errors.iamUserName = '*Enter a valid username and should have length more than 6 ';
  }
  if (!this.state.password || this.state.password.trim() === '' || this.state.password.trim().length <6 ) {
    errors.password = '*Enter a valid password and should have length more than 6';
  }
  errors = Object.getOwnPropertyNames(errors).length == 0 ? null: errors
  this.setState({
    errors: errors
  });
  return !errors?true:false;
}

updateInput(e){
  console.log(this.state);

    if(e.target.name =='iamUser'){
    this.setState({
      iamUserName : e.target.value,
      errors: null
    });
  }
  if(e.target.name =='passwordinput'){
    this.setState({
      password : e.target.value,
      errors: null
    });
  }
}

render() {

  var  newUserCreateForm=
  (<div><div className="col-sm-12 col-md-12 col-lg-12">
      <label style={{marginBottom:'0px',color:'#6f6f6f'}} htmlFor='iamUser'>I Am Username *</label>
      <input
        name="iamUser"
        type="text"
        placeholder = "Enter I Am username"
        defaultValue= {this.state.iamUserName}
        onChange={e=>this.updateInput(e)}
        className={this.state.errors && this.state.errors.iamUserName?"effect-16 has-error":"effect-16"}
        />

      </div>
      <div className="col-sm-12 col-md-12 col-lg-12">
        <label style={{marginTop:'10px',color:'#6f6f6f'}} htmlFor='passwordinput'>Password *</label>
      <input
        name="passwordinput"
        type="text"
        placeholder = "Enter password for I am user"
        defaultValue= {this.state.password}
        onChange={e=>this.updateInput(e)}
        className={this.state.errors && this.state.errors.password?"effect-16 has-error":"effect-16"}
        />

    <span style={{marginTop:'10px',color:'red'}}>{this.state.errors && this.state.errors.iamUserName?this.state.errors.iamUserName:""}</span>
    <span style={{marginTop:'10px',color:'red'}}>{this.state.errors && this.state.errors.password?this.state.errors.password:""}</span>
    
    <div className="btn-footer">
      <button
      onClick={ e => this.props.closeModalPopup() }
      className="btn-primary-link"
      style={{paddingRight:'10px'}}
      > CANCEL
      </button>
      <button
      onClick={ e => this.validateAndSaveIamUser() }
      className="btn btn-primary "
      disabled={!this.state.iamUserName || !this.state.password || this.state.errors}> SAVE
      </button>
    </div>
 
  </div></div>);

  return (<div>
      <div className='col-lg-12 col-md-12 col-sm-12'>
      <Title title={'NEW I AM USER'}/>
      {newUserCreateForm}
      </div>
      </div>)
  }
}


export default NewIamUser;
