import React, { Component, PropTypes } from 'react';
import transScreen from '../assets/signage-trans.png';
import emptyScreen from '../assets/signage-empty.png';
import {BASE_SERVER,LOCAL_SERVER} from '../constants/Config';
import {Loading,Error} from './commonDumbs';
import ReactTooltip from "react-tooltip";
import ModalLocal from './modal-local';

import PlayerDetailsPg from './player-details/PlayerDetailsPg.js';
import PlayerListTableView from './player-list-table/PlayerListTableView.js';
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    DropdownButton
} from '@trendmicro/react-dropdown';

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}


class Search extends Component {

  constructor() {
    super();
    this.state={
      modalOpen:false,
      showDetailSlide: false,
      searchFrom:['SCREENS','CONTENTS','LIBRARY'],
    }

  this.toggleNewPlayer.bind(this);
  this.previewPlayer=null;
  this.selectApp=null;
  this.selectedPlayers=null;
  this.selectedPlayerId=null;
  this.selectedPlayerApp=null;
  this.screenshot = {};
  this.closeModalPopup = this.closeModalPopup.bind(this);
  this.toggleSlide=this.toggleSlide.bind(this);
  this.setSelection = this.setSelection.bind(this);
  this.setPreviewPlayer = this.setPreviewPlayer.bind(this);
  this.gotoEditApp = this.gotoEditApp.bind(this);
  this.togglePreview = this.togglePreview.bind(this);

  }
  componentWillMount() {
    this.props.resetMe();
    if(window.sessionStorage.getItem('isNewPlayer')=="true"){
      window.sessionStorage.setItem('isNewPlayer',false);
    }
    
    if (!this.props.posts.playersList.loading){
      this.props.fetchPlayers();
       this.props.fetchApps();
      //this.props.fetchPlayersOnlineStatus();
      //  this.props.fetchAllMediaByUserId(this.props.user._id);
    }
  }

componentDidMount(){
  //this.populateArray();
    //setInterval(this.populateArray, 2000);
    console.log('prps',this.props);
  }

componentDidUpdate(){

    ReactTooltip.rebuild();
  
    if(this.state.modalOpen){
      let frame= document.getElementById('preview-frame');
      let templateBody =frame && frame.contentWindow.document.getElementsByTagName('body');
       setTimeout(function(){
          if(templateBody[0]){
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.zoom =0.5;
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.overflow='hidden';
       }},2*1000);
    setTimeout(function(){
          if(templateBody[0]){
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.zoom =0.5;
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.overflow='hidden';
       }},5*1000);
        setTimeout(function(){
          if(templateBody[0]){
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.zoom =0.5;
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.overflow='hidden';
       }},10*1000);
      }

    }

closeModalPopup(){
  this.setState({
        modalOpen:false,
        isNewPlayer: false
      });
}

   togglePreview(evt){
     evt &&  evt.stopPropagation()
      this.setState({
        modalOpen:!this.state.modalOpen
      });

    }
     setSelection(playerId,playerApp){
      this.selectedPlayerApp = playerApp;
      this.selectedPlayerId = playerId;
    }

    toggleNewPlayer(){
      this.setState({
        modalOpen:!this.state.modalOpen,
        isNewPlayer: !this.state.isNewPlayer
      });
    }

toggleSlide(){
    this.setState({
      showDetailSlide:!this.state.showDetailSlide
    });

  }

    publishToSelected(){
      let publishToPlayers=this.props.posts.playersList.players.filter(player => this.selectedPlayers.indexOf(player._id) !== -1);
      if(publishToPlayers.legth==0)return false;
      publishToPlayers= publishToPlayers.map(player=> {
        player.status='PENDING';
        player.appId=this.selectApp._id; 
        player.thumbnailPath = this.selectApp.thumbnailPath;
        player.orientation = this.selectApp.orientation;
        player.thumb = this.selectApp.thumb ? this.selectApp.thumb : "KEEP_OLD";;
        return player;});
      this.props.moveToLiveFolder(this.selectApp);
      this.props.assignAppToPlayers(publishToPlayers);
      this.selectApp=null;
      this.selectedPlayers=null;
      this.togglePreview();
    }

    manageChecks(e,playerId){
      e.preventDefault();
      console.log(e.target);
      if(e.target.tagName.toLowerCase()=='span'){
e.target.className=e.target.className=='uncheck-box'?'checked-box':'uncheck-box';
      this.selectedPlayers.indexOf(playerId) != -1? this.selectedPlayers.splice(1,this.selectedPlayers.indexOf(playerId)):this.selectedPlayers.push(playerId);
    console.log(this.selectedPlayers);
}
return true;
    }

