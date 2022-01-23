import NewPlayer from './NewPlayer.js';
import {createPlayer,  createPlayerSuccess, createPlayerFailure, resetNewPlayer, fetchPlayers, fetchPlayersSuccess, fetchPlayersFailure} from '../../actions/posts';
import { connect } from 'react-redux';
import { changeSelectedConsole, changeSelectedPlayer,changeSelectedApp, changeListDisplayType} from '../../actions/popup';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewPlayer());
    },

    savePlayer:(values)=>{
      if(!values.playerName || values.playerName.trim() === ''){
      return dispatch(createPlayerFailure({message: 'Please provide player name.'}));
      }

      values.appId = values.appId ?values.appId :"";
      values.screenNumber=values.screenNumber && values.screenNumber.length>0?values.screenNumber.trim():Math.floor((Math.random() * 1000000) + 1);
      values.orientation=values.orientation?values.orientation:"0";
      values.thumbnailPath=values.thumb?values.thumb:"KEEP_EMPTY";
      values.thumb ="";
      values.status="PENDING";
      let playerObj=values;
      let token = sessionStorage.getItem('jwtToken');
      return dispatch(createPlayer(playerObj, token))
      .then(result => {
        // Note: Error's "data" is in result.payload.response.data (inside "response")
        // success's "data" is in result.payload.data
        if (result.payload.response && result.payload.response.status !== 200) {
          toast.error("ERROR, NEW PLAYER ADDING FAILED!");
          dispatch(createPlayerFailure(result.payload.response.data));

        }else{
        //let other components know that everything is fine by updating the redux` state
        toast.success("NEW PLAYER ADDED!!");
        dispatch(createPlayerSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS

        dispatch(fetchPlayers(token)).then((response) => {
            !response.error ? dispatch(fetchPlayersSuccess(response.payload.data)) : dispatch(fetchPlayersFailure(response.payload.data));
          });
        }
      });
    },

    updateNewPlayer:(name,value,player)=> {
    
      player =player==null?{}:player;
      player[name]=value;
      console.log('new palyer',player);
      dispatch(createPlayerSuccess(player));
    },

    changeConsole: (consoleName,backConsole) => {
      return dispatch(changeSelectedConsole(consoleName,backConsole));
    },

    setSelectedAppId: (appId) => {
      return dispatch(changeSelectedApp(appId));
    },

     setSelectPlayerId: (playerId) => {
      return dispatch(changeSelectedPlayer(playerId));
    },

}
}


function mapStateToProps(state, ownProps) {
 console.log(ownProps);
  return {
    newPlayer: ownProps.newPlayer,
    closeModalPopup: ownProps.closeModalPopup,
    toggleContentSelection: ownProps.toggleContentSelection,
    toggleNewPlayer: ownProps.toggleNewPlayer,
    themeColor: ownProps.themeColor
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewPlayer);
