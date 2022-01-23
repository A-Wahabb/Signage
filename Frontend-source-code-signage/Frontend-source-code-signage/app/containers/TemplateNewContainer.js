import { connect} from 'react-redux';

import { fetchApp,  fetchAppFailure,fetchAppSuccess,resetActiveApp,createApp, createAppSuccess, createAppFailure, resetNewApp, uploadNewMedia,uploadNewMediaSuccess,uploadNewMediaFailure,resetUploadNewMedia,moveToLive,fetchApps, fetchAppsSuccess, fetchAppsFailure } from '../actions/apps';
import TemplateNew from '../components/TemplateNew';
import {fetchPlayer, fetchPlayerSuccess, fetchPlayerFailure, resetActivePlayer, updatePlayer, createPlayerSuccess, createPlayerFailure,updatePlayers  } from '../actions/posts';
import { changeSelectedConsole } from '../actions/popup';
import {reset} from 'redux-form';
import { toast } from 'react-toastify';
import {fetchLocas,fetchLocsFailure, fetchLocsSuccess,selectedLocSuccess} from '../actions/customer-nen';

const mapStateToProps = (state,ownProps) => {
//console.log("--Template Edit Sate", state);
  return {
    activeApp :state.apps.activeApp,
    newApp : state.apps.newApp,
    playersList: ownProps.playersList,
    user: ownProps.user,
    initialValues: state.apps.activeApp && state.apps.activeApp.app && state.apps.activeApp.app.appData,
    locs: state.locs,
    selectedLoc: state.locs&&state.locs.selectedLoc,
    closeModalPopup:ownProps.closeModalPopup,
    selectedAppId: ownProps.selectedAppId,
    appsList: ownProps.appsList
  };
}

