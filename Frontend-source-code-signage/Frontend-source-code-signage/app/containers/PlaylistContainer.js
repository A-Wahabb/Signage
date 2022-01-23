import { connect } from 'react-redux'
import { fetchPlaylists, fetchPlaylistsSuccess, fetchPlaylistsFailure, fetchPlaylistSuccess, fetchPlaylistFailure, resetPlaylistFields, moveToLive,deletePlaylist,deletePlaylistFailure,deletePlaylistSuccess, createPlaylist, createPlaylistSuccess, createPlaylistFailure, fetchPlaylist,updatePlaylist,deletePlaylistItems } from '../actions/playlists';
import Playlists from '../components/Playlists';

import { changeSelectedConsole } from '../actions/popup';
import { toast } from 'react-toastify';

const mapStateToProps = (state, ownProps) => {

  return {
    playlists: ownProps.playlists,
    user: ownProps.user,
    common: ownProps.common,
    publishToSreens: ownProps.publishToSreens,
    playersList : ownProps.playersList,
    toggleRootModal : ownProps.toggleRootModal,
    closeModalPopup: ownProps.closeModalPopup,
    selectedPlayer: ownProps.selectedPlayer,
    appsList : ownProps.appsList,
    moveToLive: ownProps.moveToLive,
    usersList: ownProps.usersList
  };
}

const mapDispatchToProps = (dispatch) => {
  let token = sessionStorage.getItem('jwtToken');
  return {
    resetMe: () => {
      dispatch(resetPlaylistFields());
      dispatch(fetchPlaylistSuccess([]));
     
    },
    resetNewPlaylist:()=>{
      dispatch(resetPlaylistFields());
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

    saveNewPlaylist(playListObj){
      if(!playListObj) return;
      let token =sessionStorage.getItem('jwtToken');
       toast.info("SAVING...");
      return dispatch(createPlaylist(playListObj,token))
    .then(result => {
      
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createPlaylistFailure(result.payload.data));
            toast.error("SAVING PLAYLIST FAILED!");
        throw new SubmissionError(result.payload.response.data);
      }
      console.log('new playlist saved', result.payload);
      dispatch(createPlaylistSuccess(result.payload.data.playlist)); 
      toast.success("CREATED PLAYLIST SUCCESSFULLY AS DRAFT!");

      dispatch(fetchPlaylists(token)).then((response) => {
        !response.error ? dispatch(fetchPlaylistsSuccess(response.payload.data)) : dispatch(fetchPlaylistsFailure(response.payload.data));});
        });
    },

    updatePlaylist(playListObj){
       if(!playListObj) return;
      let token =sessionStorage.getItem('jwtToken');
      toast.info("UPDATING...");
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


    removePlaylistItems(itemsIdsArr){
        console.log('sending items remove call');
        let token =sessionStorage.getItem('jwtToken');
        let idsStrs = itemsIdsArr.join('~');
        return dispatch(deletePlaylistItems(token,idsStrs)).then((response) => {
        dispatch(fetchPlaylists(token)).then((response) => {
        !response.error ? dispatch(fetchPlaylistsSuccess(response.payload.data)) : dispatch(fetchPlaylistsFailure(response.payload.data));});
        });

    },

    deletePlaylist(playLisId){
      if(!playLisId) return;
      let token =sessionStorage.getItem('jwtToken');
      return dispatch(deletePlaylist(token,playLisId)).then((response) => {
        
          !response.error?toast.success("DELETED SUCCESSFULLY"):toast.error("DELETE FAILED");;
      
        dispatch(fetchPlaylists(token)).then((response) => {
        !response.error ? dispatch(fetchPlaylistsSuccess(response.payload.data)) : dispatch(fetchPlaylistsFailure(response.payload.data));});
        });
   
    },

    updateModal: (param) =>{
      return param && param.isModalOpen? dispatch(showModal(param)): dispatch(hideModal());
    },

    changeConsole: (consoleName,backConsole) =>{
      return dispatch(changeSelectedConsole(consoleName,backConsole));
    },

    setSelectedAppId: (appId) =>{
      return dispatch(changeSelectedApp(appId));
    },
    assignAppToPlayers:(playersToUpdate) => {

      dispatch(updatePlayers(playersToUpdate, sessionStorage.getItem('jwtToken')))
            .then(result => {
              
              if (result.payload.response && result.payload.response.status !== 200) {
                dispatch(fetchPlayerFailure(result.payload.response.data));
                toast.error("PUBLISH FAILED!");
                throw new SubmissionError(result.payload.response.data);
              }
              dispatch(fetchPlayerSuccess(result.payload.data)); 
              toast.success("PUBLISHED SUCCESSFULLY!");
            });
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Playlists);
