import { connect } from 'react-redux'
import UserDashboard from '../components/UserDashboard';
import { changeSelectedConsole,changeSelectedPlayer,changeSelectedApp,changeLeftMenuActive,changeParentConsole} from '../actions/popup';
import { fetchPlayers, fetchPlayersOnlineStatus, fetchPlayersSuccess, fetchPlayersFailure, updatePlayers, fetchStatusLogs,fetchStatusLogsSuccess,fetchStatusLogsFailure } from '../actions/posts';
import { fetchPlaylists, fetchPlaylistsSuccess, fetchPlaylistsFailure, fetchPlaylist,fetchPlaylistSuccess, fetchPlaylistFailure,resetPlaylistFields, updatePlaylist, createPlaylistSuccess,createPlaylistFailure  } from '../actions/playlists';
import { fetchSchedules, fetchSchedulesSuccess, fetchSchedulesFailure} from '../actions/schedules';
import {fetchIMSettingsByName, fetchIMSettingsSuccess} from '../actions/iamuser';
import { getUserSubPlanByEmail, getUserSubPlanByEmailSuccess, getUserSubPlanByEmailFailure} from '../actions/payment';
import {fetchApps, fetchAppsSuccess, fetchAppsFailure,fetchAppSuccess, createAppSuccess,moveToLive,fetchAppFailure ,updateApp } from '../actions/apps';

import { toast } from 'react-toastify';
import { signInUser, signInUserSuccess, signInUserFailure, resetUserFields,fetchUserMedia,fetchUserMediaSuccess,fetchUserMediaFailure, fetchSettings,fetchSettingsSuccess,fetchSettingsFailure,fetchFoldersSuccess,fetchFoldersFailure,fetchFolders,logoutUser,updateSettings,fetchUsers, fetchUsersSuccess, fetchUsersFailure,
findUsers,findUsersSuccess,findUsersFailure,updateMedia } from '../actions/users';