const mapDispatchToProps = (dispatch ) => {
  let token = sessionStorage.getItem('jwtToken');
  Object.addToPath= function(o, s, r,p, cb){
    console.log('new path to rsp',s);
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
      let k = a[i];
      if (k in o) {
        if (i == (n - 1)) {
          if (r == "ADD") {
            console.log('--Adding--', o[k]);
            //var itemToPush = typeof o[k][0] == "object" ? Object.assign({}, o[k][0]) : o[k][0];
            if (cb) { cb(p); }
            o[k].push(p);
            return;
          }
          o[k] = r;
          if (r == "DELETE") {
            o.splice(k, 1);
          }
        }
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }


  Object.byString = function(o, s, r,cb) {// object, findJSONPathStr, replaceStr
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
        let k = a[i];
        if (k in o) {
          if(i== (n-1)){
            if(r =="ADD"){
              return   typeof o[k][0] == "object" ? Object.assign({}, o[k][0]) : o[k][0];
            }
           o[k]=r;
          if(r=="DELETE"){
            o.splice(k,1);
          }
      }
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}


  function updateActiveApp(pathInStr,value, activeApp,cb){
// updateType -- is base64_data or original_data
console.log('before save', activeApp);
if(value=='ADD'){
  var item=Object.byString(activeApp.app.appData, pathInStr, value, cb);
  Object.addToPath(activeApp.app.appData, pathInStr.replace('.formats',''), value, item,cb);
  }else{
    Object.byString(activeApp.app.appData, pathInStr, value, cb);
  }  
}



return {
  resetMe: () => {
    dispatch(resetNewApp());
    dispatch(resetActiveApp());
  },

  fetchAppDetail: (appId) => {
    dispatch(fetchApp(appId,token)).then((response) => {
      !response.error ? dispatch(fetchAppSuccess(response.payload.data)) : dispatch(fetchAppFailure(response.payload.data));
    });
  },

  UpdateAppData:(app) =>{
    //let appsList = mapStateToProps().appsList;
    dispatch(createAppSuccess(app));

  },

  validateAndSaveApp:(values, activeApp) => {

    let activeAppObj = Object.assign({},activeApp.app.appDetail);

    let token =sessionStorage.getItem('jwtToken');
    let appData ={activeApp: activeAppObj, appContentJSON : values.original_data};

    return dispatch(createApp(appData,token))
    .then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createAppFailure(result.payload.response.data));
            toast.error("SAVING FAILED!");
        throw new SubmissionError(result.payload.response.data);
      }
     activeApp.app.appDetail =result.payload.data.appDetail;
      //let other components know that everything is fine by updating the redux` state

      dispatch(createAppSuccess(activeApp.app)); //ps: this is same as dispatching RESET_USER_FIELDS
    
          toast.success("SAVED SUCCESSFULLY AS DRAFT!");
      dispatch(fetchApps(token)).then((response) => {
        !response.error ? dispatch(fetchAppsSuccess(response.payload.data)) : dispatch(fetchAppsFailure(response.payload.data));
      });
    });
  },

  tempAppUpdate:(pathInStr, value, activeApp, callback)=>{

    updateActiveApp(pathInStr,value, activeApp,callback);

  },

  changeConsole: (consoleName,backConsole) =>{
    return dispatch(changeSelectedConsole(consoleName,backConsole));
  },

  setSelectedAppId: (appId) =>{
    return dispatch(changeSelectedApp(appId));
  },

  updateMedia: (formData, activeApp) => {
    let token =sessionStorage.getItem('jwtToken');
    console.log(formData);
    return dispatch(uploadNewMedia(formData,token)).then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      var res =result.payload;
      if (res.response && res.response.status !== 200) {
        dispatch(uploadNewMediaFailure(res.response.data));
        throw new SubmissionError(res.response.data);
      }
      //let other components know that everything is fine by updating the redux` state
      console.log("[temp Edit container] upload media success!!",res);

      updateActiveApp(res.data.indexPath,res.data.base64, activeApp);

      dispatch(uploadNewMediaSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS

    });

  },

  updateModal: (param) => {
    console.log("--modal update--",param);
    return param && param.isModalOpen? dispatch(showModal(param)): dispatch(hideModal());
  },

  updateKey: (key) =>{
    return dispatch(updateKey(key));
  },
  
  resetForm:(formName)=>{
    return dispatch(reset(formName));
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
          let editingPlayer= player;
          if(editingPlayer && editingPlayer._id){
          editingPlayer.appId = app._id;
          editingPlayer.thumbnailPath = app.thumbnailPath;
          editingPlayer.orientation = app.orientation;
          editingPlayer.thumb = app.thumb ? app.thumb : "KEEP_OLD";
          editingPlayer.status = "PENDING";  
          playersToUpdate.push(editingPlayer);
        }
        

       //update all other app who is using the same app
      for(var i=0;i<playerList.length;i++){
            let playerObj = playerList[i];
        if(playerObj && (playerObj.appId == app._id)){
          playerObj.status = "PENDING";
          playersToUpdate.push(playerObj);
        }

          }
          console.log('Players to update by app edit', playersToUpdate);
           dispatch(updatePlayers(playersToUpdate, sessionStorage.getItem('jwtToken')))
            .then(result => {
              // Note: Error's "data" is in result.payload.response.data (inside "response")
              // success's "data" is in result.payload.data
              if (result.payload.response && result.payload.response.status !== 200) {
                dispatch(fetchPlayerFailure(result.payload.response.data));
                toast.error("PUBLISH FAILED!");
                throw new SubmissionError(result.payload.response.data);
              }
              //let other components know that everything is fine by updating the redux` state
              dispatch(fetchPlayerSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
             // dispatch(fetchAppSuccess(response.payload.data));
              toast.success("PUBLISHED SUCCESSFULLY!");
              //ps: this is same as dispatching RESET_USER_FIELDS
            });
          

        });

      }
      return dispatch(fetchAppSuccess(app));

    },

  updatePlayerApp(app,player){
    if(!app) return;
    var player =player? player:{};
    player.appId = app._id;
    player.thumbnailPath = app.thumbnailPath;
    player.orientation =app.orientation;
    player.thumb =app.thumb.replace('app-thumbnail','/thumb');
    return dispatch(createPlayerSuccess(player));
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

export default connect(mapStateToProps, mapDispatchToProps)(TemplateNew);
