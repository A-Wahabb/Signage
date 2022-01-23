import Log from './log.js';
import { connect } from 'react-redux';
import {fetchLogs, fetchLogsSuccess,fetchLogsFailure } from '../../actions/posts';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: (player) => {
    },

    fetchScreenLogs: (screenNumber) => {
      console.log('player log screen num',screenNumber);
      let token = sessionStorage.getItem('jwtToken');
      dispatch(fetchLogs(screenNumber,token)).then((response) => {
        console.log('PLAYER Log'+ response);
        !response.error ? dispatch(fetchLogsSuccess(response.payload.data)) : dispatch(fetchLogsFailure(response.payload.data));
      });
    }

}
}


function mapStateToProps(state, ownProps) {
 console.log('map props',ownProps);
  return {
    player: ownProps.player,
    themeColor: ownProps.themeColor,
    playerLog: state.posts.playerLog
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Log);
