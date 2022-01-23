import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router-dom';

import emptyScreen from '../assets/signage-empty.png';
import {BASE_SERVER, LOCAL_SERVER} from '../constants/Config';



class Announcements extends Component {

  constructor(){
    super();
    
  }


  componentWillMount() {
   this.primaryColor= this.props.user.config.settings.color_primary;

  }

onSearchChange(e){
      this.setState({
        searchText: e.target.value
      });
  }

  renderUsersAnnouncements(){
    return <div>
      <div style={{padding:'20px',fontSize:'1.5em',color:'#8b999e', borderBottom:'1px solid #e8e8e8'}}>
      <label>- New Design anything editor is available under, 'Templates -> Create From Scratch -> Design anything'.  </label>
      </div>
      <div style={{padding:'20px',fontSize:'1.5em',color:'#8b999e', borderBottom:'1px solid #e8e8e8'}}>
      <label>{"- Dashboard supports both light and dark theme. options can be set from user menu right top."}</label>
      </div> 

    </div>
  }

  renderAdminAnnouncements(){
    return <div>
      <div style={{padding:'20px',fontSize:'1.5em',color:'#8b999e', borderBottom:'1px solid #e8e8e8'}}>
      <label>{"- Instead of Deleting a user, now we can move to 'Incative' and 'Active' state. "}</label>
      </div>
      <div style={{padding:'20px',fontSize:'1.5em',color:'#8b999e', borderBottom:'1px solid #e8e8e8'}}>
      <label>{"- We can change CMS panel background as well as logo icons from User Settings menu options."}</label>
      </div> 

      <div style={{padding:'20px',fontSize:'1.5em',color:'#8b999e', borderBottom:'1px solid #e8e8e8'}}>
      <label>{"- Predefined Templates can previewed, and customize from Template menu."}</label>
      </div> 

    </div>
  }


  render() {
    return (
      <div className="title-container">
      <div>
      <h2 className="header-title">Announcements</h2>
      </div>
      
      <div className={"inner-container"}>
      {!this.props.user.user.admin && this.renderUsersAnnouncements()}
      {this.props.user.user.admin && this.renderAdminAnnouncements()}
</div>
</div>
    );
  }
}


export default Announcements;


