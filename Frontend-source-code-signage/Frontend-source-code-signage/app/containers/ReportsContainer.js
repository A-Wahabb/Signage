import { connect } from 'react-redux'
import Reports from '../components/Reports';
import { showModal, hideModal, updateKey } from '../actions/popup';
import { changeSelectedConsole, changeSelectedApp } from '../actions/popup';
import { toast } from 'react-toastify';

const mapStateToProps = (state, ownProps) => {
  
  return {
    user: ownProps.user,
    posts: ownProps.posts,
    common: ownProps.common
  };
}

const mapDispatchToProps = (dispatch) => {
  let token = sessionStorage.getItem('jwtToken');
  return {
    resetMe: () => {
     // dispatch(resetActiveApp());
    },
    updateModal: (param) =>{
      return param && param.isModalOpen? dispatch(showModal(param)): dispatch(hideModal());
    },

    changeConsole: (consoleName,backConsole) =>{
      return dispatch(changeSelectedConsole(consoleName,backConsole));
    },
    setSelectedAppId: (appId) =>{
      return dispatch(changeSelectedApp(appId));
    }


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
