import NewSchedule from './NewSchedule.js';
import {createSchedule,  createScheduleSuccess, createScheduleFailure, resetNewSchedule, fetchSchedules, fetchSchedulesSuccess, fetchSchedulesFailure} from '../../actions/schedules';
import { connect } from 'react-redux';
import { changeSelectedConsole, changeSelectedPlayer,changeSelectedApp, changeListDisplayType} from '../../actions/popup';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      dispatch(resetNewSchedule());
    },

    saveSchedule:(values)=>{
      if(!values.scheduleName || !values.scheduleName.trim()){
      return dispatch(createScheduleFailure({message: 'Please provide schedule name.'}));
      }

      values.scheduleName = values.scheduleName;
      values.status="DRAFT";
      let newObj=values;
      let token = sessionStorage.getItem('jwtToken');
      return dispatch(createSchedule(token,newObj))
      .then(result => {
        
        if (result.payload.response && result.payload.response.status !== 200) {
          toast.error("ERROR, NEW SCHEDULE ADDING FAILED!");
          dispatch(createScheduleFailure(result.payload.response.data));

        }else{
        toast.success("NEW SCHEDULE ADDED!!");
        dispatch(createScheduleSuccess(result.payload.data)); //ps: this is same as dispatching RESET_USER_FIELDS

        dispatch(fetchSchedules(token)).then((response) => {
            !response.error ? dispatch(fetchSchedulesSuccess(response.payload.data)) : dispatch(fetchSchedulesFailure(response.payload.data));
          });
        }
      });
    },

    updateNewPlayer:(name,value,player)=> {
    
      player =player==null?{}:player;
      player[name]=value;
      console.log('new palyer',player);
      dispatch(createPlayerSuccess(player));
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
    newSchedule: state.schedules.newSchedule
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSchedule);
