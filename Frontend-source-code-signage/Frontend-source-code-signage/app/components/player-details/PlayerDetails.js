import React, { Component, PropTypes } from 'react';
import { Loading, TitleAndButton, Error } from '../commonDumbs';
import EditTools from './../EditTools';
import MapContainer from './../map-content/map-container';
import ScreenExtraContainer from './../screen-extra-details/screen-extra-details-container';
import LogContainer from './../player-log/log-container';
import { Link } from 'react-router-dom';
import emptyScreen from '../../assets/signage-empty.png';
import { BASE_SERVER, LOCAL_SERVER } from '../../constants/Config';
import { confirmAlert } from 'react-confirm-alert';
import ReactTooltip from 'react-tooltip';
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    DropdownButton
} from '@trendmicro/react-dropdown';
import moment from 'moment';

class PlayerDetails extends Component {

  constructor() {
    super();
    this.state = {
      editingField: '',
      editingValue: '',
      screenShot:null,
      isliveBtnActive: true

    }
    this.showEdit = this.showEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.gotoEditContent = this.gotoEditContent.bind(this);
    this.reloadScreenData = this.reloadScreenData.bind(this);
    this.renderRotationAngle=this.renderRotationAngle.bind(this);
    this.getlatlon = this.getlatlon.bind(this);
    this.getPlayerLogs = this.getPlayerLogs.bind(this);
    this.screenMoreDetails = this.screenMoreDetails.bind(this);
    this.renderScreenExtraDetailsDD = this.renderScreenExtraDetailsDD.bind(this);
    this.confirmTemplateAddAlert=null;
  }


  componentDidMount(){
    if(this.props.selectedPlayerId){
      console.log('player app fetch did mount', this.props.selectedPlayerId);
      this.props.fetchPlayerDetail(this.props.selectedPlayerId);
    }
    if(this.props.activePlayer.player){
      this.reloadScreenShot(this.props.selectedPlayerId);
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.selectedPlayerId){
      this.reloadScreenShot(this.props.selectedPlayerId);
    }
    
  }

  getlatlon(){
    if(this.props.activePlayer && this.props.activePlayer.player ){
      let map = <MapContainer player={this.props.activePlayer.player}/>;
      this.props.rootModal(map, 'MEDIUM', true);
    }
  }

  screenMoreDetails(){
    if(this.props.activePlayer && this.props.activePlayer.player ){
      let screenExtra = <ScreenExtraContainer player={this.props.activePlayer.player}/>;
      this.props.rootModal(screenExtra, 'MEDIUM', true);
    }
  }

  getPlayerLogs(){
    if(this.props.activePlayer && this.props.activePlayer.player ){
      let Logs = <LogContainer player={this.props.activePlayer.player} themeColor={this.props.themeColor}/>;
      this.props.requestScreenLogs(this.props.activePlayer.player._id)
      this.props.rootModal(Logs, 'MEDIUM', true);
    }
  }

  gotoPlayerUpdate(evt) {
    evt.preventDefault();
    this.props.updatePlayerStatus(this.props.activePlayer.player);
  }

  goToDashboard(evt) {
    evt && evt.preventDefault();
    this.props.resetMe();
    this.props.setSelectedAppId("");
    //this.props.changeConsole(this.props.backConsole);
    this.props.toggleSlide();
  }

  changeRotation(angle){
    let playerObj = this.props.activePlayer.player;
    playerObj.orientation = angle;
    playerObj._id && this.props.updatePlayerFields(playerObj);
  }

  gotoEditContent(evt, contentId) {
    evt.preventDefault();
    console.log('content', this.props.content);
    if (this.props.content && this.props.content.appName) {
      this.props.setSelectedAppId(appId);
      this.props.changeConsole("TEMPLATE_EDIT",this.props.selectedConsole);
    }else if(this.props.content && this.props.content.playlistName){
      // launch playlist from here.
      this.props.getPlaylistDetails();
    }
  }

 reloadScreenData(){
  if(this.props.selectedPlayerId){
      console.log('player app fetch', this.props.selectedPlayerId);
      this.props.fetchPlayerDetail(this.props.selectedPlayerId);
      this.setState({
        screenShot:null
      });
    }
 }

  updateInputChange(evt) {
    this.setState({
      editingValue: evt.target.value
    });
  }

  showEdit(evt, field) {
    this.setState({
      editingField: field
    });
  }

