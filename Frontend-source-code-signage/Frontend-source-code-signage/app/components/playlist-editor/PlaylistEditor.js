import React, { Component, PropTypes } from 'react';
import signageEmptyScreen from '../../assets/signage-empty.png';
import { Link } from 'react-router-dom';
import {Loading,Title,Error} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER,PrimaryColor} from '../../constants/Config';
import { confirmAlert } from 'react-confirm-alert';
import PickerPopup  from '../media-content-picker/PickerPopup.js';
import TemplatePg from '../../pages/TemplatePg.js';
import WebpageContainer from '../webpage-content/WebPageContainer.js';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
import ModalLocal from '../modal-local';
import DurationPicker from 'react-duration-picker';

import Dropdown, {
          DropdownToggle,
          DropdownMenu,
          DropdownMenuWrapper,
          MenuItem,
          DropdownButton
} from '@trendmicro/react-dropdown';

class PlaylistEditor extends Component {
 
  constructor(props) {
    super(props);
    this.state={
     playlistItems: [
     
     ],
     isPickerActive:false,
     pickerType: "LIBRARY",
     isModalOpen: false,
     playlistName: "",
     animationType: "SLIDELEFT",
     orientation: "LANDSCAPE",
     seletedRow: ""
    };
    this.removedItems = [];
    this.onSortEnd = this.onSortEnd.bind(this);
    this.makePlaylistItemData = this.makePlaylistItemData.bind(this);
    this.closePicker = this.closePicker.bind(this);
    this.renderSave = this.renderSave.bind(this);
    this.onMediaSelected = this.onMediaSelected.bind(this);
    this.confirmTemplateName = this.confirmTemplateName.bind(this);
    this.isPortrait=window.matchMedia("(orientation: portrait)").matches;
    this.onTemplateSelected = this.onTemplateSelected.bind(this);
    this.onWebpageAdd = this.onWebpageAdd.bind(this);
    this.onDurationChange= this.onDurationChange.bind(this);
    this.showDurationPicker=this.showDurationPicker.bind(this);
    this.rowHr =0;
    this.rowMnt=0;
    this.rowSec=20;
    this.duration="";
}

componentWillMount() {
    this.props.resetMe();
    
  }

componentDidMount(){
    if(!this.state.playlistName && !this.props.playListDetail){
        console.log('picker set');
       //this.launchPicker();
       this.confirmTemplateName();
      }
    else if(this.props.playListDetail){
        let editPlaylistDetails = this.props.playListDetail;
       this.setState({
          playlistName : editPlaylistDetails.playlistName,
          animationType : editPlaylistDetails.animationType,
          orientation : editPlaylistDetails.orientation,
          playlistItems : editPlaylistDetails.items 
       });
       this.makePlaylistItemData(editPlaylistDetails.items);
    }
}

componentDidUpdate(prevProps,prevState){

  let publishPop = document.getElementsByClassName('react-confirm-alert-button-group');
    if(publishPop && publishPop.length>0 && publishPop[0].children){
    publishPop[0].children[0].style.color=this.props.user.config.settings.color_primary;
    publishPop[0].children[1].style.backgroundColor=this.props.user.config.settings.color_tirnary;
  }
}

goToDashboard(){
  this.props.resetMe();this.props.changeConsole(this.props.backConsole);
}

setPlaylistName(e){
  let playlistName= document.getElementById('playlist-new-name').value;
  console.log('new playlist name',playlistName);
  this.setState({
      playlistName: playlistName?playlistName:'No Name'
  });
}

confirmTemplateName= () => {
      
      confirmAlert({
        title: 'Playlist Name',                        
        message: 'Create playlist as: ',
        childrenElement: () => <div><input style={{borderRadius:'5px'}} id='playlist-new-name' type='text' className="single-popup-input" defaultValue={""} /></div>,       
        confirmLabel: 'NEXT',                           
        cancelLabel:'CANCEL',
        closeOnEscape: true,
        closeOnClickOutside: true,                            
        onConfirm: (e) => { this.setPlaylistName(e)},    
        onCancel: () => {this.props.closeModalPopup()},      
      });
      let _self =this;
      setTimeout(function(){
        var btns = document.getElementsByClassName('react-confirm-alert-button-group');
     
      btns[0].children[1].style.backgroundColor=_self.props.themeColor;
      },400);

    };

launchPicker(pickerType,selectedIndx,duration){
  this.duration= duration;
  this.setState({
      isPickerActive : true,
      isModalOpen: true,
      pickerType:pickerType,
      seletedRow: selectedIndx
    });
}

closePicker(){
    console.log('picker close clicked');
    if(this.state.pickerType == 'DURATION_PICKER'){
        let playlistItems = Object.assign([],this.state.playlistItems);
       let durationStr = this.rowHr+':'+this.rowMnt+':'+this.rowSec;
       playlistItems[this.state.seletedRow].duration = durationStr;
       this.setState({
        playlistItems : playlistItems
       });
    }

    this.setState({
      isPickerActive : false,
      isModalOpen: false,
      seletedRow:''
    });
    this.duration= "";
}

confirmRemoveItem= (mediaName, index) => {
      
      confirmAlert({
        title: 'WARNING!',                        
        message: 'Are you sure, you want to remove from playlist media with name: '+mediaName+ '?',
        childrenElement: () => <div></div>,       
        confirmLabel: 'REMOVE',                           
        cancelLabel: "CANCEL",                             
        onConfirm: () => {this.removeItem(index);return true;},    
        onCancel: () => {console.log('go back');},      
      })
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

hmsToSecond(hmsStr){
  console.log('hms',hmsStr);
  let hms = hmsStr;
  let a = hms.split(':');
  let seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
  return seconds;
}

getSavingPlaylistItems(){
      let finalPlaylistItems=[];
      finalPlaylistItems = this.state.playlistItems.map((playlistItem,index)=> {
           let playListItemObj={};
             if(playlistItem._id){
              playListItemObj._id = playlistItem._id;
             }
           playListItemObj.mediaId = playlistItem.mediaId;
           playListItemObj.contentType = playlistItem.contentType;
           playListItemObj.duration = this.hmsToSecond(playlistItem.duration);
           playListItemObj.thumbnail =playlistItem.thumbnail;
           playListItemObj.isIncluded= playlistItem.isIncluded;
           playListItemObj.listIndex = index;
           return playListItemObj;
      });
      return finalPlaylistItems;
}

savePlaylist(){
      let playList = {};
      if(this.state.playlistName){
        if(this.props.playListDetail && this.props.playListDetail._id){  
          playList._id =   this.props.playListDetail._id;
        }
        playList.playlistName =  this.state.playlistName;
        playList.orientation  =  "LANDSCAPE";
        playList.animationType=  this.state.animationType;
        playList.status= "DRAFT";
        playList.items = this.getSavingPlaylistItems();
        playList.thumbnail = playList.items[0].thumbnail;
        this.props.savePlaylist(playList);
        if(this.removedItems.length>0){
          console.log('sending items remove call');
          this.props.removePlaylistItems(this.removedItems)
        }
      }
}

makePlaylistItemData(items){
      console.log('selected media', items);
      let mediaArr = this.props.user.mymedia.mediaList;
      let playlistItemsArr = items.map(item => {
      if(item.contentType== 'MEDIA' || item.contentType== 'IMAGE' || item.contentType== 'VIDEO'){
      let media = mediaArr.filter(media => media._id === item.mediaId);
      
      item["original"]= BASE_SERVER + "/preview/" + media[0].userId + "/" + media[0].original_file_name;
      item["thumbnail"]= BASE_SERVER + "/preview/" + media[0].userId + "/thumbnails/" + media[0].base64_data;
      item["name"]=media[0].title?media[0].title:media[0].original_file_name;
      item["contentType"]=this.getMediaType(media[0].original_file_name);
      item["mediaId"]= media[0]._id;
      }else if(item.contentType== 'TEMPLATE'){

        let app = this.props.appsList.apps.filter(app => app._id == item.mediaId);
        console.log('==app',app);
        if(app && app.length>0){
        app = app[0];
         item["original"] = app && app.thumb ? (BASE_SERVER + app.thumb.replace('app-thumbnail','/thumb')) : (BASE_SERVER +'/thumb/'+ app._id+'.png');
         item["thumbnail"]= item["original"];
         item["name"] = app.appName;
         console.log('==app thumbnail',item["original"]);
         }
      }
      else if(item.contentType== 'WEBPAGE'){
          item["original"]= BASE_SERVER +"/thumb/www.png";
         item["thumbnail"]= item["original"];
         item["name"] = item.mediaId;
      }
      console.log('item', item);
      let playlistItem = {};
      playlistItem._id = item._id;
      playlistItem.listIndex = item.listIndex;
      playlistItem.mediaId = item.mediaId;
      playlistItem.duration = new Date(item.duration * 1000).toISOString().substr(11, 8);
      playlistItem.original = item.original;
      playlistItem.thumbnail = item.thumbnail;
      playlistItem.isIncluded = true;
      playlistItem.name = item.name;
      playlistItem.contentType = item.contentType;
    console.log('plitem', playlistItem);
      return playlistItem;
    });
    console.log('selected playlist', playlistItemsArr);
    let updatedPlaylist = Object.assign([],this.state.playlistItems);
        updatedPlaylist = updatedPlaylist.concat(playlistItemsArr);
        this.setState({
         playlistItems: updatedPlaylist
        });
}

getPickerContent(){
        console.log('picker launch',this.state.pickerType);
        if(this.state.pickerType=='LIBRARY'){
        return <div className='inner-pop'> <PickerPopup  
              closePicker={this.closePicker}
              onSelect = {this.onMediaSelected}
              user= {this.props.user}
              common = {this.props.common}
          /> </div>
          }
        else if(this.state.pickerType == 'TEMPLATES'){
      
         return (<div className='inner-pop'><TemplatePg
                        closeModalPopup={this.closePicker}
                        onSelect = {this.onTemplateSelected}
                        user= {this.props.user}
                        common = {this.props.common}
                        appsList = {this.props.appsList}
        />

        </div>);
        }
        else if(this.state.pickerType == 'WEBPAGE'){
      
         return (<div className='inner-pop'><WebpageContainer
                        closeModalPopup={this.closePicker}
                        onSave = {this.onWebpageAdd}
                        themeColor={this.props.themeColor}
                        
        />

        </div>);
        }
        else if(this.state.pickerType == 'DURATION_PICKER'){
      
         return (this.showDurationPicker());
        }
}


showDurationPicker(){
    console.log('duration',this.duration);
    if(this.duration){
      let dur= this.duration.split(':');
      this.rowHr = dur[0];
      this.rowMnt= dur[1];
      this.rowSec = dur[2];
    }
    return <div style={{padding:'20px'}}>
            <h4>Set duration for media selected-</h4>
            <label>Scroll or Drag to change respective section</label>
            <div style={{margin:'20px 5px'}}>
            <DurationPicker
            onChange={this.onDurationChange}
            initialDuration={{ hours: this.rowHr, minutes: this.rowMnt, seconds: this.rowSec }}
            maxHours={23}
            />
            </div>
            <div style={{float:'right'}}><button
              onClick={ e => this.closePicker() }
              className="btn-primary-link"
              style={{paddingRight:'10px'}}
              > CANCEL
              </button>
              <button
              onClick={ e => this.closePicker() }
              className="btn-primary-btn"
              style={{paddingRight:'10px',color:'#ccc'}}
              > OK
              </button></div> 
              </div>
}


onSortMove(event){
  console.log(event);
  event.node.style.visibility='visible';
  event.node.style.opacity=0.4;
  event.node.style.zIndex=9999999;
}

onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({playlistItems}) => ({
      playlistItems: arrayMove(playlistItems, oldIndex, newIndex)
    }));
};