    getModalContent(){
      console.log('getting modal content');
      if(this.previewApp){
        let previewPath=BASE_SERVER+'/drft/'+this.previewApp.appLocation+'/index.html';
        return (
          <iframe id='preview-frame' width='960px' height='540px' className="preview-content" src={previewPath} ></iframe>
        );
      }
      else if(this.previewPlayer){
        let playerApp= this.props.appsList.apps.filter(app=> app._id == this.previewPlayer.appId)[0];
        let previewPath=BASE_SERVER+'/drft/'+playerApp.appLocation+'/index.html';
        return (
          <iframe id='preview-frame' width='960px' height='540px' className="preview-content" src={previewPath} ></iframe>
        );
      }
      else if(this.selectApp){
        let players= this.props.posts.playersList.players.filter(player => player.appId !== this.selectApp._id);
        this.selectedPlayers=[];
        this.selectedPlayers = players.filter(player=> {if(player.appId== this.selectApp._id){return player._id;}});
        this.selectedPlayers = this.selectedPlayers.map(player => player._id);
        console.log('seleceted player', this.selectedPlayers);
        return (
        <ul className='small-select-list'><h3>{'Select screens to assign template- ['+this.selectApp.appName+']'}</h3>
        {players.map(player => <li onClick={(e)=>this.manageChecks(e,player._id)}><span className={this.selectedPlayers.indexOf(player._id) != -1?'checked-box':'uncheck-box'}></span><h4>{player.playerName}</h4></li>)}
          <li style={{paddingLeft:'30%'}}><button disabled={players.length==0?true:false} className="btn btn-primary " onClick={() => this.publishToSelected()} >
      Publish On Selected
      </button></li>
        </ul>
        )
                
      }
      else if(this.state.isNewPlayer){
        return (<div><NewPlayerPg/>

        </div>);

      }
      else{
        return ("Template Not available for preview!!");
      }

    }
  

  gotoEditApp(evt,playerId, appId, domain) {
      evt&&evt.stopPropagation();
      if(appId && !domain){
      var  app = this.props.appsList.apps.filter(app => app._id== appId);
      domain = app[0]&&app[0].domain?app[0].domain:"";
      }
      if(appId && domain.indexOf('customs') !== -1){
        let activePlayer=this.props.activePlayer&&this.props.activePlayer.player?this.props.activePlayer.player:{};
        sessionStorage.removeItem('playerDetail');
        sessionStorage.removeItem('playerList');
        sessionStorage.removeItem('userInfo');
        sessionStorage.removeItem('media');
        sessionStorage.removeItem('selectedAppId');
        
        sessionStorage.setItem('selectedAppId',appId);
        sessionStorage.setItem('playerDetail',JSON.stringify(activePlayer));
        sessionStorage.setItem('playerList',JSON.stringify(this.props.posts.playersList.players));
        sessionStorage.setItem('userInfo',JSON.stringify(this.props.user.user));
         sessionStorage.setItem('media',JSON.stringify(this.props.user.mymedia.mediaList));
        window.location.href=LOCAL_SERVER+'/builder/index.html';
        
        return true;
      }
      else if (appId) {
        this.props.fetchPlayerDetail(playerId);
        this.props.setSelectPlayerId(playerId);
        this.props.setSelectedAppId(appId);
        this.props.changeConsole("TEMPLATE_EDIT","USER_HOME");
      }
      else{
        this.props.fetchPlayerDetail(playerId);
        this.props.setSelectPlayerId(playerId);
        this.props.changeConsole("TEMPLATE_LIST","USER_HOME");
      }
      try{
      document.getElementsByClassName('__react_component_tooltip show place-top type-light customTheme')[0].style.visibility='hidden';
      document.getElementsByClassName('__react_component_tooltip show place-top type-light customTheme')[0].style.display='none !important';
    }catch(e){console.log(e);}
      return false;
    }
  

  searchChange(e){
        this.setState({
          searchText:e.target.value
        });
  }

  changeListDisplay(type){
        this.props.setListDisplayType(type);
  }


  defaultImageLoad(e){
    e.target.src= BASE_SERVER+'/preview/player_thumb/signage.jpg';
  }

  gotoTemplateList(e){
    this.props.changeConsole('TEMPLATE_LIST','USER_HOME');
  }

  updateSearchFrom(evt, toggleFrom){
      let fromList = this.state.searchFrom;
      let fromIndx = fromList.indexOf(toggleFrom);
      fromIndx !== -1? fromList.splice(fromIndx,1):fromList.push(toggleFrom);
      console.log('new from list', fromList);
      this.setState({
        searchFrom : fromList
      });
  }

