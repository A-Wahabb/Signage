import PlayerDetails from '../components/PlayerDetails.js';
import {fetchPlayer, fetchPlayerSuccess, fetchPlayerFailure,resetActivePlayer,resetNewPlayer,takeNewScreenShot,requestScreenRefresh, updatePlayer,requestToScreenLogs, createPlayerSuccess, createPlayerFailure, fetchLogs, fetchLogsSuccess,fetchLogsFailure,upgradePlayer,deletePlayer,deletePlayerSuccess,deletePlayerFailure,requestScreenReboot } from '../actions/posts';
import { changeSelectedConsole, changeSelectedApp } from '../actions/popup';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetActivePlayer());
      dispatch(resetNewPlayer());
    },

    fetchPlayerDetail: (id) => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchPlayer(id,token)).then((response) => {
        !response.error ? dispatch(fetchPlayerSuccess(response.payload.data)) : dispatch(fetchPlayerFailure(response.payload.data));
      });
    },

    fetchScreenLogs: (screenNumber) => {
      console.log('player log screen num',screenNumber);
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchLogs(screenNumber,token)).then((response) => {
        console.log('PLAYER Log'+ response);
        !response.error ? dispatch(fetchLogsSuccess(response.payload.data)) : dispatch(fetchLogsFailure(response.payload.data));
      });
    },

    validateAndSavePlayer:(field,value,props)=>{
      console.log("[player form container] Update player", value);
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
      return dispatch(updatePlayer(playerObj, sessionStorage.getItem('jwtToken')))
      .then(result => {
        // Note: Error's "data" is in result.payload.response.data (inside "response")
        // success's "data" is in result.payload.data
        if (result.payload.response && result.payload.response.status !== 200) {
          toast.error("NEW PLAYER UPDATING FAILED!");
          dispatch(createPlayerFailure(result.payload.response.data));
          throw new SubmissionError(result.payload.response.data);
        }else{
        console.log('update saved', props.activePlayer.player._id );
        //let other components know that everything is fine by updating the redux` state
         toast.error("UPDATED!");
        dispatch(fetchPlayer(props.activePlayer.player._id,sessionStorage.getItem('jwtToken'))).then((response) => {
          !response.error ? dispatch(fetchPlayerSuccess(response.payload.data)) : dispatch(fetchPlayerFailure(response.payload.data));
        });
        } //ps: this is same as dispatching RESET_USER_FIELDS
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

    requestPlayerDelete:(playerId)=>{
      return dispatch(deletePlayer(playerId,sessionStorage.getItem('jwtToken'))) .then(result => {
        
        if (result.payload.response && result.payload.response.status !== 200) {
             toast.error("ERROR, While DELETE!");

        }else{
            toast.success("DELETED!!");
        }

    });

}


  }
}


function mapStateToProps(state, ownProps) {
  if(state.posts.activePlayer.player && state.posts.activePlayer.player instanceof Array){
  state.posts.activePlayer.player = state.posts.activePlayer.player[0];
  }
  return {
    activePlayer: state.posts.activePlayer ,
    selectedPlayerId: state.popup.selectedPlayerId,
    screenLogs: state.posts.playerLog,
    backConsole:state.popup.backConsole
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerDetails);
