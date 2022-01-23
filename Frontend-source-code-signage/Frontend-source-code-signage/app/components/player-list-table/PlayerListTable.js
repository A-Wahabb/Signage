import React, { Component, PropTypes } from 'react';
import { Loading, TitleAndButton, Error } from '../commonDumbs';
import EditTools from './../EditTools';
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

class PlayerListTable extends Component {

  constructor() {
    super();
    this.state = {
      time:null
    }
    this.screenshot={};
   this.isPortrait=window.matchMedia("(orientation: portrait)").matches;
  }

 
  componentDidMount(prevProps) {
    this.isPortrait=window.matchMedia("(orientation: portrait)").matches;
  }
  getScreenShot(playerId){

    this.screenshot[playerId]=BASE_SERVER+'/preview/pop_shots/'+(playerId!=-1?playerId:"no_thumbnail")+".jpg?" + new Date().getTime();
    return this.screenshot;
  }

  reloadScreenShot (playerId){
    return BASE_SERVER+'/preview/pop_shots/no_thumbnail.jpg?' + new Date().getTime();
    }
  
  cancelEdit(evt) {
    this.setState({
      editingField: ''
    });
  }

  onErrorThumb(){
    return BASE_SERVER+'/preview/pop_shots/no_thumbnail.jpg?'+ new Date().getTime();
  }

