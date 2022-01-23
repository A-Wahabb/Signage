import React, { Component, PropTypes } from 'react';
import transScreen from '../assets/signage-trans.png';
import emptyScreen from '../assets/signage-empty.png';
import {BASE_SERVER,ProviderEmail,ProviderPhn} from '../constants/Config';
import {Loading,Error,LaunchPreview} from './commonDumbs';
import ContentSelectionContainer from './content-selection/ContentSelectionContainer.js';
import { confirmAlert } from 'react-confirm-alert'; // Import
import Search from './search/SearchContainer.js';
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    DropdownButton
} from '@trendmicro/react-dropdown';
import WebPageContainer from './webpage-content/WebPageContainer.js';
import TemplatePg from '../pages/TemplatePg.js';
import ReactTooltip from "react-tooltip";
import PlaylistPg from '../pages/PlaylistPg.js';
import SchedulesPg from '../pages/SchedulesPg.js';
import ModalLocal from './modal-local';
import NewPlayerPg from './new-player/NewPlayerPg.js';
import PlayerDetailsPg from './player-details/PlayerDetailsPg.js';
import PlayerListTableView from './player-list-table/PlayerListTableView.js';
import ScreenPlaylistItems from './screen-playlist-items/ScreenPlaylistItemsContainer.js';
import PlaylistEditorPopup from './playlist-editor/PlaylistEditorPopup.js';

class PlayersList extends Component {

