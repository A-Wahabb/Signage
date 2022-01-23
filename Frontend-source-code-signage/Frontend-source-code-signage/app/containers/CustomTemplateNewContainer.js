import { connect} from 'react-redux';

import { fetchApp,  fetchAppFailure,fetchAppSuccess,resetActiveApp,createApp, createAppSuccess, createAppFailure, resetNewApp, uploadNewMedia,uploadNewMediaSuccess,uploadNewMediaFailure,resetUploadNewMedia,moveToLive } from '../actions/apps';
import { showModal, hideModal, updateKey } from '../actions/popup';
import CustomTemplateNew from '../components/CustomTemplateNew';
import {createPlayerSuccess, fetchPlayerSuccess } from '../actions/posts';
import { changeSelectedConsole, changeSelectedApp } from '../actions/popup';
import {reset} from 'redux-form';

const mapStateToProps = (state) => {
console.log("--Template Edit Sate", state);
  return {
    activeApp :state.apps.activeApp,
    appsList :state.apps.appsList,
    newApp : state.apps.newApp,
    newPlayer: state.posts.newPlayer,
    uploadMedia : state.apps.uploadMedia,
    user: state.user,
    modal : state.popup.modal,
    update_key: state.popup.updateKey,
    initialValues: state.apps.activeApp && state.apps.activeApp.app && state.apps.activeApp.app.appData,
    selectedPlayerId: state.popup.selectedPlayerId,
    selectedAppId: state.popup.selectedAppId
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
if(value=='ADD'){
  var item=Object.byString(activeApp.app.appData, pathInStr, value, cb);
  Object.addToPath(activeApp.app.appData, pathInStr.replace('.formats',''), value, item,cb);
  }else{
    Object.byString(activeApp.app.appData, pathInStr, value, cb);
  }  }



return {
  resetMe: () => {
    dispatch(resetNewApp());
    dispatch(resetActiveApp());
    dispatch(resetUploadNewMedia());
  },

  fetchAppDetail: (appId) => {
    console.log("[app container] fetching app detail", appId);
    dispatch(fetchApp(appId,token)).then((response) => {
      !response.error ? dispatch(fetchAppSuccess(response.payload.data)) : dispatch(fetchAppFailure(response.payload.data));
    });
  },

  UpdateAppData:(app) =>{
    //let appsList = mapStateToProps().appsList;
    console.log(app);
    dispatch(createAppSuccess(app));

  },

  validateAndSaveApp:(values, activeApp) => {

    let activeAppObj = Object.assign({},activeApp.app.appDetail);

    let token =sessionStorage.getItem('jwtToken');
    let appData ={activeApp: activeAppObj, appContentJSON : values.original_data}
    console.log('[Template edit form] create apps props',activeAppObj);

    return dispatch(createApp(appData,token))
    .then(result => {
      // Note: Error's "data" is in result.payload.response.data (inside "response")
      // success's "data" is in result.payload.data
      if (result.payload.response && result.payload.response.status !== 200) {
        dispatch(createAppFailure(result.payload.response.data));
        throw new SubmissionError(result.payload.response.data);
      }
      console.log("--App saved CB--",result);
     activeApp.app.appDetail =result.payload.data.appDetail;
      //let other components know that everything is fine by updating the redux` state

      dispatch(createAppSuccess(activeApp.app)); //ps: this is same as dispatching RESET_USER_FIELDS
    });
  },

  tempAppUpdate:(pathInStr, value, activeApp, callback)=>{

    updateActiveApp(pathInStr,value, activeApp,callback);

  },

  changeConsole: (consoleName) =>{
    return dispatch(changeSelectedConsole(consoleName));
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

  moveToLiveFolder:(app,player) =>{
    console.log('--[template container]-- moveTo Live folder',app);
    if(!app) return dispatch(fetchAppFailure({message: 'App selection fails.'}));
    if(app.status=="DRAFT"){
      var fd = new FormData();
      fd.append('appFolder', app.appLocation);
      fd.append('appId', app._id);
    return  dispatch(moveToLive(fd,token)).then((response) => {
      if (response.error) {
        dispatch(fetchAppFailure(response.payload.data));
    }

        dispatch(fetchAppSuccess(response.payload.data));

      });
    }
    return  dispatch(fetchAppSuccess(app));

  },

  updatePlayerApp(app,player){
    if(!app) return;
    var player =player? player:{};
    player.appId = app._id;
    player.thumbnailPath = app.thumbnailPath;
    player.orientation =app.orientation;
    player.thumb =app.thumb.replace('app-thumbnail','/thumb');
    return dispatch(createPlayerSuccess(player));
  }


}
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTemplateNew);