const mapStateToProps = (state, ownProps) => {
  return {
    common: state.popup,
    user: state.user,
    posts: state.posts,
    userSubs: state.payment.userSubs,
    appsList: state.apps.appsList,
    playlists : state.playlists,
    schedules : state.schedules,
    rootModal: ownProps.rootModal,
    usersList: ownProps.usersList,
    closeModalPopup: ownProps.closeModalPopup
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
	changeConsole: (consoleName,backConsole) =>{
		dispatch(changeSelectedPlayer(null));
		dispatch(changeSelectedApp(null));
      return dispatch(changeSelectedConsole(consoleName,backConsole));
    },

    resetMe: () => {
    },

    fetchUserDetails: (user) => {

    console.log('---user details---', user);
    let token = sessionStorage.getItem('jwtToken');

    //subscription plan
    dispatch(getUserSubPlanByEmail(token)).then((subs) => {
                console.log('Receive Subs', subs);
                !subs.error ? dispatch(getUserSubPlanByEmailSuccess(subs.payload.data)) : dispatch(getUserSubPlanByEmailFailure(subs.payload));
              });

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

    
    //let imusername = user.user.iAmUsers.split('~~')[0];
    dispatch(fetchIMSettingsByName(token,user.user.iAmUsers)).then((result) => {
              if(!result.error){
                console.log('seting data---',result.payload.data);
                dispatch(fetchIMSettingsSuccess(result.payload.data));
              }
              
            })
      
    },

    findUsers: (userSearchText) =>{
        let token = sessionStorage.getItem('jwtToken');
      dispatch(findUsers(token,userSearchText)).then((response) => {
            !response.error ? dispatch(findUsersSuccess(response.payload.data)) : dispatch(findUsersFailure(response.payload.data));
          });
    },

    fetchPlayers: () => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchPlayers(token)).then((response) => {
            !response.error ? dispatch(fetchPlayersSuccess(response.payload.data)) : dispatch(fetchPlayersFailure(response.payload.data));
          });
    },

    fetchPlaylists: () => {
      let token = sessionStorage.getItem('jwtToken');
       dispatch(fetchPlaylists(token)).then((response) => {
        !response.error ? dispatch(fetchPlaylistsSuccess(response.payload.data)) : dispatch(fetchPlaylistsFailure(response.payload.data));
      });
    },

    fetchApps: () => {
      let token = sessionStorage.getItem('jwtToken');
        dispatch(fetchApps(token)).then((response) => {
        !response.error ? dispatch(fetchAppsSuccess(response.payload.data)) : dispatch(fetchAppsFailure(response.payload.data));
      });
    },
    fetchSchedules: () => {
      let token = sessionStorage.getItem('jwtToken');
        dispatch(fetchSchedules(token)).then((response) => {
        !response.error ? dispatch(fetchSchedulesSuccess(response.payload.data)) : dispatch(fetchSchedulesFailure(response.payload.data));
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
    fetchStatusLogs:() =>{
      let token = sessionStorage.getItem('jwtToken');
      return dispatch(fetchStatusLogs(token)).then((response) => {
            !response.error ? dispatch(fetchStatusLogsSuccess(response.payload.data)) : dispatch(fetchStatusLogsFailure(response.payload.data));
            console.log(response);
          });
    },
    toggleLeftMenuActive:(isLeftMenuActive)=> {
      return dispatch(changeLeftMenuActive(isLeftMenuActive));
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
          dispatch(fetchAppSuccess(response.payload.data));
          }
           else{ 
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
         sessionStorage.removeItem('isIAMUser');
         sessionStorage.removeItem('iAmUsers');
         dispatch(logoutUser());
           
         dispatch(changeParentConsole('SIGN_IN'));
     },

     fetchUsers: () => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchUsers(token)).then((response) => {
            !response.error ? dispatch(fetchUsersSuccess(response.payload.data)) : dispatch(fetchUsersFailure(response.payload.data));
          });
    },

    updateMedia: (data) => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(updateMedia(token,data)).then((response) => {
            if(!response.error){
               toast.success("SHARE STATUS UPDATED SUCCESSFULLY!");
               dispatch(fetchUserMedia(token)).then((response) => {
            !response.error ? dispatch(fetchUserMediaSuccess(response.payload.data)) : dispatch(fetchUserMediaFailure(response.payload.data));
          });
           }else{
             toast.error("SHARE STATUS UPDATE FAILED!");
             dispatch(fetchUsersFailure(response.payload.data));
           }
          });
    },

    updatePlaylist(playListObj){
       if(!playListObj) return;
      let token =sessionStorage.getItem('jwtToken');
      return dispatch(updatePlaylist(playListObj,token))
    .then(result => {
      
      if (result.payload.response && result.payload.response.status !== 200) {
      
            toast.error("SHARE STATUS UPDATE PLAYLIST FAILED!");
      }else{
         toast.success("SHARE STATUS UPDATED SUCCESSFULLY");
          dispatch(fetchPlaylists(token)).then((response) => {
        !response.error ? dispatch(fetchPlaylistsSuccess(response.payload.data)) : dispatch(fetchPlaylistsFailure(response.payload.data));})
      
      }
     
    });
  },

  updateTemplate(appObj){
       if(!appObj) return;
      let token =sessionStorage.getItem('jwtToken');
      return dispatch(updateApp(token, appObj._id,appObj ))
    .then(result => {
      
      if (result.payload.response && result.payload.response.status !== 200) {
      
            toast.error("SHARE STATUS UPDATE FAILED!");
      }else{
         toast.success("SHARE STATUS UPDATED SUCCESSFULLY");
         dispatch(fetchApps(token)).then((response) => {
        !response.error ? dispatch(fetchAppsSuccess(response.payload.data)) : dispatch(fetchAppsFailure(response.payload.data));
      });
      
      }
     
    });
  }


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDashboard);