  renderPlayerList(players, user, userApps,playlists, schedules) {

    var content = null;
    let changeConsole = (playerId,playerApp)=>(this.props.setSelection(playerId,playerApp),this.props.toggleSlide());
    let gotoEditTemp = (evt,playerId, appId) => this.props.gotoEditApp(evt, playerId,appId);
    let toggleContentSelection = ()=> this.props.toggleContentSelection();
    let defaultImageLoad = this.defaultImageLoad;
    let _self = this;
    let playerList=players.map(function(player) {
      let rankey=Math.floor((Math.random() * 10000000) + 100);
      //check if template assigned
      let playerApp= userApps.filter(app=> app._id == player.appId);
    
      playerApp = playerApp.length>0?playerApp[0]:{name:'NOT ASSIGNED',_id:'0'};

      let playlist= playlists.filter(playlist=> playlist._id == player.appId);
       playlist = playlist.length>0?playlist[0]:{name:'NOT ASSIGNED',_id:'0'};

      let scheduleDetails= schedules.list.schedules.filter( schedule => schedule._id == player.appId);
      scheduleDetails = scheduleDetails.length>0?scheduleDetails[0]:{name:'UNASSIGNED',_id:'0'};

      let contentType ='UNASSIGNED';
      if(player.contentType && player.contentType=='STREAM'){
        contentType = 'STREAM';
        playerApp.name = player.appId;
      }
      else if(player.contentType && player.contentType=='WEBPAGE'){
        contentType = "WEBPAGE";
        playerApp.name = player.appId;
      }
      else if(player.contentType && player.contentType=='SCHEDULE' && scheduleDetails){
        contentType = "SCHEDULE";
        playerApp.name = scheduleDetails.scheduleName;
      }
      else if(player.contentType && player.contentType=='TEMPLATE' && playerApp){
        contentType = "TEMPLATE";
        playerApp.name = playerApp.appName;
      }
      else if(player.contentType && player.contentType=='PLAYLIST' && playlist){
        contentType = "PLAYLIST";
       playerApp = playlist;
       playerApp.name = playlist && playlist.playlistName?playlist.playlistName:"";
      }
      

      let previewApp=(evt,player) => (_self.props.setPreviewPlayer(player),_self.props.togglePreview(evt));
      var playerName =player.playerName ? player.playerName:null;
      let playerTap= player && player._id? "PLAYER_DETAILS":"NEW_PLAYER_FORM";
      playerApp.contentType = contentType?contentType:'UNASSIGNED';
      let nowDate= new Date();
      let isConnected = player.powerStatus == 'ONLINE'?true :false;
      _self.getScreenShot(player._id);
      let liveScreenShot= ()=> <img style={{width:'96px',height:'54px',maxWidth:'100px',border:'2px solid #000'}} src={_self.screenshot[player._id]} onError={(e)=>{e.target.onError = null; e.target.src=_self.reloadScreenShot()}}  alt="242x200"/>;
      let playerCreatedByUser = user.admin? _self.props.usersList.users.filter(user => user._id == player.userId)[0]:"";
      if(playerCreatedByUser){
        playerCreatedByUser = playerCreatedByUser.name;
      }

      return(!_self.isPortrait ? <tr key={rankey} style={{minWidth:'100%',fontSize:'1em'}} >
      <td style={{minWidth:'20%'}} className='highlight-text' onClick={()=>changeConsole(player._id?player._id:-1,playerApp)}><b>{player.playerName}</b></td>
      
      {user.admin && <td style={{minWidth:'20%'}} className='highlight-text' onClick={()=>changeConsole(player._id?player._id:-1,playerApp)}><b>{playerCreatedByUser}</b></td>}
      
      <td style={{minWidth:'10%'}}>{playerName && isConnected && <span className='status-text-holder'><span  className="blink small-circle-green" ></span></span>}
        {playerName && !isConnected &&  player.powerStatus.toUpperCase()=='OFFLINE' && <span className='status-text-holder'><span className="small-circle-red"></span></span>}
         {playerName && !isConnected && player.powerStatus=='INACTIVE' && <span className='dltooltip' style={{color:'red'}}><span style={{fontSize:'0.9em'}} class="tooltiptext">{`This screen is in INACTIVE state. Reason could be following- 1) Make sure you added screen ID added correctly from screen. 2) Check if screen is connected to internent`}</span><span className="glyphicon glyphicon-alert"></span></span>}</td>
      <td style={{minWidth:'15%'}}>
     {liveScreenShot()}
      </td>
      <td style={{minWidth:'15%'}}>{player.screenshot_ago ? player.screenshot_ago :"-"}</td>
      <td style={{minWidth:'10%'}}>
      {contentType.toUpperCase() == 'TEMPLATE'&& <span  className={"template-icon"}  style={{left:'2px'}} ></span> }
      {contentType.toUpperCase() == 'SCHEDULE'&& <span  className={"glyphicon glyphicon-calendar"}  style={{left:'2px'}} ></span>}
      {contentType.toUpperCase() == 'PLAYLIST'&& <span  className={"glyphicon glyphicon-list"}  style={{left:'2px'}} ></span>}
      {contentType.toUpperCase() == 'WEBPAGE'&& <span  className={"weburl"}  style={{paddingTop:'2px'}} ><span style={{fontSize:'0.5em',background:"#ccc",marginLeft:'3px'}}>WWW</span></span>}
      {contentType.toUpperCase() == 'STREAM'&& <span  className={"weburl"}  style={{paddingTop:'2px'}} ><span style={{fontSize:'0.5em',background:"#ccc",marginLeft:'5px'}}>LIVE</span></span>}
      {contentType.toUpperCase() == 'UNASSIGNED'&& 'UNASSIGNED' }
      </td>
      <td style={{minWidth:'30%'}} className='row-list'>{playerApp.name}</td>
      <td style={{minWidth:'10%',textAlign:'left'}}>
{<div style={{width:'20px'}}><span className='menu-dots' style={{position:'relative',marginBottom:'10px'}}>
          <Dropdown autoOpen= {true} arrowClassName='menu-dots-inner' className={'player-drop'}>
      <Dropdown.Toggle title="" />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            <MenuItem onClick={()=>changeConsole(player._id?player._id:-1,playerApp)}><span>SCREEN DETAILS</span>
            </MenuItem>
            <MenuItem onClick={(evt) => (_self.props.togglePreview(), _self.props.toggleContentSelection(player))}>
                <span>{'SET NEW CONTENT'}</span>
            </MenuItem>
            
        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span></div>}

      </td>
    </tr>: 
      <div className='mob-list' >
      
      <div  className='highlight-text' >
        <th scope="row" style={{paddingLeft:'0px',paddingRight:'5px',display:'inline'}}> Screen Name:</th>
        {playerName && isConnected && <span className='status-text-holder'>
        <span  className="blink small-circle-green" style={{marginLeft:'0px'}} ></span></span>}
        {playerName && !isConnected && <span className='status-text-holder' style={{marginLeft:'0px'}} ><span className="small-circle-red"></span></span>}
        <b onClick={()=>changeConsole(player._id?player._id:-1,playerApp)}>{player.playerName}</b>

        <span className='menu-dots' style={{position:'relative',marginBottom:'10px'}}>
          <Dropdown autoOpen= {true} arrowClassName='menu-dots-inner' className={'player-drop'}>
      <Dropdown.Toggle title="" />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            <MenuItem onClick={()=>changeConsole(player._id?player._id:-1,playerApp)}><span>SCREEN DETAILS</span>
            </MenuItem>
            <MenuItem onClick={(evt) => (_self.props.togglePreview(), _self.props.toggleContentSelection(player))}>
                <span>{'SET NEW CONTENT'}</span>
            </MenuItem>
            
        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>
        </div>
      
      <div style={{textAlign:'center'}}>
      <th scope="row" style={{paddingRight:'5px',paddingLeft:'0px'}}>Snapshot & Taken Ago:</th>
        {liveScreenShot()}
        <span style={{marginLeft:'10px'}}>{player.screenshot_ago ? player.screenshot_ago :"-"}</span>
      </div>
      <div>
      <th scope="row" style={{paddingLeft:'0px',display:'inline'}}>Content Type & Name:</th>
      {contentType} 
      {playerApp.name}
      </div>
      
    </div>
      );
    
  });


    return (
    <table className="table">
  {!_self.isPortrait && <thead style={{background:'transparent',color:'#bdbaba',fontSize:'0.8em'}}>
    <tr>
      <th style={{minWidth:'20%'}} scope="col">Screen Name</th>
      {user.admin&& <th style={{minWidth:'20%'}} scope="col">User</th>}
      <th style={{minWidth:'10%'}} scope="col">Status</th>
      <th style={{minWidth:'15%'}} scope="col">Live Snapshot</th>
      <th style={{minWidth:'10%'}} scope="col">Captured</th>
      <th style={{minWidth:'10%'}} scope="col">Content Type</th>
      <th style={{minWidth:'30%'}} scope="col">Content Name</th>
      <th style={{minWidth:'5%'}} scope="col">Options</th>
    </tr>
  </thead>}<tbody>
  {playerList.length == 0 ?(<tr style={{minWidth:'100%',textAlign:'center'}}><td></td><td></td> <td style={{minWidth:'100%',textAlign:'center',fontSize:'0.8em',color:'#7b7a7a'}}>No screens found!</td><td></td><td></td><td></td></tr>): playerList
    }</tbody>
</table>
  )
  }

  render() {
    const { players, user , userApps, playlists ,schedules} = this.props;
    console.log('list', schedules);
    let playerList= this.renderPlayerList(players, user ,userApps,playlists, schedules)
    return (
      <div>{playerList}</div>
    )
  }
}

export default PlayerListTable;
