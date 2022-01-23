import React, { Component } from 'react';
import PlaylistEditorContainer from './PlaylistEditorContainer.js';

class PlaylistEditorPopup extends Component {
	
  render() {
    return (
        <PlaylistEditorContainer 
         user= {this.props.user}
         closeModalPopup= {this.props.closeModalPopup}
         savePlaylist = {this.props.savePlaylist}
         removePlaylistItems = {this.props.removePlaylistItems}
         playListDetail = {this.props.playListDetail}
         themeColor = {this.props.theme}
         appsList = {this.props.appsList}
         common ={this.props.common}
         moveToLive = {this.props.moveToLive}
        />

    );
  }
}

export default PlaylistEditorPopup;
