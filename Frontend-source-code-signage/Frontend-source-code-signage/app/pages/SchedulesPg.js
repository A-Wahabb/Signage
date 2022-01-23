import React, { Component } from 'react';
import SchedulesContainer from '../containers/SchedulesContainer.js';

class SchedulesPg extends Component {
  render() {
    return (
        <SchedulesContainer 
        	user= {this.props.user}
                        common = {this.props.common}
                        toggleRootModal = {this.toggleRootModal}
                        publishToSreens = {this.props.publishToSreens}
                        schedules = {this.props.schedules}
                        playlists = {this.props.playlists}
                        appsList = {this.props.appsList}
                        selectedPlayer= {this.props.selectedPlayer}
                        closeModalPopup= {this.props.closeModalPopup}
                        schedules = {this.props.schedules}
        	/>

    );
  }
}


export default SchedulesPg;
