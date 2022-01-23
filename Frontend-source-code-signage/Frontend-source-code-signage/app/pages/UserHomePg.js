import React, { Component } from 'react';
import UserHomeContainer from '../containers/UserHomeContainer.js';

class UserHomePg extends Component {
  render() {

    return (

        <UserHomeContainer 
        	posts = {this.props.posts}
        	appsList = {this.props.appsList}
        	common= {this.props.common}
        	user ={this.props.user}
            playlists= {this.props.playlists}
            playerItemsStatus= {this.props.playerItemsStatus}
            toggleRootModal = {this.props.toggleRootModal}
            publishToSreens={this.props.publishToSreens}
            schedules = {this.props.schedules}            
            rootModal= {this.props.rootModal}
            userSubs={ this.props.userSubs}
        />

    );
  }
}


export default UserHomePg;
