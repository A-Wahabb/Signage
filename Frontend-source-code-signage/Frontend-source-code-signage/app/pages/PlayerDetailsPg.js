import React, { Component } from 'react';
import PlayerDetailsContainer from '../containers/PlayerDetailsContainer.js';

class PlayerDetailsPg extends Component {
  render() {
    console.log('---player detail page--',this.props);
    return (

        <PlayerDetailsContainer />

    );
  }
}


export default PlayerDetailsPg;
