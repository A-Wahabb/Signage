import UserNewPassword from '../components/UserNewPassword';
import { resetValidateUserFields } from '../actions/validateUserFields';
import { connect } from 'react-redux';
import { changeSelectedConsole,changeParentConsole} from '../actions/popup';
import {editingUserSuccess, fetchUsers, fetchUsersSuccess, fetchUsersFailure } from '../actions/users';


const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetValidateUserFields());
      dispatch(editingUserSuccess(null));
    },
    fetchUsers: () => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchUsers(token)).then((response) => {
            !response.error ? dispatch(fetchUsersSuccess(response.payload.data)) : dispatch(fetchUsersFailure(response.payload.data));
          });
    },
    userNewPassword: (userToEdit) =>{
      console.log("--Editing User--", userToEdit);
      return dispatch(editingUserSuccess(userToEdit));
    },
    changeConsole: (consoleName) =>{
      console.log("--CHANGE CONSOLE--", consoleName);
      return dispatch(changeSelectedConsole(consoleName));
    },
    changeParentConsole: (consoleName) =>{
      console.log("--CHANGE PARENT CONSOLE--", consoleName);
      return dispatch(changeParentConsole(consoleName));
    }

  }
}

function mapStateToProps(state,ownProps) {
  return {
    user: state.user,
    common: ownProps.common,
    editingUser: state.user.editingUser,
    validateFields: state.validateFields,
    initialValues: state.user.editingUser && state.user.editingUser.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserNewPassword);