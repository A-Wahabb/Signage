import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {Loading,Title,Error} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER} from '../../constants/Config';
import  { Tabs,Pane } from './../Tabs';

import FileUploadContainer from './../file-upload/file-upload-container.js'; 

import Dropdown, {
          DropdownToggle,
          DropdownMenu,
          DropdownMenuWrapper,
          MenuItem,
          DropdownButton
} from '@trendmicro/react-dropdown';

class Settings extends Component {

  constructor (props) {
    super(props);
    this.state={
      errors:null,
      settings: this.props.settings,
      selectedFileName:"Select Files to replace"
    }
  }

  componentWillMount(){
    this.props.resetMe();
    console.log(this.props.settings);
  }

   componentDidUpdate(prevProps){
      
    

  }

  validateAndSaveSchedule(){
  if(this.isInputsValid()){
    console.log('save');
    let newSchedulerObj= {
      scheduleName: this.state.scheduleName,
     
    };
    this.props.saveSchedule(newSchedulerObj);
  }
}

//Client side validation
isInputsValid() {
  let errors={};
  
  if (!this.state.scheduleName || this.state.scheduleName.trim() === '') {
    errors.screenName = '* Enter a schedule name';
  }
  errors = Object.getOwnPropertyNames(errors).length == 0 ? null: errors
  this.setState({
    errors: errors
  });
  return !errors?true:false;
}

updateInput(e){
  console.log(e.target.name);
    let newSetting= this.state.settings;
    if(e.target.name == 'primary-color'){
    newSetting.color_primary = e.target.value;
    }
    else if(e.target.name == 'second-color'){
    newSetting.color_secondary = e.target.value;
    }
    else if(e.target.name == 'third-color'){
    newSetting.color_tirnary = e.target.value;
    }
  this.setState({
      settings : newSetting
    });
}

updateSettings(){
  let newUpdate={
    color_primary: this.state.settings.color_primary,
    color_secondary: this.state.settings.color_secondary,
    color_tirnary: this.state.settings.color_tirnary
  }
  console.log(newUpdate);
  this.props.updateSettings(newUpdate);
}

getFilesList(){

  return(
     <span className='menu-arrow glyphicon'>
          <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
      <Dropdown.Toggle title={this.state.selectedFileName} />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>

           <MenuItem onClick={()=> true}>
              <label className="glyphicon glyphicon-usd"  ></label>
              <span>CMS Bundle file</span>
            </MenuItem>

        
            <MenuItem onClick={()=>true}>
              <span className="glyphicon glyphicon-cog"  ></span><span>CMS STYLE file</span>
            </MenuItem>

          <MenuItem onClick={(e)=> true}>
              <span className="glyphicon glyphicon-cog"  ></span><span>{'CMS ASSETS IMAGES'}</span>
            </MenuItem>
            

        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>
      );

}

render() {
  let user = this.props.user;
  var  settingsTab=
        (<div className='settings-panel'>
            <Tabs  >
        
            <Pane  label="BASIC" >
              <ul id="theme" className="setting-body">
                <Loading/>
                <h4>{'SET THEME COLORS'}</h4>
                <label for='primary-color'>Primary Color</label>
                <input id='primary-color' value={this.state.settings.color_primary} onChange={(e)=>this.updateInput(e)} name='primary-color' type='color' />
                <label for='second-color'>Second Color</label>
                <input id='second-color' onChange={(e)=>this.updateInput(e)} value={this.state.settings.color_secondary} name='second-color' type='color' />
                <label for='third-color'>Third Color</label>
                <input id='third-color' onChange={(e)=>this.updateInput(e)} value={this.state.settings.color_tirnary} name='third-color' type='color' />
                </ul>
                {user.user.admin && 
                  <ul className="setting-body">
                 <h4>{'SET LOGO'}</h4>
                  <div style={{borderBottom:'1px solid #e6e4e4'}}>
                  <div><label>{'Set new logo image here for dashboard. Recommended dimension is 3:1'}</label></div>
                  <img style={{width:'200px',height:'auto'}} src={BASE_SERVER+'/assets/logo-24-wrk-space.png'}/>
                  <FileUploadContainer id='logo-dashboard'
                  replacePathCode='DASHBOARD-LOGO'
                  themeColor={this.state.settings.color_primary}/></div>

                   <div style={{borderBottom:'1px solid #e6e4e4'}}>
                   <div><label>{'Set logo image for signIn page. Recommended dimension is 2:1'}</label></div>
                  <img style={{width:'200px',height:'auto'}} src={BASE_SERVER+'/assets/logo-40-md-wrk-spc.png'}/>
                <FileUploadContainer id='logo-signin'
                replacePathCode='SIGNIN-LOGO'
                themeColor={this.state.settings.color_primary}/></div>

                <div style={{borderBottom:'1px solid #e6e4e4'}}>
                  <div><label>{'Set logo image for dark theme( dimension is 3:1'}</label></div>
                  <img style={{width:'200px',height:'auto'}} src={BASE_SERVER+'/assets/logo-dark.png'}/>
                <FileUploadContainer id='logo-dark-signin'
                replacePathCode='DASHBOARD-LOGO-DARK'
                themeColor={this.state.settings.color_primary}/>
                </div>

                <div style={{borderBottom:'1px solid #e6e4e4'}}>
                  <div><label>{'Set favicon icon for tab'}</label></div>
                  <img style={{width:'32px',height:'auto'}} src={BASE_SERVER+'/assets/favicon.png'}/>
                <FileUploadContainer id='favicon'
                replacePathCode='SIGNAGE-ICON-TAB'
                themeColor={this.state.settings.color_primary}/>
                </div>

                <div style={{borderBottom:'1px solid #e6e4e4'}}>
                <h4>{'CMS LOGIN BACKGROUND '}</h4>
                <div ><label>{'Set CMS default background Image. Recommended is any large image (e.g. 2800 * 1880px)'}</label></div>
                  <img style={{width:'200px',height:'auto'}} src={BASE_SERVER+'/assets/login.jpg'}/>
                <FileUploadContainer 
                replacePathCode='CMS-BG'
                themeColor={this.state.settings.color_primary}/>
                </div>

                <div style={{borderBottom:'1px solid #e6e4e4'}}>
                  <h4>{'SET QUICK DEMO VIDEO '}</h4>
                  <div>
                   <label>{'Set quick demo video (supported format .mp4, any any size is fine)'}</label>
                   </div>
                  <div>
                    <video src={BASE_SERVER+'/preview/help/client-quick-guide.mp4'} width='576px' loop controls />
                    <FileUploadContainer id='quick-video'
                replacePathCode={'QUICK-DEMO-VIDEO'}
                themeColor={this.state.settings.color_primary}/>
                  </div>
                  </div>

                 <h4>{'PLAYER APP BACKGROUND'}</h4> 
                 <div><label>{'Set PLayer default background Image. Recommended dimension is 16:9 (best fit- 1920px * 1080px)'}</label></div>
                  <img style={{width:'200px',height:'auto'}} src={BASE_SERVER+'/assets/player-bg.png'}/>
                <FileUploadContainer 
                replacePathCode='PLAYER-BG'
                themeColor={this.state.settings.color_primary}/>
                </ul>}
                <button
               style={{color:this.state.settings.color_primary,position:'absolute',right:'20px',bottom:'10px'}}
              className="btn btn-primary"
              onClick={(evt) => this.updateSettings()}>
              {'SAVE'}
            </button>
                </Pane>
              
              {user.user.admin && <Pane  label="RESOURCES" >

                <ul id="files" className="panel-body">
                <Loading/>
                <div style={{borderBottom:'1px solid #e6e4e4'}}>
                  <h4>{'HELP PDF & VIDEO'}</h4>
                  <div>
                   <label>{'How to setup hardware and instructions (format: .pdf file)'}</label>
                   </div>
                  <div>
                    <FileUploadContainer id='help-setup'
                    replacePathCode={'HELP-HW-SETUP'}
                    themeColor={this.state.settings.color_primary}
                    />
                  </div>

                  <div>
                   <label>{'Type of contents and specifications (format: .pdf ile)'}</label>
                   </div>
                    <div>
                      <FileUploadContainer id='help-content'
                      replacePathCode={'HELP-CONTENTS'}
                      themeColor={this.state.settings.color_primary}
                      />
                    </div>

                    <div>
                   <label>{'FAQs (format: .pdf ile)'}</label>
                   </div>
                    <div>
                      <FileUploadContainer id='help-faq'
                      replacePathCode={'HELP-FAQ'}
                      themeColor={this.state.settings.color_primary}
                      />
                    </div>

                    <div>
                   <label>{'QUICK GUIDE VIDEO (format: .mp4 ile)'}</label>
                   </div>
                    <div>
                      <FileUploadContainer id='help-quick-guide'
                      replacePathCode={'HELP-QUICK-GUIDE'}
                      themeColor={this.state.settings.color_primary}
                      />
                    </div>

                    <div>
                   <label>{'HOW TO ADD SCREEN & CONTENTS (format: .mp4 ile)'}</label>
                   </div>
                    <div>
                      <FileUploadContainer id='help-how-to-add-screen'
                      replacePathCode={'HELP-ADD-SCREEN-CONTENT'}
                      themeColor={this.state.settings.color_primary}
                      />
                    </div>


                    <div>
                   <label>{'HOW TO EDIT CONTENTS (format: .mp4 ile)'}</label>
                   </div>
                    <div>
                      <FileUploadContainer id='help-edit-contents'
                      replacePathCode={'HELP-EDIT-CONTENTS'}
                      themeColor={this.state.settings.color_primary}
                      />
                    </div>

                  </div>

                <div style={{borderBottom:'1px solid #e6e4e4'}}>
                  <h4>{'UPLOAD SIGNAGE CMS ASSETS'}</h4>
                  <div>
                   <label>{'Bundle file (supported format .js, DO NOT CHANGE! if you are not aware of it)'}</label>
                   </div>
                  <div>
                    <FileUploadContainer id='signage-cms-bundle-js'
                    replacePathCode={'SIGNAGE-CMS-BUNDLE-JS'}
                    themeColor={this.state.settings.color_primary}
                    />
                  </div>

                  <div>
                   <label>{'Style file (supported format .css, DO NOT CHANGE! if you are not aware of it)'}</label>
                   </div>
                    <div>
                      <FileUploadContainer id='signage-cms-style-css'
                      replacePathCode={'SIGNAGE-CMS-STYLE-CSS'}
                      themeColor={this.state.settings.color_primary}
                      />
                    </div>
                  </div>

                </ul>
                </Pane>
              }

                <Pane  label="LABELS" >
              <ul id="labels" className="panel-body">
                <Loading/>
                {<h1>Coming soon...</h1>}
                </ul>
                </Pane>

              
              </Tabs></div>);

  return (<div style={{height:'100%'}}>
      <div className='col-lg-12 col-md-12 col-sm-12' style={{height:'100%'}}>
      <Title title={'SETTINGS'}/>
      {settingsTab}
      </div>
      </div>)
  }
}


export default Settings;