  saveEdit(evt) {
    let field = this.state.editingField;
    let value = this.state.editingValue;
    this.props.validateAndSavePlayer(field, value, this.props);
    this.setState({
      editingField: '',
      editingValue: ''
    });

  }

  setScreenShot(evt){
    let _self= this;
    setTimeout(function(){
       _self.setState({
      screenShot:  BASE_SERVER+'/preview/pop_shots/'+(playerId!=-1?playerId:"no_thumbnail")+".jpg?" + new Date().getTime()});
    },5*1000);
  }

  reloadScreenShot (playerId){
    if(!this.state.screenShot){
    this.setState({
      screenShot:  BASE_SERVER+'/preview/pop_shots/'+(playerId!=-1?playerId:"no_thumbnail")+".jpg?" + new Date().getTime()});
    }

    }

  onErrorThumb(){
    this.setState({
      screenShot:  BASE_SERVER+'/preview/pop_shots/no_thumbnail.jpg?'+ new Date().getTime()
  });
  }

  cancelEdit(evt) {
    this.setState({
      editingField: ''
    });
  }

  renderRotationAngle(){
    return (<span className='menu-arrow glyphicon optionbtn' style={{marginRight:'10px',float:'right'}}>
          <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
      <Dropdown.Toggle title={"ROTATE ANGLE"} style={{color:this.props.themeColor}} />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            <MenuItem  onClick={() => this.changeRotation("0")}>
              <span>0</span>
            </MenuItem>
            <MenuItem  onClick={() => this.changeRotation("90")}>
              <span>90</span>
            </MenuItem>

            <MenuItem onClick={() => this.changeRotation("270")}>
               <span>270</span>
            </MenuItem>
        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>);
  }

  renderScreenExtraDetailsDD(player){
    return (<span className='menu-arrow glyphicon optionbtn' style={{marginRight:'10px',float:'right'}}>
          <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
      <Dropdown.Toggle title={"ADDITIONAL"} style={{color:this.props.themeColor}} />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            <MenuItem  onClick={() => this.screenMoreDetails(player)}>
              <span>EDIT GROUP & ADDRESS</span>
            </MenuItem>
            <MenuItem  onClick={() => this.getlatlon(player)}>
              <span>SHOW MAP LOCATION</span>
            </MenuItem>

        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>);
  }

  renderScreenCommandsDD(player){
    let isUpgradeNeeded =true;
    if(this.props.latestPlayerVer&& this.props.latestPlayerVer.latestPlayerVer && player && player.player_ver_installed){
    isUpgradeNeeded= parseFloat(this.props.latestPlayerVer.latestPlayerVer)> parseFloat(player.player_ver_installed);
    console.log('upgrade', isUpgradeNeeded);
    }
    return (<span className='menu-arrow glyphicon upside-options optionbtn' style={{marginRight:'10px'}}>
          <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
      <Dropdown.Toggle title={"MORE ACTIONS"} style={{color:this.props.themeColor}} />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            {this.props.settings.canDeleteScreens && <MenuItem  onClick={()=>this.confirm(player)}>
              <span>DELETE SCREEN</span>
            </MenuItem>}

            <MenuItem  onClick={()=>this.confirm(player)}>
              <span>UNINSTALL SCREEN APP</span>
            </MenuItem>

            <MenuItem  onClick={(evt) => this.props.requestScreenRefresh(player._id)}>
              <span>CLOSE SCREEN APP</span>
            </MenuItem>

            {isUpgradeNeeded && <MenuItem  onClick={(evt) => this.confirmUpgradePlayer(player)}>
              <span>UPGRADE SCREEN APP</span>
            </MenuItem>}

            <MenuItem  onClick={(evt) => this.props.requestScreenRefresh(player._id)}>
              <span>RESET SCREEN APP</span>
            </MenuItem>

             <MenuItem  onClick={(evt) => this.getPlayerLogs()}>
              <span>FETCH SCREEN LOGS</span>
            </MenuItem>

            {<MenuItem  onClick={(evt) => this.props.requestScreenReboot(player._id)}>
              <span>LAUNCH SCREEN APP</span>
            </MenuItem>}

            <MenuItem  onClick={(evt) => this.props.requestPlayerLaunch(player._id)}>
              <span>RELOAD PLAYER APP</span>
            </MenuItem>

            <MenuItem  onClick={(evt) => this.props.requestPlayerHeartbeat(player._id)}>
              <span>GET ONLINE STATUS</span>
            </MenuItem>

            <MenuItem onClick={(evt) => {this.props.requestNewScreenShot(player._id),this.setScreenShot(evt,player._id)}}>
               <span>TAKE LIVE SNAPSHOT</span>
            </MenuItem>
        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>);
  }