renderAddNew(){
    if(true){
      return (<div style={{textIndent:'2px',wordSpacing: '-2px',padding:'0px',position:'fixed',right: '20px',bottom: '10px'}}>
        <button
      onClick={ e => this.props.closeModalPopup() }
      className="btn-primary-link"
      style={{paddingRight:'10px'}}
      > CANCEL
      </button>
    <span className='menu-arrow glyphicon upside-options optionbtn ' style={{marginRight:'10px'}}>
    <span  className="glyphicon glyphicon-plus" style={{color:this.props.themeColor}}></span>
    <Dropdown autoOpen= {true} arrowClassName='' className={'player-drop'}>
      <Dropdown.Toggle title={"ADD"} style={{color:this.props.themeColor}} />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
             <MenuItem  onClick={()=>this.launchPicker('WEBPAGE')}>
              <span>WEB PAGE</span>
            </MenuItem>
            <MenuItem  onClick={()=>this.launchPicker('TEMPLATES')}>
              <span>TEMPLATES</span>
            </MenuItem>
           
            {false && <MenuItem  onClick={()=>this.launchPicker('PUB-GALLERY')}>
              <span>PUBLIC LIBRARIES</span>
            </MenuItem>}
            <MenuItem  onClick={()=>this.launchPicker('LIBRARY')}>
              <span>LIBRARY</span>
            </MenuItem>
        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown>
    </span>
    </div>
    );
    }
    
    }

