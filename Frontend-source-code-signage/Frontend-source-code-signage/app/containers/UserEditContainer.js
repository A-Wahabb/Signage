import UserEdit from '../components/UserEdit.js';
import { resetValidateUserFields } from '../actions/validateUserFields';
import { connect } from 'react-redux';
import { changeSelectedConsole} from '../actions/popup';
import { editingUserSuccess, fetchUsers, fetchUsersSuccess, fetchUsersFailure} from '../actions/users';

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
    changeConsole: (consoleName) =>{
      return dispatch(changeSelectedConsole(consoleName));
    }
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    editingUser: state.user.editingUser,
    validateFields: state.validateFields,
    initialValues: state.user.editingUser && state.user.editingUser.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit);