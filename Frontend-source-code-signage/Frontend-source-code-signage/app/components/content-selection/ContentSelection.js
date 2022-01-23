import React, { Component, PropTypes } from 'react';
import signageEmptyScreen from '../../assets/signage-empty.png';
import signageNumbGuide from '../../assets/screen-numb-guide.png';
import { Link } from 'react-router-dom';
import { reduxForm, Field, SubmissionError,initialize } from 'redux-form';
import renderField from '../renderField';
import {Loading,Title,Error,ToolTip} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER} from '../../constants/Config';
import { validatePlayerFields, validatePlayerFieldsSuccess, validatePlayerFieldsFailure } from '../../actions/posts';
import { confirmAlert } from 'react-confirm-alert';
import ReactTooltip from 'react-tooltip';
let isScreenCodeShowing =true;


class ContentSelection extends Component {

  constructor (props) {
    super(props);
    this.state={
      isDontHvCode: false,
      screenName:'',
      screenNumber:'',
      errors:null

    }
  }

  componentDidMount(){
      ReactTooltip.rebuild();

  }

goToDashboard(){
  this.props.resetMe();
  this.props.changeConsole(this.props.backConsole);
}

toggleScreenCode(){

      isScreenCodeShowing = this.state.isDontHvCode;
      this.setState({
        isDontHvCode:!this.state.isDontHvCode
      });
}

validateAndSavePlayer(){
  if(!this.isInputsValid()){
    console.log('save');
    let newPlayerObj= {
      playerName: this.state.screenName,
      screenNumber : this.state.screenNumber
    };
    this.props.savePlayer(newPlayerObj);
    this.props.closeModalPopup();
  }
}

//Client side validation
isInputsValid() {
  const errors = null;
  
  if (!this.state.screenName || this.state.screenName.trim() === '') {
    errors.screenName = 'Enter a player name';
  }

  if(isScreenCodeShowing){
      console.log('screen code show');
      if ( !this.state.screenNumber || this.state.screenNumber.trim() == '' ) {
        errors.screenNumber = 'Enter Screen Code ';
      }
      
      if (isScreenCodeShowing && this.state.screenNumber  && this.state.screenNumber.trim() != '' && isNaN(this.state.screenNumber)) {
        errors.screenNumber = 'Enter only numbers';
      }
  }
  this.setState({
    errors: errors
  });
  return errors;
}

updateInput(e){
  console.log(e.target.name);
  if(e.target.name =='playerName'){
  this.setState({
    screenName : e.target.value
  });
  }
  else if(e.target.name =='screenNumber')
    this.setState({
      screenNumber : e.target.value
    });
}

render() {

  var  contentDetail=
  <div className="col-sm-12 col-md-12 col-lg-12 big">
        <div className='col-sm-12 col-md-4 col-lg-4' style={{marginBottom:'20px',textAlign:'center'}}>
        <a href='#' onClick={(event) => (this.props.toggleContentSelection(), this.props.setContentType(event,'PLAYLIST'))}>
        <span className={"glyphicon glyphicon-list"} style={{left:'0px'}}  >
        </span>
        <div>PLAYLIST</div>
        </a></div>

        <div className='col-sm-12 col-md-4 col-lg-4' style={{marginBottom:'20px'}}>
            <a href='#' onClick={(event) => (this.props.toggleContentSelection(), this.props.setContentType(event,'TEMPLATE'))}>
            <span className={"template"}  style={{left:'0px'}}  >
            </span>
            <div >TEMPLATE</div>
        </a></div>
        
        <div className='col-sm-12 col-md-4 col-lg-4' style={{marginBottom:'20px'}}>
        <a href='#' onClick={(event) => (this.props.toggleContentSelection(), this.props.setContentType(event,'WEBPAGE'))}>
        <span className={"weburl"} style={{left:'0px'}}  ><span style={{background:'#fff'}}>WWW</span>
        </span>
        <div >WEB PAGE</div>
        </a></div>

        <div className='col-sm-12 col-md-4 col-lg-4' style={{marginBottom:'20px'}}>
        <a href='#' onClick={(event) => (this.props.toggleContentSelection(), this.props.setContentType(event,'WEBPAGE'))}>
        <span className={"weburl"} style={{left:'0px'}}  >
        <span style={{background:'#fff'}}>LIVE</span>
        </span>
        <div >STREAM</div>
        </a></div>

        <div className='col-sm-12 col-md-4 col-lg-4' style={{marginBottom:'20px'}}>
        <a href='#' onClick={(event) => (this.props.toggleContentSelection(), this.props.setContentType(event,'SCHEDULE'))}>
        <span className={"glyphicon glyphicon-calendar"} style={{left:'0px'}}  >
        </span>
        <div >SCHEDULE</div>
        </a></div>
 
  </div>;

  return (
  <div>
    
    <div className='col-lg-12 col-md-12 col-sm-12'>
    <Title title={'SELECT CONTENT TYPE'} 
    InfoIcon={<span className="glyphicon glyphicon-info-sign guide-icon" data-tip={'[*PLAYLIST]- A list of media with duration as simple slideshow. [ **TEMPLATE** ] - if you wish to show, a layout based content. [ **WEBPAGE** ] - It will load webpage mentioned on your screen. [ **LVE STREAM** ] -you can assign any streaming url like rstp://, rtmp:// or http:// for http link in streaming mention like "shttp". [ **SCHEDULES** ] - Assign Scheduled content for screen.'} ></span>} />
    {this.props.selectedPlayer.playerName?
      <span>Please select content type, you'd like to assign on screen- {this.props.selectedPlayer.playerName}</span>
      :
      <span>Please select content type to schedule-</span>}
    {contentDetail}
    <ReactTooltip />
    </div>
    </div>
  )
}
}


export default ContentSelection;
