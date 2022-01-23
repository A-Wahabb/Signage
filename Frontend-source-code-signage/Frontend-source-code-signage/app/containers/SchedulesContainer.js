import Schedules from '../components/Schedules.js';
import { connect } from 'react-redux';
import { changeSelectedConsole, changeSelectedPlayer,changeSelectedApp, changeListDisplayType} from '../actions/popup';
import { toast } from 'react-toastify';
import { fetchSchedules, fetchSchedulesSuccess, fetchSchedulesFailure, deleteSchedules} from '../actions/schedules';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      //dispatch(resetNewPlayer());
    },

    validateAndSavePlayer:(values,props)=>{
      
    },

    updateNewPlayer:(name,value,player)=> {
    
      
    },

    deleteSchedules(selectedSchedules){
      console.log('selected to delete', selectedSchedules);
      let deleteSchulesIdStrs = selectedSchedules.join('~');
      
      let token = sessionStorage.getItem('jwtToken');
      return  dispatch(deleteSchedules(token,deleteSchulesIdStrs)).then((response) => {
        if(!response.error){
          toast.success('DELETED!!');
          dispatch(fetchSchedules(token)).then((response) => {
        !response.error ? dispatch(fetchSchedulesSuccess(response.payload.data)) : dispatch(fetchSchedulesFailure(response.payload.data));
      });
        }else{
          toast.error("DELETE FAILED!!");
        } 
      });
   
    },

    changeConsole: (consoleName,backConsole) => {
      return dispatch(changeSelectedConsole(consoleName,backConsole));
    },

    setSelectedAppId: (appId) => {
      return dispatch(changeSelectedApp(appId));
    },

     setSelectPlayerId: (playerId) => {
      return dispatch(changeSelectedPlayer(playerId));
    },

}
}


function mapStateToProps(state, ownProps) {
  return {
      user:ownProps.user,
      common: ownProps.common,
      toggleRootModal: ownProps.toggleRootModal,
      publishToSreens: ownProps.publishToSreens,
      schedules : ownProps.schedules,
      playlists : ownProps.playlists.allPlaylist?ownProps.playlists.allPlaylist.lists:ownProps.playlists,
      appsList: ownProps.appsList.apps,
      closeModalPopup: ownProps.closeModalPopup,
      selectedPlayer: ownProps.selectedPlayer
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedules);
