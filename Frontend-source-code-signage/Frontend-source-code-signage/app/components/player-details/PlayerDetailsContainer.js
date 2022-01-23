import PlayerDetails from './PlayerDetails.js';
import {fetchPlayer, fetchPlayerSuccess, fetchPlayerFailure,resetActivePlayer,resetNewPlayer,takeNewScreenShot,requestScreenRefresh, updatePlayer,requestToScreenLogs, createPlayerSuccess, createPlayerFailure,upgradePlayer,deletePlayer,deletePlayerSuccess,deletePlayerFailure,requestScreenReboot, requestPlayerLaunch, requestPlayerUninstall, requestPlayerHeartbeat,fetchPlayers, fetchPlayersSuccess, fetchPlayersFailure,updateAppThumbWithSnap } from '../../actions/posts';
import {fetchApps, fetchAppsSuccess, fetchAppsFailure,fetchAppSuccess, createAppSuccess,moveToLive,fetchAppFailure} from '../../actions/apps';
import { changeSelectedConsole, changeSelectedApp } from '../../actions/popup';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetActivePlayer());
      dispatch(resetNewPlayer());
    },
    resetNewPlaylist:()=>{
      dispatch(resetPlaylistFields());
    },
    fetchPlayerDetail: (id) => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchPlayer(id,token)).then((response) => {
        !response.error ? dispatch(fetchPlayerSuccess(response.payload.data)) : dispatch(fetchPlayerFailure(response.payload.data));
      });
    },

    useAsAppThumb: (playerAndAppData) => {
          let token = sessionStorage.getItem('jwtToken');
      dispatch(updateAppThumbWithSnap(token,playerAndAppData)).then((response) => {
        if(!response.error) {
          toast.success('THUMBNAIL UPDATED!!');
          dispatch(fetchApps(token)).then((response) => {
        !response.error ? dispatch(fetchAppsSuccess(response.payload.data)) : dispatch(fetchAppsFailure(response.payload.data));
      });
        }else{
          toast.error('THUMBNAIL UPDATE FAILED!!');
        }
      });
    },

    validateAndSavePlayer:(field,value,props)=>{
      console.log("[player form container] Update player", value);
      let token =sessionStorage.getItem('jwtToken');
      if(!value || value.trim() === ''){
        return  dispatch(createPlayerFailure({message: 'Please provide proper value.'}));
      }
      let playerObj= Object.assign({},props.activePlayer.player);
      if(field==='screen-number'){
        playerObj.screenNumber=value;
        playerObj.status="PENDING";
    } else if(field==='player-name'){
      playerObj.playerName=value;
      playerObj.status="PENDING";
    }
      return dispatch(updatePlayer(playerObj, token))
      .then(result => {
        // Note: Error's "data" is in result.payload.response.data (inside "response")
        // success's "data" is in result.payload.data
        if (result.payload.response && result.payload.response.status !== 200) {
          toast.error("ERROR, WHILE UPDATING!");
          dispatch(createPlayerFailure(result.payload.response.data));
          throw new SubmissionError(result.payload.response.data);
        }else{
          toast.success("UPDATED...");
        console.log('update saved', props.activePlayer.player._id );
        //let other components know that everything is fine by updating the redux` state
        dispatch(fetchPlayer(props.activePlayer.player._id,sessionStorage.getItem('jwtToken'))).then((response) => {
          !response.error ? dispatch(fetchPlayerSuccess(response.payload.data)) : dispatch(fetchPlayerFailure(response.payload.data));
        }); //ps: this is same as dispatching RESET_USER_FIELDS
        dispatch(fetchPlayers(token)).then((response) => {
            !response.error ? dispatch(fetchPlayersSuccess(response.payload.data)) : dispatch(fetchPlayersFailure(response.payload.data));
          });
        }
      });
    },

    updatePlayerFields:(playerObj)=>{
      let token =sessionStorage.getItem('jwtToken');
      playerObj.status = 'PENDING';
      return dispatch(updatePlayer(playerObj, token))
      .then(result => {
        // Note: Error's "data" is in result.payload.response.data (inside "response")
        // success's "data" is in result.payload.data
        if (result.payload.response && result.payload.response.status !== 200) {
          toast.error("ERROR, WHILE UPDATING!");
          dispatch(createPlayerFailure(result.payload.response.data));
          throw new SubmissionError(result.payload.response.data);
        }else{
          toast.success("UPDATED...");
       
        //let other components know that everything is fine by updating the redux` state
        dispatch(fetchPlayer(playerObj._id,token)).then((response) => {
          !response.error ? dispatch(fetchPlayerSuccess(response.payload.data)) : dispatch(fetchPlayerFailure(response.payload.data));
        }); //ps: this is same as dispatching RESET_USER_FIELDS
        dispatch(fetchPlayers(token)).then((response) => {
            !response.error ? dispatch(fetchPlayersSuccess(response.payload.data)) : dispatch(fetchPlayersFailure(response.payload.data));
          });
        }
      });
    },

    changeConsole: (consoleName,backConsole) =>{
      return dispatch(changeSelectedConsole(consoleName,backConsole));
    },

    setSelectedAppId: (appId) =>{
      return dispatch(changeSelectedApp(appId));
    },

    updatePlayerStatus:(player)=>{
      console.log("[new player container] update active player status, before move to update");
      player.status="IN_PROGRESS";
      dispatch(fetchPlayerSuccess(player));
    },

    requestNewScreenShot:(playerId)=>{
      console.log("[player] taking new screenshot");
      return dispatch(takeNewScreenShot(playerId,sessionStorage.getItem('jwtToken')));
    },

    requestScreenLogs:(playerId)=>{
      console.log("[player] sending request to screen for logs");
      return dispatch(requestToScreenLogs(playerId,sessionStorage.getItem('jwtToken')));
    },

    requestScreenRefresh:(playerId)=>{
      console.log("[player] requesting screen refresh");
      return dispatch(requestScreenRefresh(playerId,sessionStorage.getItem('jwtToken')));
    },

    requestPlayerUpgrade:(playerId)=>{
      return dispatch(upgradePlayer(playerId,sessionStorage.getItem('jwtToken')));
    },

    requestScreenReboot:(playerId)=>{
      return dispatch(requestScreenReboot(playerId,sessionStorage.getItem('jwtToken')));
    },

    requestPlayerLaunch:(playerId)=>{
      return dispatch(requestPlayerLaunch(playerId,sessionStorage.getItem('jwtToken')));
    },

    requestPlayerUninstall:(playerId)=>{
      return dispatch(requestPlayerUninstall(playerId,sessionStorage.getItem('jwtToken')));
    },

    requestPlayerHeartbeat:(playerId)=>{
      return dispatch(requestPlayerHeartbeat(playerId,sessionStorage.getItem('jwtToken')));
    },

    requestPlayerDelete:(playerId)=>{
      let token = sessionStorage.getItem('jwtToken');
      return dispatch(deletePlayer(playerId,token)) .then(result => {
        
        if (result.payload.response && result.payload.response.status !== 200) {
             toast.error("ERROR, While DELETE!");

        }else{
            toast.success("DELETED!!");
            
            dispatch(fetchPlayers(token)).then((response) => {
            !response.error ? dispatch(fetchPlayersSuccess(response.payload.data)) : dispatch(fetchPlayersFailure(response.payload.data));
          });
        }

    });

},




  }
}


function mapStateToProps(state, ownProps) {

  return {
    activePlayer: state.posts.activePlayer ,
    selectedPlayerId: ownProps.selectedPlayerId,
    content: ownProps.content,
    showItemsDetail: ownProps.showItemsDetail,
    rootModal: ownProps.rootModal,
    toggleSlide: ownProps.toggleSlide,
    screenLogs: state.posts.playerLog,
    selectedConsole: state.popup.selectedConsole,
    getPlaylistDetails: ownProps.getPlaylistDetails,
    themeColor:ownProps.themeColor,
    latestPlayerVer:ownProps.latestPlayerVer,
    settings : ownProps.settings
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetails);
