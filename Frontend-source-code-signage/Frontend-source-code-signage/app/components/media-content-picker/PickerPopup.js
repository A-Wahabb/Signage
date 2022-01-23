import React, { Component } from 'react';
import PickerContainer from './PickerContainer.js';

class PickerPopup extends Component {
	
  render() {

    return (
        <PickerContainer 
          closePicker={this.props.closePicker}
          onSelect = {this.props.onSelect}
          common = {this.props.common}
          user= {this.props.user}
          isSingleSelect={this.props.isSingleSelect}
        />

    );
  }
}

export default PickerPopup;
