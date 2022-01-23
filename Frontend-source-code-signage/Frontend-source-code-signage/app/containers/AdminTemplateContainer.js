import { connect } from 'react-redux'
import { fetchApps, fetchAppsSuccess, fetchAppsFailure, fetchAppSuccess, fetchAppFailure, resetActiveApp, moveToLive,deleteApp,deleteAppFailure,deleteAppSuccess,makeDuplicateApp,updateApp} from '../actions/apps';
import AdminTemplatesList from '../components/AdminTemplatesList';
import { showModal, hideModal, updateKey } from '../actions/popup';
import {fetchPlayer,updatePlayer, fetchPlayerFailure, createPlayerSuccess, fetchPlayerSuccess,createPlayerFailure,updatePlayers,replaceMedia } from '../actions/posts';
import { changeSelectedConsole, changeSelectedApp } from '../actions/popup';
import { toast } from 'react-toastify';

const mapStateToProps = (state,ownProps) => {
  console.log("[app edit form]", state);
  return {
    appsList: ownProps.appsList,
    user: ownProps.user,
    common: ownProps.common,
    publishToSreens: ownProps.publishToSreens,
    playersList : ownProps.playersList,
    toggleRootModal : ownProps.toggleRootModal,
    closeModalPopup: ownProps.closeModalPopup,
    selectedPlayer: ownProps.selectedPlayer,
    onSelect: ownProps.onSelect,
    rootModal: ownProps.rootModal,
    usersList: ownProps.usersList
  };
}

const mapDispatchToProps = (dispatch) => {
  
  return {
    resetMe: () => {
      dispatch(resetActiveApp());
    },

    fetchApps: (userId) => {
      let token = sessionStorage.getItem('jwtToken');
    return  dispatch(fetchApps(token,userId)).then((response) => {
        !response.error ? dispatch(fetchAppsSuccess(response.payload.data)) : dispatch(fetchAppsFailure(response.payload.data));
      });
    },

    updateAppProperty: (appId,appObj) =>{

      let token = sessionStorage.getItem('jwtToken');
    return
        dispatch(updateApp(token,appId,appObj)).then((response) => {
        dispatch(fetchApps(token,userId)).then((response) => {
        !response.error ? dispatch(fetchAppsSuccess(response.payload.data)) : dispatch(fetchAppsFailure(response.payload.data));
      });
      });

    },

    moveToLiveFolder:(app,publishFun, players) =>{
      let token = sessionStorage.getItem('jwtToken');
      console.log('--[template container]-- moveTo Live folder',app);
      if(!app) 
        {return dispatch(fetchAppFailure({message: 'App selection fails.'}));
      }else{
        var fd = new FormData();
        fd.append('appFolder', app.appLocation);
        fd.append('appId', app._id);
        fd.append('isTemplate', app.isTemplate);
      return  dispatch(moveToLive(fd,token)).then((response) => {
          if(!response.error) { 
          dispatch(fetchAppSuccess(response.payload.data));
          publishFun(players);
          }
           else{ 
          dispatch(fetchAppFailure(response.payload.data));
          }
        });
      
      }
    },

    updatePlayerApp(app,player){
      let token = sessionStorage.getItem('jwtToken');
      if(!app || !player) return;
      player.appId = app._id;
      player.thumbnailPath = app.thumbnailPath;
      player.orientation =app.orientation;
      player.thumb =app.thumb;
      player.status= "PENDING";
      return(player._id?dispatch(updatePlayer(player, sessionStorage.getItem('jwtToken'))).then(result => {
        // Note: Error's "data" is in result.payload.response.data (inside "response")
        // success's "data" is in result.payload.data
       if(player._id){ 
        if (result.payload.response && result.payload.response.status !== 200) {
          dispatch(createPlayerFailure(result.payload.response.data));
          throw new SubmissionError(result.payload.response.data);
        }
        dispatch(createPlayerSuccess(player));
        //let other components know that everything is fine by updating the redux` state
        // dispatch(fetchPlayer(player._id,sessionStorage.getItem('jwtToken'))).then((response) => {
        //   !response.error ? dispatch(fetchPlayerSuccess(response.payload.data)) : dispatch(fetchPlayerFailure(response.payload.data));
        // }); //ps: this is same as dispatching RESET_USER_FIELDS
      }
      }):dispatch(createPlayerSuccess(player)));
    },

    removingApp(app){
      let token = sessionStorage.getItem('jwtToken');
      if(!app) return;

      return dispatch(deleteApp(token,app._id)).then((response) => {
        !response.error ? dispatch(deleteAppSuccess(response.payload.data)) : dispatch(deleteAppFailure(response.payload.data));
      });
    },

    updateModal: (param) =>{
      let token = sessionStorage.getItem('jwtToken');
      return param && param.isModalOpen? dispatch(showModal(param)): dispatch(hideModal());
    },

    replaceMediaFiles: (mediaPaths) =>{

      let token = sessionStorage.getItem('jwtToken');
      return dispatch(replaceMedia(token, mediaPaths)).then((response) => {
        if(!response.error){
          toast.success('REPLACED SUCCESSFULLY!!');
        }else{
          toast.error('REPLACED FAILED!!');
        }
      });
    },
    

    changeConsole: (consoleName,backConsole) =>{

      return dispatch(changeSelectedConsole(consoleName,backConsole));
    },

    setSelectedAppId: (appId) =>{
      return dispatch(changeSelectedApp(appId));
    },
    assignAppToPlayers:(playersToUpdate) => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(updatePlayers(token, playersToUpdate))
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
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminTemplatesList);
