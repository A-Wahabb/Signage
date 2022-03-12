import React, { Component, PropTypes } from 'react';
import UserHomePg from './../pages/UserHomePg';
import { Link } from 'react-router-dom';
import PlayersListPg from './../pages/PlayersListPg';
import PlayerDetailsPg from './../pages/PlayerDetailsPg';
import SchedulesPg from './../pages/SchedulesPg';
import TemplatePg from './../pages/TemplatePg';
import GalleryPg from './../pages/GalleryPg';
import ReportsPg from './../pages/ReportsPg';
import PaymentPg from './../containers/PaymentContainer';
import IamUserContainer from './../containers/IamUserListContainer';
import Help from './Help.js';
import Announcements from './Announcements.js';
import PlaylistPg from './../pages/PlaylistPg';
import CustomTemplateNewPg from './../pages/CustomTemplateNewPg';
import CustomTemplateEditPg from './../pages/CustomTemplateEditPg';
import SettingsContainer from './settings/SettingsContainer.js';
import Search from './search/SearchContainer.js';
import CustomerPg from './../pages/CustomerPg';
import ModalLocal from './modal-local';
import { confirmAlert } from 'react-confirm-alert';
import moment from 'moment';
import { IsBillingModule, PrimaryColor, BILLING_SERVER ,IsPublicSignup} from './../constants/Config';
import Dropdown, {
          DropdownToggle,
          DropdownMenu,
          DropdownMenuWrapper,
          MenuItem,
          DropdownButton
} from '@trendmicro/react-dropdown';

class UserDashboard extends Component {
  constructor(props) {
    super(props);
    this.state= {
        isRootModal :false,
        selectAll: true,
        leftMenu:true,
        players:[],
        isViewed: false,
        findText:""
    };
    this.isPortrait=false;
    this.isSettings=false;
    this.selectedPlayers=[];
    this.modalFor= "";
    this.content= "";
    this.isForceSubscribe = IsBillingModule?true:false;
    this.isDemoPeriod = this.isDemoPeriod.bind(this);
    this.toggleRootModal = this.toggleRootModal.bind(this);
    this.onPopupListSearchChange = this.onPopupListSearchChange.bind(this);
    this.publishToSelected = this.publishToSelected.bind(this);
    this.isSubscriptionValid = this.isSubscriptionValid.bind(this);
    this.annouce_version=2;
    this.onUsersSearch = this.onUsersSearch.bind(this);
  }
  componentWillMount() {
    this.props.resetMe();
    this.props.fetchUserDetails(this.props.user);
    this.props.fetchPlayers();
    this.props.fetchApps();
    this.props.fetchPlaylists();
    this.props.fetchSchedules();
    this.props.fetchStatusLogs();
  }

  componentDidMount(prevProps) {
    try{
    console.log('left menu',this.props);
    let ver =localStorage.getItem('ANNOUNCED_VER');
    this.isPortrait=window.matchMedia("(orientation: portrait)").matches;
    this.setState({
      leftMenu: this.isPortrait?false:true,
      isViewed: ver && ver == this.annouce_version
    });

  }catch(e){
    console.log(e);
  }
  }

