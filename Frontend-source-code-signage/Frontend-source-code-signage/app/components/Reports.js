import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router-dom';
var _reactDom = require('react-dom');
import {BASE_SERVER, LOCAL_SERVER} from '../constants/Config';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {Loading,Title,Error} from './commonDumbs';
import moment from 'moment';
import Search from './search/SearchContainer.js';
import { toast } from 'react-toastify';

const options = [
  { value: '0', label: 'SELECT REPORT' },
  { value: '1', label: 'Screens online history' }
  
];

class Reports extends Component {

  constructor(){
    super();
    this.state = {
      reportFilter:'1' ,
      searchText:''
      };
    this.uploadURL = BASE_SERVER + "/api/user/media";
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  componentWillMount() {
    
    var userId = this.props.user.user._id;
    
  }



  tooltiphide(){
    try{
      document.getElementsByClassName('__react_component_tooltip show place-top type-light customTheme')[0].style.visibility='hidden';
      document.getElementsByClassName('__react_component_tooltip show place-top type-light customTheme')[0].style.display='none !important';
    }catch(e){
console.log(e);
    }
  }


getMediaType(mediaName) {
    if (/\.(jpe?g|png|gif)$/i.test(mediaName)) {
      return "IMAGE";
    } else if (/\.(mp4|wmo|3gp|ogg|webM)$/i.test(mediaName)) {
      return "VIDEO";
    } else if (/\.(mp3|wav)$/i.test(mediaName)) {
      return "AUDIO";
    } else {
      return "OTHER";
    }
  }

  handleChange(evt)
    {
      evt.preventDefault();
      console.log(evt.target.value);
      this.getFilteredMedia(evt.target.value);
      this.setState({
        galleryFilter: evt.target.value
      });
    }


  getFilteredMedia(selectedType){
return   null;

}

isSearchReports(player){

  if(player.playerName.toLowerCase().indexOf(this.state.searchText.toLowerCase())!= -1 || player.screenNumber.toString().indexOf(this.state.searchText)!= -1){
    return true;
  }else{
    return false;
  }

}

onSearchChange(e){
      this.setState({
        searchText: e.target.value
      });
  }

  renderReport(statusLogsArr,playersList) {
    let logsArr= Object.assign([],statusLogsArr.logs);

    playersList.players.forEach(function(player) 
      {
       logsArr.forEach(log=>{ if(log.mac == player.MAC){log.playerName=player.playerName;}});
     });
    logsArr = logsArr.filter(logs => this.isSearchReports(logs));
    console.log(logsArr);
    return (
    <table className="table">
  <thead style={{background:'#5f5c5c',color:'#fff'}}>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Screen Name</th>
      <th scope="col">Screen Number</th>
      <th scope="col">Online Date & Time</th>
    </tr>
  </thead><tbody>
  {logsArr.map((log,indx) => (
    <tr>
      <th scope="row">{indx+1}</th>
      <td>{log.playerName}</td>
      <td>{log.screenNumber}</td>
      <td>{moment(log.createdAt).format('LLLL')}</td>
    </tr>
   
  ))}</tbody>
</table>
  )
  }

  render() {
    const {posts, user, common } = this.props;
    const playersList = posts.playersList;
    const onlineStatus = posts.onlineStatus;
    return (
      <div className='gallery-container'>
      <div className="title-container">
          <h2 className="header-title">Reports</h2>
           <Search 
              changeConsole = {this.props.changeConsole} 
              onSearchChange = {this.onSearchChange}
        />
          <div className="search-bar">
        <select 
        value={this.state.reportFilter}
        onChange={e => this.handleChange(e)}>
        {options.map(option => <option value={option.value}>{option.label}</option>)}
        </select>
            
      </div>
      </div>

      <div className="inner-container">
      
      {this.renderReport(onlineStatus,playersList)}

      </div>

    </div>
    );
  }
}


export default Reports;

