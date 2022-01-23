import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router-dom';
import emptyPlaylist from '../assets/playlist-active.svg';
import  { Tabs,Pane } from './Tabs';
import emptyScreen from '../assets/signage-empty.png';
import {BASE_SERVER, LOCAL_SERVER} from '../constants/Config';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {Loading,Title,Error} from './commonDumbs';
import ModalLocal from './modal-local';
import Search from './search/SearchContainer.js';
import PlaylistEditorPopup from './playlist-editor/PlaylistEditorPopup.js';
import Dropdown, {
          DropdownToggle,
          DropdownMenu,
          DropdownMenuWrapper,
          MenuItem,
          DropdownButton
} from '@trendmicro/react-dropdown';

class Playlists extends Component {

  constructor(){
    super();
    this.state = {
      isPlaylistEditor:false,
      modalOpen: false,
      editPlayListDetails : null,
      selectedPlaylistId: "",
      searchText:''
    };

    this.togglePlaylistEditor = this.togglePlaylistEditor.bind(this);
    this.closeEditorPopup = this.closeEditorPopup.bind(this);
    this.toggleEmbed = this.toggleEmbed.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.getTemplateItem = this.getTemplateItem.bind(this);
    this.isSelectView = false;
    this.isEmbedView=false;
    this.onSearchChange = this.onSearchChange.bind(this);
  }

componentWillMount() {
    this.props.resetMe();
    this.isSelectView =this.props.common.selectedConsole == 'PLAYLISTS'? false:true;
  }

componentDidUpdate(prevProps){
      if(this.props.playlists.playList.items.length >0 && this.state.isPlaylistEditor && !this.state.modalOpen )
      { 
        let editPlayListDetails = Object.assign({},this.state.editPlayListDetails);
        editPlayListDetails.items = this.props.playlists.playList.items;
        this.setState({
            editPlayListDetails: editPlayListDetails,
            modalOpen: true
        });
        
      }
      if(!prevProps.playlists.newPlaylist.details && this.props.playlists.newPlaylist.details && this.props.playlists.newPlaylist.details._id){
        this.confirmPublish();
      }

      let publishPop = document.getElementsByClassName('react-confirm-alert-button-group');
    if(publishPop && publishPop.length>0 && publishPop[0].children){
    publishPop[0].children[0].style.color=this.props.user.config.settings.color_primary;
    publishPop[0].children[1].style.backgroundColor=this.props.user.config.settings.color_primary;
  }

}

confirmPublish= () => {
      let content = JSON.parse(JSON.stringify(this.props.playlists.newPlaylist.details));
      content.contentType = 'PLAYLIST';
      confirmAlert({
        title: 'Ready To Publish?',                      
        message: 'Do you want to continue editing or Ready to publish into screens?', 
        childrenElement: () => <div></div>,       
        confirmLabel: 'PUBLISH',                           
        cancelLabel: "EDIT MORE",                             
        onConfirm: () => { this.props.toggleRootModal("PUBLISH",content);this.togglePlaylistEditor();},    
        onCancel: () => {this.props.resetNewPlaylist()},      
      });
}

confirmDelete= (playlist) => {
      confirmAlert({
        title: 'WARNING!!',                        // Title dialog
        message: 'Do you want to delete playlist -"'+playlist.playlistName+'"?',
        childrenElement: () => <div></div>,       // Custom UI or Component
        confirmLabel: 'DELETE',                           // Text button confirm
        cancelLabel: 'CANCEL',                             // Text button cancel
        onConfirm: () => this.props.deletePlaylist(playlist._id),    // Action after Confirm
        onCancel: () => console.log("Cancelled delete")     // Action after C
      })
};

isSearchPlaylist(playlist){
  let userby= this.props.usersList && this.props.usersList.users.filter(user => user._id == playlist.userId);
  userby = userby && userby.length>0 ? userby[0] : null;

  let searchTxt = this.state.searchText.toLowerCase();
  if( playlist.playlistName.indexOf(searchTxt)!= -1 || (userby && userby.name.toLowerCase().indexOf(searchTxt) != -1) ){
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

removeApp(playlist){
    if(playlist)
    {
   this.props.removingApp(playlist);
    
    }
}

getPlaylistDetails(playlist){
    this.setState({
    editPlayListDetails: playlist,
    isPlaylistEditor: true,
    selectedPlaylistId: playlist._id
    });
    this.props.fetchPlaylist(playlist._id);
}

togglePreview(){
      this.setState({
        modalOpen:!this.state.modalOpen
      });
      
}

toggleEmbed(playlistId){
    this.isEmbedView = playlistId;
    this.togglePreview();
}

setSelection(evt,playlistId,content){
    let selectedPlaylist = this.state.selectedPlaylistId==playlistId? "":playlistId;
    this.setState({
      selectedPlaylistId:selectedPlaylist
    });
    if(selectedPlaylist){
      let player = this.props.selectedPlayer;
      player.appId = content._id;
      player.orientation= content.orientation;
      player.contentType= 'PLAYLIST';
      this.props.publishToSreens([player]);
      this.props.closeModalPopup();
      
    }
}

savePlaylist(playListObj){
      console.log('saving playlist', playListObj);
      if(playListObj._id){
        this.props.updatePlaylist(playListObj);
      }else{
        this.props.saveNewPlaylist(playListObj);
      }
  }
    
getTemplateItem(playlist){
    console.log('playlist shareing', playlist);
    let appThumbnail = playlist.thumbnail;
    let content = playlist;
    let user = this.props.user.user;
    content.name = playlist.playlistName;
    content.contentType='PLAYLIST';

    let userby= this.props.usersList && this.props.usersList.users.filter(user => user._id == playlist.userId);
    userby = userby && userby.length>0 ? userby[0] : null;

    return (
      <li className="col-xs-12 col-sm-6 col-md-4 col-lg-3 list-group-item rect" key={playlist._id}>

      <div className="thumbnail apps" >
      <img style={{width:'100%'}} src={appThumbnail} alt="242x160" onClick={this.isSelectView ?(evt)=>(this.setSelection(evt,playlist._id,content)): ()=>this.getPlaylistDetails(playlist)}/>
      {!this.isSelectView?
      <span className='menu-dots upside-options'>
          <Dropdown autoOpen= {true} arrowClassName='menu-dots-inner' className={'player-drop'}>
      <Dropdown.Toggle title="" />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            <MenuItem  onClick={()=>{this.confirmDelete(playlist)}}>
              <span className="glyphicon glyphicon-trash"  ></span><span>DELETE</span>
            </MenuItem>

           {<MenuItem  onClick={() => {this.toggleEmbed(playlist._id)}}>
              <span  className="glyphicon glyphicon-embed">{'</>'}</span>
              <span>EMBED URL</span>
            </MenuItem>}
            
            {false && <MenuItem  onClick={()=>true} >
             <span className="glyphicon glyphicon-duplicate" data-tip="Make duplicate" ></span>
             <span>MAKE A COPY</span>
            </MenuItem>}

            {false && <MenuItem onClick={()=>this.togglePreview()}>
             <span className="glyphicon glyphicon-eye-open ">
             </span>
             <span>PREVIEW</span>
            </MenuItem>}

            <MenuItem  onClick={(e)=>{this.props.toggleRootModal("SHARE",playlist)}}>
              <span className="glyphicon glyphicon-share-alt"  ></span>
                <span>SHARE</span>
            </MenuItem>

             {<MenuItem onClick={(evt)=>this.props.toggleRootModal('PUBLISH',content)}>
                <span className="glyphicon glyphicon-send"></span>
                <span>{'PUBLISH'}</span>
            </MenuItem>}

            {<MenuItem  onClick={()=>this.getPlaylistDetails(playlist)}>
              <span className="glyphicon glyphicon-pencil">
              </span>
              <span>EDIT PLAYLIST</span>
            </MenuItem>}

        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>
        :

      <span className={this.state.selectedPlaylistId == playlist._id?'checked-box selected-check':'uncheck-box select-check'} onClick={(e)=> (this.setSelection(e,playlist._id,content))}>
      </span>}

      <div className="caption center-btn">
      <label>{false&&<span className={playlist.status=='DRAFT'?'draft-icon':''}></span>}{playlist.playlistName}</label>

      {user.admin && <span style={{fontSize:'0.8em',position:'absolute',left:'15px',bottom: '11px'}}>{'By: '+(userby && userby.name?userby.name:'Not found') }</span>}
      </div>
      </div>
      </li>
    )
  }

renderPlaylists(playlists) {
    let playlistItems;
    playlistItems = playlists.filter(playlist => this.isSearchPlaylist(playlist)).map((playlist) => this.getTemplateItem(playlist));
    return playlistItems;
  }

closeEditorPopup(){
  try{
  if(this.state.modalOpen){
        this.props.resetMe();
        this.isEmbedView = false;
      }
      this.setState({
        modalOpen:false,
        isPlaylistEditor: false,
        editPlayListDetails : false
      });

    var svg = document.getElementById('react-confirm-alert-firm-svg');
    svg.parentNode.removeChild(svg);
    document.body.children[0].classList.remove('react-confirm-alert-blur');
    var target = document.getElementById('react-confirm-alert');
    target.parentNode.removeChild(target);
  }
  catch(e){
    console.log(e);
  }
}

togglePlaylistEditor(isSchedule){
      console.log('closing editor');
      if(this.state.modalOpen){
        this.props.resetMe();
      }
      this.setState({
        modalOpen:!this.state.modalOpen,
        isPlaylistEditor: !this.state.isPlaylistEditor,
        editPlayListDetails : this.state.modalOpen?null: this.state.editPlayListDetails
      });

}

getModalContent(){
  if(this.state.isPlaylistEditor){
  return (<div style={{height:'100%'}}><PlaylistEditorPopup 
                  closeModalPopup={this.closeEditorPopup}
                  common = {this.props.common}
                  user= {this.props.user}
                  appsList = {this.props.appsList}
                  theme={this.props.user.config.settings.color_primary}
                  savePlaylist = {this.savePlaylist}
                  moveToLive = {this.props.moveToLive}
                  removePlaylistItems = {this.props.removePlaylistItems}
                  playListDetail = {this.state.editPlayListDetails}
         /></div>);
  }
  else if(this.isEmbedView){

      return (<div style={{padding:'20px'}}><h2>Get playlist from below url and embed to your source:</h2>
      <h4 style={{color:'#146bef'}}><a target='blank' href={BASE_SERVER+'/api/playlist-items/'+this.isEmbedView}>{BASE_SERVER+'/api/playlist-items/'+this.isEmbedView}</a></h4>
      <span>Items from playlist, can be used as source to video element as:</span>
      <span style={{color:'#146bef'}}> {BASE_SERVER+'/preview/'+this.props.user.user._id+'/{your media file name}'}</span>
      </div>);
  }
}

goToDashboard(evt) {
    evt && evt.preventDefault();
    this.props.changeConsole('LANDING');
  }

renderEmptyCreate(){
    return (
    <div className="center-item " >
        <span className='glyphicon glyphicon-list' style={{fontSize:'5em',marginBottom:'20px'}}></span>
        <div style={{textAlign:'center'}}>
        <div><label>Let's make your first playlist...</label></div>
        <button style={{display:'inline-block',marginTop:'3px',backgroundColor:this.props.user.config.settings.color_primary}}
      className="btn btn-primary" onClick={()=>this.togglePlaylistEditor()} >
      <span  className="glyphicon glyphicon-plus inline-icon"></span>Create New Playlist
      </button>
        </div>
        </div>
    )
}

renderCreateNewDD(){
    return (
    <button style={{padding:'0px',wordSpacing:'-2px',textIndent:'2px',color:this.props.user.config.settings.color_primary}}
      className="btn-primary-link" onClick={()=>this.togglePlaylistEditor()} >
      <span  className="glyphicon glyphicon-plus inline-icon"></span>CREATE NEW PLAYLIST
      </button>
    );
    }
  

  render() {
    const { lists, loading, error} = this.props.playlists.allPlaylist;
    console.log('playlist',this.props);
    let user = this.props.user.user;
    let playlistsArr =  lists? lists:[];
    return (
      <div className="title-container">
        
        {this.isSelectView?<h2 className="header-title">Select Playlist</h2>:
        <h2 className="header-title">Playlists</h2>
        }
        <Search 
          changeConsole = {this.props.changeConsole} 
          onSearchChange = {this.onSearchChange}
        />
        
        <div className="search-bar">
          {!user.admin && playlistsArr.length>0 ?
          this.renderCreateNewDD():<span></span>}
          
        </div>

        <div>
          {playlistsArr.length>0 ? 
            <ul className='panel-body'>
            {this.renderPlaylists(playlistsArr)}
            </ul>
            :
            <div>{!user.admin ?this.renderEmptyCreate():"No Playlist found!!"}</div>
            }
        </div>
        
        {this.props.user.config.settings.isGalleryAdvanced ?
        <ModalLocal  className={this.state.isPlaylistEditor?"modal-local modal-default modal-large col-lg-11 col-md-12 col-sm-12":"modal-local modal-default"} isOpen={this.state.modalOpen} >
          {this.getModalContent()}
          <span  style={{position:'fixed',top:'-20px', right:'1px',background:'#e7e5e5',borderRadius:'11px',padding:'2px'}} className="glyphicon glyphicon-remove" onClick={(e) => this.closeEditorPopup(false)} >
          </span>
        </ModalLocal>:
        <ModalLocal  className={this.state.isPlaylistEditor?"modal-local modal-default modal-large col-lg-8 col-md-11 col-sm-12":"modal-local modal-default"} isOpen={this.state.modalOpen} >
          {this.getModalContent()}
          <span  style={{position:'fixed',top:'-20px', right:'1px',background:'#e7e5e5',borderRadius:'11px',padding:'2px'}} className="glyphicon glyphicon-remove" onClick={(e) => this.closeEditorPopup(false)} >
          </span>
        </ModalLocal>}

    </div>
    );
  }
}


export default Playlists;


