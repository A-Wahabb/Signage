import ContentSelection from './ContentSelection.js';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
    
	}
}

function mapStateToProps(state, ownProps) {
  return {
    setContentType: ownProps.setContentType,
    selectedPlayer: ownProps.selectedPlayer,
    closeModalPopup: ownProps.closeModalPopup,
    toggleContentSelection: ownProps.toggleContentSelection,
    themeColor: ownProps.themeColor
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentSelection);
