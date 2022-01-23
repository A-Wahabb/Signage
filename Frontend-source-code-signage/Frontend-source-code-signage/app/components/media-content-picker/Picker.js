import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {Loading,Title,Error} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER} from '../../constants/Config';
import { confirmAlert } from 'react-confirm-alert';
import ModalLocal from '../modal-local';
import GalleryPg from '../../pages/GalleryPg';


class Picker extends Component {
 
  constructor(props) {
    super(props);
    this.state={
     galleryType: 'GALLERY',
     selectedMedia:[]
    };
    this.selectMedia = this.selectMedia.bind(this);
    this.newMediaList=null;
  }

componentWillMount() {
    //this.props.resetMe();
    
  }

componentDidMount(){

}

componentDidUpdate(prevProps,prevState){
  
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



goToDashboard(){
  this.props.resetMe();this.props.changeConsole(this.props.backConsole);
}

launchPicker(){
  }
closePicker(){
    console.log('picker close clicked');
    this.setState({
      isPickerActive : false,
      isModalOpen: false
    });
}

changeConsole(galleryType){
  this.setState({selectedConsole:galleryType})
}





gotoAppSelection(evt,consoleName){
  evt.preventDefault();
  this.props.changeConsole(consoleName);
}

getSearchMedia(myMedia,searchText){
    let user = this.props.user;
      let mediaArr = [];
      myMedia = myMedia && myMedia instanceof Array ? myMedia:[];
      //let userMediaPath = BASE_SERVER + "/preview/" + media.userId;
      console.log('my media in picker', myMedia);
      mediaArr = myMedia.map(media => {

        media.original= BASE_SERVER + "/preview/" + media.userId + "/" + media.original_file_name;
        media.thumbnail= BASE_SERVER + "/preview/" + media.userId + "/thumbnails/" + media.base64_data;

        return media
      });
      
      mediaArr = mediaArr.filter(media => {
        if (media.original_file_name.indexOf(searchText) !== -1) {
          return true;
        } 
      });
      console.log('media',mediaArr);

      return mediaArr;
  }

  selectMedia(e,mediaId, newMediaList){
    e.stopPropagation();
    let selectedArr=this.state.selectedMedia;
    this.newMediaList = newMediaList;
    if(this.state.selectedMedia.indexOf(mediaId)==-1){
     
      selectedArr.push(mediaId);
    }else{
      let indx= this.state.selectedMedia.indexOf(mediaId);
      selectedArr.splice(indx,1);
    }
  this.setState({selectedMedia:selectedArr});
  if(this.props.isSingleSelect){
    this.handleSelection(newMediaList);
  }
  console.log('selected media now',selectedArr);
  }

handleSelection(newMediaList){
      var udpateMediaList= newMediaList?newMediaList:this.newMediaList;
      let gallery = udpateMediaList?udpateMediaList:this.props.user.mymedia.mediaList;
        this.props.onSelect(this.state.selectedMedia,gallery );
        this.props.closePicker();
  }

renderMedia(media) {

    return <div className={"image-gallery-thumbnail-inner col-lg-4 col-md-6 col-lg-12"} >
            <img onClick={(e)=> this.selectMedia(e,media._id)} src={media.thumbnail}/>
            <span className={this.state.selectedMedia.indexOf(media._id) !== -1?'checked-box selected-check':'uncheck-box select-check'} ></span>
      
              <div style={{textAlign:'left'}} >
              <div  className="image-gallery-thumbnail-label"><b>{media.title?media.title:media.thumbnailLabel}</b>
      
              </div>
              </div>
      </div>;
  }
renderAddNew(){
    return (
     <button style={{textIndent:'2px',wordSpacing: '-2px',padding:'0px',position:'absolute',right: '50px',top: '10px'}}
      className="btn-primary-link" onClick={()=>true} >
      <span className="glyphicon glyphicon-upload "></span>UPLOAD NEW
      </button>
    );
    }

render() {

  return (
    <div className='picker'>
      <div className='gal-container'>
      <GalleryPg  user= {this.props.user}
                  common = {this.props.common}
                  selectView = {true}
                  selectMedia = {this.selectMedia}
                  galleryType = {this.state.galleryType}
                  />
      </div>
      {!this.props.isSingleSelect && <div style={{display:'flex',bottom: '10px',padding:'5px',paddingRight:'15px',right:'10px',position: 'fixed'}}>
      <button style={{padding:'0px',marginRight:'15px',color:this.props.user.config.settings.color_primary}}
      className="btn-primary-link" onClick={()=>this.props.closePicker()} >
      CANCEL
      </button>
      <button style={{padding:'0px 8px',backgroundColor:this.props.user.config.settings.color_primary}}
      className="btn btn-primary" onClick={()=>this.handleSelection()} >
      <span  className="glyphicon glyphicon-ok inline-icon"></span>ADD
      </button></div>}
    </div>
  
  )
}
}


export default Picker;
