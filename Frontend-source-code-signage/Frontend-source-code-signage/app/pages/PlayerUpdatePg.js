import React, { Component } from 'react';
import PlayerUpdateContainer from '../containers/PlayerUpdateContainer.js';

class PlayerUpdatePg extends Component {
  render() {
    return (
        <PlayerUpdateContainer params={this.props.match.params} />
      );
  }
}

export default PlayerUpdatePg;
