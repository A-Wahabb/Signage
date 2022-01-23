import PlayerUpdate from '../components/PlayerUpdate.js';
import { updatePlayer, createPlayerSuccess, createPlayerFailure, resetNewPlayer,resetActivePlayer } from '../actions/posts';

import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetActivePlayer());
      dispatch(resetNewPlayer());
    },

    validateAndSavePlayer:(values,props)=>{
      console.log("[player form container] Update player", values);
      if(!values.playerName || values.playerName.trim() === ''){
        return  dispatch(createPlayerFailure({message: 'Please provide player name.'}));
      }

      values.appId = values.appId?values.appId:"";
      values.screenNumber=values.screenNumber;
      values.orientation=values.orientation?values.orientation:"landscape";;
      values.thumbnailPath=values.thumb?values.thumb:"KEEP_OLD";
      values.status="PENDING";
      values._id=props.activePlayer.player._id;
      let playerObj=values;
      return dispatch(updatePlayer(playerObj, sessionStorage.getItem('jwtToken')))
      .then(result => {
        // Note: Error's "data" is in result.payload.response.data (inside "response")
        // success's "data" is in result.payload.data
        if (result.payload.response && result.payload.response.status !== 200) {
          dispatch(createPlayerFailure(result.payload.response.data));
          throw new SubmissionError(result.payload.response.data);
        }
        //let other components know that everything is fine by updating the redux` state
        dispatch(createPlayerSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS
      });
    },

    updateNewPlayer:(name,value,player)=>{
      console.log("[new player container] update new player on blur");
      player =player==null?{}:player;
      player.status="IN_PROGRESS";
      player[name]=value;
      dispatch(createPlayerSuccess(player));
    }


  }
}


function mapStateToProps(state, ownProps) {
  console.log('--player form state--',state);
  console.log('--player props--',ownProps);

  return {
    activePlayer: state.posts.activePlayer,
    newPlayer: state.posts.newPlayer,
    initialValues:state.posts.activePlayer && state.posts.activePlayer.player
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerUpdate);