  renderSearchInput(){

    return(<div> 
      
      <div className='check-small-container search-module-selection'>

      <span className={this.state.searchFrom.indexOf('SCREENS') !== -1?'checked-box':'uncheck-box'} onClick={(e)=> this.updateSearchFrom(e,'SCREENS')}></span><span className='lbl-check' onClick={(e)=> this.updateSearchFrom(e,'SCREENS')}>Screens</span>

      <span className={this.state.searchFrom.indexOf('CONTENTS') !== -1?'checked-box':'uncheck-box'} onClick={(e)=> this.updateSearchFrom(e,'TEMPLATES')}></span><span className='lbl-check' onClick={(e)=> this.updateSearchFrom(e,'TEMPLATES')}>Contents</span>

      <span className={this.state.searchFrom.indexOf('LIBRARY') !== -1?'checked-box':'uncheck-box'} onClick={(e)=> this.updateSearchFrom(e,'LIBRARY')}></span><span className='lbl-check' onClick={(e)=> this.updateSearchFrom(e,'LIBRARY')}>Library</span>

      </div>
      </div>)

  }

  getTemplateItem(app){

    let appThumbnail = (app && app.thumb) ? BASE_SERVER + app.thumb.replace('app-thumbnail','/thumb') : BASE_SERVER +'/thumb/'+ app._id+'.png';

    return (
      <li className="col-xs-6 col-md-4 col-lg-3 list-group-item" key={app._id}>

      <div className="thumbnail summary" >
      <img src={appThumbnail} alt="242x200"/>
      <span className='menu-dots'>
          <Dropdown autoOpen= {true} arrowClassName='menu-dots-inner' className={'player-drop'}>
      <Dropdown.Toggle title="" />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            <MenuItem onClick={(e)=>{this.gotoEditApp(e,null,app._id,app.domain)}}>
               <span className="glyphicon glyphicon-pencil" data-tip="Edit Template"  ></span><span>Edit Template</span>
            </MenuItem>

            {!app.isTemplate && <MenuItem  onClick={(evt)=>{this.selectApp=app;this.previewApp=null;this.togglePreview(evt)}}>
              <span data-tip="Set to Screens" className="glyphicon glyphicon-ok" ></span><span>Set To Screens</span>
            </MenuItem>}

            { !app.isTemplate && <MenuItem  onClick={(evt)=>{this.previewApp=app;this.selectApp=null;this.togglePreview(evt)}}>
              <span className="glyphicon glyphicon-eye-open " data-tip="Preview" ></span><span>Preview Here </span>
            </MenuItem>} 

            { !app.isTemplate && <MenuItem  onClick={()=>{this.props.copyTemplate(app._id)}} >
             <span className="glyphicon glyphicon-duplicate" data-tip="Make duplicate" ></span><span>Make A Copy</span>
            </MenuItem> }  
        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>

      <div className="caption center-btn">
      <label><span className={app.status=='DRAFT'?'draft-icon':''}></span>{app.appName}</label>
      </div>
      </div>
      </li>
    )
  }

  renderApps(apps) {
    ReactTooltip.rebuild();
    console.log(apps);
    var searchApp =apps.filter(app => app.appName.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1 || app.domain.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1).map(app =>
      this.getTemplateItem(app));
    console.log(searchApp);
    return searchApp;
  }

  setPreviewPlayer(player){
    this.previewPlayer = player 
  }

  renderMedia(media) {
    
    return <div style={{textAlign:'center'}}>No results</div>;
  }


