import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {Loading,Title,Error} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER} from '../../constants/Config';

class Map extends Component {
 
constructor(props) {
    super(props);
    
  }

componentDidMount(){
  this.props.requestLatLonByIP(this.props.player.ip,this.props.player);
}

render() {
  console.log('--playr at map', this.props.player);
  let lat = this.props.geo && this.props.geo.latitude?this.props.geo.latitude:null;
  let lng = this.props.geo && this.props.geo.longitude?this.props.geo.longitude:null;
  return (
      <div style={{height:'100%'}}>
       <Title title={'Screen Location: '+this.props.player.playerName}/>
        <div style={{ height: 'calc(100% - 70px)', width: '100%' }}>
        
        <iframe src={"https://maps.google.com/maps?q="+lat+", "+lng+"&z=15&output=embed"} width="100%" height="100%" style={{border:"0px"}}></iframe>
        
      </div>
    </div>
  
  )
}
}


export default Map;
