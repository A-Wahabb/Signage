import React, { Component } from 'react';
import Collapsible from 'react-collapsible';
import { confirmAlert } from 'react-confirm-alert';
import {BASE_SERVER,LOCAL_SERVER,PrimaryColor, IsBillingModule} from './../constants/Config';
import ManageTemplateContainer from './manage-template/ManageTemplateContainer';
import Search from './search/SearchContainer.js';
import ToggleButton from 'react-toggle-button';

class UserList extends Component {
  constructor(){
    super();
    this.state ={requestType:"",searchText:""};
    this.showRootModal= this.showRootModal.bind(this);
    this.showApps = this.showApps.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.processUserInactivate= this.processUserInactivate.bind(this);
  }

componentWillMount() {
  //this.props.fetchUsers();
}

showRootModal(component, size){
  this.props.rootModal(component, size, true);
}

showApps(user){
  let userApps = this.props.appsList.apps.filter( app => app.isTemplate||app.userId == user._id);
   let manageTemplate=  <ManageTemplateContainer userApps={userApps} user={user} rootModal={this.props.rootModal} />;
   this.showRootModal(manageTemplate, 'LARGE');
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

infoAlert= (param) => {
      
      confirmAlert({
        title: 'INFORMATION!!',                        
        message: "Sorry, can NOT process request, as this user subscription is in 'Running' state. Please 'Cancel' subscription if you want to proceed from billing dashboard.",               // Message dialog
        childrenElement: () => <div></div>,       
        confirmLabel: '',                           
        cancelLabel: 'OKAY',                             
        onConfirm: () => {},    
        onCancel: () => console.log("Cancelled"),      
      })
    };

confirmInactive= (param) => {
      
      confirmAlert({
        title: 'Warning!!',                        
        message: 'Are you sure, you want to INACTIVATE user -'+param.name+'?',               // Message dialog
        childrenElement: () => <div></div>,       
        confirmLabel: 'INACTIVATE NOW',                           
        cancelLabel: 'CANCEL',                             
        onConfirm: () => {this.props.requestUserStatusUpdate(param._id, 'INACTIVE')},    
        onCancel: () => console.log("Cancelled delete"),      
      })
    };

confirmActive= (param) => {
      
      confirmAlert({
        title: 'Confirm!!',                        
        message: 'You want to ACTIVATE user -'+param.name+'?',
        childrenElement: () => <div></div>,       
        confirmLabel: 'ACTIVATE NOW',                           
        cancelLabel: 'CANCEL',                             
        onConfirm: () => {this.props.requestUserStatusUpdate(param._id, 'PAID')},    
        onCancel: () => console.log("Cancelled delete"),      
      })
    };

processUserInactivate(user){
  console.log(IsBillingModule);
  if(IsBillingModule){
    let userSubscription= this.props.allSubscriptions.filter( subscription => subscription.signage_user_id == user._id);

    if(userSubscription[0] && userSubscription[0].status.toUpperCase()== 'RUNNING' ){
      this.infoAlert();
    }else{
      this.confirmInactive(user);
    }

  }else{
    this.confirmInactive(user);
  } 

}

updateSettings(user){
   let newSet = {};
  newSet.userId = user.setting.userId;
  newSet.canDeleteScreens= !user.setting.canDeleteScreens;
  this.props.updateSettings(newSet);
}

renderUsers(users,players,apps) {
    return users.map((user) => {
      let userPlayers = players.filter(player => player.userId == user._id);
      let userApps = apps.filter(app => app.userId == user._id);
    
      return (
        <Collapsible trigger={user.name}  key={user._id}>
          
          <h4 className="col-sm-12 col-md-6 col-lg-6 "><b>Biz Type</b>: {user.customer}</h4>
          <h4 className='col-sm-12 col-md-6 col-lg-6 '><b>User Name</b>: {user.username}</h4>
          <h4 className="col-sm-12 col-md-6 col-lg-6 "><b>Total Screens</b>: {userPlayers.length}</h4>
          <h4 className='col-sm-12 col-md-6 col-lg-6 '><b>Templates</b>: {userApps.length}</h4>
          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in'> <b>Status</b>: {user.status}</span>
          {user.status.toUpperCase()=='DEMO' && <span className='col-sm-12 col-md-6 col-lg-6 lbl_in'> <b>Demo Days</b>: {user.numberOfDemoDays}</span>}
          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in'> <b>Active</b>: <span className={user.isActive?'checked-box small-check':'uncheck-box small-check'}></span></span>
          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in'> <b>Allowed Screens</b>: {user.age}</span>
          
          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in'> <b>Address</b>: {user.address}</span>
          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in'> <b>Email</b>: {user.email}</span>
          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in'> <b>Phone</b>: {user.mobile}</span>
          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Mobile Verified?</b>: <span className={user.isMobileVerified?'checked-box small-check':'uncheck-box small-check'}></span> 
            
          </span>
          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in'> <b>WebSite</b>: {user.website}</span>
          
          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in togglebtn'> <b>Allow Delete Screen</b> 
            <ToggleButton
            inactiveLabel={'X'}
            activeLabel={'✓'}
            value={user&& user.setting && user.setting.canDeleteScreens?true:false}
            onToggle={(value) => this.updateSettings(user)} />
          </span>
          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in'> <b>Joined On</b>: {user.createdAt?user.createdAt.split('T')[0]:''}</span>
          <span className='col-sm-12 col-md-6 col-lg-6 lbl_in'> <b>Updated On</b>: {user.updatedAt?user.updatedAt.split('T')[0]:''}</span>

            <button
            onClick={ e => this.showApps(user) }
            className="btn-primary-link"
             style={{paddingRight:'10px',color:PrimaryColor}}
            > MANAGE TEMPLATES
            </button>

          <span>
            <button
            onClick={(event)=>this.setEditUser(event,user,"EDIT_USER")}
            className="btn-primary-link"
             style={{paddingRight:'10px', color:PrimaryColor}}
            >EDIT USER
            </button>
          </span>

          <span>
            <button
            onClick={(event)=>this.setEditUser(event,user,"NEW_PASSWORD")}
            className="btn-primary-link"
             style={{paddingRight:'10px', color:PrimaryColor}}
            >NEW PASSWORD
            </button>
          </span>

          {!user.admin && user.isActive && <span>
            <button
            onClick={()=>this.processUserInactivate(user)}
            className="btn-danger-link"
            >MAKE INACTIVE
            </button>
          </span>
        }

        {!user.admin && !user.isActive && <span>
            <button
            onClick={()=>this.confirmActive(user)}
            className="btn-primary-link"
            style={{paddingRight:'10px', color:PrimaryColor}}
            >MAKE ACTIVE
            </button>
          </span>
        }
          
        
            
        </Collapsible>
      );
    });
}

render() {
    var { usersList,playersList,appsList,editingUser } = this.props;
    let users= usersList.users;
    if(this.state.searchText){
      users =users.filter(user => user.name.indexOf(this.state.searchText) !== -1 || user.username.indexOf(this.state.searchText) !== -1 || user.mobile.indexOf(this.state.searchText) !== -1 || user.email.indexOf(this.state.searchText) !== -1);
    }
    return (
      <div>

      <div className="title-container">
          <h2 className="header-title">USERS</h2>
          <Search 
              changeConsole = {this.props.changeConsole} 
              onSearchChange = {this.onSearchChange}
            />
          {<div className="search-bar">
          <button style={{padding:'0px',wordSpacing:'-2px',textIndent:'2px',color:this.props.user.config.settings.color_primary}}
          className="btn-primary-link" onClick={(event)=>this.props.changeConsole("SIGNUP")} >
          <span  className="glyphicon glyphicon-plus inline-icon"></span>ADD NEW USER
          </button>
          </div>}
      </div>

      <div className="col-sm-12 col-md-10 col-lg-8 form">
          {this.renderUsers(users,playersList.players,appsList.apps)}
      </div>
    </div>

    )
    }
}


export default UserList;
