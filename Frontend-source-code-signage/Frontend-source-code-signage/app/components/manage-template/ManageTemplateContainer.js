import ManageTemplate from './ManageTemplate';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import {  updateSettings } from '../../actions/users';

const mapDispatchToProps = (dispatch) => {
  return {
    
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

function mapStateToProps(state, ownProps) {
  return {
    user: ownProps.user,
    userApps : ownProps.userApps,
    rootModal : ownProps.rootModal

  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageTemplate);