renderSave(){
      console.log('playlist length', this.state.playlistItems);
      let _self = this;
      let themeColor = _self.props.themeColor;
      return (
       <div>{_self.isPortrait ? (<button style={{textIndent:'2px',wordSpacing:'-2px',float: 'right',marginBottom:'10px',backgroundColor:themeColor}}
        className="btn btn-primary" 
        onClick={()=>_self.savePlaylist()}
        disabled={(!_self.state.playlistName || this.state.playlistItems.length==0)?true:false} >
        SAVE
        </button>):(<button style={{textIndent:'2px',wordSpacing: '-2px',position:'absolute',right: '30px',top: '10px',backgroundColor:themeColor}}
        className="btn btn-primary" 
        onClick={()=>_self.savePlaylist()}
        disabled={(!_self.state.playlistName || this.state.playlistItems.length==0)?true:false} >
        SAVE
        </button>)}</div>
      );
    }

removeItem(itemIndex){
    let playlistItems = Object.assign(this.state.playlistItems);
    let removedItem = playlistItems.splice(itemIndex,1);
    if(removedItem[0]._id){
      this.removedItems.push(removedItem[0]._id);
    }
    this.setState({
      playlistItems : playlistItems
    });
}

onDurationChange(e){
   console.log('selected', e);
   this.rowHr= e.hours;
   this.rowMnt=e.minutes;
   this.rowSec = e.seconds;
}

