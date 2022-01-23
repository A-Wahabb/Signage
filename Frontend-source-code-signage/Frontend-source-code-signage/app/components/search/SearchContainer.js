import Search from './Search.js';
import { connect } from 'react-redux';


const mapDispatchToProps = (dispatch) => {
  return {
    
}
}


function mapStateToProps(state, ownProps) {
  return {
    changeConsole: ownProps.changeConsole,
    onSearchChange: ownProps.onSearchChange,
    isOnlysearch:ownProps.isOnlysearch
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
