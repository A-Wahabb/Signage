import React, { Component, PropTypes } from 'react';
var _reactDom = require('react-dom');
import { Loading, TitleAndButton, Error } from './commonDumbs';
import EditTools from './EditTools';
import { Link } from 'react-router-dom';
import emptyScreen from '../assets/signage-empty.png';
import { BASE_SERVER, LOCAL_SERVER } from '../constants/Config';
import { confirmAlert } from 'react-confirm-alert';
import ReactTooltip from 'react-tooltip';

class PlayerDetails extends Component {

  constructor() {
    super();
    this.state = {
      editingField: '',
      editingValue: '',
      screenShot:BASE_SERVER+'/preview/pop_shots/no_thumbnail.jpg',
      isliveBtnActive: true
    }
    this.showEdit = this.showEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.confirmTemplateAddAlert=null;
  }

  componentWillMount() {
   if( !this.props.activePlayer.player || !this.props.activePlayer.player._id || !this.props.activePlayer.player.appId){
    this.props.fetchPlayerDetail(this.props.selectedPlayerId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.activePlayer&&nextProps.activePlayer.player){
    this.reloadScreenShot(nextProps.activePlayer.player._id);}
  
    if (nextProps.activePlayer.player&&nextProps.activePlayer.player.appId && this.confirmTemplateAddAlert ) {
      var target = document.getElementById('react-confirm-alert');
      _reactDom.unmountComponentAtNode(target);
  target.parentNode.removeChild(target);
  var svg = document.getElementById('react-confirm-alert-firm-svg');
  svg.parentNode.removeChild(svg);
  document.body.children[0].classList.remove('react-confirm-alert-blur');
    }
  }

  componentDidUpdate(prevProps){
    if((JSON.stringify(prevProps.activePlayer) !== JSON.stringify(this.props.activePlayer)) && this.props.activePlayer.player && !this.props.activePlayer.player.appId && !this.confirmTemplateAddAlert){
      this.confirmTemplateAdd(this.props.activePlayer.player);
    }
    
    ReactTooltip.rebuild();
  }

  gotoPlayerUpdate(evt) {
    evt.preventDefault();
    this.props.updatePlayerStatus(this.props.activePlayer.player);
  }

  goToDashboard(evt) {
    evt && evt.preventDefault();
    this.props.resetMe();
    this.props.setSelectedAppId("");
    this.props.changeConsole(this.props.backConsole);

  }

  gotoEditApp(evt, appId) {
    evt.preventDefault();
    console.log('appList', this.props.appsList);
    if (appId) {
      this.props.setSelectedAppId(appId);
      this.props.changeConsole("TEMPLATE_EDIT","PLAYER_DETAILS");
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
    this.setState({
      screenShot:  BASE_SERVER+'/preview/pop_shots/'+(playerId!=-1?playerId:"no_thumbnail")+".jpg?" + new Date().getTime()});

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

  confirmTemplateAdd= (param) => {
      this.confirmTemplateAddAlert=true;
      confirmAlert({
        title: 'Add Template',                        
        message: 'You can now select the template for- '+param.playerName,               // Message dialog
        childrenElement: () => <div></div>,       
        confirmLabel: 'Choose Template',                           
        cancelLabel: "I'll Do Later",                             
        onConfirm: () => {this.props.changeConsole("TEMPLATE_LIST","PLAYER_DETAILS");return true;},    
        onCancel: () => {this.confirmTemplateAddAlert=false;console.log('go back');},      
      });
    };

  confirm= (param) => {
      
      confirmAlert({
        title: 'Warning!!',                        
        message: 'Do you want to delete this player -'+param.playerName+'?',               // Message dialog
        childrenElement: () => <div></div>,       
        confirmLabel: 'Delete',                           
        cancelLabel: 'Cancel',                             
        onConfirm: () => {this.props.requestPlayerDelete(param._id);this.goToDashboard()},    
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
    let appThumbnail = (player && player.thumb) ? BASE_SERVER + player.thumb : LOCAL_SERVER + "/assets/signage-empty.png";
      appThumbnail =appThumbnail.replace('app-thumbnail','/thumb');
    console.log('thumb new', appThumbnail);
    let powerStatus =player && player.powerStatus?player.powerStatus:"OFFLINE";
      let nowDate= new Date();

    let isConnected = powerStatus;
    let err = error || (player && player.error);
    let playerName = player ? player.playerName : "";
    const Header = ({ player }) => (
      <div className="panel-default">
        <TitleAndButton title={"Name -  " + playerName} isHide={!playerNameEditing ? false : true} />
        <input
          type="text"
          name="playerName"
          defaultValue={this.state.editingValue ? this.state.editingValue : (player ? player.playerName : "")}
          className={playerNameEditing ? "effect-16 has-content panel-heading" : "hide"}
          label="Player Name" onBlur={(evt) => this.updateInputChange(evt)} />
        <div className={"title-edit-box"}> <EditTools isEditing={this.state.editingField === 'player-name'} id={"player-name"} showEdit={this.showEdit} saveEdit={this.saveEdit} cancelEdit={this.cancelEdit} />
        </div></div>
    );

    const Details = ({ player, thumb }) => (<div className="details-holder"><div className="col-sm-12 col-md-6 col-lg-6">
      <ul className="sub-title-contain">
        <li><h4 className="sub-header">{"#Screen Code"}</h4></li>
        <li ><h4 className={!screenNumEditing ? "title-value " : "hide"}>{player.screenNumber}</h4><input
          name="screenNumber"
          type="text"
          className={screenNumEditing ? "effect-16 has-content title-value" : "hide"}
          label="Screen Number" onBlur={(evt) => this.updateInputChange(evt)} defaultValue={this.state.editingValue ? this.state.editingValue : player.screenNumber} /><EditTools isEditing={this.state.editingField === 'screen-number'} id={"screen-number"} showEdit={this.showEdit} saveEdit={this.saveEdit} cancelEdit={this.cancelEdit} /></li>

        <li ><h4 className="sub-header">{"Update Status"}</h4></li>
        <li ><h4 className="title-value">{player.status.toLowerCase()=='upto'?'COMPLETED':'PENDING'}</h4></li>
        <li ><h4 className="sub-header">{"Network Connection"}</h4></li>
        <li ><h4 className="title-value">{isConnected}</h4></li>
        <li><h4 className="sub-header">{"Screen Logs"}</h4></li>
          <li>
            <Link
              to="#"
              className="btn btn-primary-trans btn-single"
              onClick={(evt) => this.props.requestScreenLogs(player._id)}>
              {'Fetch Logs'}
            </Link> {' '}<span onClick={()=>this.props.fetchScreenLogs(player.screenNumber)} className="glyphicon glyphicon-refresh"></span>
            </li>
          <li>
            <div className="logs-container">{screenLogs.logs.replace(new RegExp('~~', 'g'), '<br/>')}</div>
            </li><div>{' '}<br></br></div>
            <li><h4 className="sub-header">{"Screen Commands"}</h4></li>
          <li>
            <Link
              to="#"
              className="btn btn-danger-trans btn-single"
              onClick={(evt) => this.props.requestPlayerUpgrade(player._id)}>
              {'Upgrade S/W '}</Link>{" "}<Link
              to="#"
              className="btn btn-primary-trans btn-single"
              onClick={(evt) => this.props.requestScreenRefresh(player._id)}>
              {'Reset Screen'}
            </Link>{" "}<Link
              to="#"
              className="btn btn-primary-trans btn-single"
              onClick={(evt) => this.props.requestScreenReboot(player._id)}>
              {'Reboot Screen'}
            </Link></li>
      </ul></div>
      <div className="col-sm-12 col-md-6 col-lg-6">
        <ul className="sub-title-contain">

          <li><h4 className="sub-header">{"Assigned Template-"}</h4></li>
          <li>
            <Link
              to="#"
              className="btn btn-primary btn-single"
              onClick={(evt) => this.gotoEditApp(evt, player.appId)}>
              {'Update Current Content'}
            </Link>{"  "}<Link
              to="#"
              className="btn btn-primary-trans btn-single"
              onClick={(evt) => this.props.changeConsole("TEMPLATE_LIST")}>
              {'Create New Template'}
            </Link>
            <img className="big-img gap-top-bottom" src={thumb} /></li>
          <li ><h4 className="sub-header">{"Proof of live screen play"}</h4></li>
          <li>
            <Link
              to="#"
              disable={this.state.isliveBtnActive}
              className="btn btn-primary-trans btn-single"
              onClick={(evt) => {this.props.requestNewScreenShot(player._id),this.setScreenShot()}}>
              {"Capture Live Snapshot"}
            </Link>{' '}<span style={{marginTop:'10px'}} onClick={()=>this.reloadScreenShot(player._id)} className="glyphicon glyphicon-refresh"></span><br/>
            <div className="screen gap-top-bottom ">
            <img className="big-img " onError={()=> this.onErrorThumb()} src={this.state.screenShot} /></div>
            
           </li>
            

        </ul></div>

        
    </div>);
    return (
      <div className="title-container"><span className="glyphicon glyphicon-arrow-left bk-btn" onClick={(evt) => this.goToDashboard(evt)}></span><h2 className="header-title">Screen Details</h2>
      
      
      <div className="inner-container">

        {player && <Header player={player} />}
        <Loading isLoading={loading} />
        <Error error={err} />
        {player && <Details player={player} thumb={appThumbnail} />}
        <div className="btn-footer">
          <Link
            to="#"
            style={{marginLeft:'10px',background:'red',color:'#CCCCCC!important'}}
            onClick={()=>this.confirm(player)}
            className="btn btn-danger-trans"> Delete Screen
      </Link>
        </div>

      </div>
      </div>
    )
  }
}

export default PlayerDetails;
