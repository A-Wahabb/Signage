import React, { Component, PropTypes } from 'react';
import signageEmptyScreen from '../../assets/signage-empty.png';
import signageNumbGuide from '../../assets/screen-numb-guide.png';
import { Link } from 'react-router-dom';
import { reduxForm, Field, SubmissionError,initialize } from 'redux-form';
import renderField from '../renderField';
import {Loading,Title,Error} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER} from '../../constants/Config';
import { validatePlayerFields, validatePlayerFieldsSuccess, validatePlayerFieldsFailure } from '../../actions/posts';
import ReactTooltip from 'react-tooltip';
let isScreenCodeShowing =true;


class NewPlayer extends Component {

  constructor (props) {
    super(props);
    this.state={
      isDontHvCode: false,
      screenName:'',
      screenNumber:'',
      errors:null

    }
  }

  componentWillMount(){
    this.props.resetMe();
  }

  componentDidUpdate(prevProps){
      ReactTooltip.rebuild();
      if(!prevProps.newPlayer.player && this.props.newPlayer.player && this.props.newPlayer.player._id){
        this.props.toggleNewPlayer();
        this.props.toggleContentSelection(this.props.newPlayer.player);
      }

  }

goToDashboard(){
  this.props.resetMe();
  this.props.changeConsole(this.props.backConsole);
}

toggleScreenCode(){

      isScreenCodeShowing = this.state.isDontHvCode;
      this.setState({
        isDontHvCode:!this.state.isDontHvCode,
        errors: null,
        screenNumber :null
      });
}

validateAndSavePlayer(){
  if(this.isInputsValid()){
    console.log('save');
    let newPlayerObj= {
      playerName: this.state.screenName,
      screenNumber : this.state.screenNumber
    };
    this.props.savePlayer(newPlayerObj);
  }
}

//Client side validation
isInputsValid() {
  let errors={};
  
  if (!this.state.screenName || this.state.screenName.trim() === '') {
    errors.screenName = '* Enter a player name';
  }

  if(isScreenCodeShowing){
      console.log('screen code show');
      if ( !this.state.screenNumber || this.state.screenNumber.trim() == '' ) {
        errors.screenNumber = '* Enter Screen Code ';
      }
      
      if (isScreenCodeShowing && this.state.screenNumber  && this.state.screenNumber.trim() != '' && isNaN(this.state.screenNumber)) {
        errors.screenNumber = '* Enter only numbers';
      }
  }
  errors = Object.getOwnPropertyNames(errors).length == 0 ? null: errors
  this.setState({
    errors: errors
  });
  return !errors?true:false;
}

updateInput(e){
  console.log(e.target.name);
  if(e.target.name =='playerName'){
  this.setState({
    screenName : e.target.value,
    errors: null
  });
  }
  else if(e.target.name =='screenNumber'){
    this.setState({
      screenNumber : e.target.value,
      errors: null
    });
    }
}

render() {

  var  playerDetail=
  <div className="col-sm-12 col-md-12 col-lg-12">
      <label style={{marginBottom:'0px',color:'#6f6f6f'}} htmlFor='playerName'>Screen Name *</label>
      <input
        name="playerName"
        type="text"
        placeholder = "Enter a screen name"
        defaultValue= {this.state.screenName}
        onChange={e=>this.updateInput(e)}
        className={this.state.errors&&this.state.errors.screenName?"effect-16 has-error":"effect-16"}
        />

      {!this.state.isDontHvCode && 
      <div>
        <label style={{marginBottom:'0px',color:'#6f6f6f',marginTop:'20px'}} for='screenNumber'>Six Digit Screen Id</label>  
        <input
        name="screenNumber"
        type="text"
        placeholder = "Enter the screen ID which appears on your screen"
        onChange={e=>this.updateInput(e)}
        className={this.state.errors&&this.state.errors.screenNumber?"effect-16 has-error":"effect-16"}
        defaultValue= {this.state.screenNumber}
        />
      </div>
      }
  
    <div className="check-small-container" style={{color:'#6f6f6f',marginTop:'10px'}}>
      <span style={{marginLeft:'0px'}} className={this.state.isDontHvCode?'checked-box':'uncheck-box'} onClick={(e)=> this.toggleScreenCode()}>
       </span>
       <span style={{marginLeft:'5px',fontWeight:'bold',
    color: '#6d6d6d'}} className='lbl-check' onClick={(e)=> this.toggleScreenCode()}> I don't have screen Id now!
       </span>
    </div>
    <span style={{marginTop:'10px',color:'red'}}>{this.state.errors && this.state.errors.screenName?this.state.errors.screenName:""}</span>
    <span style={{marginTop:'10px',color:'red'}}>{this.state.errors && this.state.errors.screenNumber?this.state.errors.screenNumber:""}</span>
    <div className="btn-footer">
      <button
      onClick={ e => this.props.closeModalPopup() }
      style={{paddingRight:'10px'}}
      className="btn-primary-link"
      > CANCEL
      </button>
      <button
      onClick={ e => this.validateAndSavePlayer() }
      style={{backgroundColor:this.props.themeColor}}
      className="btn btn-primary "
      disabled={!this.state.screenName || (!this.state.isDontHvCode && !this.state.screenNumber)  || this.state.errors}> SAVE
      </button>
    </div>
 
  </div>;

  return (
  <div>
    
    <div className='col-lg-12 col-md-12 col-sm-12'>
    <Title title={'ENTER NEW SCREEN DETAILS'} InfoIcon={<span className="glyphicon glyphicon-info-sign guide-icon" data-tip={'[*Screen Name]- Here enter any name for your screen.[Screen Number] - SIX digit code on screen, once player app is launched. Otherwise select checkbox below'} ><img src={signageNumbGuide} alt="142x100" className="tooptip-img"/></span>}/>
    {playerDetail}
    </div>
    </div>
  )
}
}


export default NewPlayer;
