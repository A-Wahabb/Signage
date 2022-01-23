import ScreenExtraDetails from './screen-extra-details.js';
import { connect } from 'react-redux';
import {fetchGroupsSuccess,fetchGroupsFailure,fetchGroups,
saveGroup, saveGroupSuccess, saveGroupFailure, updatePlayerExtra ,fetchPlayer} from '../../actions/posts';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: (player) => {
      player.geo = null;
      //dispatch(fetchPlayerSuccess(player));
    },

    requestGroups:()=>{
      let token = sessionStorage.getItem('jwtToken');
      return dispatch(fetchGroups(token)).then(result => {
        
        if (result.payload.response && result.payload.response.status !== 200) {
             toast.error("ERROR, Fetching player groups!");
              dispatch(fetchGroupsFailure(result.payload.data));
        }else{
           //player['geo'] = result.payload.data;
           console.log('---groups fuond', result.payload);
           dispatch(fetchGroupsSuccess(result.payload.data));
        }

    });

    },

    creatGroup:(groupName)=>{
      let token = sessionStorage.getItem('jwtToken');
      let grpBdy = {groupName:groupName};
      return dispatch(saveGroup(token,grpBdy)).then(result => {
        
        if (result.payload.response && result.payload.response.status !== 200) {
             toast.error("ERROR, Fetching player groups!");
              dispatch(fetchGroupsFailure(result.payload.data));
        }else{
           //player['geo'] = result.payload.data;
           toast.success("NEW GROUP ADDED");
           dispatch(fetchGroupsSuccess(result.payload.data));
        }

    });

    },

     updatePlayer:(playerExtra, playerId)=>{
      let token = sessionStorage.getItem('jwtToken');
   
      return dispatch(updatePlayerExtra(token,playerExtra,playerId)).then(result => {
        
        if (result.payload.response && result.payload.response.status !== 200) {
             toast.error("ERROR, updating details!");
             // dispatch(fetchGroupFailure(result.payload.data));
        }else{
           //player['geo'] = result.payload.data;
           toast.success("PLAYER UPDATED SUCCESSFULLY");
           dispatch(fetchPlayer(result.payload.data._id, token));
        }

    });

    }

}
}


function mapStateToProps(state, ownProps) {
  console.log('--- group s props', state);
  return {
    player: ownProps.player,
    groups: state.posts.playerGroups.groups
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ScreenExtraDetails);
