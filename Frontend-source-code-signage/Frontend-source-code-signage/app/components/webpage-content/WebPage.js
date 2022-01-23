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


class WebPage extends Component {

  constructor (props) {
    super(props);
    this.state={
      url:'',
      errors:null

    }
  }

  componentDidUpdate(prevProps){
      ReactTooltip.rebuild();
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
    if(this.props.onSave){
      this.props.onSave(this.state.url);
      this.props.closeModalPopup();
    }
    else{
    let selectedPlayer= this.props.selectedPlayer;
        selectedPlayer.status='PENDING';
        selectedPlayer.appId=this.state.url; 
        if(this.state.url && (this.state.url.startsWith('rtsp') ||this.state.url.startsWith('rtmp')||this.state.url.startsWith('shttp'))){
          selectedPlayer.contentType='STREAM';
        }else{
          selectedPlayer.contentType='WEBPAGE';
        }
        console.log('final publish',selectedPlayer);
      this.props.publishToSreens([selectedPlayer]);
    this.props.closeModalPopup();
    }
  }
}

//Client side validation
isInputsValid() {
  let errors={};
  
  if (!this.state.url || this.state.url.trim() === '') {
    errors.screenName = '* Enter webpage url';
  }

  errors = Object.getOwnPropertyNames(errors).length == 0 ? null: errors
  this.setState({
    errors: errors
  });
  return !errors?true:false;
}

updateInput(e){
  console.log(e.target.name);
  if(e.target.name =='url'){
  this.setState({
    url : e.target.value,
    errors: null
  });
  }
}

render() {

  var  webpageDetail=
  <div className="col-sm-12 col-md-12 col-lg-10">
      <label style={{marginBottom:'0px',color:'#6f6f6f',paddingLeft:'0px'}} className="col-sm-12 col-md-12 col-lg-10" for='url'>Webpage Url*</label>
      <input
        name="url"
        type="url"
        placeholder = "https://www.google.com"
        defaultValue= {this.state.url}
        onChange={e=>this.updateInput(e)}
        className={this.state.errors&&this.state.errors.url?"col-sm-12 col-md-12 col-lg-10 effect-16 has-error":" col-sm-12 col-md-12 col-lg-10 effect-16"}
        />
    <span style={{marginTop:'10px',color:'red'}}>{this.state.errors && this.state.errors.url?this.state.errors.url:""}</span>
    
    <div className="btn-footer" style={{marginTop:'20px'}}>
      <button
      style={{color:this.props.themeColor}}
      onClick={ e => this.validateAndSavePlayer() }
      className="btn btn-primary-link "
      disabled={!this.state.url || this.state.errors}> {this.props.onSave?"ADD":"SAVE & PUBLISH"}
      </button>
    </div>
 
  </div>;

  return (
  <div>
    
    <div className='col-lg-12 col-md-12 col-sm-12'>
    <Title title={'ENTER WEB PAGE URL/LINK'} InfoIcon={<span className="glyphicon glyphicon-info-sign guide-icon" data-tip={'[*Webpage]- Any webpage starts http:// Or https:// format'} ></span>}/>
    {webpageDetail}
    <ReactTooltip />
    </div>
    </div>
  )
}
}


export default WebPage;
