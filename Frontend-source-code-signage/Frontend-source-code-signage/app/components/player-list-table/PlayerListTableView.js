import React, { Component } from 'react';
import PlayerListContainer from './PlayerListContainer.js';

class PlayerListTableView extends Component {
  render() {
    console.log('---player table view--',this.props);
    return (

        <PlayerListContainer 
        	players={this.props.players}
        	userApps={this.props.userApps}
            usersList={this.props.usersList}
            schedules={this.props.schedules}
            allPlaylist={this.props.allPlaylist}
        	user={this.props.user}
        	toggleSlide={this.props.toggleSlide}
        	setSelection = {this.props.setSelection}
        	setPreviewPlayer = {this.props.setPreviewPlayer}
        	togglePreview= {this.props.togglePreview}
       		gotoEditApp = {this.props.gotoEditApp}
            settings={this.props.settings}
            toggleContentSelection = {this.props.toggleContentSelection}
            
        />

    );
  }
}


export default PlayerListTableView;
