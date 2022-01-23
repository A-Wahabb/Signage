import React, { Component } from 'react';
import SearchContainer from '../containers/SearchContainer.js';

class SearchPg extends Component {
  render() {
    console.log('---search home--',this.props);
    return (

        <SearchContainer 
        	playersList = {this.props.playersList}
        	appsList = {this.props.appsList}

        />

    );
  }
}


export default SearchPg;
