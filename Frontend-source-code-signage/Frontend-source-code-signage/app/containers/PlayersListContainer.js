import { connect } from 'react-redux'
import { fetchPlayers, fetchPlayersOnlineStatus, fetchPlayersSuccess, fetchPlayersFailure , fetchPlayerItemsStatus, fetchPlayerItemsStatusSuccess, fetchPlayerItemsStatusFailure} from '../actions/posts';
import PlayersList from '../components/PlayersList';
import {  resetActiveApp,  resetNewApp} from '../actions/apps';
import {fetchPlayer, fetchPlayerSuccess, fetchPlayerFailure,resetActivePlayer,resetNewPlayer, triggerBulkAction } from '../actions/posts';
import { fetchPlaylists, fetchPlaylistsSuccess, fetchPlaylistsFailure, fetchPlaylist,fetchPlaylistSuccess, fetchPlaylistFailure, resetPlaylistFields, moveToLive, updatePlaylist, createPlaylistSuccess,createPlaylistFailure  } from '../actions/playlists';
import { changeSelectedConsole, changeSelectedPlayer,changeSelectedApp, changeListDisplayType } from '../actions/popup';
import { toast } from 'react-toastify';

const mapStateToProps = (state,ownProps) => {
  return {
    playersList: ownProps.playersList,
    playerItemsStatus: ownProps.playerItemsStatus,
    user: ownProps.user,
    common: ownProps.common,
    appsList: ownProps.appsList,
    playlists: ownProps.playlists,
    toggleRootModal : ownProps.toggleRootModal,
    publishToSreens: ownProps.publishToSreens,
    schedules : ownProps.schedules,
    rootModal: ownProps.rootModal
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetActivePlayer());
      dispatch(resetNewPlayer());
      dispatch(resetNewApp());
      dispatch(resetActiveApp());
      dispatch(resetPlaylistFields());
      dispatch(fetchPlaylistSuccess([]));
      dispatch(fetchPlayerItemsStatusSuccess([]));
    },
    resetPlaylist:()=>{
      dispatch(resetPlaylistFields());
      dispatch(fetchPlaylistSuccess([]));
      dispatch(fetchPlayerItemsStatusSuccess([]));
    },
    fetchPlayers: () => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchPlayers(token)).then((response) => {
            !response.error ? dispatch(fetchPlayersSuccess(response.payload.data)) : dispatch(fetchPlayersFailure(response.payload.data));
          });
    },

    fetchPlayersOnlineStatus:()=> {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchPlayersOnlineStatus(token)).then((response) => {
            !response.error ? dispatch(fetchPlayersSuccess(response.payload.data)) : dispatch(fetchPlayersFailure(response.payload.data));
          });
    },

    fetchPlayerDetail: (id) => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchPlayer(id,token)).then((response) => {
        !response.error ? dispatch(fetchPlayerSuccess(response.payload.data)) : dispatch(fetchPlayerFailure(response.payload.data));
      });
    },

    fetchPlayerItemsStatus: (screenId, playerItemIdsArr) =>{
      let token = sessionStorage.getItem('jwtToken');
      let body = {screenId:screenId,items:playerItemIdsArr};
      dispatch(fetchPlayerItemsStatus(token,body)).then((response) => {
        !response.error ? dispatch(fetchPlayerItemsStatusSuccess(response.payload.data)) : dispatch(fetchPlayerItemsStatusFailure(response.payload.data));
      });
    },

    fetchPlaylists: () => {
      let token = sessionStorage.getItem('jwtToken');
      return  dispatch(fetchPlaylists(token)).then((response) => {
        !response.error ? dispatch(fetchPlaylistsSuccess(response.payload.data)) : dispatch(fetchPlaylistsFailure(response.payload.data));
      });
    },

    fetchPlaylist: (playlistId) => {
      let token = sessionStorage.getItem('jwtToken');
      return  dispatch(fetchPlaylist(token,playlistId)).then((response) => {
        !response.error ? dispatch(fetchPlaylistSuccess(response.payload.data)) : dispatch(fetchPlaylistFailure(response.payload.data));
      });
    },

    triggerBulkAction: (actionName) => {
      let token = sessionStorage.getItem('jwtToken');
      return  dispatch(triggerBulkAction(token,actionName)).then((response) => {
        !response.error ? toast.success("Bulk action triggered for "+actionName) : toast.error("Bulk action trigger failed!");
      });
    },

     updatePlaylist(playListObj){
       if(!playListObj) return;
      let token =sessionStorage.getItem('jwtToken');
      return dispatch(updatePlaylist(playListObj,token))
    .then(result => {
      
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createPlaylistFailure(result.payload.response.data));
            toast.error("SAVING PLAYLIST FAILED!");
        throw new SubmissionError(result.payload.data);
      }

      dispatch(createPlaylistSuccess(result.payload.data.playlist)); 
      toast.success("UPDATED PLAYLIST SUCCESSFULLY AS DRAFT!");

      dispatch(fetchPlaylists(token)).then((response) => {
        !response.error ? dispatch(fetchPlaylistsSuccess(response.payload.data)) : dispatch(fetchPlaylistsFailure(response.payload.data));});
        });
    },

    changeConsole: (consoleName,backConsole) => {
      return dispatch(changeSelectedConsole(consoleName,backConsole));
    },

    setSelectPlayerId: (playerId) => {
      return dispatch(changeSelectedPlayer(playerId));
    },

    setSelectedAppId: (appId) =>{
      return dispatch(changeSelectedApp(appId));
    },

    setListDisplayType: (displayType) => {
      return dispatch(changeListDisplayType(displayType));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersList);
