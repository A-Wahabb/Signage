import React, { Component } from 'react';
import PlayerDetailsContainer from './PlayerDetailsContainer.js';

class PlayerDetailsPg extends Component {
  render() {
    console.log('---player detail page--',this.props);
    return (
        <PlayerDetailsContainer 
            selectedPlayerId={this.props.selectedPlayerId}
            content={this.props.content} 
            toggleSlide={this.props.toggleSlide}
        	showItemsDetail = {this.props.showItemsDetail}
            getPlaylistDetails = {this.props.getPlaylistDetails}
            themeColor={this.props.themeColor} 
            latestPlayerVer= {this.props.latestPlayerVer}
            rootModal = {this.props.rootModal}
            settings = {this.props.settings}
        	 />
            
    );
  }
}


export default PlayerDetailsPg;