  constructor() {
    super();
    this.state={
      searchText:'',
      modalOpen:false,
      isNewPlayer:false,
      showDetailSlide:false,
      isScreenPlaylistStatus:false,
      isPlaylistEditor:false,
      editPlayListDetails : null,
      isConfirmPublish : false,
      isContentSelection:false,
      selectedContentType: ""
    };
    this.toggleNewPlayer.bind(this);
    this.previewPlayer=null;
    this.selectApp=null;
    this.selectedPlayer=null;
    this.selectedPlayers=null;
    this.selectedPlayerId=null;
    this.selectedPlayerApp=null;
    this.screenshot = {};
    this.toggleContentSelection = this.toggleContentSelection.bind(this);
    this.renderPreviewWindow = this.renderPreviewWindow.bind(this);
    this.closeModalPopup = this.closeModalPopup.bind(this);
    this.toggleSlide=this.toggleSlide.bind(this);
    this.toggleNewPlayer=this.toggleNewPlayer.bind(this);
    this.setSelection = this.setSelection.bind(this);
    this.setPreviewPlayer = this.setPreviewPlayer.bind(this);
    this.gotoEditApp = this.gotoEditApp.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
    this.getScreenShot = this.getScreenShot.bind(this);
    this.reloadScreenShot = this.reloadScreenShot.bind(this);
    this.toggleScreenPlaylistPopup = this.toggleScreenPlaylistPopup.bind(this);
    this.setContentType = this.setContentType.bind(this);
    this.showItemsDetail = this.showItemsDetail.bind(this);
    this.getPlaylistDetails = this.getPlaylistDetails.bind(this);
    this.checkIfScreenPlaylistItems= this.checkIfScreenPlaylistItems.bind(this);
    this.checkPlaylistEditDetails = this.checkPlaylistEditDetails.bind(this);
    this.savePlaylist= this.savePlaylist.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  
  gotoEditApp(evt,playerId, appId) {
      evt&&evt.stopPropagation();

      if (appId) {
        this.props.fetchPlayerDetail(playerId);
        this.props.setSelectPlayerId(playerId);
        this.props.setSelectedAppId(appId);
        this.props.changeConsole("TEMPLATE_EDIT","USER_SCREENS");
      }
      else{
        this.props.fetchPlayerDetail(playerId);
        this.props.setSelectPlayerId(playerId);
        this.props.changeConsole("TEMPLATE_LIST","USER_SCREENS");
      }
      try{
      document.getElementsByClassName('__react_component_tooltip show place-top type-light customTheme')[0].style.visibility='hidden';
      document.getElementsByClassName('__react_component_tooltip show place-top type-light customTheme')[0].style.display='none !important';
    }catch(e){console.log(e);}
      return false;
    }
 
  getScreenShot(playerId){
    this.screenshot[playerId]=BASE_SERVER+'/preview/pop_shots/'+(playerId!=-1?playerId:"no_thumbnail")+".jpg?" + new Date().getTime();
    return this.screenshot;
  }

  reloadScreenShot (playerId){
    return BASE_SERVER+'/preview/pop_shots/no_thumbnail.jpg?' + new Date().getTime();
    }

  changeListDisplay(type){
        this.props.setListDisplayType(type);
  }

  componentDidUpdate(prevProps,prevState){
       ReactTooltip.rebuild();
      
      if(prevState.isNewPlayer && !this.state.isNewPlayer){
        this.props.fetchPlayers();
      }
      
      this.checkPlaylistEditDetails(prevProps);
      this.checkIfScreenPlaylistItems(prevProps);
      this.renderPreviewWindow();
      if(this.state.isConfirmPublish &&
        (JSON.stringify(prevProps.playlists.newPlaylist.details) !==
        JSON.stringify(this.props.playlists.newPlaylist.details))){
        this.confirmPublish();
      }
  }

  checkPlaylistEditDetails(prevProps){
    if( this.state.isPlaylistEditor && 
       !this.state.modalOpen &&
       JSON.stringify(prevProps.playlists.playList.items) !== JSON.stringify(this.props.playlists.playList.items))
      { 
        let editPlayListDetails = Object.assign({},this.state.editPlayListDetails);
        editPlayListDetails.items = this.props.playlists.playList.items;
        this.setState({
            editPlayListDetails: editPlayListDetails,
            modalOpen: true
        });
        
      }
  }

getPlaylistDetails(){
    this.setState({
    editPlayListDetails: this.selectedPlayerApp,
    isPlaylistEditor: true
    });
    this.props.fetchPlaylist(this.selectedPlayerApp._id);
}

  defaultImageLoad(e){
    e.target.src= BASE_SERVER+'/preview/player_thumb/signage.jpg';
  }

  showItemsDetail(){
    console.log('Selected showitems', this.selectedPlayerApp);
    this.props.fetchPlaylist(this.selectedPlayerApp._id);
    this.setState({
          isScreenPlaylistStatus : true
        });
  }

  confirmPublish= () => {
      console.log('before publish',this.props.playlists);
      let content = Object.assign({},this.props.playlists.newPlaylist.details);
      confirmAlert({
        title: 'Ready To Publish?',                      
        message: 'Do you want to continue editing or Ready to publish into screens?', 
        childrenElement: () => <div></div>,       
        confirmLabel: 'PUBLISH',                           
        cancelLabel: "EDIT MORE",                             
        onConfirm: () => {
          this.setState({isConfirmPublish:false});
          this.closeModalPopup(); 
          this.props.toggleRootModal("PUBLISH",content);},    
        onCancel: () => {this.setState({isConfirmPublish:false});this.props.resetNewPlaylist()},      
      });
}

  checkIfScreenPlaylistItems(prevProps){
    if(this.state.isScreenPlaylistStatus &&
      JSON.stringify(prevProps.playlists.playList.items) !==  JSON.stringify(this.props.playlists.playList.items))
      {
        console.log('launching screen items details');
        let itemsArr= this.props.playlists.playList.items.map(item=>item._id);
        this.props.fetchPlayerItemsStatus(this.selectedPlayerId,itemsArr);
        
      }
      console.log('final items',this.props.playerItemsStatus.items);
      if(this.state.isScreenPlaylistStatus && 
        JSON.stringify(prevProps.playerItemsStatus.items) !==  JSON.stringify(this.props.playerItemsStatus.items) &&
        !this.state.modalOpen )
        {
          this.setState({
            modalOpen:true
          });
        }
  }

closeModalPopup(){
  if(this.state.isScreenPlaylistStatus || this.state.isPlaylistEditor){
    this.props.resetPlaylist();
  }
  this.setState({
        modalOpen:false,
        isNewPlayer: false,
        isScreenPlaylistStatus: false,
        isPlaylistEditor: false,
        editPlayListDetails : null,
        isContentSelection:false,
        selectedContentType: ""
      });
  this.previewPlayer=null;

    }
 toggleContentSelection(player){
      if(player){
        this.selectedPlayer= player;
      }
      this.setState({
        isContentSelection: !this.state.isContentSelection
      });
    }

toggleScreenPlaylistPopup(){
       this.setState({
        modalOpen:!this.state.modalOpen,
        isScreenPlaylistStatus: !this.state.isScreenPlaylistStatus
      });
    }

togglePreview(){
      this.setState({
        modalOpen:!this.state.modalOpen
      });

    }
toggleNewPlayer(){
      this.setState({
        isNewPlayer: !this.state.isNewPlayer
      });
    }

togglePlaylistSelection(){
      this.setState({
        isPlaylistSelection: !this.state.isPlaylistSelection
      });
    }
setContentType(evt, type){
      this.setState({
        selectedContentType: type
      });
  }

 renderPreviewWindow(){
      if(this.state.modalOpen && this.previewPlayer){
      return LaunchPreview();
      }
 }
getModalContent(){

      if(this.previewPlayer){
        let playerApp= this.props.appsList.apps.filter(app=> app._id == this.previewPlayer.appId)[0];
        let previewPath=BASE_SERVER+'/drft/'+playerApp.appLocation+'/index.html';
        return (
          <iframe id='preview-frame' width='960px' height='540px' className="preview-content" src={previewPath} ></iframe>
        );
      }
      else if(this.state.isNewPlayer){
        if(this.props.user.user.age <= this.props.playersList.players.length){
          return <div style={{padding:'10px'}}><h3 className={'red danger'} >
          {"You have added all allowed screens, plz contact admin for more...!!" }</h3><div><label>{'Email: '+ProviderEmail}</label></div><div><label>{'Phone: '+ProviderPhn}</label></div></div>
        }else{
        return (
              <div><NewPlayerPg 
              newPlayer = {this.props.newPlayer}
              toggleContentSelection= {this.toggleContentSelection}
              closeModalPopup={this.closeModalPopup}
              toggleNewPlayer = {this.toggleNewPlayer}
              themeColor= {this.props.user.config.settings.color_primary}
              />
             
        </div>);
        }

      }
      else if(this.state.isContentSelection){

        return (<div><ContentSelectionContainer
              closeModalPopup={this.closeModalPopup}
              setContentType = {this.setContentType}
              selectedPlayer={this.selectedPlayer}
              toggleContentSelection= {this.toggleContentSelection}
        />

        </div>);

      }else if(this.state.selectedContentType== 'PLAYLIST'){
        return (<div><PlaylistPg
                        playlists = {this.props.playlists}
                        user= {this.props.user}
                        common = {this.props.common}
                        publishToSreens = {this.props.publishToSreens}
                        playersList = {this.props.playersList}
                        toggleRootModal = {this.props.toggleRootModal}
                        publishToSreens= {this.props.publishToSreens}
                        closeModalPopup={this.closeModalPopup}
                        selectedPlayer={this.selectedPlayer}
        />

        </div>);

      }
      else if(this.state.selectedContentType== 'SCHEDULE'){
        return (<div><SchedulesPg
                        schedules = {this.props.schedules}
                        playlists = {this.props.playlists}
                        user= {this.props.user}
                        common = {this.props.common}
                        publishToSreens = {this.props.publishToSreens}
                        playersList = {this.props.playersList}
                        toggleRootModal = {this.props.toggleRootModal}
                        closeModalPopup={this.closeModalPopup}
                        selectedPlayer={this.selectedPlayer}
                        appsList = {this.props.appsList}
        />

        </div>);

      }
      else if(this.state.selectedContentType== 'WEBPAGE'){
        return (<div><WebPageContainer
                        publishToSreens = {this.props.publishToSreens}
                        closeModalPopup={this.closeModalPopup}
                        selectedPlayer={this.selectedPlayer}
        />

        </div>);

      }else if(this.state.selectedContentType== 'TEMPLATE'){
        return (<div><TemplatePg
                        publishToSreens = {this.props.publishToSreens}
                        closeModalPopup={this.closeModalPopup}
                        selectedPlayer={this.selectedPlayer}
                        user= {this.props.user}
                        common = {this.props.common}
                        playersList = {this.props.playersList}
                        appsList = {this.props.appsList}
        />

        </div>);

      }
      else if(this.state.isScreenPlaylistStatus){
        console.log('launching details',this.props.playlists);
        return (
              <div>
              <ScreenPlaylistItems 
                  closeModalPopup={this.closeModalPopup}
                  common = {this.props.common}
                  user= {this.props.user}
                  playList={this.props.playlists.allPlaylist.lists.filter((playlist)=>playlist._id == this.selectedPlayerApp._id)}
                  playListItems= {this.props.playlists.playList.items}
                  screenPlaylistItems={this.props.playerItemsStatus}
                  playerDetails={this.props.playersList.players.filter(player=> player._id == this.selectedPlayerId )}
              />
             
            </div>);

      }

      else if (this.state.isPlaylistEditor){

        return (<div><PlaylistEditorPopup 
                  closeModalPopup={this.togglePlaylistEditor}
                  common = {this.props.common}
                  user= {this.props.user}
                  savePlaylist = {this.savePlaylist}
                  removePlaylistItems = {this.props.removePlaylistItems}
                  playListDetail = {this.state.editPlayListDetails}
         /></div>);

      }
      else{
        return ("Content Not loaded properly!!");
      }

    }

  savePlaylist(playListObj){
      console.log('saving playlist', playListObj);
      if(playListObj._id){
        this.props.updatePlaylist(playListObj);
      }else{
        this.props.saveNewPlaylist(playListObj);
      }
      this.setState({
                isConfirmPublish:true
              });
  }

  renderPlayerTiles (players,user) {
    console.log('players', players);
    var content = null;
    let changeConsole = (playerId,playerTap)=>(this.props.setSelectPlayerId(playerId),console.log(playerTap),this.props.changeConsole(playerTap,"USER_SCREENS"));
    let gotoEditTemp = (evt,playerId, appId) => this.gotoEditApp(evt, playerId,appId);
    let previewApp=(evt,player) => (this.previewPlayer=player,this.togglePreview());
    let toggleNewPlayer =(()=>this.toggleNewPlayer());
    let modalOpen = (()=> this.togglePreview());
    let defaultImageLoad = this.defaultImageLoad;
    
    let addPlayer= [{addPlayer:"Add New Player"}];
    let playersArr = addPlayer.concat(players);
    let _self = this;
    let playerList=playersArr.map(function(player) {
      let appThumbnail = (player && player.thumb) ? BASE_SERVER+player.thumb: transScreen;
      var playerName =player.playerName ? player.playerName : null;
      let playerTap= player && player._id? "PLAYER_DETAILS":"NEW_PLAYER_FORM";
      var buttons =player.addPlayer && <div className="center-item "><button style={{display:'inline-block',marginTop:'3px'}}
      className="btn btn-primary big-btn" onClick={()=>(modalOpen(),toggleNewPlayer())} >
      <span  className="glyphicon glyphicon-plus inline-icon"></span>ADD NEW SCREEN
      </button></div>;
      let nowDate= new Date();
      let isConnected = player.powerStatus == 'ONLINE'?true :false;
      _self.getScreenShot(player._id);
      let liveScreenShot= ()=> <img src={player.thumb?_self.screenshot[player._id]:transScreen} onError={(e)=>{e.target.onError = null; e.target.src=_self.reloadScreenShot()}}  alt="242x200"/>;
      return (
        <li className="col-xs-12 col-md-6 col-lg-4 list-group-item" key={player._id?player._id:-1} >
        <div className="thumbnail screen" >

        {liveScreenShot()}

       

         {!playerName && buttons} 

        </div>
         {playerName && <h5 className="top-caption" onClick={()=>changeConsole(player._id?player._id:-1,playerTap)}>{isConnected && <span  className="blink small-circle-green" data-tip="Network connected"  title="Network connected" ></span>}{!isConnected && <span  className="small-circle-red" data-tip="Network: OFFLINE"></span>}<a href="#">{playerName}</a></h5>}

        {playerName && <span className='menu-dots upside-options'>
          <Dropdown autoOpen= {true} arrowClassName='menu-dots-inner' className={'player-drop'}>
      <Dropdown.Toggle title="" />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            <MenuItem onClick={()=>changeConsole(player._id?player._id:-1,playerTap)}>
                Screen Details
            </MenuItem>
            <MenuItem onClick={(evt) => gotoEditTemp(evt,player._id, player.appId?player.appId:null)}>
                {player.appId?'Edit Template':'Add Template'}
            </MenuItem>
            {player.appId && <MenuItem  onClick={(evt) => previewApp(evt, player)}>
               Preview Template
            </MenuItem>}
            {player.appId && <MenuItem  onClick={(evt) => gotoEditTemp(evt,player._id,null)}>
               Change Template
            </MenuItem>}
        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>}
        </li>
      )
    });
    return playerList;

  }
  setSelection(playerId,playerApp){
      console.log('selected app', playerApp);
      this.selectedPlayerApp = playerApp;
      this.selectedPlayerId = playerId;
    }

  setPreviewPlayer(player){
    this.previewPlayer = player 
  }

  toggleSlide(){
    this.setState({
      showDetailSlide:!this.state.showDetailSlide
    });

  }

isSearchPlayer(player){

  if(player.playerName.toLowerCase().indexOf(this.state.searchText.toLowerCase())!= -1 || player.screenNumber.toString().indexOf(this.state.searchText)!= -1){
    
    return true;
  }else{
    return false;
  }

}

onSearchChange(e){
      console.log('search change',e.target.value);
      this.setState({
        searchText: e.target.value
      });
  }

  getModalClass(){
    if(this.previewPlayer){
      return 'modal-local modal-preview';
    }else if(this.state.isScreenPlaylistStatus){
      return 'modal-local modal-default modal-large col-sm-12 col-lg-8 col-md-10';
    }
    else if(this.state.isPlaylistEditor || 
      this.state.selectedContentType == 'PLAYLIST' ||
      this.state.selectedContentType == 'TEMPLATE'){
      return 'modal-local modal-default modal-large col-sm-12 col-lg-10 col-md-10';
    }
    else{
      return 'modal-local modal-default ';
    }
  }

  render() {
   
    const { players, loading, error} = this.props.playersList;
    const { user} = this.props.user;
    const {apps} = this.props.appsList;
    const {schedules} = this.props.schedules;
    const {allPlaylist} = this.props.playlists;
    console.log('---all users', this.props.usersList);
    let userApps = apps.filter(app => !app.isTemplate);
    let displayType= this.props.listDisplayType;
    let tilesSelect= displayType=='TILE'?'glyphicon glyphicon-th select-active': 'glyphicon glyphicon-th';
    let listSelect = displayType=='LIST'?'glyphicon glyphicon-th-list select-active':'glyphicon glyphicon-th-list';
    
    return(
      <div><div className="title-container">
      <h2 className="header-title">Screens</h2>
      <Search 
          changeConsole = {this.props.changeConsole} 
          onSearchChange = {this.onSearchChange}
        />
      {!user.admin && <div className="search-bar">
      <button style={{padding:'0px',wordSpacing:'-2px',textIndent:'2px',color:this.props.user.config.settings.color_primary}}
      className="btn-primary-link" onClick={()=>(this.togglePreview(),this.toggleNewPlayer())} >
      <span  className="glyphicon glyphicon-plus inline-icon"></span>ADD NEW SCREEN
      </button>
      {false && <div className='list-selection'>
      <span className={tilesSelect} onClick={()=>this.changeListDisplay('TILE')} > </span>
      <span className={listSelect} onClick={()=>this.changeListDisplay('LIST')}> </span>
      </div>}
      </div>}

      </div>
      <Loading isLoading={loading}/>
      <Error error={error}/>

      <div style={{padding:'10px',textAlign:'right'}}>
      <span className='menu-arrow glyphicon optionbtn'>
          <Dropdown autoOpen= {true}  className={'player-drop'}>
      <Dropdown.Toggle title="BULK ACTION" style={{fontSize:'0.8em',color:this.props.user.config.settings.color_primary}} />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            <MenuItem onClick={()=>this.props.triggerBulkAction('NEW_UPDATE')}>
                UPDATE CONTENTS
            </MenuItem>
            <MenuItem onClick={()=>this.props.triggerBulkAction('POPUP_DETAILS')}>
                POPUP DETAILS ON SCREENS
            </MenuItem>
            <MenuItem onClick={(evt) => this.props.triggerBulkAction('SCREEN_REBOOT')}>
                LAUNCH SCREENS
            </MenuItem>
            <MenuItem  onClick={(evt) => this.props.triggerBulkAction('NEW_APK')}>
               TRIGGER PLAYER APP UPGRADE
            </MenuItem>
           <MenuItem  onClick={(evt) => this.props.triggerBulkAction('SCREEN_SHOT')}>
               LIVE SNAPSHOT FROM SCREENS
            </MenuItem>
        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>
        </div>

      {displayType=='TILE'?this.renderPlayerTiles(players,user):

      <PlayerListTableView 
       players={players.filter( player => this.isSearchPlayer(player))} 
       user={user} 
       userApps={apps} 
       usersList={this.props.usersList}
       allPlaylist={allPlaylist}
       toggleSlide = {this.toggleSlide}
       setSelection = {this.setSelection}
       setPreviewPlayer={this.setPreviewPlayer}
       togglePreview= {this.togglePreview}
       gotoEditApp = {this.gotoEditApp}
       toggleContentSelection = {this.toggleContentSelection}
       schedules = {schedules}
       />}

      {this.state.showDetailSlide && 
        <div onClick={(e)=> this.toggleSlide()} 
        className='full-overlay'>
        </div>}
        <div className={this.state.showDetailSlide?'slide-right':'slide-close'}>
          {this.state.showDetailSlide &&
          <PlayerDetailsPg 
          selectedPlayerId={this.selectedPlayerId} 
          content={this.selectedPlayerApp} 
          toggleSlide={this.toggleSlide}
          showItemsDetail = {this.showItemsDetail}
          getPlaylistDetails = {this.getPlaylistDetails} 
          themeColor={this.props.user.config.settings.color_primary} 
          latestPlayerVer={this.props.user.playerVersion}
          rootModal={this.props.rootModal}
          settings = {this.props.user.config.settings}
          />}
      </div>

      <ModalLocal  className={this.getModalClass()} isOpen={this.state.modalOpen} >
{this.state.modalOpen?this.getModalContent():''}<span  style={{position:'fixed',top:'-20px', right:'1px',background:'#e7e5e5',borderRadius:'11px',padding:'2px'}} className="glyphicon glyphicon-remove" onClick={(e) => this.closeModalPopup(e)} ></span></ModalLocal>
      </div>);
  }
}


export default PlayersList;
