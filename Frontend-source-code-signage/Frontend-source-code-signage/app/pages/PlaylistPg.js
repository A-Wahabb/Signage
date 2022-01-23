import React, { Component } from 'react';
import PlaylistContainer from '../containers/PlaylistContainer.js';

export default class PlaylistPg extends Component {
  render() {
console.log('---playlist page--',this.props);
    return (

        <PlaylistContainer 
        	playlists = {this.props.playlists}
            user= {this.props.user}
            common= {this.props.common}
            publishToSreens = {this.props.publishToSreens}
            playersList = {this.props.playersList}
            toggleRootModal = {this.props.toggleRootModal}
            closeModalPopup= {this.props.closeModalPopup}
            selectedPlayer= {this.props.selectedPlayer}
            appsList = {this.props.appsList}
            moveToLive = {this.props.moveToLive}
            usersList= {this.props.usersList}
        />


    );
  }
}
