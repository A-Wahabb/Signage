import React, { Component } from 'react';
import TemplateNewContainer from '../containers/TemplateNewContainer.js';

export default class TemplateNewPg extends Component {
  render() {
console.log('---template New page--',this.props);
    return (
        <TemplateNewContainer 
        	user= {this.props.user}
            common = {this.props.common}
            closeModalPopup= {this.props.closeModalPopup}
            playersList={this.props.playersList}
            selectedAppId={this.props.selectedAppId}
            appsList={this.props.appsList}
        	/>
    );
  }
}
