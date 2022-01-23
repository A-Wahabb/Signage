import { connect } from 'react-redux';
import { fetchUsers, fetchUsersSuccess, fetchUsersFailure, editingUser, editingUserSuccess, editingUserFailure,deleteUser, updateSettings,statusChangeUser } from '../actions/users';

import UserList from '../components/UserList';
import { changeSelectedConsole} from '../actions/popup';
import { toast } from 'react-toastify';

const mapStateToProps = (state,ownProps) => {
  return {
    usersList: ownProps.usersList,
    playersList: ownProps.playersList,
    appsList: ownProps.appsList,
    editingUser: state.user.editingUser,
    selectedConsole: state.popup.selectedConsole,
    rootModal: ownProps.rootModal,
    user : ownProps.user,
    allSubscriptions: ownProps.allSubscriptions
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
    requestUserStatusUpdate: (userId, status) => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(statusChangeUser(token,userId,status)).then((response) => {
            if(!response.error) {
              dispatch(fetchUsers(token)).then((response) => {
            !response.error ? dispatch(fetchUsersSuccess(response.payload.data)) : dispatch(fetchUsersFailure(response.payload.data));
          });
               toast.success("USER STATUS CHANGED TO "+status+"!!");
            }else{
               toast.error("ERROR, While Status update!");
            }
          });
    },
    setEditingUser: (userToEdit) => {
     return dispatch(editingUserSuccess(userToEdit));
    },
    changeConsole: (consoleName) => {
      console.log("--CHANGE CONSOLE--", consoleName);
      return dispatch(changeSelectedConsole(consoleName));
    },

    updateSettings:(updateData) => {
        let token = sessionStorage.getItem('jwtToken');
        return dispatch(updateSettings(token, updateData)).then((response) => {
            if(!response.error) 
            {
               toast.success('UPDATED SUCCESSFULLY');
                dispatch(fetchUsers(token)).then((response) => {
                !response.error ? dispatch(fetchUsersSuccess(response.payload.data)) : dispatch(fetchUsersFailure(response.payload.data));
                });
      
            } else{ 
              toast.error('UPDATE FAILED') ;
          }
          });
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