onMediaSelected(selectedMediaIdsArr,mediaList){
      console.log('selected media', selectedMediaIdsArr);
      console.log('list',mediaList);
      let mediaArr = mediaList;
      let selctedPlayListArr = selectedMediaIdsArr.map(mediaId => {
      let media = mediaArr.filter(media => media._id === mediaId);
      
      media[0].original= BASE_SERVER + "/preview/" + media[0].userId + "/" + media[0].original_file_name;
      media[0].thumbnail= BASE_SERVER + "/preview/" + media[0].userId + "/thumbnails/" + media[0].base64_data;
      
      let playlistItem = {};
      playlistItem.mediaId = media[0]._id;
      playlistItem.duration = "00:00:20";
      playlistItem.original = media[0].original;
      playlistItem.thumbnail = media[0].thumbnail;
      playlistItem.isIncluded = true;
      playlistItem.tags = media[0].tags;
      playlistItem.name = media[0].title?media[0].title:media[0].original_file_name;
      playlistItem.contentType = this.getMediaType(media[0].original_file_name);

      return playlistItem;
    });
    console.log('selected playlist', selctedPlayListArr);
    let updatedPlaylist = Object.assign([],this.state.playlistItems);
        updatedPlaylist = updatedPlaylist.concat(selctedPlayListArr);
        this.setState({
         playlistItems: updatedPlaylist
        });
}

