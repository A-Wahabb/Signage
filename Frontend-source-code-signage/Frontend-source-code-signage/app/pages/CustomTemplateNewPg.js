import React, { Component } from 'react';
import CustomTemplateNewContainer from '../containers/CustomTemplateNewContainer.js';

export default class CustomTemplateNewPg extends Component {
  render() {
console.log('---Custom template new page--',this.props);
    return (
        <CustomTemplateNewContainer />

    );
  }
}
