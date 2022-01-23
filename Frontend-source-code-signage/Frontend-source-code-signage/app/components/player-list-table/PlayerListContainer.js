import PlayerListTable from './PlayerListTable.js';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
  return {
  

  }
}


function mapStateToProps(state, ownProps) {
  console.log(ownProps);
  
  return {
    players: ownProps.players,
    user: ownProps.user,
    userApps: ownProps.userApps,
    schedules: ownProps.schedules,
    playlists: ownProps.allPlaylist.lists,
    toggleSlide: ownProps.toggleSlide,
    setSelection: ownProps.setSelection,
    setPreviewPlayer : ownProps.setPreviewPlayer,
    togglePreview : ownProps.togglePreview,
    gotoEditApp : ownProps.gotoEditApp,
    toggleContentSelection: ownProps.toggleContentSelection,
    settings : ownProps.settings,
    usersList: ownProps.usersList
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerListTable);