onTemplateSelected(app){
   let appThumbnail = app && app.thumb ? (BASE_SERVER + app.thumb.replace('app-thumbnail','/thumb')) : (BASE_SERVER +'/thumb/'+ app._id+'.png');
  let playlistItem = {};
      playlistItem.mediaId = app._id;
      playlistItem.duration = "00:00:50";
      playlistItem.original = appThumbnail;
      playlistItem.thumbnail = appThumbnail;
      playlistItem.isIncluded = true;
      playlistItem.tags = "";
      playlistItem.name = app.appName;
      playlistItem.contentType = "TEMPLATE";
      let updatedPlaylist = Object.assign([],this.state.playlistItems);
      updatedPlaylist.push(playlistItem);
      this.setState({
         playlistItems: updatedPlaylist
        });
     this.props.moveToLive(app);
}

onWebpageAdd(address){
  let wwwThumbnail = BASE_SERVER +"/thumb/www.png";
  let playlistItem = {};
      playlistItem.mediaId = address;
      playlistItem.duration = "00:00:40";
      playlistItem.original = wwwThumbnail;
      playlistItem.thumbnail = wwwThumbnail;
      playlistItem.isIncluded = true;
      playlistItem.tags = "";
      playlistItem.name = address;
      playlistItem.contentType = "WEBPAGE";
      let updatedPlaylist = Object.assign([],this.state.playlistItems);
      updatedPlaylist.push(playlistItem);
      this.setState({
         playlistItems: updatedPlaylist
        });
}

toggleIsIncluded(e,index){
  e.stopPropagation();
  let playlist = Object.assign([],this.state.playlistItems);
  playlist[index].isIncluded = !playlist[index].isIncluded;
   this.setState({
    playlistItems : playlist
   });
}

renderAndvanceL(value,sortIndex){
 return (<div className='item-row'>
        <span className='item col-sm-2 col-lg-1 col-md-1'><a style={{paddingTop:'10px',color:'#099b90',textDecoration:'none'
,    display:'flex',fontSize: '0.8em',fontWeight:'bold'}} href="#" onMouseUp={(e)=> this.toggleIsIncluded(e, sortIndex)}>{sortIndex+1 }&nbsp; <span style={{width:'18px',marginRight:'5px'}} className={value.isIncluded?'checked-box':'uncheck-box'}></span></a></span>
     
        <span className='item col-sm-11 col-lg-2 col-md-2'>
        <img  src={value.thumbnail}/>
        {value && value.mediaType &&value.mediaType.toLowerCase()=='video'&& 
    <span className='video-icon-gal'></span>}
      {value && value.mediaType && value.mediaType.toLowerCase()=='template'&& 
    <span  className={"temp-icon"} ></span>}
        </span>
        <span className='item col-sm-11 col-lg-3 col-md-3 media-name'>
          <label>{value.name}</label>
          <p>{value.mediaType}</p>
          <p>{value.tags}</p>
        </span>
        
        <span  className='item col-sm-11 col-lg-1 col-md-1'>Covid -19</span>
        <span  className='item col-sm-11 col-lg-1 col-md-1'>$2</span>
        <span className='item col-sm-11 col-lg-2 col-md-2'>
       <span className="glyphicon glyphicon-time"  onMouseUp={()=>this.launchPicker('DURATION_PICKER',sortIndex,value.duration)}> {value.duration}</span>
        
        </span>
        <span className='item col-sm-2 col-lg-2 col-md-2'><span  style={{right:'-25px'}} className="glyphicon glyphicon-remove" onMouseUp={(e) => this.confirmRemoveItem(value.name,sortIndex,value.duration)} ></span></span>
      </div>);
}


