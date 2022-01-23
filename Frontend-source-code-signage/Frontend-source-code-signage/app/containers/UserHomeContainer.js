import { connect } from 'react-redux'
import { fetchPlayers, fetchPlayersOnlineStatus, fetchPlayersSuccess, fetchPlayersFailure,fetchPlayer, fetchPlayerSuccess, fetchPlayerFailure,resetActivePlayer,resetNewPlayer,updatePlayers,fetchPlayerItemsStatus, fetchPlayerItemsStatusSuccess, fetchPlayerItemsStatusFailure  } from '../actions/posts';
import UserHome from '../components/UserHome';

import {fetchApps, fetchAppsSuccess, fetchAppsFailure,fetchAppSuccess, createAppSuccess,makeDuplicateApp,  resetActiveApp,  resetNewApp,moveToLive} from '../actions/apps';
import { fetchPlaylists, fetchPlaylistsSuccess, fetchPlaylistsFailure, fetchPlaylist,fetchPlaylistSuccess, fetchPlaylistFailure, resetPlaylistFields, updatePlaylist, createPlaylistSuccess,createPlaylistFailure  } from '../actions/playlists';
import { changeSelectedConsole, changeSelectedPlayer,changeSelectedApp, changeListDisplayType } from '../actions/popup';
import { toast } from 'react-toastify';

const mapStateToProps = (state,ownProps) => {
  console.log('home', ownProps);
  return {
    posts: ownProps.posts,
    user: ownProps.user,
    appsList: ownProps.appsList,
    common : ownProps.common,
    playlists: ownProps.playlists,
    playerItemsStatus: ownProps.playerItemsStatus,
    toggleRootModal: ownProps.toggleRootModal,
    publishToSreens: ownProps.publishToSreens,
    schedules: ownProps.schedules,
    rootModal: ownProps.rootModal,
    userSubs: ownProps.userSubs
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetPlaylist:()=>{
      dispatch(resetPlaylistFields());
      dispatch(fetchPlaylistSuccess([]));
      dispatch(fetchPlayerItemsStatusSuccess([]));
    },
    resetNewPlaylist:()=>{
      dispatch(resetPlaylistFields());
    },
    changeConsole: (consoleName,backConsole) => {
      return dispatch(changeSelectedConsole(consoleName,backConsole));
    },

    setSelectPlayerId: (playerId) => {
      return dispatch(changeSelectedPlayer(playerId));
    },

    setSelectedAppId: (appId) => {
      return dispatch(changeSelectedApp(appId));
    },

    setListDisplayType: (displayType) => {
      return dispatch(changeListDisplayType(displayType));
    },
    fetchPlayerDetail: (id) => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchPlayer(id,token)).then((response) => {
        !response.error ? dispatch(fetchPlayerSuccess(response.payload.data)) : dispatch(fetchPlayerFailure(response.payload.data));
      });
    },

    copyTemplate: (appId) =>{
      let token = sessionStorage.getItem('jwtToken');
      if(appId){
      dispatch(makeDuplicateApp(appId,token)).then((response) => {
       if( !response.error){
        toast.success("DUPLICATE CREATED SUCCESSFULLY!");
        //afrwdispatch(createAppSuccess(token))
        dispatch(fetchApps(token)).then((response) => {
        !response.error ? dispatch(fetchAppsSuccess(response.payload.data)) : dispatch(fetchAppsFailure(response.payload.data));
      });
       }else{
        toast.error("DUPLICATE FAILED!");
        throw new SubmissionError(result.payload.response.data);
       }
     });
      }
    },

    moveToLiveFolder:(app) =>{
      console.log('--[template container]-- moveTo Live folder',app);
      if(!app) return dispatch(fetchAppsFailure({message: 'App selection fails.'}));
      if(app.status=="DRAFT"){
        var fd = new FormData();
        fd.append('appFolder', app.appLocation);
        fd.append('appId', app._id);
      return  dispatch(moveToLive(fd,sessionStorage.getItem('jwtToken'))).then((response) => {
          !response.error ? dispatch(fetchAppsSuccess(response.payload.data)) : dispatch(fetchAppsFailure(response.payload.data));
        });
      }
      

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

    assignAppToPlayers:(playersToUpdate) => {

      dispatch(updatePlayers(sessionStorage.getItem('jwtToken'),playersToUpdate))
            .then(result => {
              if (result.payload.response && result.payload.response.status !== 200) {
                dispatch(fetchPlayerFailure(result.payload.response.data));
                toast.error("PUBLISH FAILED!");
                throw new SubmissionError(result.payload.response.data);
              }
              dispatch(fetchPlayerSuccess(result.payload.data)); 
              toast.success("PUBLISHED SUCCESSFULLY!");
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
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHome);
