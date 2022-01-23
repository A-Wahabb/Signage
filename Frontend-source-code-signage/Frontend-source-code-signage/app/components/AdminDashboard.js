import React, { Component, PropTypes } from 'react';
import SignUp from './../pages/SignUpPg';
import UserListPg from './../pages/UserListPg';
import UserEditPg from './../pages/UserEditPg';
import AdminTemplateContainer from './../containers/AdminTemplateContainer';
import { Link } from 'react-router-dom';
import Search from './search/SearchContainer.js';
import Announcements from './Announcements.js';
import GalleryPg from './../pages/GalleryPg';
import PlayersListPg from './../pages/PlayersListPg';
import PlaylistPg from './../pages/PlaylistPg';
import UserNewPasswordPg from './../pages/UserNewPasswordPg';
import CustomerPg from './../pages/CustomerPg';
import ModalLocal from './modal-local';
import SettingsContainer from './settings/SettingsContainer.js';
import Dropdown, {
          DropdownToggle,
          DropdownMenu,
          DropdownMenuWrapper,
          MenuItem,
          DropdownButton
} from '@trendmicro/react-dropdown';
import { HorizontalBarChart, VerticalBarChart, PieChart } from "./graph/Charts";
import {BILLING_SERVER, PrimaryColor, IsBillingModule,CUSTOM_DATA_TITLE} from '../constants/Config.js';


