import { connect } from 'react-redux';
import { fetchUsers, fetchUsersSuccess, fetchUsersFailure, editingUser, editingUserSuccess, editingUserFailure,deleteUser, updateSettings,statusChangeUser } from '../actions/users';

import {updateIamSettings, updateIamSettingsSuccess,fetchIMSettings, fetchIMSettingsSuccess} from '../actions/iamuser';

import IamUserList from '../components/IamUserList';
import { changeSelectedConsole} from '../actions/popup';
import { toast } from 'react-toastify';

const mapStateToProps = (state,ownProps) => {
  return {
    posts: ownProps.posts,
    common: ownProps.common,
    user : ownProps.user,
    closeModalPopup: ownProps.closeModalPopup
  };
}

const mapDispatchToProps = (dispatch) => {
  return {

     updateIamUser:(imuserobj)=>{
     console.log('----i m user obj--', imuserobj);
      let imObj=imuserobj;
      let token = sessionStorage.getItem('jwtToken');
      return dispatch(editingUser(imObj,token))
      .then(result => {
        
        if (result.payload.response && result.payload.response.status !== 200) {
          toast.error("ERROR, NEW I'M USER ADDING FAILED!");
          //dispatch(editingUserFailure(result.payload.response.data));

        }else{
        toast.success("I'M USER REMOVED SUCCESSFULLY!!");
        let iamuser = {};
        iamuser.userId= newImuserobj._id;
        iamuser.iAmUsername=newImuserobj.iamUserName;
    //     iamuser.isNewScreenAllowed=false;
    //   iamuser.isUpdateScreenAllowed= false;
    // iamuser.isDeleteScreenAllowed= false;
    // iamuser.isNewTemplateAllowed=false;
    // iamuser.isNewPlaylistAllowed:false,
    // iamuser.isEditPlaylistAllowed:false,
    // iamuser.isNewScheduleAllowed:false,
    // iamuser.isEditScheduleAllowed:false,
    // iamuser.isLibraryAllowed:false,
    // iamuser.isUploadLibraryAllowed: false,
    // iamuser.isDeleteLibraryAllowed:false,
    // iamuser.isReportsAllowed:false
        //dispatch(addIamSettings(token,iamuser)); //ps: this is same as dispatching RESET_USER_FIELDS

        if(imObj.isDeleting){
        dispatch(deleteIM(token,imId)).then((result1) => {
            !result1.error ? dispatch(fetchIMSettings(token,imObj._id)).then((result2) => {
              if(!result2.error){
                console.log('seting data---',result2.payload.data);
                dispatch(fetchIMSettingsSuccess(result2.payload.data));
              }
              
            }) : console.error('Error while saving settings');
          });
        }

        }
      });
    },
    updateIamSettings:(imObj)=>{
       let token = sessionStorage.getItem('jwtToken');
        return dispatch(updateIamSettings(token,imObj)).then((result1) => {
            !result1.error ? dispatch(fetchIMSettings(token,imObj._id)).then((result2) => {
              if(!result2.error){
                console.log('seting data---',result2.payload.data);
                dispatch(fetchIMSettingsSuccess([result2.payload.data]));
              }
              
            }) : console.error('Error while saving settings');
          });
    },
    
    changeConsole: (consoleName) => {
      console.log("--CHANGE CONSOLE--", consoleName);
      return dispatch(changeSelectedConsole(consoleName));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IamUserList);
