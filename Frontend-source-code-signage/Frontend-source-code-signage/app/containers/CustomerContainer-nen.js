import { connect } from 'react-redux'
import CustomerNen from '../components/Customer-nen';
//import CustomerAv from '../components/Customer-av';
import { showModal, hideModal, updateKey } from '../actions/popup';
//import {fetchLocs,fetchLocsFailure, fetchLocsSuccess} from '../actions/customer-av';
import {fetchLocas,fetchLocsFailure, fetchLocsSuccess,selectedLocSuccess} from '../actions/customer-nen';

import { changeSelectedConsole, changeSelectedApp } from '../actions/popup';

const mapStateToProps = (state) => {
  console.log("[Custom APP]", state);
  return {
    locs: state.locs,
    user: state.user,
    selectedLoc: state.locs.selectedLoc,
    activePlayer: state.posts.activePlayer
  };
}

const mapDispatchToProps = (dispatch) => {
  let token = sessionStorage.getItem('jwtToken');
  return {
    resetMe: () => {
      console.log('reset');
    },

    fetchLocs: (cred,pass) => {
    return  dispatch(fetchLocas(cred)).then((response) => {
        !response.error ? dispatch(fetchLocsSuccess(response.payload.data)) : dispatch(fetchLocsFailure(response.payload.data));
      });
    },
    setSelectedLocs: (loc) => {
    return  dispatch(selectedLocSuccess(loc));
    },
    
    updateModal: (param) =>{
      return param && param.isModalOpen? dispatch(showModal(param)): dispatch(hideModal());
    },

    changeConsole: (consoleName) =>{
      return dispatch(changeSelectedConsole(consoleName));
    },

    setSelectedAppId: (appId) =>{
      return dispatch(changeSelectedApp(appId));
    },


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerNen);
