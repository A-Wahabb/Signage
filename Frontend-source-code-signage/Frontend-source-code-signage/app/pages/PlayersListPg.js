import React, { Component } from 'react';
import PlayersListContainer from '../containers/PlayersListContainer.js';

class PlayersListPg extends Component {
  render() {
    return (

        <PlayersListContainer 
        		playersList = {this.props.playersList}
                playerItemsStatus = {this.props.playerItemsStatus}
        		appsList = {this.props.appsList}
        		user = {this.props.user}
        		common = {this.props.common}
                playlists = {this.props.playlists}
                toggleRootModal = {this.props.toggleRootModal}
                publishToSreens ={this.props.publishToSreens}
                newPlayer ={this.props.newPlayer}
                schedules = {this.props.schedules}
                rootModal={this.props.rootModal}
                usersList= {this.props.usersList}
        />

    );
  }
}


export default PlayersListPg;
