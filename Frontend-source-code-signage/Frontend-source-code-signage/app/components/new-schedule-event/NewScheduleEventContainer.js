import NewScheduleEvent from './NewScheduleEvent.js';
import {createScheduleContent, createScheduleContentSuccess, createScheduleContentFailure, fetchScheduleContent, fetchScheduleContentSuccess, fetchScheduleContentFailure,fetchSchedules, fetchSchedulesSuccess, fetchSchedulesFailure,updateScheduleContent,updateScheduleContentSuccess,updateScheduleContentFailure} from '../../actions/schedules';
import { connect } from 'react-redux';
import { changeSelectedConsole, changeSelectedPlayer,changeSelectedApp, changeListDisplayType} from '../../actions/popup';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      //dispatch(resetNewPlayer());
    },

    saveScheduleContent:(scheduleContentObj)=>{
      
      let token = sessionStorage.getItem('jwtToken');
      return dispatch(createScheduleContent(token,scheduleContentObj))
      .then(result => {
        // Note: Error's "data" is in result.payload.response.data (inside "response")
        // success's "data" is in result.payload.data
        if (result.payload.response && result.payload.response.status !== 200) {
          toast.error("ERROR, NEW SCHEDULE CONTENT SAVING FAILED!");
          dispatch(createScheduleContentFailure(result.payload.response.data));

        }else{
        //let other components know that everything is fine by updating the redux` state
        toast.success("NEW SCHEDULE CONTENT ADDED!!");
        dispatch(createScheduleContentSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS

        dispatch(fetchSchedules(token)).then((response) => {
            !response.error ? dispatch(fetchSchedulesSuccess(response.payload.data)) : dispatch(fetchSchedulesFailure(response.payload.data));
          });
        }
      });
    },

    updateScheduleContent:(scheduleContentObj)=>{
      
      let token = sessionStorage.getItem('jwtToken');
      return dispatch(updateScheduleContent(token,scheduleContentObj))
      .then(result => {
        // Note: Error's "data" is in result.payload.response.data (inside "response")
        // success's "data" is in result.payload.data
        if (result.payload.response && result.payload.response.status !== 200) {
          toast.error("ERROR, SCHEDULE CONTENT UPDATE FAILED!");
          dispatch(updateScheduleContentFailure(result.payload.response.data));

        }else{
        //let other components know that everything is fine by updating the redux` state
        toast.success("UPDATE SCHEDULE CONTENT SUCCESS!!");
        dispatch(updateScheduleContentSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS

        dispatch(fetchSchedules(token)).then((response) => {
            !response.error ? dispatch(fetchSchedulesSuccess(response.payload.data)) : dispatch(fetchSchedulesFailure(response.payload.data));
          });
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
    closeModalPopup: ownProps.closeModalPopup,
    showNewScheduleEvent: ownProps.showNewScheduleEvent
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewScheduleEvent);
