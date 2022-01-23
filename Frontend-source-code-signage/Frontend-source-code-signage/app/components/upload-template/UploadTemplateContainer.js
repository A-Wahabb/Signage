import UploadTemplate from './UploadTemplate.js';
import { connect } from 'react-redux';
import { changeSelectedConsole, changeSelectedPlayer,changeSelectedApp, changeListDisplayType} from '../../actions/popup';
import { toast } from 'react-toastify';
import { updateApp,fetchApps, fetchAppsSuccess,fetchAppsFailure} from '../../actions/apps';

const mapDispatchToProps = (dispatch) => {
  return {
    resetMe: () => {
      // dispatch(resetNewSchedule());
    },

    changeConsole: (consoleName,backConsole) => {
      return dispatch(changeSelectedConsole(consoleName,backConsole));
    },

    updateApp:(id,appObj) =>{
    let token =sessionStorage.getItem('jwtToken');
    return dispatch(updateApp(token,id,appObj))
    .then(result => {
      if (result.payload.response && result.payload.response.status !== 200) {
        toast.success("UPDATED FAILED!");
      }else{
        toast.success("UPDATED SUCCESSFULLY!");
      
      dispatch(fetchApps(token)).then((response) => {
        !response.error ? dispatch(fetchAppsSuccess(response.payload.data)) : dispatch(fetchAppsFailure(response.payload.data));
      });
    }
    })
    }
}

}


function mapStateToProps(state, ownProps) {
  return {
    user: ownProps.user,
    closeModalPopup: ownProps.closeModalPopup,
    settings: ownProps.settings,
    template: ownProps.template
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadTemplate);
