import React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { logoutUser} from '../actions/users';
import Header from '../components/header.js';
import { changeParentConsole, changeSelectedConsole} from '../actions/popup';

function mapStateToProps(state, ownProps) {
  console.log('[header state to props]',ownProps);
  
  return {
    user: state.user,
    authenticated : ownProps.authenticated,
    searchText: ownProps.searchText,
    isLeftMenuActive: ownProps.isLeftMenuActive,
    type : ownProps.type,
    toggleLeftMenuActive: ownProps.toggleLeftMenuActive
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	 
     resetMe: () =>{
      dispatch(resetNewPlayer());
      dispatch(resetActivePlayer());
     },

     logout: () => {
         sessionStorage.removeItem('jwtToken');
         localStorage.removeItem('temptkn');
         localStorage.removeItem('temptknsv');
         
         dispatch(logoutUser());
           
         dispatch(changeParentConsole('SIGN_IN'));
     },
    changeConsole: (consoleName) => {
      return dispatch(changeSelectedConsole(consoleName));
    },
    setSearchText: (searchText) => {
      return dispatch(updateSearchText(searchText));
    }
   
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