renderDefaultL(value,sortIndex){
  return (<div className='item-row'>
        <span className='item col-sm-2 col-lg-1 col-md-1'>{sortIndex+1 }</span>
        <span className='item col-sm-11 col-lg-3 col-md-3'>
        <img  src={value.thumbnail}/>
        {value.contentType.toLowerCase()=='video'&& 
    <span className='video-icon-gal'></span>}
      {value.contentType.toLowerCase()=='template'&& 
    <span  className={"temp-icon"} ></span>}
        </span>
        <span className='item col-sm-11 col-lg-4 col-md-4 media-name'>
        <label>{value.name}</label>
        <p>{value.contentType}</p></span>
       
        <span className='item col-sm-11 col-lg-2 col-md-2'>
        <span className="glyphicon glyphicon-time"  onMouseUp={()=>this.launchPicker('DURATION_PICKER',sortIndex,value.duration)}> {value.duration}</span>
        
        </span>
        <span className='item col-sm-2 col-lg-2 col-md-2'><span  style={{right:'-25px'}} className="glyphicon glyphicon-remove" onMouseUp={(e) => this.confirmRemoveItem(value.name,sortIndex)} ></span></span>
      </div>);
}

renderAndvanceP(value,sortIndex){
    return (<div className='port-root'>
        <span className='item-row'><a style={{paddingTop:'10px',color:'#099b90',textDecoration:'none'
,    display:'flex',fontSize: '0.8em',fontWeight:'bold'}} href="#" onMouseUp={(e)=> this.toggleIsIncluded(e, sortIndex)}>{sortIndex+1 }&nbsp; <span style={{width:'18px',marginRight:'5px'}} className={value.isIncluded?'checked-box':'uncheck-box'}></span></a>INCLUDE</span>
     
        <span className='item-row'>
          <img src={value.thumbnail}/>
          {value.contentType.toLowerCase()=='video'&& 
    <span className='video-icon-gal'></span>}
      {value.contentType.toLowerCase()=='template'&& 
    <span  className={"temp-icon"} ></span>}
        </span>
        
        <span className='item-row media-name'><span className='header'>{'MEDIA NAME/ TAGS'}</span>
          <label>{value.name}</label>
          
          <p>{value.contentType}</p>
          <p>{value.tags}</p>
        </span>
        
        <span  className='item-row'><span className='header'>{'CATEGORY '}</span>Covid -19</span>
        <span  className='item-row'><span className='header'>{'COST '}</span> $2</span>
        <span className='item-row'><span className='header'>{'DURATION'}</span> 
        <span className="glyphicon glyphicon-time"  onMouseUp={()=>this.launchPicker('DURATION_PICKER',sortIndex,value.duration)}> {value.duration}</span>
        <span className='item col-sm-2'><span  style={{right:'-25px'}} className="glyphicon glyphicon-remove" onMouseUp={(e) => this.confirmRemoveItem(value.name,sortIndex)} ></span></span>
        </span>
        
      </div>);
}


renderDefaultP(value,sortIndex){
return (<div className='port-root'>
        
        <span className='item-row'>{sortIndex+1 }
        <img  src={value.thumbnail}/>
        {value.mediaType.toLowerCase()=='video'&& 
    <span className='video-icon-gal'></span>}
        </span>
        <span className='item-row media-name'>
        <span className='header'>{'MEDIA NAME'}</span>
        <label>{value.name}</label>
        <p></p></span>
       
        <span className=' item-row'>
        <span className='header'>{'DURATION'}</span>
        <span className="glyphicon glyphicon-time" onMouseUp={()=>this.launchPicker('DURATION_PICKER',sortIndex,value.duration)}> {value.duration}</span>
        <span className=' col-sm-2'><span  style={{right:'-25px'}} className="glyphicon glyphicon-remove" onMouseUp={(e) => this.confirmRemoveItem(value.name,sortIndex)} ></span></span>
        </span>
        
      </div>);
}


