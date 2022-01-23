import React, { Component, PropTypes } from 'react';
import signageEmptyScreen from '../../assets/signage-empty.png';
import { Link } from 'react-router-dom';
import {Loading,Title,Error} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER} from '../../constants/Config';


class ScreenPlaylistItems extends Component {
 
constructor(props) {
    super(props);
    this.playlist=null;
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

render() {
  console.log('***screen items details**', this.props);
  
  this.playlist = this.props.playList.length>0?this.props.playList[0]:null;
  this.playerDetails= this.props.playerDetails.length>0?this.props.playerDetails[0]:null;
  let mediaList = this.props.user.mymedia.mediaList;
  let itemsList = this.props.playListItems;
  let lblClr = this.props.user.config.settings.color_secondary;
  itemsList = itemsList.map(item => {
      item.downloadStatus = <span className='lbl-grey'>WAITING</span>;
      item.playCount = <span  className='lbl-purp' style={{fontSize:'1.2em',backgroundColor:lblClr}}>0</span>
      let itemStatus=  this.props.screenPlaylistItems.items.filter(itemStatus => 
          itemStatus.playlistItemId == item._id);
          if(itemStatus.length>0){
            itemStatus= itemStatus[0];
            item.downloadStatus = itemStatus.downloadStatus=='SUCCESS'?<span className='lbl-blue' style={{backgroundColor:lblClr}}>COMPLETED</span>:<span className='lbl-blue' >WAITING</span>;
            item.playCount = <span style={{fontSize:'1.2em'}} className='lbl-purp'>{itemStatus.playCount}</span>;
          }
      let mediaDetail = mediaList.filter(media => media._id == item.mediaId);
          if(mediaDetail.length>0){
            mediaDetail = mediaDetail[0];
            item.name = (mediaDetail.title !== 'null' && mediaDetail.title) || mediaDetail.original_file_name;
            item.mediaType =  this.getMediaType(mediaDetail.original_file_name);
            item.thumbnail = BASE_SERVER+'/preview/'+this.props.user.user._id+'/thumbnails/'+mediaDetail.base64_data;
          }

          return item; 
  });
  console.log('final items', itemsList);


  const RenderItemRow = (item) => { 

    return ( <li className='item-row' style={{zIndex: 99999999}} >
        <div className='item-row'>
        <span className='item col-sm-2 col-lg-1 col-md-1'>{item.listIndex+1 }</span>

        <span className='item col-sm-3 col-lg-3 col-md-3'>
        <img src={item.thumbnail}/>
        </span>

        <span className='item col-sm-3 col-lg-3 col-md-3 media-name'>
        <label>{item.name}</label>
        <p>{item.mediaType}</p>
        </span>
       
        <span className='item col-sm-2 col-lg-2 col-md-2'>
        {item.downloadStatus}
        </span>
        <span className='item col-sm-2 col-lg-3 col-md-3'>
        {item.playCount}
        </span>
        
      </div>
    </li>
    );
  }

  const RenderItemList = (items) => {
      return (
      <ul>
        {items.map((item, index) => (
          RenderItemRow(item)
        ))}
      </ul>
    );
  };

  return (
    <div className="movable" style={{minWidth:'400px'}}>
      <h3 style={{padding:'5px',margin:'10px',textAlign:'center'}}>SCREEN : <span style={{color:'#000'}}>{this.playerDetails.playerName}</span> & PLAYLIST : <span style={{color:'#000'}}>{this.playlist.playlistName}</span> </h3>
      <div className='container'>
       
      <div className='header-row'>
        <span  className='item col-sm-2 col-lg-1 col-md-1'>#</span>
        <span  className='item col-sm-3 col-lg-3 col-md-3'>MEDIA THUMBNAIL</span>
        <span  className='item col-sm-3 col-lg-3 col-md-3'>NAME & FORMAT</span>
        <span  className='item col-sm-2 col-lg-2 col-md-2'>UPLOAD STATUS<br/><label style={{color:'#1f7e84',margin:'0px'}}>Into the Screen</label></span>
        <span  className='item col-sm-2 col-lg-3 col-md-3'>PLAYED COUNT<br/><label style={{color:'#1f7e84',margin:'0px'}}>No. of times played on screen</label></span>
      </div>


      <div style={{width:'100%',}}>
        {RenderItemList(itemsList)}
      </div>
      
      </div>

    </div>
  
  )
  }
}


export default ScreenPlaylistItems;


