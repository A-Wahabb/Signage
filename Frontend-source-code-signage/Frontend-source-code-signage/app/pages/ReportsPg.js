import React, { Component } from 'react';
import ReportsContainer from '../containers/ReportsContainer.js';

export default class ReportsPg extends Component {
  render() {
console.log('---reports page--',this.props);
    return (

        <ReportsContainer 
        	 user = {this.props.user}
         	posts = {this.props.posts}
         	common = {this.props.common}
     
        />
    );
  }
}