  renderPlayerTiles (players,user) {
    console.log('players', players);
    var content = null;
    let changeConsole = (playerId,playerTap)=>(this.props.setSelectPlayerId(playerId),this.props.changeConsole(playerTap,'USER_HOME'));
    let gotoEditTemp = (evt,playerId, appId) => this.gotoEditApp(evt, playerId,appId);
    let defaultImageLoad = this.defaultImageLoad;
    
    let addPlayer= [{addPlayer:"Add New Player"}];
    let playersArr = players.slice(0,3);
    let _self = this;
    let playerList=playersArr.filter(player=>player.playerName.toLowerCase().indexOf(_self.props.searchText.toLowerCase())!== -1).map(function(player) {

      let appThumbnail = (player && player.thumb) ? BASE_SERVER+player.thumb: transScreen;
      let previewApp=(evt,player) => (_self.previewPlayer=player,_self.togglePreview(evt));
      var playerName =player.playerName ? player.playerName:null;
      let playerTap= player && player._id? "PLAYER_DETAILS":"NEW_PLAYER_FORM";
    
      let nowDate= new Date();
      let isConnected = player.powerStatus == 'ONLINE'?true :false;
      return (
         <li className="col-xs-12 col-md-6 col-lg-4 list-group-item" key={player._id?player._id:-1} onClick={()=>changeConsole(player._id?player._id:-1,playerTap)}>
        <div className="thumbnail clickable screen" >
        <img src={appThumbnail} onError={(e)=>defaultImageLoad(e)}  alt="242x200"/>
        
        {playerName && <h5 className="top-caption" onClick={()=>changeConsole(player._id?player._id:-1,playerTap)}>{playerName && isConnected && <span  className="blink small-circle-green" data-tip="Network connected"  title="Network connected" ></span>}
        {playerName && !isConnected && <span  className="small-circle-red" data-tip="Network: OFFLINE"></span>}<a href="#">{playerName}</a></h5>}

        {playerName && <span className='menu-dots'>
          <Dropdown autoOpen= {true} arrowClassName='menu-dots-inner' className={'player-drop'}>
      <Dropdown.Toggle title="" />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            <MenuItem onClick={()=>changeConsole(player._id?player._id:-1,playerTap)}><span>Screen Details</span>
            </MenuItem>
            <MenuItem onClick={(evt) => gotoEditTemp(evt,player._id, player.appId?player.appId:null)}>
                <span>{player.appId?'Edit Template':'Add Template'}</span>
            </MenuItem>
            {player.appId && <MenuItem  onClick={(evt) => previewApp(evt, player)}>
               <span>Preview Template</span>
            </MenuItem>}
            {player.appId && <MenuItem  onClick={(evt) => gotoEditTemp(evt,player._id,null)}>
               <span>Change Template</span>
            </MenuItem>}
        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>}

        </div>
        </li>
      )
    });
    return playerList;

  }

  render() {
   
    const { players, loading, error} = this.props.posts.playersList;
    const { user} = this.props.user;
    const {apps} = this.props.appsList;
  
    let filteredPlayers= players.filter(player=> (player.playerName.toLowerCase().indexOf(this.props.searchText.toLowerCase()) !== -1)||(player.screenNumber.indexOf(this.props.searchText) !== -1) );
    let allApps = apps;
    let userApps = apps.filter(app => !app.isTemplate);
    let displayType= this.props.listDisplayType;
    let tilesSelect= displayType=='TILE'?'glyphicon glyphicon-th select-active': 'glyphicon glyphicon-th';
    let listSelect = displayType=='LIST'?'glyphicon glyphicon-th-list select-active':'glyphicon glyphicon-th-list';
    return(
      <div>
      {players.length>0 && <div className="title-container"><h2 className="header-title">Search</h2>
      
      </div>}
      
      
      <Loading isLoading={loading}/>
      <Error error={error}/>
      {this.renderSearchInput()}
      <div>

      {
        this.props.searchText && 
        this.state.searchFrom.indexOf('SCREENS') !== -1 && 
        <div className={'section-holder'}>
          <h4>{'Screens Found'}</h4>
        <PlayerListTableView 
           players={filteredPlayers} 
           user={user} 
           userApps={userApps} 
           toggleSlide = {this.toggleSlide}
           setSelection = {this.setSelection}
           setPreviewPlayer={this.setPreviewPlayer}
           togglePreview= {this.togglePreview}
           gotoEditApp = {this.gotoEditApp}
       />
       </div>
     }

      {
        this.state.showDetailSlide && 
        <div 
         onClick={(e)=> this.toggleSlide()} 
         className='full-overlay'>
        </div>
      }
      <div className={this.state.showDetailSlide?'slide-right':'slide-close'} >
         {this.state.showDetailSlide &&
          <PlayerDetailsPg 
          selectedPlayerId={this.selectedPlayerId} 
          content={this.selectedPlayerApp}
          toggleSlide={this.toggleSlide} 
          />
        }
      </div>
      

      {this.props.searchText && this.state.searchFrom.indexOf('CONTENTS') !== -1 && <div className={'section-holder'}>
      <h4>{'Templates Found'}</h4>
      <div style={{display: 'inline-block',width: '100%'}} className={'dashboard-items-hodler'}>{this.renderApps(allApps)}
      </div>
      </div>}

    {this.props.searchText && this.state.searchFrom.indexOf('LIBRARY') !== -1 && <div className={'section-holder'}>
      <h4>{'Media Found'}</h4>
      <div style={{display: 'inline-block',width: '100%'}} className={'dashboard-items-hodler'}>{this.renderMedia(allApps)}
      </div>
      </div>}

      </div>


<ModalLocal  className={this.previewApp||this.previewPlayer?"modal-local modal-preview ":"modal-local modal-default"} isOpen={this.state.modalOpen} >
{this.state.modalOpen?this.getModalContent():''}<span  style={{position:'fixed', top:'-20px', right:'-10px'}} className="glyphicon glyphicon-remove" onClick={(e) => this.closeModalPopup(e)} ></span></ModalLocal>

      </div>);
  }
}


export default Search;