class AdminDashboard extends Component {

constructor(props) {
    super(props);
  this.isStorage= false;
  this.isBillingOpened=false;
  this.isRootModal= false;
    this.modalFor= "";
    this.content= "";
      this.isPortrait=false;
    this.isSettings=false;
    this.annouce_version=2;
  this.state= {
        isRootModal :false,
        selectAll: true,
        leftMenu:true,
        players:[],
        isViewed: false

    };
    this.publishToSelected = this.publishToSelected.bind(this);
    this.toggleRootModal = this.toggleRootModal.bind(this);
  }

componentWillMount() {
    this.props.fetchUserDetails();
    this.props.fetchUsers();
    if(IsBillingModule){
      this.props.fetchSubscriptionsList();
    }
    this.props.fetchPlayers();
    this.props.fetchApps();
    this.props.fetchStorageInfo();
    this.props.fetchPlaylists();
    this.props.fetchSchedules();
}
componentDidMount(prevProps) {
    try{
    this.isPortrait=window.matchMedia("(orientation: portrait)").matches;
    let ver =localStorage.getItem('ADMIN_ANNOUNCED_VER');
    this.setState({
      leftMenu: this.isPortrait?false:true,
      isViewed: ver && ver == this.annouce_version
    });
  }catch(e){
    console.log(e);
  }
  }

gotoConsole(e,consoleName){

e && e.stopPropagation();
    if(this.isPortrait){
    this.setState({
      leftMenu:false
    });
    }
this.props.changeConsole(consoleName);

}

publishToSelected(content){
      if(content && content.contentType == 'TEMPLATE'){
        this.props.moveToLiveFolder(content);
      }
      let selected = this.selectedPlayers;
      let uniqueSelected = selected.filter(function(item, pos) {
          return selected.indexOf(item) == pos;
      });
      this.selectedPlayers = uniqueSelected;
      let publishToPlayers=this.props.posts.playersList.players.filter(player => this.selectedPlayers.indexOf(player._id) !== -1);
      if(publishToPlayers.length==0)return false;
      publishToPlayers= publishToPlayers.map(player=> {
        player.status='PENDING';
        player.appId=content._id; 
        player.orientation = content.orientation;
        player.contentType = content.contentType?content.contentType:"";
        return player;});
      //this.props.moveToLiveFolder(this.selectApp);
      console.log('final publishing', publishToPlayers)
      this.props.publishToSreens(publishToPlayers);
      this.selectedPlayers=[];
      this.setState({
        selectAll: true,
      });

    }

renderUsersWidget(users) {
    let currentMonth=0, ActiveClients=0, UnderDemo=0;
    let date = new Date();
    users.map(user => {
      //console.log(new Date(user.createdAt));
      if(!user.admin){
      let createDate= new Date(user.createdAt);
      if(createDate.getMonth() === date.getMonth() && createDate.getFullYear() === date.getFullYear()){
        currentMonth +=1;
      }
      if( user.isActive && !user.admin){
        ActiveClients +=1;
      }
      if(user.status.toLowerCase() === 'demo' ){
        UnderDemo +=1;
      }
      }
      return true;
    });
    let clientsInfo={'Total Clients':users.length-1,
    'This Month':currentMonth,
    'Active Clients':ActiveClients,
    'Under Demo':UnderDemo };
  
    return (
      <li className="col-xs-12 col-md-6 col-lg-4 list-group-item ">

        <div className='thumbnail orange' >
        <header><h3>{'USERS'}</h3></header>
        <main style={{paddingTop:'10px'}}>
        <HorizontalBarChart data={clientsInfo} />
        </main>
        
        <button className="btn btn-primary" onClick={(event)=>this.gotoConsole(event,"SIGNUP")} > {'Add New Client'}</button>
        </div>
       
      </li>
    );
}


renderScreensWidget(users,players) {
  let currentMonth=0, online=0, Offline=0;
    let date = new Date();
    for(var i=0; i<players.length;i++){
    
      let createDate= new Date(players[i].createdAt);
      if(createDate.getMonth() === date.getMonth() && createDate.getFullYear() === date.getFullYear()){
        currentMonth +=1;
      }
      
      if(players[i].powerStatus.toLowerCase()=='online'){
          Offline +=1;
        }
      
      if(players[i].powerStatus.toLowerCase()=='online'){
          online +=1;
        }
      
}      

let screensInfo={'Total':players.length,
    'This Month':currentMonth,
    'Online Screens':online,
    'Offline Screens':Offline };

  return (
    <li className="col-xs-12 col-md-6 col-lg-4 list-group-item ">
      <div className='thumbnail green'>
      <header><h3>{'SCREENS'}</h3></header>
      <main>
      <VerticalBarChart data={screensInfo}/>
      </main>
      
      <button className="btn btn-danger-trans" onClick={(event) => this.gotoConsole(event,'USER_SCREENS')}> {'Manage Screens'}</button>
      </div>
    </li>
  ); 
}

getModalClass(){
    if(this.isSettings){
      return 'modal-local modal-default modal-large col-sm-12 col-lg-8 col-md-10';
    }
    
    else{
      return 'modal-local modal-default ';
    }
  }

toggleRootModal(modalFor, content){
    this.modalFor= modalFor;
    this.content= content;
    this.selectedPlayers=[];
    if(this.modalFor && this.modalFor.toLowerCase()=='settings'){
      this.isSettings=true;
    }else{
      this.isSettings=false;
    }
    this.setState({
      isRootModal : ! this.state.isRootModal,
      selectAll: true
    });
    
  }

getRootModalContent(){
  if(this.state.isRootModal){
      let modalFor = this.modalFor;
      let content = this.content;
      switch (modalFor) {
          case 'PUBLISH' :
            let players= this.state.players;
            let contentName= content.playlistName?content.playlistName:content.appName;
             return (
            <div className='poplist'>
            <h3>{'CHOOSE SCREENS TO PUBLISH "'+contentName+'"'}</h3>
            <Search 
          isOnlysearch = {true} 
          onSearchChange = {this.onPopupListSearchChange}
        />
         <Link
              to="#"
               style={{margin:'10px 10px 0px 30px',fontSize:'0.8em',textAlign:'left',color:PrimaryColor,display:'inline-block', width:'100%'}}
              className="btn-primary-link"
              onClick={(evt) => this.changeSelectAll()}>
              {this.state.selectAll?'SELECT ALL':' DESELECT'}
            </Link>
           <ul className='small-select-list'>
              {players.map(player => 
              {
            if(player.appId == content._id){
              this.manageChecks(null,player._id);
             return <li >
               <span className='checked-box'>
               </span>
               <h4>{player.playerName}</h4>
            </li>
            }else{
            return <li onClick={(e)=>this.manageChecks(e,player._id)}>
               <span className={this.selectedPlayers.indexOf(player._id) != -1?'checked-box':'uncheck-box'}>
               </span>
               <h4>{player.playerName}</h4>
            </li>
            }
            })
             }
      
        </ul>
        <Link
              to="#"
               style={{margin:'0px',marginRight:'10px',padding:'0px',}}
              className="btn-primary-link canel"
              onClick={(evt) => this.toggleRootModal()}>
              {'CANCEL'}
            </Link>
        <Link
              to="#"
               style={{margin:'0px',marginRight:'10px',padding:'0px',color:PrimaryColor}}
              className="btn-primary-link"
              onClick={(evt) => (this.props.changeConsole('SCHEDULES'),this.toggleRootModal())}>
              {'SCHEDULE'}
            </Link>
            

        <button 
        className="btn btn-primary "
        onClick={() => (this.publishToSelected(content),this.toggleRootModal())} >
                PUBLISH
              </button>
        </div>);
            break;

        case 'SETTINGS':
            return <div style={{height:'100%'}}>
              <SettingsContainer 
              user={this.props.user}
              settings={this.props.user.config.settings}
              updateSettings= {this.props.updateSettings}
              closeModalPopup= {this.toggleRootModal} 
              />
            </div>;
          break;

        }

    }
}

toggleLeftMenu(){
  this.setState({
    leftMenu: !this.state.leftMenu
  });
}

renderTemplatesWidget(apps) {
  let adminApps=0, clientApps=0, serviceType=0, drafts=0;
  let playlists = this.props.playlists.allPlaylist.lists.length;
  let Schedules= this.props.schedules.schedules.list.schedules.length;
  apps.map(app => {
  if(app.isTemplate){
      adminApps += 1;
  }else{
  clientApps += 1;
  }
  });
  let appsInfo={"Admin's":apps.length,
    "User's Temp":clientApps,
    'Playlists':playlists,
    'Schedules':Schedules };

  return (
    <li className="col-xs-12 col-md-6 col-lg-4 list-group-item ">
      <div className='thumbnail blue'>
      <header><h3>{'CONTENTS'}</h3></header>
      
      <main>
      <VerticalBarChart data={appsInfo}/>
      </main>
      <button className="btn btn-danger-trans" onClick={(event) => this.gotoConsole(event,'TEMPLATE_LIST')}> {'Manage Template'}</button>
      </div>
    </li>
  );
}


gotoAnnounce(){
    localStorage.setItem('ADMIN_ANNOUNCED_VER', this.annouce_version);
    this.props.changeConsole('ANNOUNCEMENTS');
    this.setState({
      isViewed: true
    });

  }

renderMediaWidget(all_storage) {
  let storageInfo= null;

  if(all_storage && all_storage.storageInfo && all_storage.storageInfo.templatesSize){
  storageInfo={'All Templates':parseInt(all_storage.storageInfo.templatesSize),
    'Clients Media':parseInt(all_storage.storageInfo.clientsMediaSize),
    'Admin Media':parseInt(all_storage.storageInfo.AdminMediaSize),
    'Others': 100
    };
    this.isStorage = true;
  }
  return (
    <li className="col-xs-12 col-md-6 col-lg-4 list-group-item ">
      <div className='thumbnail red'>
      <header><h3>{'STORAGE'}</h3></header>
      {storageInfo && <main>
      <PieChart data={storageInfo}/>
      </main>}
      <button
className="btn btn-danger-trans"
onClick={()=>this.props.changeConsole("ADMIN_CONSOLE")}
> {'More'}
</button><span style={{float:'right'}}>{'*Storage used in MB'}</span>
      </div>
    </li>
  );
}

render() {
    const { usersList,playersList,appsList,all_storage} = this.props;
  
    let selectedConsole=null;
    switch(this.props.selectedConsole){
      case 'SIGNUP':
      selectedConsole=<div><div className="title-container"><h2 className="header-title">Register New Client</h2>
      
      </div><SignUp user={this.props.user} common={this.props.common}/></div>;
      break;
      case 'USER_LIST':
      selectedConsole=<div>
      <UserListPg
        usersList={this.props.usersList}
        appsList= {this.props.appsList}
        playersList={this.props.playersList}
        rootModal = {this.props.rootModal}
        user = {this.props.user}
        allSubscriptions = {this.props.allSubscriptions}
      /></div>;
      break;

      case 'EDIT_USER':
      selectedConsole=<div><div className="title-container">
      <h2 className="header-title">Edit Clients</h2>
      </div><UserEditPg/></div>;
      break;

      case 'NEW_PASSWORD':
      selectedConsole=<div><div className="title-container">
      <h2 className="header-title">New Password</h2>
      </div><UserNewPasswordPg/></div>;
      break;

      case 'USER_SCREENS':
      selectedConsole= <PlayersListPg
                        playersList = {this.props.playersList}
                        playerItemsStatus= {this.props.posts.playerItemsStatus}
                        appsList = {this.props.appsList}
                        common = {this.props.common}
                        user = {this.props.user}
                        playlists = {this.props.playlists}
                        toggleRootModal = {this.toggleRootModal}
                        publishToSreens = {this.props.publishToSreens}
                        newPlayer = {this.props.posts.newPlayer}
                        schedules = {this.props.schedules}
                        rootModal = {this.props.rootModal}
                        usersList= {this.props.usersList}
                        />;
      break;

      case 'PLAYLISTS':
      selectedConsole=<PlaylistPg
                        playlists = {this.props.playlists}
                        user= {this.props.user}
                        common = {this.props.common}
                        publishToSreens = {this.props.publishToSreens}
                        playersList = {this.props.posts.playersList}
                        toggleRootModal = {this.toggleRootModal}
                        appsList = {this.props.appsList}
                        moveToLive= {this.props.moveToLiveFolder}
                        usersList= {this.props.usersList}
        />;
      break;

      case 'GALLERY':
      selectedConsole= <GalleryPg
                  user= {this.props.user}
                  common = {this.props.common}
              />;
      break;

      case 'ANNOUNCEMENTS':
      selectedConsole= <Announcements
         user = {this.props.user}
         common = {this.props.common}
      />;
      break;

      case 'TEMPLATE_LIST':
      selectedConsole=<div><AdminTemplateContainer
            user= {this.props.user}
            common = {this.props.common}
            toggleRootModal = {this.toggleRootModal}
            publishToSreens = {this.props.publishToSreens}
            playersList = {this.props.playersList}
            appsList = {this.props.appsList}
            rootModal = {this.props.rootModal}
            usersList= {this.props.usersList}
      /></div>;
      break;

      

      case 'CUSTOMER_DATA':
      selectedConsole=<div className="title-container">
      <CustomerPg/></div>;
      break;

      case 'BILLING':
        if(!this.isBillingOpened){
          this.isBillingOpened=true;
          window.open(BILLING_SERVER+'/dashboard','_blank');
        }
        selectedConsole=<div>
            <div className="title-container">
            <h2 className="header-title">BILLING</h2>
            </div>
            <label>Manage subscriptions from new tab opened</label>  
            </div>;       
      break;

      
      default :
      selectedConsole=<div><div className="title-container"><h2 className="header-title">Welcome Admin!</h2>
      
      </div><ul className="list-group">
      {this.renderUsersWidget(usersList.users)}
      {this.renderScreensWidget(usersList.users,playersList.players)}
      {this.renderTemplatesWidget(appsList.apps)}
      {this.renderMediaWidget(all_storage)}
      
    </ul></div>;
    break;
   }
   let drawerClss= this.props.user.config.settings.other_b || this.isPortrait?'side-drawer-large':'side-drawer';
    let leftDrawerActiveCls =this.state.leftMenu?'drawer-open':'drawer-close';
      let isDarkTheme =this.props.user.config.settings.other_b || this.isPortrait ? true :false;
    return (
      <div className={this.isPortrait?'dark':''}>
      <span className="glyphicon glyphicon-menu-hamburger" onClick={()=>{this.toggleLeftMenu()}}  ></span>
      <div className={drawerClss + ' '+leftDrawerActiveCls}>
      <div className={'logo-container'}>
      <span className="logo-common"></span>
      </div>

      {this.isPortrait &&  <div style={{paddingBottom:'10px',color:'#a2a2a2'}}>
      <span className={'glyphicon glyphicon-user user-icon'}></span>
       <span className='menu-arrow glyphicon'>
          <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
      <Dropdown.Toggle title={this.props.user.user && this.props.user.user.name.toUpperCase()} />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            <MenuItem onClick={()=>{this.toggleRootModal('SETTINGS',"")}}>
              <span className="glyphicon glyphicon-cog"  ></span><span>SETTINGS</span>
            </MenuItem>
          
            <MenuItem  onClick={(e)=>{this.props.logout(e)}}>
              <span className="glyphicon glyphicon-log-out"  ></span><span>LOG OUT</span>
            </MenuItem>

        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>
                      
      </div>}

      <div >
      <div className={'menu-holder'} onClick={(event) => this.gotoConsole(event,'LANDING')}>
        <a href='#'>
        <span 
          className={this.props.selectedConsole=="LANDING"?"glyphicon glyphicon-dashboard active-icon":"glyphicon glyphicon-dashboard"}  style={{left:'1px'}}>
        </span>
        <span className={'left-menu-title'}>DASHBOARD</span>
        </a>
      </div>

       <div className={'menu-holder'} onClick={(event) => this.gotoConsole(event,'USER_LIST') }>
        <a href='#'>
        <span 
          className={this.props.selectedConsole=="USER_LIST"?"glyphicon glyphicon-user active-icon":"glyphicon glyphicon-user "}   style={{left:'1px'}}>
        </span>
        <span className={'left-menu-title'}>USERS</span>
        </a>
      </div>

      <div className={'menu-holder'} onClick={(event) => this.gotoConsole(event,'USER_SCREENS')}>
        <a href='#'>
        <span className={this.props.selectedConsole=="USER_SCREENS"?"playlist_icon_active":"playlist_icon "} style={{left:'2px'}}  ></span>
        <span  className={'left-menu-title'}>SCREENS</span>
        </a>
      </div>

      <div className={'menu-holder'}>
        <a href='#' onClick={(event) => this.gotoConsole(event,'PLAYLISTS')}>
        <span  className={this.props.common.selectedConsole=="PLAYLISTS"?"glyphicon glyphicon-list  active-icon":"glyphicon glyphicon-list"}   >
        </span>
        <div className={'left-menu-title'}>PLAYLISTS</div>
        </a>
      </div>

      <div className={'menu-holder'}>
        <a href='#' onClick={(e) => this.gotoConsole(event,'TEMPLATE_LIST')}>
        <span  className={this.props.common.selectedConsole=="TEMPLATE_LIST"?"template-icon-active":"template-icon"}  style={{left:'2px'}} ></span>
        <div className={'left-menu-title'}>TEMPLATES</div>
        </a>
      </div>

      <div className={'menu-holder'}>
        <a href='#' onClick={(e) => this.gotoConsole(event,'GALLERY')} >
        <span data-tip={"LIBRARIES"} style={{left:'1px'}} className={this.props.common.selectedConsole=="GALLERY"?"glyphicon glyphicon-picture active-icon":"glyphicon glyphicon-picture"} ></span>
        <div className={'left-menu-title'}>LIBRARIES</div>
        </a>
      </div>

       <div className={'menu-holder'}>
        <a href='#' onClick={(event) => this.gotoConsole(event,'BILLING') } >
        <span data-tip={"BILLING"} className={this.props.common.selectedConsole=="BILLING"?"glyphicon glyphicon-usd active-icon":"glyphicon glyphicon-usd"} >
        </span>
        <div className={'left-menu-title item-last'}>BILLING</div>
        </a>
      </div>


      <div className={'menu-holder'}>
        <a href='#' onClick={(event) => this.gotoConsole(event,'LANDING') }  >
        <span data-tip={"REPORTS"} className={this.props.common.selectedConsole=="REPORTS"?"report_icon_active active-icon":"report_icon"} >
        </span>
        <div className={'left-menu-title item-last'}>REPORTS</div>
        </a>
      </div>
      
      <div className={'menu-holder'}>
        <a href='#' onClick={(event) => this.gotoConsole(event,'CUSTOMER_DATA') }  >
        <span data-tip={"CUSTOMER DATA"} className={this.props.common.selectedConsole=="CUSTOMER_DATA"?"glyphicon glyphicon-star active-icon":"glyphicon glyphicon-star"} >
        </span>
        <div className={'left-menu-title item-last'}>{CUSTOM_DATA_TITLE}</div>
        </a>
      </div>
    
      </div>
      </div>
      <div id="dashboard" className={this.isPortrait?"container no-menu" :(this.state.leftMenu?"container ": "container no-menu")}>  
  
      {selectedConsole}
       <ModalLocal  
          className={this.getModalClass()} 
          isOpen={this.state.isRootModal} >
          {this.getRootModalContent()}
          <span  
            style={{position:'fixed', top:'-20px', right:'1px',background:'#e7e5e5',borderRadius:'11px',padding:'2px'}}
            className="glyphicon glyphicon-remove" 
            onClick={(e) => this.toggleRootModal()} >
          </span>
      </ModalLocal>
      
      </div>
      {!this.isPortrait && 
      <div id='right-top-user-menu' style={{position:'fixed',right:'40px',top:'3px',color:'#a2a2a2'}}>
      <span style={{ marginRight:'20px'}} className='glyphicon glyphicon-bullhorn' onClick={(e) => this.gotoAnnounce()}>
      {!this.state.isViewed && <span style={{backgroundColor:PrimaryColor}} className='announce'></span>}</span>
        <span className='menu-arrow glyphicon glyphicon-user'>
          <Dropdown autoOpen= {true} arrowclassname='' >
      <Dropdown.Toggle />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
        <MenuItem >
              <div><label style={{fontSize:'1.2em',color:PrimaryColor}}>Welcome!</label></div>
              <span>{this.props.user.user && this.props.user.user.name.toUpperCase()} </span>
            </MenuItem>
            <MenuItem onClick={()=>{this.toggleRootModal('SETTINGS',"")}}>
              <span className="glyphicon glyphicon-cog"  ></span><span>SETTINGS</span>
            </MenuItem>
            <MenuItem  onClick={(e)=>{this.props.logout(e)}}>
              <span className="glyphicon glyphicon-log-out"  ></span><span>LOG OUT</span>
            </MenuItem>

        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>     
      </div>
    }
      </div>
    );
  }
}


export default AdminDashboard;
