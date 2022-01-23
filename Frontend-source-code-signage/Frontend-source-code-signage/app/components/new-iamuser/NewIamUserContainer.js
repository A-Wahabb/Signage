import NewIamUser from './NewIamUser.js';
import {editingUser, editingUserSuccess,editingUserFailure,} from '../../actions/users';
import {addIamSettings, addIamSettingsSuccess,updateIamSettings, updateIamSettingsSuccess,fetchIMSettings, fetchIMSettingsSuccess} from '../../actions/iamuser';
import { connect } from 'react-redux';
import { changeSelectedConsole, changeSelectedPlayer,changeSelectedApp, changeListDisplayType} from '../../actions/popup';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      //dispatch(resetNewSchedule());
    },

    saveIamUser:(newImuserobj)=>{
     console.log('----new user obj--', newImuserobj);
      let newObj=newImuserobj;
      let token = sessionStorage.getItem('jwtToken');
      return dispatch(editingUser(newObj,token))
      .then(result => {
        
        if (result.payload.response && result.payload.response.status !== 200) {
          toast.error("ERROR, NEW I'M USER ADDING FAILED!");
          //dispatch(editingUserFailure(result.payload.response.data));

        }else{
        toast.success("NEW I'M USER ADDED!!");
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

        dispatch(addIamSettings(token,iamuser)).then((result1) => {
            !result1.error ? dispatch(fetchIMSettings(token,result1.payload.data._id)).then((result2) => {
              if(!result2.error){
                console.log('seting data---',result2.payload.data);
                dispatch(fetchIMSettingsSuccess([result2.payload.data]));
              }
              
            }) : console.error('Error while saving settings');
          });
        }
      });
    },

    updateNewPlayer:(name,value,player)=> {
    
      player =player==null?{}:player;
      player[name]=value;
      console.log('new palyer',player);
      dispatch(createPlayerSuccess(player));
    },

    changeConsole: (consoleName,backConsole) => {
      return dispatch(changeSelectedConsole(consoleName,backConsole));
    },

    setSelectedAppId: (appId) => {
      return dispatch(changeSelectedApp(appId));
    },

     setSelectPlayerId: (playerId) => {
      return dispatch(changeSelectedPlayer(playerId));
    }

}
}


function mapStateToProps(state, ownProps) {
  return {
    closeModalPopup: ownProps.closeModalPopup,
    user: ownProps.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewIamUser);
