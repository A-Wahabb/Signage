import React, { Component } from 'react';
import TemplateEditContainer from '../containers/TemplateEditContainer.js';

export default class TemplateEditPg extends Component {
  render() {
    console.log('---template Edit page--',this.props);
    return (
        <TemplateEditContainer 
        	user= {this.props.user}
            common = {this.props.common}
            selectedAppId={this.props.selectedAppId}
            rootModal= {this.props.rootModal}
            appsList={this.props.appsList}
            toggleRootModal= {this.props.toggleRootModal}

        />

    );
  }
}
