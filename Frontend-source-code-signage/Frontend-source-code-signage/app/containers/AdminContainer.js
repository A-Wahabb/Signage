import { connect } from 'react-redux';
import { fetchUsers, fetchUsersSuccess, fetchUsersFailure, fetchStorage,fetchStorageSuccess, fetchStorageFailure,logoutUser,updateSettings,
  signInUser, signInUserSuccess, signInUserFailure, resetUserFields,fetchUserMedia,fetchUserMediaSuccess,fetchUserMediaFailure, fetchSettings,fetchSettingsSuccess,fetchSettingsFailure,fetchFoldersSuccess,fetchFoldersFailure,fetchFolders  } from '../actions/users';

import { fetchPlayers, fetchPlayersSuccess, fetchPlayersFailure,updatePlayers } from '../actions/posts';

import { getSubscriptions, getSubscriptionsSuccess, getSubscriptionsFailure } from '../actions/payment';

import { fetchApps, fetchAppsSuccess, fetchAppsFailure,moveToLive,fetchAppFailure} from '../actions/apps';
import AdminDashboard from '../components/AdminDashboard';
import { changeSelectedConsole, changeSelectedApp,selectedConsole,changeParentConsole } from '../actions/popup';
import { fetchPlaylists, fetchPlaylistsSuccess, fetchPlaylistsFailure} from '../actions/playlists';
import { fetchSchedules, fetchSchedulesSuccess, fetchSchedulesFailure} from '../actions/schedules';
import { toast } from 'react-toastify';

const mapStateToProps = (state, ownProps) => {
  console.log('---ADMIN --', state);
  return {
    user: ownProps.user,
    common: ownProps.common,
    usersList: state.user.usersList,
    playersList: state.posts.playersList,
    appsList: state.apps.appsList,
    all_storage: state.user.all_storage,
    selectedConsole: state.popup.selectedConsole,
    rootModal: ownProps.rootModal,
    posts: state.posts,
    schedules : state.schedules,
    playlists : state.playlists,
    allSubscriptions: state.payment.allSubscriptions.list
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchUsers(token)).then((response) => {
            !response.error ? dispatch(fetchUsersSuccess(response.payload.data)) : dispatch(fetchUsersFailure(response.payload.data));
          });
    },
    fetchSubscriptionsList: () => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(getSubscriptions(token)).then((response) => {
            !response.error ? dispatch(getSubscriptionsSuccess(response.payload.data)) : dispatch(getSubscriptionsFailure(response.payload.data));
          });
      
    },

    fetchUserDetails: () => {
    let token = sessionStorage.getItem('jwtToken');

   
    //get setting for logged in user
    dispatch(fetchSettings(token)).then((settings) => {
                !settings.error ? dispatch(fetchSettingsSuccess(settings.payload.data)) : dispatch(fetchSettingsFailure(settings.payload.data));
              });

    dispatch(fetchFolders(token)).then((response) => {
            !response.error ? dispatch(fetchFoldersSuccess(response.payload.data)) : dispatch(fetchFoldersFailure(response.payload.data));
          });
    //let other components know that everything is fine by updating the redux` state
     //ps: this is same as dispatching RESET_USER_FIELDS
    dispatch(fetchUserMedia(token)).then((response) => {
            !response.error ? dispatch(fetchUserMediaSuccess(response.payload.data)) : dispatch(fetchUserMediaFailure(response.payload.data));
          });
    },

    fetchPlayers: () => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchPlayers(token)).then((response) => {
            !response.error ? dispatch(fetchPlayersSuccess(response.payload.data)) : dispatch(fetchPlayersFailure(response.payload.data));
          });
    },
    fetchApps: () => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchApps(token)).then((response) => {
            !response.error ? dispatch(fetchAppsSuccess(response.payload.data)) : dispatch(fetchAppsFailure(response.payload.data));
          });
    },
    fetchStorageInfo: () => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchStorage(token)).then((response) => {
            console.log('all storage',response)
            !response.error ? dispatch(fetchStorageSuccess(response.payload.data)) : dispatch(fetchStorageFailure(response.payload.data));
          });
    },
    changeConsole: (consoleName) =>{
      return dispatch(changeSelectedConsole(consoleName));
    },

    fetchPlaylists: () => {
      let token = sessionStorage.getItem('jwtToken');
       dispatch(fetchPlaylists(token)).then((response) => {
        !response.error ? dispatch(fetchPlaylistsSuccess(response.payload.data)) : dispatch(fetchPlaylistsFailure(response.payload.data));
      });
    },
    
     fetchSchedules: () => {
      let token = sessionStorage.getItem('jwtToken');
        dispatch(fetchSchedules(token)).then((response) => {
        !response.error ? dispatch(fetchSchedulesSuccess(response.payload.data)) : dispatch(fetchSchedulesFailure(response.payload.data));
      });
    },
    moveToLiveFolder:(app) =>{
      let token = sessionStorage.getItem('jwtToken');
      console.log('--[template container]-- moveTo Live folder',app);
      if(!app) 
        {return dispatch(fetchAppFailure({message: 'App live fails.'}));
      }else{
        var fd = new FormData();
        fd.append('appFolder', app.appLocation);
        fd.append('appId', app._id);
        fd.append('isTemplate', app.isTemplate);
      return  dispatch(moveToLive(fd,token)).then((response) => {
          if(!response.error) { 
          toast.success('LIVE NOW!');
          dispatch(fetchAppSuccess(response.payload.data));
          }
           else{ 
           toast.error('ERROR, MOVING LIVE !'); 
          dispatch(fetchAppFailure(response.payload.data));
          }
        });
      
      }
    },

    publishToSreens:(playersArr) => {
        let token = sessionStorage.getItem('jwtToken');
      return dispatch(updatePlayers(token, playersArr)).then((response) => {
            if(!response.error) 
            {
              toast.success('PUBLISHED SUCCESSFULLY');
               dispatch(fetchPlayers(token)).then((response) => {
            !response.error ? dispatch(fetchPlayersSuccess(response.payload.data)) : dispatch(fetchPlayersFailure(response.payload.data));
          });
            } else{ 
              toast.error('PUBLISHED FAILED') ;
          }
          });
      },
     logout: () => {
         sessionStorage.removeItem('jwtToken');
         localStorage.removeItem('temptkn');
         localStorage.removeItem('temptknsv');
         
         dispatch(logoutUser());
           
         dispatch(changeParentConsole('SIGN_IN'));
     },

     updateSettings:(updateData) => {
        let token = sessionStorage.getItem('jwtToken');
        return dispatch(updateSettings(token, updateData)).then((response) => {
            if(!response.error) 
            {
               toast.success('UPDATED SUCCESSFULLY');
                dispatch(fetchSettings(token)).then((settings) => {
                !settings.error ? dispatch(fetchSettingsSuccess(settings.payload.data)) : dispatch(fetchSettingsFailure(settings.payload.data));
              });
      
            } else{ 
              toast.error('UPDATE FAILED') ;
          }
          });
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard);
