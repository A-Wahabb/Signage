import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {Loading,Title,Error} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER} from '../../constants/Config';

class Log extends Component {
 
constructor(props) {
    super(props);
    
  }

componentDidMount(){
  this.props.fetchScreenLogs(this.props.player.screenNumber);
}


render() {

  return (
      <div style={{height:'100%'}}>
        <div style={{display:'inline-block',width:'85%'}}><Title  title={"Screen Log: "+this.props.player.playerName }/></div>
        <button
      onClick={ e => this.props.fetchScreenLogs(this.props.player.screenNumber) }
      className="btn btn-primary-link "
      style={{color:this.props.themeColor}}
      > REFRESH LOG
      </button>
        <div style={{ height: 'calc(100% - 70px)', width: '100%',overflow:'hidden',overflowY:'scroll' }}>
          {this.props.playerLog.logs}
        </div>
        
      
    
          }
    </div>
  
  )
}
}


export default Log;
