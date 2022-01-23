import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { confirmAlert } from 'react-confirm-alert';
import {BASE_SERVER,LOCAL_SERVER,PrimaryColor, IsBillingModule} from './../constants/Config';
import NewIamUserContainer from './new-iamuser/NewIamUserContainer';
import Search from './search/SearchContainer.js';
import ToggleButton from 'react-toggle-button';

class IamUserList extends Component {
  constructor(){
    super();
    this.state ={requestType:"",searchText:""};
    this.showRootModal= this.showRootModal.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.showNewUser = this.showNewUser.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
  }

componentWillMount() {
  //this.props.fetchUsers();
}

showRootModal(component, size){
  this.props.rootModal(component, size, true);
}

updateSettings(imObj){

    this.props.updateIamSettings(imObj);
}

showNewUser(){
   let userDetailsForm=  <NewIamUserContainer user={this.props.user}  rootModal={this.props.rootModal} closeModalPopup={this.props.closeModalPopup}/>;
   this.showRootModal(userDetailsForm, 'SMALL');
}

onSearchChange(e){
      this.setState({
        searchText: e.target.value
      });
  }

setEditUser(e,user,requestType){
  e.preventDefault();
  this.setState({
    requestType:requestType
  });
  this.props.setEditingUser(user);
  this.props.changeConsole(requestType);
}

confirmDelete= (userName) => {
      let iamUserObj= {
      iamUserName: userName,
      _id: this.props.user.user._id,
      username: this.props.user.user.username,
      email: this.props.user.user.email,
      mobile: this.props.user.user.mobile,
      action:'REMOVE_IM'
    };
      confirmAlert({
        title: 'Confirm!!',                        
        message: 'You want to DELETE user -'+userName+'?',
        childrenElement: () => <div></div>,       
        confirmLabel: 'DELETE NOW',                           
        cancelLabel: 'CANCEL',                             
        onConfirm: () => {this.props.updateIamUser(iamUserObj)},    
        onCancel: () => console.log("Cancelled delete"),      
      })
    };

renderUsers() {
    let users= this.props.user.user.iAmUsers ? this.props.user.user.iAmUsers.split(','):[];

    return users.map((user) => {
      let userName= user.split('~~')[0];
      let pass = user.split('~~')[1];
      let imSetting = this.props.user.imconfig.imsettings.filter(usrSet=> usrSet.iAmUsername == userName)[0];
      return (
        <Collapsible trigger={userName}   key={userName} >
          
        <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Password: </b><span>{pass}</span> 
            
          </span>

          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Allow New Screen</b> 
            <ToggleButton
            inactiveLabel={'X'}
            activeLabel={'✓'}
            value={imSetting && imSetting.isNewScreenAllowed?true:false}
            onToggle={(value) => this.updateSettings({isNewScreenAllowed: !imSetting.isNewScreenAllowed, _id:imSetting._id} )} />
          </span>
          
          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Allow Update Screen</b> 
            <ToggleButton
            inactiveLabel={'X'}
            activeLabel={'✓'}
            value={imSetting && imSetting.isUpdateScreenAllowed?true:false}
            onToggle={(value) => this.updateSettings({isUpdateScreenAllowed: !imSetting.isUpdateScreenAllowed, _id:imSetting._id} )} />
          </span>

          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Allow Delete Screen</b> 
            <ToggleButton
            inactiveLabel={'X'}
            activeLabel={'✓'}
            value={imSetting && imSetting.isDeleteScreenAllowed?true:false}
            onToggle={(value) => this.updateSettings({isDeleteScreenAllowed: !imSetting.isDeleteScreenAllowed, _id:imSetting._id} )} />
          </span>

          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Allow New Templates</b> 
            <ToggleButton
            inactiveLabel={'X'}
            activeLabel={'✓'}
            value={imSetting && imSetting.isNewTemplateAllowed?true:false}
            onToggle={(value) => this.updateSettings({isNewTemplateAllowed: !imSetting.isNewTemplateAllowed, _id:imSetting._id} )} />
          </span>
          
          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Allow New Playlist</b> 
            <ToggleButton
            inactiveLabel={'X'}
            activeLabel={'✓'}
            value={imSetting && imSetting.isNewPlaylistAllowed?true:false}
            onToggle={(value) => this.updateSettings({isNewPlaylistAllowed: !imSetting.isNewPlaylistAllowed, _id:imSetting._id} )} />
          </span>

          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Allow Edit Playlist</b> 
            <ToggleButton
            inactiveLabel={'X'}
            activeLabel={'✓'}
            value={imSetting && imSetting.isEditPlaylistAllowed?true:false}
            onToggle={(value) => this.updateSettings({isEditPlaylistAllowed: !imSetting.isEditPlaylistAllowed, _id:imSetting._id} )} />
          </span>

          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Allow New Schedules </b> 
            <ToggleButton
            inactiveLabel={'X'}
            activeLabel={'✓'}
            value={imSetting && imSetting.isNewScheduleAllowed?true:false}
            onToggle={(value) => this.updateSettings({isNewScheduleAllowed: !imSetting.isNewScheduleAllowed, _id:imSetting._id} )} />
          </span>

          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Allow Edit Schedules </b> 
            <ToggleButton
            inactiveLabel={'X'}
            activeLabel={'✓'}
            value={imSetting && imSetting.isEditScheduleAllowed?true:false}
            onToggle={(value) => this.updateSettings({isEditScheduleAllowed: !imSetting.isEditScheduleAllowed, _id:imSetting._id} )} />
          </span>

          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Allow Library</b> 
            <ToggleButton
            inactiveLabel={'X'}
            activeLabel={'✓'}
            value={imSetting && imSetting.isLibraryAllowed?true:false}
            onToggle={(value) => this.updateSettings({isLibraryAllowed: !imSetting.isLibraryAllowed, _id:imSetting._id} )} />
          </span>

          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Allow Upload to Library</b> 
            <ToggleButton
            inactiveLabel={'X'}
            activeLabel={'✓'}
            value={imSetting && imSetting.isUploadLibraryAllowed?true:false}
            onToggle={(value) => this.updateSettings({isUploadLibraryAllowed: !imSetting.isUploadLibraryAllowed, _id:imSetting._id} )} />
          </span>

           <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Allow Delete Library</b> 
            <ToggleButton
            inactiveLabel={'X'}
            activeLabel={'✓'}
            value={imSetting && imSetting.isDeleteLibraryAllowed?true:false}
            onToggle={(value) => this.updateSettings({isDeleteLibraryAllowed: !imSetting.isDeleteLibraryAllowed, _id:imSetting._id} )} />
          </span>

          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Allow Reports</b> 
            <ToggleButton
            inactiveLabel={'X'}
            activeLabel={'✓'}
            value={imSetting && imSetting.isReportsAllowed?true:false}
            onToggle={(value) => this.updateSettings({isReportsAllowed: !imSetting.isReportsAllowed, _id:imSetting._id} )} />
          </span>

          {false && <span>
            <button
            onClick={(event)=>this.setEditUser(event,user,"NEW_PASSWORD")}
            className="btn-primary-link"
             style={{paddingRight:'10px', color:PrimaryColor}}
            >EDIT PASSWORD
            </button>
          </span>}

          {<span>
            <button
            onClick={()=>this.confirmDelete(userName)}
            className="btn-danger-link"
            >DELETE USER
            </button>
          </span>
        }

        
          
        
            
        </Collapsible>
      );
    });
}

render() {
    
    console.log(this.props.user.user);
    let users= this.props.user.user.iAmUsers.split(',');
    if(this.state.searchText){
      users =users.filter(user => user.split('~~').indexOf(this.state.searchText) !== -1) 
    }
    return (
      <div>

      <div className="title-container">
          <h2 className="header-title">Members & Permissions</h2>
          <Search 
              changeConsole = {this.props.changeConsole} 
              onSearchChange = {this.onSearchChange}
            />
          {<div className="search-bar">
          <button style={{padding:'0px',wordSpacing:'-2px',textIndent:'2px',color:this.props.user.config.settings.color_primary}}
          className="btn-primary-link" onClick={(event)=>this.showNewUser()} >
          <span  className="glyphicon glyphicon-plus inline-icon"></span>ADD NEW MEMBER
          </button>
          </div>}
      </div>

      <div className="col-sm-12 col-md-10 col-lg-8 form">
          {this.renderUsers()}
      </div>
    </div>

    )
    }
}


export default IamUserList;
