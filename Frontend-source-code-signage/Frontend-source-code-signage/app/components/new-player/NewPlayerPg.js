import React, { Component } from 'react';
import NewPlayerContainer from './NewPlayerContainer.js';

class NewPlayerPg extends Component {
  render() {
    return (
        <NewPlayerContainer
        newPlayer= {this.props.newPlayer} 
        toggleContentSelection={this.props.toggleContentSelection}
        closeModalPopup={this.props.closeModalPopup}
        toggleNewPlayer = {this.props.toggleNewPlayer}
        themeColor = {this.props.themeColor}
        />

    );
  }
}


export default NewPlayerPg;
