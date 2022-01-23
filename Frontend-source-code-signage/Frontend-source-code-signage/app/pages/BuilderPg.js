import React, { Component } from 'react';
import BuilderContainer from '../containers/BuilderContainer.js';

export default class BuilderPg extends Component {
  render() {
console.log('---Builder page--',this.props);
    return (
        <BuilderContainer />
    );
  }
}
