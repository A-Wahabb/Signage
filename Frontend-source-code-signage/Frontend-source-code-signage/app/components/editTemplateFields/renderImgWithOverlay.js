import React, { Component } from 'react';
import {BASE_SERVER} from '../../constants/Config';

class RenderImgWoverlay extends React.Component { 
	constructor(props) {
    super(props);
    this.setDefaultThumb = this.setDefaultThumb.bind(this);
    }

 setDefaultThumb(evt, mediaPath){
   
    if(mediaPath && mediaPath.value && (mediaPath.value.item_media && (mediaPath.value.item_media.indexOf('thumbnails')!== -1) && (mediaPath.value.item_media.match(/\.(jpeg|jpg|gif)$/) != null))){
      evt.target.src=BASE_SERVER+'/'+mediaPath.value.item_media.split('.')[0]+'.png';
      }
    else if(mediaPath && mediaPath.value && (mediaPath.value.msg_img && (mediaPath.value.msg_img.indexOf('thumbnails')!== -1) && (mediaPath.value.msg_img.match(/\.(jpeg|jpg|gif)$/) != null))){

    evt.target.src=BASE_SERVER+'/'+mediaPath.value.msg_img.split('.')[0]+'.png';
  }
  else if(mediaPath && mediaPath.value && (mediaPath.value.item_img && (mediaPath.value.item_img.indexOf('thumbnails')!== -1) && (mediaPath.value.item_img.match(/\.(jpeg|jpg|gif)$/) != null))){
      evt.target.src=BASE_SERVER+'/'+mediaPath.value.item_img.split('.')[0]+'.png';
  }
else{
  evt.target.style.visibility= 'hidden';
    evt.target.parentElement.style.backgroundImage='url('+BASE_SERVER+'/preview/player_thumb/no-thumb.png)';
    }
    
 
  }

  render() {
     let {imgPath, rootProperty, appLocation} = this.props;

    return (<div className="image-thumb-holder">
          <img onError={evt => this.setDefaultThumb(evt,rootProperty)} className= "small-thumb "  src={BASE_SERVER+'/'+ imgPath.replace(/~#.*#~\//,'').replace('drft/'+appLocation+'/app-thumbnail/','thumb/').replace('app-thumbnail/','thumb/').replace('uploads','preview').replace('.mp4','.png')} />
          
          <div className='thumb-overlay'>
            <span  className="glyphicon glyphicon-edit thumb-edit" onClick={(e) => (this.props.toggleMediaPicker(rootProperty,imgPath))}>Choose from library</span>
          </div>
          </div>);
  }
}

export default RenderImgWoverlay;

