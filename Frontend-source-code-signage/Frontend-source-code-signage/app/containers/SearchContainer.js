import { connect } from 'react-redux'
import { fetchPlayers, fetchPlayersOnlineStatus, fetchPlayersSuccess, fetchPlayersFailure,fetchPlayer, fetchPlayerSuccess, fetchPlayerFailure,resetActivePlayer,resetNewPlayer,updatePlayers  } from '../actions/posts';
import Search from '../components/Search';
import {fetchApps, fetchAppsSuccess, fetchAppsFailure,fetchAppSuccess, createAppSuccess,makeDuplicateApp,  resetActiveApp,  resetNewApp,moveToLive} from '../actions/apps';
import { changeSelectedConsole, changeSelectedPlayer,changeSelectedApp, changeListDisplayType } from '../actions/popup';
import { toast } from 'react-toastify';

const mapStateToProps = (state) => {
  return {
    playersList: state.posts.playersList,
    user: state.user,
    appsList: state.apps.appsList,
    listDisplayType: state.popup.listDisplayType,
    searchText : state.popup.searchText
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetActivePlayer());
      dispatch(resetNewPlayer());
      dispatch(resetNewApp());
      dispatch(resetActiveApp());
    },
    fetchPlayers: () => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchPlayers(token)).then((response) => {
            !response.error ? dispatch(fetchPlayersSuccess(response.payload.data)) : dispatch(fetchPlayersFailure(response.payload.data));
          });
    },
    fetchApps: () => {
      let token = sessionStorage.getItem('jwtToken');
    return  dispatch(fetchApps(token)).then((response) => {
        !response.error ? dispatch(fetchAppsSuccess(response.payload.data)) : dispatch(fetchAppsFailure(response.payload.data));
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
      if(!app) return dispatch(fetchAppFailure({message: 'App selection fails.'}));
      if(app.status=="DRAFT"){
        var fd = new FormData();
        fd.append('appFolder', app.appLocation);
        fd.append('appId', app._id);
      return  dispatch(moveToLive(fd,sessionStorage.getItem('jwtToken'))).then((response) => {
          !response.error ? dispatch(fetchAppSuccess(response.payload.data)) : dispatch(fetchAppFailure(response.payload.data));
        });
      }
      

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

export default connect(mapStateToProps, mapDispatchToProps)(Search);
