import { connect } from 'react-redux'
import Gallery from '../components/Gallery';
import { changeSelectedConsole } from '../actions/popup';
import { toast } from 'react-toastify';
import { fetchUserMedia,fetchUserMediaSuccess,fetchUserMediaFailure,deleteMedia,saveLibFolder,fetchFoldersSuccess,fetchFoldersFailure,fetchFolders, deleteFolder,processVideo } from '../actions/users.js';

const mapStateToProps = (state, ownProps) => {

  return {
    user: state.user,
    common: ownProps.common,
    selectView : ownProps.selectView,
    selectMedia : ownProps.selectMedia,
    galleryType : ownProps.galleryType,
    rootModal : ownProps.rootModal,
    toggleRootModal : ownProps.toggleRootModal
  };
}

const mapDispatchToProps = (dispatch) => {
  let token = sessionStorage.getItem('jwtToken');
  return {
    resetMe: () => {
     // dispatch(resetActiveApp());
    },

    getAllUserMedia: () =>{
     return dispatch(fetchUserMedia(token)).then((response) => {
                !response.error ? dispatch(fetchUserMediaSuccess(response.payload.data)) : dispatch(fetchUserMediaFailure(response.payload.data));
              });
    },

    getFolders: () =>{
     return dispatch(fetchFolders(token)).then((response) => {
                console.log(response);
                !response.error ? dispatch(fetchFoldersSuccess(response.payload.data)) : dispatch(fetchFoldersFailure(response.payload.data));
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
    saveFolder:(folderName)=>{
      let token =sessionStorage.getItem('jwtToken');
  
      return dispatch(saveLibFolder(folderName,token)).then((response) => {
                if(!response.error){
                  toast.success("FOLDER SAVED!!");
                  console.log('folders',response.payload);
                  dispatch(fetchFoldersSuccess(response.payload.data));
                } 
                else{ 
                  dispatch(fetchFoldersFailure(response.payload.data));
                  toast.error("FOLDER SAVING FAILED!!");
                }
              });;
    },
    deleteMedia:(fileName) => {
      let token =sessionStorage.getItem('jwtToken');
  
      return dispatch(deleteMedia(fileName,token)).then((response) => {
                if(!response.error){
                  toast.success("DELETED SUCCESSFULLY!!");
                  dispatch(fetchUserMedia(token)).then((response) => {
                !response.error ? dispatch(fetchUserMediaSuccess(response.payload.data)) : dispatch(fetchUserMediaFailure(response.payload.data));
              });
                } 
                else{ 
                  toast.error("DELETED FAILED!!");
                };
              });;
     },

     deleteFolder: (folderId, isMoveMediaToCommon) =>{
        let token =sessionStorage.getItem('jwtToken');
  
      return dispatch(deleteFolder(token,folderId,isMoveMediaToCommon)).then((response) => {
                if(!response.error){
                  toast.success("DELETED SUCCESSFULLY!!");
                  dispatch(fetchFoldersSuccess(response.payload.data));
                  dispatch(fetchUserMedia(token)).then((response) => {
                !response.error ? dispatch(fetchUserMediaSuccess(response.payload.data)) : dispatch(fetchUserMediaFailure(response.payload.data));
              });
                } 
                else{ 
                  toast.error("DELETED FAILED!!");
                };
              });

     }
     ,
     processVideo:(mediaId) => {
        let token =sessionStorage.getItem('jwtToken');
        return dispatch(processVideo(token,mediaId)).then((response) => {
                if(!response.error){
                  toast.success("PROCESSED SUCCESSFULLY!!");
                  dispatch(fetchUserMedia(token)).then((response) => {
                !response.error ? dispatch(fetchUserMediaSuccess(response.payload.data)) : dispatch(fetchUserMediaFailure(response.payload.data));
              });
                } 
                else{ 
                  toast.error("PROCESSING FAILED!!");
                };
              });
     }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
