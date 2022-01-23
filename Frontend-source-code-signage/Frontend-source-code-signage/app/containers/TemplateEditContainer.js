import { connect } from 'react-redux';

import { fetchApp, fetchAppFailure, fetchAppSuccess,fetchApps, fetchAppsSuccess, fetchAppsFailure, resetActiveApp, createApp, createAppSuccess, createAppFailure, resetNewApp, uploadNewMedia, uploadNewMediaSuccess, uploadNewMediaFailure, resetUploadNewMedia, moveToLive } from '../actions/apps';
import { fetchPlayer, fetchPlayerSuccess, fetchPlayerFailure, resetActivePlayer, updatePlayer, createPlayerSuccess, createPlayerFailure,updatePlayers } from '../actions/posts';
import TemplateEdit from '../components/TemplateEditNew';
import { changeSelectedConsole } from '../actions/popup';
import { toast } from 'react-toastify';
import {fetchLocas,fetchLocsFailure, fetchLocsSuccess,selectedLocSuccess} from '../actions/customer-nen';


const mapStateToProps = (state,ownProps) => {
  return {
    activeApp: state.apps.activeApp,
    appsList: ownProps.appsList,
    newApp: state.apps.newApp,
    user: ownProps.user,
    locs: state.locs,
    selectedLoc: state.locs&&state.locs.selectedLoc,
    closeModalPopup:ownProps.closeModalPopup,
    selectedAppId: ownProps.selectedAppId,
    rootModal: ownProps.rootModal,
    toggleRootModal : ownProps.toggleRootModal
  };
}