  componentDidUpdate(prevProps){
    try{
    let publishPop = document.getElementsByClassName('react-confirm-alert-button-group');
    if(publishPop && publishPop.length>0 && publishPop[0].children){
      if(publishPop[0].children[0]){
      publishPop[0].children[0].style.color=this.props.user.config.settings.color_primary;
    }
    if(publishPop[0].children[1]){
      publishPop[0].children[1].style.backgroundColor=this.props.user.config.settings.color_primary;
    }
    }


    if(this.props && this.props.posts && this.props.posts.playersList.players.length !== prevProps.posts.playersList.players.length ){
      this.setState({
        players: this.props.posts.playersList.players
      });
    }
  
    }
  catch(e){
    console.log(e);
  }
  }

publishToSelected(content){
      console.log('content ---',content );
      if(content && content.contentType == 'TEMPLATE'){
        this.props.moveToLiveFolder(content);
      }
      let selected = this.selectedPlayers;
      let uniqueSelected = selected.filter(function(item, pos) {
          return selected.indexOf(item) == pos;
      });
      this.selectedPlayers = uniqueSelected;
      let publishToPlayers=this.props.posts.playersList.players.filter(player => this.selectedPlayers.indexOf(player._id) !== -1);
      console.log('== publishing to==', publishToPlayers);
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

shareToSelectedUsers(content){
      console.log('content ---',content );
   
      let sharingUpdate = {};
      sharingUpdate._id = content._id;
      sharingUpdate.sharedWithUsers = content.sharedWithUsers;
      //media file
      if(content && content.original_file_name){
        this.props.updateMedia(sharingUpdate);
      }else if(content && content.contentType == 'PLAYLIST'){
        this.props.updatePlaylist(sharingUpdate);
      }
      else if(content && content.contentType == 'TEMPLATE'){
        this.props.updateTemplate(sharingUpdate);
      }
      
      this.selectedPlayers=[];


    }

changeSelectAll(){
      if(this.state.selectAll){
      this.state.players.map(player => this.selectedPlayers.push(player._id));
      }else{
        this.selectedPlayers= [];
      }
      
      this.setState({
        selectAll: !this.state.selectAll,
      });
}

changeTheme(e){
    e.preventDefault();
    this.props.updateSettings({'other_b':!this.props.user.config.settings.other_b});

}

toggleLeftMenu(){
  this.setState({
    leftMenu: !this.state.leftMenu
  });
}

manageChecks(e,playerId){
      if( e && e.target.tagName.toLowerCase()=='span'){
             e.preventDefault();
        e.target.className=e.target.className=='uncheck-box'?'checked-box':'uncheck-box';
      }
      this.selectedPlayers.indexOf(playerId) != -1? this.selectedPlayers.splice(1,this.selectedPlayers.indexOf(playerId)):this.selectedPlayers.push(playerId);
        console.log(this.selectedPlayers);
        return true;
}

manageUsersChecks(e,userId,content){
      let sharedUsers = content.sharedWithUsers.split(',');
      sharedUsers = sharedUsers.filter(user => user.length>0);
     if(sharedUsers.indexOf(userId) != -1){
     sharedUsers = sharedUsers.splice(1,sharedUsers.indexOf(userId));
     }
     else{
      sharedUsers.push(userId);
      
    }
    sharedUsers=sharedUsers.length>1?sharedUsers.join(','):sharedUsers.join('');
     content.sharedWithUsers = sharedUsers;
     this.shareToSelectedUsers(content);
      return true;

}

onPopupListSearchChange(e){
  e.preventDefault();
  console.log(e.target.value);
  let searchScrnGrp=e.target.value;
  let searchGrpPlayers= this.props.posts.playersList.players.filter(player => (player.playerName.toLowerCase().indexOf(searchScrnGrp.toLowerCase()) !== -1) || 
    (player.groupName.toLowerCase().indexOf(searchScrnGrp.toLowerCase()) !== -1) || 
    (player.address.toLowerCase().indexOf(searchScrnGrp.toLowerCase()) !== -1) );
  this.setState({
        players: searchGrpPlayers
      });
}

onUsersSearch(e){
  e.preventDefault();
  let userSearchText=e.target.value;
  this.setState({
    findText: userSearchText
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

            this.selectedPlayers = []; 
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
        disabled={players.length==0?true:false}
        className="btn btn-primary "
        onClick={() => (this.publishToSelected(content),this.toggleRootModal())} >
                PUBLISH
              </button>
        </div>);
            break;

        case 'SHARE' :
            let sharingName= content.original_file_name||content.playlistName||content.appName;
            let findUsers = this.props.user.user && this.props.user.user.find?this.props.user.user.find:[];
             return (
            <div className='poplist'>
            <h3>{'FIND USERS TO SHARE- "'+sharingName+'"'}</h3>
            <Search 
          isOnlysearch = {true} 
          onSearchChange={this.onUsersSearch}
        />
         <Link
              to="#"
               style={{fontSize:'0.8em',textAlign:'right',color:PrimaryColor,display:'inline-block'}}
              className="btn-primary-link"
              onClick={(e)=>(e.preventDefault(),this.props.findUsers(this.state.findText))}>
              {'FIND NOW'}
            </Link>
           <ul className='small-select-list'>
              {findUsers.map(user => 
              {
            
            return <li onClick={(e)=>this.manageUsersChecks(e,user._id,content)}>
               <span className={content.sharedWithUsers.indexOf(user._id) != -1?'checked-box':'uncheck-box'}>
               </span>
               <h4>{user.name + ' ('+ user.username +')' }</h4>
            </li>
          
            })
             }
      
        </ul>
        <Link
              to="#"
               style={{margin:'0px',marginRight:'10px',padding:'0px'}}
              className="btn-primary-link canel"
              onClick={(evt) => this.toggleRootModal()}>
              {'CANCEL'}
            </Link>
            </div>);
            break;

        case 'SETTINGS':
            return <div>
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

getModalClass(){
    if(this.isSettings){
      return 'modal-local modal-default modal-large col-sm-12 col-lg-8 col-md-10';
    }
    
    else{
      return 'modal-local modal-default user-dash-modal';
    }
  }

logout(evt) {
    evt && evt.preventDefault();
    this.props.logout();
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
    if(!this.isSettings && !this.state.isRootModal){
      this.setState({
        players: this.props.posts.playersList.players
      });
    }
    this.setState({
      isRootModal : ! this.state.isRootModal,
      selectAll: true
    });
    
  }

  isDemoPeriod(user){
    
    let createDt = moment(user.user.createdAt.split('T')[0]);
    let todayDt = moment().format();
    todayDt= moment(todayDt.split('T')[0]);
    let diff = todayDt.diff(createDt,'days'); 
    return diff<user.user.numberOfDemoDays?true:false;
    
  }

  isSubscriptionValid(){
    let plan = this.props.userSubs.plan;
    let user = this.props.user;

    if( IsPublicSignup && user.user && user.user.status && user.user.status.toUpperCase() === 'DEMO' && this.isDemoPeriod(user)){
        this.isForceSubscribe = false;
        this.props.changeConsole('USER_HOME');
    } else if((IsBillingModule && !plan)|| (IsBillingModule && plan && plan.status.toLowerCase() !== 'running') ){

      if(this.props.common.selectedConsole != 'PAYMENT'){
      this.isForceSubscribe = true;    
      this.props.changeConsole('PAYMENT');
      }
    }else{
      this.isForceSubscribe = false;
      this.props.changeConsole('USER_HOME');
    }
    

  }

  gotoAnnounce(){
    localStorage.setItem('ANNOUNCED_VER', this.annouce_version);
    this.props.changeConsole('ANNOUNCEMENTS');
    this.setState({
      isViewed: true
    });
  }

  gotoConsole(e,consoleName){
    e && e.stopPropagation();
    if(this.isPortrait){
    this.setState({
      leftMenu:false
    });
    }
    this.props.changeConsole(consoleName,"");
  }

  gotoManageSubs(){
    let billingUrl = BILLING_SERVER+'/dashboard';
    window.open(billingUrl, '_blank').focus();

  }
  

  render() {
   let selectedConsole=null;

   switch(this.props.common.selectedConsole){
      case 'PLAYER_DETAILS':
      selectedConsole=<PlayerDetailsPg/>;
      break;
      case 'SCHEDULES':
      selectedConsole=<SchedulesPg
                        schedules = {this.props.schedules}
                        user= {this.props.user}
                        common = {this.props.common}
                        toggleRootModal = {this.toggleRootModal}
                        publishToSreens = {this.props.publishToSreens}
                        playlists = {this.props.playlists}
                        appsList = {this.props.appsList}
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
        />;
      break;
      case 'TEMPLATE_EDIT':
      selectedConsole=<TemplateEditPg
            user= {this.props.user}
            common = {this.props.common}
      />;
      break;
      case 'TEMPLATE_NEW':
      selectedConsole=<TemplateNewPg
            user= {this.props.user}
            common = {this.props.common}
          />;
      break;
      case 'TEMPLATE_LIST':
      selectedConsole=<TemplatePg
            user= {this.props.user}
            common = {this.props.common}
            toggleRootModal = {this.toggleRootModal}
            publishToSreens = {this.props.publishToSreens}
            playersList = {this.props.posts.playersList}
            appsList = {this.props.appsList}
            rootModal = {this.props.rootModal}
      />;
      break;
      case 'CUSTOMS_TEMPLATE_NEW':
      selectedConsole= <CustomTemplateNewPg/>;
      break;
      case 'CUSTOMS_TEMPLATE_EDIT':
      selectedConsole= <CustomTemplateEditPg/>;
      break;
      case 'CUSTOMER':
      selectedConsole= <CustomerPg/>;
      break;
      case 'USER_SCREENS':
      selectedConsole= <PlayersListPg
                        playersList = {this.props.posts.playersList}
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
      case 'GALLERY':
      selectedConsole= <GalleryPg
                  user= {this.props.user}
                  rootModal = {this.props.rootModal}
                  common = {this.props.common}
                  toggleRootModal = {this.toggleRootModal}
    />;
    break;
    case 'PAYMENT':
      selectedConsole= <PaymentPg
                  user= {this.props.user}
                  common = {this.props.common}
    />;
    break;
      case 'PUB-GALLERY':
      selectedConsole= <GalleryPg
                  user= {this.props.user}
                  common = {this.props.common}

                  />;
      break;
      case 'REPORTS':
      selectedConsole= <ReportsPg
         user = {this.props.user}
         posts = {this.props.posts}
         common = {this.props.common}
      />;
      break;

      case 'IAM-USERS':
      selectedConsole= <IamUserContainer
         user = {this.props.user}
         posts = {this.props.posts}
         common = {this.props.common}
         rootModal = {this.props.rootModal}
         closeModalPopup={this.props.closeModalPopup}
      />;
      break;

      case 'HELP':
      selectedConsole= <Help
         user = {this.props.user}
         common = {this.props.common}
      />;
      break;

      case 'ANNOUNCEMENTS':
      selectedConsole= <Announcements
         user = {this.props.user}
         common = {this.props.common}
      />;
      break;
      
      case 'CUSTOMER_DATA':
      selectedConsole=<div className="title-container">
      <CustomerPg/></div>;
      break;

      case 'BUILDER':
      selectedConsole= <BuilderPg/>;
      break;
      default:
      selectedConsole = <UserHomePg
        posts = {this.props.posts}
        playerItemsStatus= {this.props.posts.playerItemsStatus}
        appsList = {this.props.appsList}
        user= {this.props.user}
        common = {this.props.common}
        playlists = {this.props.playlists}
        toggleRootModal = {this.toggleRootModal}
        publishToSreens = {this.props.publishToSreens}
        schedules = {this.props.schedules}
        rootModal = {this.props.rootModal}
        userSubs = {this.props.userSubs} 
      />;

   }
    let drawerClss= this.props.user.config.settings.other_b || this.isPortrait?'side-drawer-large':'side-drawer';
    let leftDrawerActiveCls =this.state.leftMenu?'drawer-open':'drawer-close';
    let isDarkTheme =this.props.user.config.settings.other_b || this.isPortrait ? true :false;
    return (
      <div className={isDarkTheme?'dark':''}>
      <span className="glyphicon glyphicon-menu-hamburger" onClick={()=>{this.toggleLeftMenu()}}  ></span>
      <div className={drawerClss + ' '+leftDrawerActiveCls}>

      <div className={'logo-container'}>
      
      <span className="logo-common"></span>
      </div>

      {this.isPortrait && <div style={{paddingBottom:'10px',color:'#a2a2a2'}}>
      <span className={'glyphicon glyphicon-user user-icon'}></span>
      
        <span className='menu-arrow glyphicon'>
          <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
      <Dropdown.Toggle title={this.props.user.user && this.props.user.user.name.toUpperCase()} />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>

          { IsBillingModule && <MenuItem onClick={()=> {this.props.changeConsole('PAYMENT')}}>
              <label className="glyphicon glyphicon-usd"  ></label>
              <span>MY PLAN</span>
            </MenuItem>

          }
            <MenuItem onClick={()=>{this.toggleRootModal('SETTINGS',"")}}>
              <span className="glyphicon glyphicon-cog"  ></span><span>SETTINGS</span>
            </MenuItem>
          <MenuItem onClick={(e)=>{this.changeTheme(e)}}>
              <span className="glyphicon glyphicon-cog"  ></span><span>{isDarkTheme?'LIGHT THEME':'DARK THEME'}</span>
            </MenuItem>
            <MenuItem  onClick={(e)=>{this.logout(e)}}>
              <span className="glyphicon glyphicon-log-out"  ></span><span>LOG OUT</span>
            </MenuItem>

        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>
                      
      </div>}

    {!this.isForceSubscribe &&  <div><div className={'menu-holder'} style={{marginTop:'20px'}} onClick={(event) => this.gotoConsole(event,'LANDING')}>
        <a href='#'>
        <span 
          className={this.props.common.selectedConsole=="LANDING"?"glyphicon glyphicon-dashboard active-icon":"glyphicon glyphicon-dashboard"}  style={{left:'1px'}}>
        </span>
        <span className={this.props.common.selectedConsole=="LANDING"?'left-menu-title active':'left-menu-title'}>DASHBOARD</span>
        </a>
      </div>
     
      <div className={'menu-holder'} onClick={(event) => this.gotoConsole(event,'USER_SCREENS')}>
        <a href='#'>
        <span className={this.props.common.selectedConsole=="USER_SCREENS"?"playlist_icon_active":"playlist_icon "} style={{left:'2px'}}  ></span>
        <span  className={this.props.common.selectedConsole=="USER_SCREENS"?'left-menu-title active':'left-menu-title'}>SCREENS</span>
        </a>
      </div>
      
      <div className={'menu-holder'}>
        <a href='#' onClick={(event) => this.gotoConsole(event,'PLAYLISTS')}>
        <span  className={this.props.common.selectedConsole=="PLAYLISTS"?"glyphicon glyphicon-list  active-icon":"glyphicon glyphicon-list"} onClick={(event) => this.gotoConsole(event,'PLAYLISTS') } style={{left:'0px'}}  >
        </span>
        <div className={this.props.common.selectedConsole=="PLAYLISTS"?"left-menu-title active":'left-menu-title'}>PLAYLISTS</div>
        </a>
      </div>

      <div className={'menu-holder'}>
        <a href='#' onClick={(e) => this.gotoConsole(event,'TEMPLATE_LIST')}>
        <span  className={this.props.common.selectedConsole=="TEMPLATE_LIST"?"template-icon-active":"template-icon"}  style={{left:'2px'}} ></span>
        <div className={this.props.common.selectedConsole=="TEMPLATE_LIST"?"left-menu-title active":'left-menu-title'}>TEMPLATES</div>
        </a>
      </div>

      {false && <div className={'menu-holder'}>
        <a href='#' onClick={(e) => this.gotoConsole(event,'CUSTOMER_DATA')}>
        <span  className={this.props.common.selectedConsole=="CUSTOMER_DATA"?"glyphicon glyphicon-link  active-icon":"glyphicon glyphicon-link"}  style={{left:'2px'}} ></span>
        <div className={this.props.common.selectedConsole=="CUSTOMER_DATA"?'left-menu-title active':'left-menu-title'}>CUSTOM</div>
        </a>
      </div>}


      <div className={'menu-holder'}>
        <a href='#' onClick={(e) => this.gotoConsole(event,'SCHEDULES')}>
        <span  className={this.props.common.selectedConsole=="SCHEDULES"?"glyphicon glyphicon-calendar active-icon":"glyphicon glyphicon-calendar"}  style={{left:'2px'}} ></span>
        <div className={this.props.common.selectedConsole=="SCHEDULES"?'left-menu-title active':'left-menu-title'}>SCHEDULES</div>
        </a>
      </div>

      {this.props.user.config.settings.isGalleryAdvanced &&
      <div className={'menu-holder'}>
        <a href='#' onClick={(e) => this.gotoConsole(event,'GALLERY')} >
        <span data-tip={"MY LIBRARIES"} style={{left:'1px'}} className={this.props.common.selectedConsole=="GALLERY"?"glyphicon glyphicon-picture active-icon":"glyphicon glyphicon-picture"} ></span>
        <div className={this.props.common.selectedConsole=="GALLERY"?'left-menu-title active':'left-menu-title'}>MY LIBRARIES</div>
        </a>
      </div>
      }

      {this.props.user.config.settings.isGalleryAdvanced && 
      <div className={'menu-holder'}>
        <a href='#' onClick={(e) => this.gotoConsole(event,'PUB-GALLERY')}>
        <span data-tip={"PUBLIC LIBRARY"} style={{left:'1px'}} className={this.props.common.selectedConsole=="PUB-GALLERY"?"glyphicon glyphicon-picture active-icon":"glyphicon glyphicon-picture"}  ></span>
        <div className={this.props.common.selectedConsole=="PUB-GALLERY"?'left-menu-title active':'left-menu-title'}>PUBLIC LIBRARY</div>
        </a>
      </div>
    }
      

    { !this.props.user.config.settings.isGalleryAdvanced && 
      <div className={'menu-holder'}>
        <a href='#' onClick={(e) => this.gotoConsole(event,'GALLERY')}>
        <span data-tip={"LIBRARIES"} style={{left:'1px'}} className={this.props.common.selectedConsole=="GALLERY"?"glyphicon glyphicon-picture active-icon":"glyphicon glyphicon-picture"}  ></span>
        <div className={this.props.common.selectedConsole=="GALLERY"?'left-menu-title active':'left-menu-title'}>LIBRARIES</div>
        </a>
      </div>
    }

      <div className={'menu-holder'}>
        <a href='#' onClick={(event) => this.gotoConsole(event,'REPORTS') }  >
        <span data-tip={"REPORTS"} className={this.props.common.selectedConsole=="REPORTS"?"report_icon_active active-icon":"report_icon"} >
        </span>
        <div className={this.props.common.selectedConsole=="REPORTS"?'left-menu-title item-last active':'left-menu-title item-last'}>REPORTS</div>
        </a>
      </div>

      {!this.props.user.user.isAdmin && !this.props.user.user.isIAMUser && <div className={'menu-holder'}>
        <a href='#' onClick={(event) => this.gotoConsole(event,'IAM-USERS') }  >
        <span data-tip={"MEMBERS"} className={this.props.common.selectedConsole=="IAM-USERS"?"glyphicon glyphicon-user active-icon":"glyphicon glyphicon-user"} >
        </span>
        <div className={this.props.common.selectedConsole=="IAM-USERS"?'left-menu-title item-last active':'left-menu-title item-last'}>{'MEMBERS'}</div>
        </a>
      </div>}

      </div>}
      

     
      <br/>
      <br/>
      <div className={'menu-holder bottom-menu'}>
        <a href='#' onClick={(event) => this.gotoConsole(event,'HELP') }  >
        <span data-tip={"HELP"} className={this.props.common.selectedConsole=="HELP"?"glyphicon glyphicon-question-sign active-icon":"glyphicon glyphicon-question-sign"} >
        </span>
        <div className={this.props.common.selectedConsole=="HELP"?'left-menu-title active':'left-menu-title '}>HELP</div>
        </a>
      </div>
      </div>
      <div id="dashboard" className={this.isPortrait?"container no-menu" :(this.state.leftMenu?"container ": "container no-menu")}>
     
      {selectedConsole}
      {this.isForceSubscribe && this.isSubscriptionValid()}
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

      {!this.isPortrait && 
      <div id='right-top-user-menu' style={{position:'fixed',right:'40px',top:'0px',color:'#a2a2a2'}}>
      <span style={{ marginRight:'20px'}} className='glyphicon glyphicon-bullhorn' onClick={(e) => this.gotoAnnounce()}>
      {!this.state.isViewed && <span style={{backgroundColor:PrimaryColor}} className='announce'></span>}</span>
        <span className='menu-arrow glyphicon glyphicon-user'>
          <Dropdown autoOpen={true} arrowClassName='' className={''}>
      <Dropdown.Toggle />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
        <MenuItem>
              <div><label style={{fontSize:'1.2em',color:PrimaryColor}}>Welcome!</label></div>
              <span>{this.props.user.user && this.props.user.user.name.toUpperCase()} </span>
            </MenuItem>

          { IsBillingModule && <MenuItem onClick={()=> {this.props.changeConsole('PAYMENT')}}>
              <label className="glyphicon glyphicon-usd" ></label>
              <span>MY PLAN</span>
            </MenuItem>

          }
            <MenuItem onClick={()=>{this.toggleRootModal('SETTINGS',"")}}>
              <span className="glyphicon glyphicon-cog"  ></span>
              <span>SETTINGS</span>
            </MenuItem>
          <MenuItem onClick={(e)=>{this.changeTheme(e)}}>
              <span className="glyphicon glyphicon-cog"  ></span><span>{this.props.user.config.settings.other_b?'LIGHT THEME':'DARK THEME'}</span>
            </MenuItem>
            <MenuItem  onClick={(e)=>{this.logout(e)}}>
              <span className="glyphicon glyphicon-log-out"  ></span><span>LOG OUT</span>
            </MenuItem>

        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>     
      </div>
    }

      </div>
      </div>

    )

  }
}


export default UserDashboard;

