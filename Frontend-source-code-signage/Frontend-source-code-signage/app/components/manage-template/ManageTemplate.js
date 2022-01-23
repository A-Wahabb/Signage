import React, { Component, PropTypes } from 'react';
import signageEmptyScreen from '../../assets/signage-empty.png';
import signageNumbGuide from '../../assets/screen-numb-guide.png';
import { Link } from 'react-router-dom';
import { reduxForm, Field, SubmissionError,initialize } from 'redux-form';
import renderField from '../renderField';
import {Loading,Title,Error,ToolTip} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER,PrimaryColor} from '../../constants/Config';
import { validatePlayerFields, validatePlayerFieldsSuccess, validatePlayerFieldsFailure } from '../../actions/posts';
import { confirmAlert } from 'react-confirm-alert';
import ReactTooltip from 'react-tooltip';
import  { Tabs,Pane } from './../Tabs';
let isScreenCodeShowing =true;


class ManageTemplate extends Component {

  constructor (props) {
    super(props);
    this.state ={setting:null
    };
    this.showRootModal= this.showRootModal.bind(this);
    this.showUsersAppsList = this.showUsersAppsList.bind(this);
    this.renderUserApps= this.renderUserApps.bind(this);
    this.renderAllowedApps= this.renderAllowedApps.bind(this);
    this.setSelection=this.setSelection.bind(this);
    this.allowAllTemplate = this.allowAllTemplate.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
  }

  componentDidMount(){
      this.setState({
        setting: this.props.user.setting
      });
    
  }

showRootModal(component, size){
  this.props.rootModal(component, size, true);
}

allowAllTemplate(setting){
  console.log('all', setting.isAllTemplateAllowed);
  setting.isAllTemplateAllowed = !setting.isAllTemplateAllowed;
  if(setting.isAllTemplateAllowed ){
    setting.allowedTemplates="";
  }
  this.setState({
    setting: setting
  });
 
}

setSelection(app){
  let setting = this.state.setting;
      if(setting.allowedTemplates.indexOf(app._id) == -1 ){
        setting.allowedTemplates = setting.allowedTemplates+','+app._id;
      }else{
        setting.allowedTemplates.replace(','+app._id,'').replace(app._id+',',"");

      }
  this.setState({
    setting: setting
  });
}

updateSettings(){
   let newSet = {};
  newSet.userId = this.state.setting.userId;
  newSet.isAllTemplateAllowed= this.state.setting.isAllTemplateAllowed;
  newSet.allowedTemplates= this.state.setting.allowedTemplates;
  this.props.updateSettings(newSet);
}

showUsersAppsList(user, userApps){
  
 let setting = this.state.setting;
  
  console.log('set new', setting);

  let apps=
    <div style={{height:'100%'}}>
    <div className="title-container" style={{height:'auto'}}>
    <h2 className="header-title">{'Manage Templates for user: '+user.name}
    </h2>
    <button
            onClick={ e => this.updateSettings() }
            className="btn-primary-link"
             style={{paddingRight:'10px',color:PrimaryColor, float:'right'}}
            > UPDATE CHANGES
            </button>
    </div>
    <div className='inner-container modal-big-scroll' style={{height:'calc(100% - 50px)'}}>
    <Tabs  selectedTab={0} >
      <Pane  label="ALLOWED PRE-DEFINED" >
        <ul id="templates" className="panel-body">
        <label style={{display:'flex',float:'right'}}  onClick={(e)=> this.allowAllTemplate(setting)}>
        <span className={this.state.setting && this.state.setting.isAllTemplateAllowed?'checked-box selected-check':'uncheck-box select-check'} style={{position:'relative',top:'0px'}} >
        
       </span>
       Allow All The Templates
       </label>
        {this.renderAllowedApps(userApps.filter( app => app.isTemplate), setting)}
        </ul>
        </Pane>

        <Pane label="USER'S CUSTOM">
        <ul id="myapps" className="panel-body">
       
        {this.renderUserApps(userApps.filter( app => app.userId == user._id))}
        </ul>
        </Pane>

        
      </Tabs>
      </div>
      </div>;
  return apps;
}

renderAllowedApps(preDefinedTemp, setting){
   console.log('set', setting);
    return <ul>{
      preDefinedTemp.map( app => {
       let appThumbnail = app && app.thumb ? (BASE_SERVER + app.thumb.replace('app-thumbnail','/thumb')) : (BASE_SERVER +'/thumb/'+ app._id+'.png');
      return <li className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item" key={app._id}>

      <div className="thumbnail apps" style={{marginBottom:'0px'}}>
      <img src={appThumbnail} alt="242x200" />
       <span className={setting && (setting.isAllTemplateAllowed ||setting.allowedTemplates.indexOf(app._id) !== -1)?'checked-box selected-check':'uncheck-box select-check'} onClick={(e)=> this.setSelection(app,setting)}>
       </span>
      </div>
      <div className="caption center-btn">
      <label><span className={app.status=='DRAFT'?'draft-icon':''}></span>{app.appName}</label>
      </div>
      </li>;
      })
    }
      </ul>;
}

renderUserApps(userApps){
    return <ul>{
      userApps.map( app => {
       let appThumbnail = app && app.thumb ? (BASE_SERVER + app.thumb.replace('app-thumbnail','/thumb')) : (BASE_SERVER +'/thumb/'+ app._id+'.png');
      return <li className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item" key={app._id}>

      <div className="thumbnail apps" style={{marginBottom:'0px'}}>
      <img src={appThumbnail} alt="242x200" />
       <span className={true?'checked-box selected-check':'uncheck-box select-check'} onClick={(e)=> this.setSelection(app)}>
       </span>
      </div>
      <div className="caption center-btn">
      <label><span className={app.status=='DRAFT'?'draft-icon':''}></span>{app.appName}</label>
      </div>
      </li>;
      })
    }
      </ul>;
}

render() {

      let temps = this.props.userApps;
      let user = this.props.user;
      console.log('mang emp');
      return <div>{this.showUsersAppsList(user, temps)}</div>;
  
}
}


export default ManageTemplate;