  confirmTemplateAdd= (param) => {
      this.confirmTemplateAddAlert=true;
      confirmAlert({
        title: 'Add Content',                        
        message: 'You can now set content for screen- '+param.playerName,               // Message dialog
        childrenElement: () => <div></div>,       
        confirmLabel: 'Choose Content',                           
        cancelLabel: "Cancel",                             
        onConfirm: () => {this.props.changeConsole("TEMPLATE_LIST",this.props.selectedConsole);return true;},    
        onCancel: () => {this.confirmTemplateAddAlert=false;console.log('go back');},      
      });
    };


  confirm= (param) => {
      
      confirmAlert({
        title: 'Warning!!',                        
        message: 'Do you want to delete this screen -'+param.playerName+'?',               // Message dialog
        childrenElement: () => <div></div>,       
        confirmLabel: 'DELETE',                           
        cancelLabel: 'CANCEL',                             
        onConfirm: () => {this.props.requestPlayerDelete(param._id);this.goToDashboard()},    
        onCancel: () => console.log("Cancelled delete"),      
      })
    };

  confirmUpgradePlayer= (player) => {
      
      confirmAlert({
        title: 'Warning!!',                        
        message: 'Do you want send screen player app upgrade on -'+player.playerName+'?',               // Message dialog
        childrenElement: () => <div>Note: This screen player might close after upgrade completed, so please click 'RE-LAUNCH PLAYER APP' after 2-3 minutes.</div>,       
        confirmLabel: 'UPGRADE',                           
        cancelLabel: 'CANCEL',                             
        onConfirm: () => {this.props.requestPlayerUpgrade(player._id)},    
        onCancel: () => console.log("Cancelled delete"),      
      })
    };