const mapDispatchToProps = (dispatch) => {
  let token = sessionStorage.getItem('jwtToken');
  return {
    resetMe: () => {
      dispatch(resetNewApp());
      dispatch(resetActiveApp());
      dispatch(resetUploadNewMedia());
      
    },

    fetchAppDetail: (appId) => {
      //console.log("[app container] fetching app detail", appId);
      dispatch(fetchApp(appId, token)).then((response) => {
        !response.error ? dispatch(fetchAppSuccess(response.payload.data)) : dispatch(fetchAppFailure(response.payload.data));
      });
    },

    fetchApps: (userId) => {
    return  dispatch(fetchApps(token,userId)).then((response) => {
        !response.error ? dispatch(fetchAppsSuccess(response.payload.data)) : dispatch(fetchAppsFailure(response.payload.data));
      });
    },

    UpdateAppData: (app) => {
      //let appsList = mapStateToProps().appsList;
      dispatch(createAppSuccess(app));

    },
    moveToLiveFolder: (app,player,playerList) => {
      //console.log('--[template container]-- moveTo Live folder', app);
      //if (!app || !player) return;
      if (!app) return dispatch(fetchAppFailure({ message: 'App selection fails.' }));
      if (app.status == "DRAFT") {
        var fd = new FormData();
        fd.append('appFolder', app.appLocation);
        fd.append('appId', app._id);
        fd.append('isTemplate', app.isTemplate);
        return dispatch(moveToLive(fd, token)).then((response) => {
          if (response.error) {
            dispatch(fetchAppFailure(response.payload.data));
          }
          let playersToUpdate=[];
        
      
      for(var i=0;i<playerList.length;i++){
            let playerObj = playerList[i];
        if(playerObj && (playerObj.appId == app._id)){
          playerObj.status = "PENDING";
          playersToUpdate.push(playerObj);
        }

          }
          console.log('Players to update by app edit', playersToUpdate);
           dispatch(updatePlayers(sessionStorage.getItem('jwtToken'),playersToUpdate))
            .then(result => {
              // Note: Error's "data" is in result.payload.response.data (inside "response")
              // success's "data" is in result.payload.data
              if (result.payload.response && result.payload.response.status !== 200) {
                dispatch(fetchPlayerFailure(result.payload.response.data));
                toast.error("PUBLISH FAILED!");
                
              }else{
              //let other components know that everything is fine by updating the redux` state
              dispatch(fetchPlayerSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
             // dispatch(fetchAppSuccess(response.payload.data));
              toast.success("PUBLISHED SUCCESSFULLY!");
              //ps: this is same as dispatching RESET_USER_FIELDS
            }
            });
          

        });

      }
      return dispatch(fetchAppSuccess(app));

    },
   
    updatePlayerApp(app, player) {
      if (!app || !player) return;
      player.appId = app._id;
      player.thumbnailPath = app.thumbnailPath;
      player.orientation = app.orientation;
      player.thumb = app.thumb ? app.thumb : "KEEP_OLD";
      player.status = "PENDING";
      return dispatch(updatePlayer(player, sessionStorage.getItem('jwtToken')))
        .then(result => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(fetchPlayerFailure(result.payload.response.data));
            throw new SubmissionError(result.payload.response.data);
          }
          //let other components know that everything is fine by updating the redux` state
          dispatch(fetchPlayerSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
        });
    },

    changeConsole: (consoleName,backConsole) => {
      return dispatch(changeSelectedConsole(consoleName,backConsole));
    },

    setSelectedAppId: (appId) => {
      return dispatch(changeSelectedApp(appId));
    },
    validateAndSaveApp: (activeApp) => {

      let token = sessionStorage.getItem('jwtToken');
      let appData = { activeApp: activeApp.app.appDetail, appContentJSON: activeApp.app.appData.original_data }
      console.log('--fnal saving app--', appData);       
      return dispatch(createApp(appData, token))
        .then(result => {
          // Note: Error's "data" is in result.payload.response.data (inside "response")
          // success's "data" is in result.payload.data
          if (result.payload.response && result.payload.response.status !== 200) {
            dispatch(createAppFailure(result.payload.response.data));
            toast.error("SAVING FAILED!");
          }
          //console.log("--App saved CB--", result);
          activeApp.app.appDetail = result.payload.data.appDetail;
          //let other components know that everything is fine by updating the redux` state
          console.log('saved app',activeApp);
          dispatch(createAppSuccess(activeApp.app));
          
          toast.success("SAVED SUCCESSFULLY!");
          dispatch(fetchApps(token)).then((response) => {
          !response.error ? dispatch(fetchAppsSuccess(response.payload.data)) : dispatch(fetchAppsFailure(response.payload.data));
         });
        });
    },

    tempAppUpdate: (pathInStr, value, activeApp, callback) => {
      if(callback && typeof(callback) !== "function" ){
        callback= function(app){
          dispatch(createAppSuccess(app));
        }
      }
      updateActiveApp(pathInStr, value, activeApp, callback);


    },

    updateMedia: (formData) => {
      let token = sessionStorage.getItem('jwtToken');
      //console.log(formData);
      return dispatch(uploadNewMedia(formData, token)).then(result => {
        // Note: Error's "data" is in result.payload.response.data (inside "response")
        // success's "data" is in result.payload.data
        // var res = result.payload;
        // if (res.response && res.response.status !== 200) {
        //   dispatch(uploadNewMediaFailure(res.response.data));
        // }
        //let other components know that everything is fine by updating the redux` state
        //console.log("[temp Edit container] upload media success!!", res);

       // updateActiveApp(res.data.indexPath, res.data.base64, activeApp);

        //dispatch(uploadNewMediaSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS

      });

    },

    updateKey: (key) =>{
    return dispatch(updateKey(key));
      },

    updateModal: (param) => {
      //console.log("--modal update--", param);
      return param && param.isModalOpen ? dispatch(showModal(param)) : dispatch(hideModal());
    },

   

    fetchLocs: (cred,pass) => {
    return  dispatch(fetchLocas(cred)).then((response) => {
        !response.error ? dispatch(fetchLocsSuccess(response.payload.data)) : dispatch(fetchLocsFailure(response.payload.data));
      });
    },
    setSelectedLocs: (loc) => {
    return  dispatch(selectedLocSuccess(loc));
    },
    

    setSelectedAppId: (appId) =>{
      return dispatch(changeSelectedApp(appId));
    }


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateEdit);