render() {

const SortableItem = SortableElement(({value,sortIndex}) => <li className='item-row'  >
        {!this.isPortrait && this.props.user.config.settings.isGalleryAdvanced && this.renderAndvanceL(value,sortIndex)}
        {!this.isPortrait && !this.props.user.config.settings.isGalleryAdvanced && this.renderDefaultL(value,sortIndex)}
        {this.isPortrait && this.props.user.config.settings.isGalleryAdvanced && this.renderAndvanceP(value,sortIndex)}
        {this.isPortrait && !this.props.user.config.settings.isGalleryAdvanced && this.renderDefaultP(value,sortIndex)}    
      
    </li>);

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((item, index) => (
        <SortableItem  key={item.mediaId+index}  helperClass ={'SortableHelper'} sortIndex={index} index={index} value={item}  />
      ))}
    </ul>
  );
});

  console.log('New playlist items');
  return (
    <div className='movable' style={{height:'100%'}}>
      <h3 style={{padding:'0px',margin:'5px',textAlign:'center'}}> PLAYLIST : <span style={{color:'#000'}}>{this.state.playlistName}</span> </h3>
          {this.renderSave()}
          
      <div className='container' >
      {!this.isPortrait && (this.props.user.config.settings.isGalleryAdvanced ? 
        <div className='header-row'>
        <span  className='item col-sm-2 col-lg-1 col-md-1'>#/INCLUDE</span>
        <span  className='item col-sm-3 col-lg-2 col-md-2'>MEDIA THUMBNAIL</span>
        <span  className='item col-sm-3 col-lg-3 col-md-3'>NAME/FORMAT/RATINGS/TAGS</span>
        
        <span  className='item col-sm-2 col-lg-1 col-md-1'>CATEGORY</span>
        <span  className='item col-sm-2 col-lg-1 col-md-1'>COST</span>
        <span  className='item col-sm-2 col-lg-2 col-md-2'>DURATION<br/><label style={{color:'#1f7e84',margin:'0px'}}>hh:mm:ss</label></span>
        <span  className='item col-sm-2 col-lg-2 col-md-2'>ACTION</span>
      </div> : 
        <div className='header-row'>
        <span  className='item col-sm-2 col-lg-1 col-md-1'>#</span>
        <span  className='item col-sm-3 col-lg-3 col-md-3'>MEDIA THUMBNAIL</span>
        <span  className='item col-sm-3 col-lg-4 col-md-4'>NAME&FORMAT</span>
        <span  className='item col-sm-2 col-lg-2 col-md-2'>DURATION<br/><label style={{color:'#1f7e84',margin:'0px'}}>hh:mm:ss</label></span>
        <span  className='item col-sm-2 col-lg-2 col-md-2'>ACTION</span>
      </div>)} 


      <div style={{width:'100%',height:'100%'}} className={this.state.isPickerActive?'hidden':''}>
        {this.state.playlistItems.length>0?<SortableList 
          items={this.state.playlistItems} 
          onSortEnd={this.onSortEnd} 
          style={{zIndex: 99999999}}
          helperClass ={'SortableHelper'}
        /> : <div style={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>{this.state.playlistName?<label>Please click '+ADD' link below to add items into your playlist.</label>:""}</div>}
      </div>
      
      </div>
      {this.renderAddNew()}
      
     <ModalLocal 
        style={{top:'0%',bottom:'0%',transform:'translate(-50%,0%)'}}  
        className={this.state.isPickerActive && this.state.pickerType!='DURATION_PICKER' ?"modal-local modal-default modal-large col-lg-12 col-md-12 col-sm-12 ":"modal-local modal-default "} 
        isOpen={this.state.isModalOpen} >
        {this.getPickerContent()}
        
          <span  
            style={{position:'fixed', top:'-20px', right:'1px',background:'#e7e5e5',borderRadius:'11px',padding:'2px'}} 
            className="glyphicon glyphicon-remove" 
            onClick={(e) => this.closePicker()} 
          >
          </span>

    </ModalLocal>
    </div>
  
  )
}
}


export default PlaylistEditor;


