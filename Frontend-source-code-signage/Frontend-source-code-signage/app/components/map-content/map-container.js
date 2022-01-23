import Map from './map.js';
import { connect } from 'react-redux';
import {fetchGeoSuccess,fetchGeoFailure,fetchLatLon } from '../../actions/posts';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: (player) => {
      player.geo = null;
      //dispatch(fetchPlayerSuccess(player));
    },

    requestLatLonByIP:(ip,player)=>{
      let token = sessionStorage.getItem('jwtToken');
      return dispatch(fetchLatLon(token, ip)).then(result => {
        
        if (result.payload.response && result.payload.response.status !== 200) {
             toast.error("ERROR, Fetching player location!");
              dispatch(fetchGeoFailure(result.payload.data));
        }else{
           //player['geo'] = result.payload.data;
           dispatch(fetchGeoSuccess(result.payload.data));
        }

    });

    }

}
}


function mapStateToProps(state, ownProps) {
 console.log('map props',ownProps);
  return {
    player: ownProps.player,
    geo: state.posts.playerGeo.loc
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);
