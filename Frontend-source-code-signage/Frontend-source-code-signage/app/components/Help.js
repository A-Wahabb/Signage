import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router-dom';
import  { Tabs,Pane } from './Tabs';
import emptyScreen from '../assets/signage-empty.png';
import {BASE_SERVER, LOCAL_SERVER} from '../constants/Config';

import Search from './search/SearchContainer.js';
import {HelpContents} from './HelpContents.js';


class Help extends Component {

  constructor(){
    super();
    this.onSearchChange = this.onSearchChange.bind(this);
    this.primaryColor="#000";
  }


  componentWillMount() {
   console.log(this.props);
   this.primaryColor= this.props.user.config.settings.color_primary;
  }

  componentDidMount() {

     let titles = document.getElementsByClassName('Collapsible__trigger');
    
     for(var i=0;i< titles.length; i++){
     titles[i].style.background=this.primaryColor;
     }
    }


onSearchChange(e){
      this.setState({
        searchText: e.target.value
      });
  }



  renderHelpContents() {
  
    return <HelpContents primaryColor={this.primaryColor}/>;
  }


  render() {
    return (
      <div className="title-container">
      <div>
      <h2 className="header-title">Help</h2>
     
      <Search 
          changeConsole = {this.props.changeConsole} 
          onSearchChange = {this.onSearchChange}
        />
      </div>
      
      <div className={"inner-container"}>
      {this.renderHelpContents()}
  

</div>
</div>
    );
  }
}


export default Help;


