import React, { Component } from 'react';
import TemplateContainer from '../containers/TemplateContainer.js';

export default class TemplatePg extends Component {
  render() {
console.log('---template page--',this.props);
    return (

        <TemplateContainer 
        	user= {this.props.user}
            common= {this.props.common}
            publishToSreens = {this.props.publishToSreens}
            playersList = {this.props.playersList}
            toggleRootModal = {this.props.toggleRootModal}
            closeModalPopup= {this.props.closeModalPopup}
            appsList = {this.props.appsList}
            selectedPlayer= {this.props.selectedPlayer}
            onSelect = {this.props.onSelect}
            rootModal = {this.props.rootModal}
            
            />


    );
  }
}
