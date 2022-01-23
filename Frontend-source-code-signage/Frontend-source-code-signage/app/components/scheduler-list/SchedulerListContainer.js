import SchedulerView from './SchedulerView.js';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
  

  }
}


function mapStateToProps(state, ownProps) {
 
  
  return {
    	SchedulerData: ownProps.SchedulerData,
        ViewTypes: ownProps.ViewTypes,
        DemoData: ownProps.DemoData,
        DATE_FORMAT: ownProps.DATE_FORMAT,
        showNewScheduleEvent: ownProps.showNewScheduleEvent
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SchedulerView);
