import ScreenPlaylistItems from './ScreenPlaylistItems.js';
import {fetchPlayers, fetchPlayersSuccess, fetchPlayersFailure,createPlayer, updatePlayer, createPlayerSuccess, createPlayerFailure, resetNewPlayer,fetchPlayer, fetchPlayerSuccess, fetchPlayerFailure,resetActivePlayer } from '../../actions/posts';
import { connect } from 'react-redux';
import { changeSelectedConsole, changeSelectedPlayer,changeSelectedApp, changeListDisplayType} from '../../actions/popup';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewPlayer());
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
    user: ownProps.user,
    closeModalPopup: ownProps.closeModalPopup,
    playList : ownProps.playList,
    playListItems : ownProps.playListItems,
    screenPlaylistItems: ownProps.screenPlaylistItems,
    playerDetails: ownProps.playerDetails
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenPlaylistItems);