  render() {
    const { player, loading, error } = this.props.activePlayer;
    const {screenLogs} = this.props;

    console.log('detail active player', player);

    let playerDetail = null;
    let screenNumEditing = this.state.editingField === 'screen-number' ? true : false;
    let playerNameEditing = this.state.editingField === 'player-name' ? true : false;
    let appThumbnail = this.props.content && this.props.content.thumb ? BASE_SERVER + this.props.content.thumb : LOCAL_SERVER + "/thumb/"+this.props.content._id+".png";
      appThumbnail =appThumbnail.replace('app-thumbnail','/thumb');
    console.log('thumb new', appThumbnail);
    let thumbnail = this.props.content.thumbnail? this.props.content.thumbnail:appThumbnail ;
    let powerStatus =player && player.powerStatus?player.powerStatus:"OFFLINE";
      let nowDate= new Date();
 
    let content = this.props.content?this.props.content:{
      contentType: 'Not Assigned',
      contentName: 'Not Assigned'
    };
    let contentName = content.name;

    
    let themecolor=this.props.themeColor;
    console.log('detail view--', themecolor);
    let isConnected = powerStatus;
    let err = error || (player && player.error);
    let playerName = player ? player.playerName : "";
    const Header = ({ player }) => (
      <div>
        <label style={{display:'block'}}>Screen Name</label>
        <TitleAndButton title={playerName} isHide={!playerNameEditing ? false : true} />
        <input
          type="text"
          name="playerName"
          defaultValue={this.state.editingValue ? this.state.editingValue : (player ? player.playerName : "")}
          className={playerNameEditing ? "effect-16 has-content panel-heading" : "hide"}
          label="Player Name" onBlur={(evt) => this.updateInputChange(evt)} />
        <div className={"title-edit-box"}> <EditTools isEditing={this.state.editingField === 'player-name'} id={"player-name"} showEdit={this.showEdit} saveEdit={this.saveEdit} cancelEdit={this.cancelEdit} />
        </div></div>
    );

    const Details = ({ player, thumb, content}) => (<div className="details-holder"><div >
      <ul className="sub-title-contain">
        <li><label style={{display:'block'}} >{"Screen ID"}</label>
        <h4 className={!screenNumEditing ? "title-value " : "hide"}>{player.screenNumber}</h4><input
          name="screenNumber"
          type="text"
          className={screenNumEditing ? "effect-16 has-content title-value" : "hide"}
          label="Screen Number" onBlur={(evt) => this.updateInputChange(evt)} defaultValue={this.state.editingValue ? this.state.editingValue : player.screenNumber} />  <div className={"title-edit-box"}> <EditTools isEditing={this.state.editingField === 'screen-number'} id={"screen-number"} showEdit={this.showEdit} saveEdit={this.saveEdit} cancelEdit={this.cancelEdit} /></div></li>

        <li ><label style={{display:'block'}}>{"Content Loading Status On Screen"}</label>
         <h4 className="title-value">
              {player.appId ?
                  (player.status.toLowerCase()=='upto'  ? 
                  <span className={'online-lbl'}>COMPLETED</span> : 
                    <span className={'offline-lbl'} >PENDING</span>)
                    : 
                    <span className={'offline-lbl'}>NOT ASSIGNED</span>}
         </h4>
         {content.playlistName && <Link
              to="#"
               style={{float:'right',margin:'0px',marginRight:'10px',padding:'0px',color:this.props.themeColor}}
              className="btn btn-primary-link btn-single"
              onClick={(evt) => this.props.showItemsDetail()}>
              {'ITEMS STATUS'}
            </Link>}
        </li>
        
        <li ><label style={{display:'block'}}>{"Network Connection"}</label>
            <h4 className="title-value">{isConnected.toLowerCase()=='online'?<span className={'blink online-lbl'}>{isConnected}</span>:<span className={'offline-lbl'}>{isConnected}</span>}</h4>
        </li>

        <li>
            <label style={{width:'50%'}}>Group & Location: </label>
            
            {this.renderScreenExtraDetailsDD(player)}
            <h4 className="title-value">
            <span className={'no-lbl'}>{player.groupName}</span>
            </h4>
          </li>
        <li><label style={{display:'block'}}>{"Assigned Content"}</label>
            {content.contentType} - {contentName}
            {player.appId && <img className="big-img gap-top-bottom" src={thumbnail} />}
            </li>

            <li>
            <label style={{display:'block'}}>Orientation</label>

            <div className="">
            <span className={player && player.orientation && (player.orientation=='0' || player.orientation.toLowerCase()=='landscape')?"landscape-icon":"portrait-icon"} />
            <span style={{fontSize:'0.8em',marginLeft:'5px'}}>{player.orientation}</span>
            {this.renderRotationAngle()}
            
            </div>
           
           </li>
           <li>
            <label style={{display:'block'}}>{"Live Snapshot Taken: "+(player.screenshot_ago ? player.screenshot_ago :"-") }</label>
            <Link
              to="#"
               style={{marginTop:'0px',fontSize:'0.8em',textAlign:'right',color:themecolor,display:'inline-block', width:'100%'}}
              className="btn-primary-link"
              onClick={(evt) => this.props.useAsAppThumb(player)}>
              {'USE AS THUMBNAIL'}
            </Link>
            <div className="screen gap-top-bottom ">
            <img className="big-img " onError={()=> this.onErrorThumb()} src={this.state.screenShot} />
            
            </div>
           

           </li>
      </ul></div>
     

        
    </div>);
    return (
      <div className="title-container"><h2 style={{width:'100%'}} className="header-title">Screen Details<span style={{float:'right',fontSize:'0.5em',marginRight:'10px',paddingTop: '8px'}} className="glyphicon glyphicon-remove" onClick={(e) => this.props.toggleSlide(e)}></span></h2>
      
      
      <div className="inner-container">

        {player && <Header player={player} />}
        <Loading isLoading={loading} />
        <Error error={err} />
        {player && <Details player={player} thumb={appThumbnail} content={content} />}
        <div className="btn-footer">
        <Link
              to="#"
               style={{color:this.props.themeColor,margin:'0px',marginRight:'20px',padding:'0px'}}
              className="btn btn-primary-link btn-single"
              onClick={(evt) => this.reloadScreenData()}>
              {'REFRESH'}
            </Link>
      {this.renderScreenCommandsDD(player)}
      <div className='status-text-holder-center'> <span>{player && ('player ver. '+player.player_ver_installed)} </span></div>
        </div>

      </div>
      </div>
    )
  }
}

export default PlayerDetails;
