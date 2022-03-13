import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import { BASE_SERVER, LOCAL_SERVER } from '../constants/Config';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { Loading, Title, Error, CategoriesPopup, CheckBox } from './commonDumbs';
import ModalLocal from './modal-local';
import ReactTooltip from 'react-tooltip';
import FileDrop from 'react-file-drop';
import { Tabs, Pane } from './Tabs';
import FileUploadProgress from "./upload_lib/index";
import { toast } from 'react-toastify';
import ImageGallery from "react-image-gallery";
import Search from './search/SearchContainer.js';
import Dropdown, {
  DropdownToggle,
  DropdownMenu,
  DropdownMenuWrapper,
  MenuItem,
  DropdownButton
} from '@trendmicro/react-dropdown';

const options = [
  { value: 'all', label: 'Type All' },
  { value: 'image', label: 'IMAGES' },
  { value: 'video', label: 'VIDEOS' },
  { value: 'audio', label: 'AUDIOS' },
  { value: 'other', label: 'OTHERS' },
];

class Gallery extends Component {

  constructor() {
    super();
    this.state = {
      gallery: [],
      modalOpen: false,
      isPublicGallery: false,
      isPublicMedia: false,
      isFreeToUse: true,
      isMoveToCommon: false,
      isSponsored: false,
      galleryFilter: 'all',
      isUploadActive: false,
      uploadPercent: 0,
      isUploading: false,
      uploadError: null,
      showcategory: false,
      isSelectActive: false,
      isCollapseAll: false,
      selectedMedia: [],
      playVideoThumb: "",
      playAudioThumb: "",
      selectThumbMedia: "",
      uploadFolderId: "",
      userIds: "",
      showAddNewFolderInput: false,
      toggleExpand: {},
      gallerySelectedFolderIndex: 0,
      selectedMediaDetailsFor: {},
      searchText: ''
    };

    this.xhr = null;
    this.dragUploadIndex = 0;
    this.draggedFiles = null;
    this.uploadURL = BASE_SERVER + "/api/user/media";
    this.uploadFile.bind(this);
    this.toggleModal.bind(this);
    this.previewPath = '';
    this.thumbClickHandler = this.thumbClickHandler.bind(this);
    this.renderMedia = this.renderMedia.bind(this);
    this.showAddNewFolder = this.showAddNewFolder.bind(this);
    this.createNewFolder = this.createNewFolder.bind(this);
    this.togglePubMedia = this.togglePubMedia.bind(this);
    this.toggleMoveToCommon = this.toggleMoveToCommon.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.getFilteredMedia = this.getFilteredMedia.bind(this);
    this.themecolor = '#000';
  }
  componentWillMount() {
    this.props.resetMe();
  }

  componentDidMount() {
    this.props.getFolders();
    this.getFilteredMedia(this.state.galleryFilter);

    if (this.props.selectView) {
      this.setState({
        isSelectActive: this.props.selectView
      })
    }
    document.addEventListener('mousemove', this.onMouseMove, false);

  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.user.mymedia.mediaList && (prevProps.user.mymedia.mediaList.length != this.props.user.mymedia.mediaList.length) || JSON.stringify(prevState.selectedMedia) != JSON.stringify(this.state.selectedMedia) ||
      (prevState.searchText !== this.state.searchText)
    ) {
      console.log('filtering  media list');
      this.getFilteredMedia(this.state.galleryFilter);
      this.themecolor = this.props.user.config.settings.color_primary;
    }

  }

  onMouseMove(e) {
    document.removeEventListener('mousemove', this.onMouseMove, false);
    let imgSliders = document.getElementsByClassName('image-gallery-thumbnails-container');
    for (let i = 0; i < imgSliders.length; i++) {
      imgSliders[i].style.overflow = 'hidden';
      imgSliders[i].style.overflowX = 'scroll';
    }
  }

  collapseToggle(e, folderName) {
    console.log(folderName);
    let folders = this.state.toggleExpand;
    folders[folderName] = !folders[folderName];
    this.setState({
      toggleExpand: folders
    });
  }

  isSearchMedia(media) {

    if ((media.title && media.title.toLowerCase().indexOf(this.state.searchText.toLowerCase()) != -1) || media.original_file_name.toString().indexOf(this.state.searchText) != -1
      || media.tags.toLowerCase().indexOf(this.state.searchText.toLowerCase()) != -1
      || media.mediaDesc.toLowerCase().indexOf(this.state.searchText.toLowerCase()) != -1
    ) {
      return true;
    } else {
      return false;
    }

  }

  onSearchChange(e) {
    this.setState({
      searchText: e.target.value
    });
  }

  tooltiphide() {
    try {
      document.getElementsByClassName('__react_component_tooltip show place-top type-light customTheme')[0].style.visibility = 'hidden';
      document.getElementsByClassName('__react_component_tooltip show place-top type-light customTheme')[0].style.display = 'none !important';
    } catch (e) {
      console.log(e);
    }
  }

  manageChecks(e, playerId) {
    e.preventDefault();
    console.log(e.target);
    if (e.target.tagName.toLowerCase() == 'span') {
      e.target.className = e.target.className == 'uncheck-box' ? 'checked-box' : 'uncheck-box';
      this.selectedPlayers.indexOf(playerId) != -1 ? this.selectedPlayers.splice(1, this.selectedPlayers.indexOf(playerId)) : this.selectedPlayers.push(playerId);
      console.log(this.selectedPlayers);
    }
    return true;
  }

  toggleCollapseAll() {
    let folders = {};
    if (!this.state.isCollapseAll) {
      this.props.user.folders.folderList.map(folder => folders[folder.folder_name] = true);
    }
    this.setState({
      toggleExpand: folders,
      isCollapseAll: !this.state.isCollapseAll
    });

  }

  toggleModal(evt, path) {
    evt && evt.preventDefault();
    this.previewPath = path;

    //content - "PREVIEW"/ "MYMEDIA"
    this.setState({
      modalOpen: !this.state.modalOpen,
      isUploadActive: !this.state.isUploadActive,
      uploadError: '',
      isFreeToUse: true,
      isPublicMedia: false,
      isSponsored: false
    });
    this.dragUploadIndex = 0;
    evt && evt.stopPropagation();
    // return true;
  }

  toggelUpload(evt) {

    this.setState({
      isUploadActive: !this.state.isUploadActive,
      uploadError: '',
      isFreeToUse: true,
      isPublicMedia: false,
      isSponsored: false
    });

    this.toggleModal(evt, 'upload');

  }

  toggleMoveToCommon() {
    this.setState({
      isMoveToCommon: !this.state.isMoveToCommon
    });
  }

  confirmProcessVideo = (e, media) => {
    confirmAlert({
      title: 'ARE YOU SURE?',                        // Title dialog
      message: 'Do you want to processed the file- ' + media.original_file_name + '?',               // Message dialog
      childrenElement: () => <div className='sub-info'>If video is not playing, it will be process in proper supported format. Once completed, a duplicate file will be created with prefix 'processed-{"media name"}'  </div>,       // Custom UI or Component
      confirmLabel: 'PROCESS NOW',                           // Text button confirm
      cancelLabel: 'CANCEL',                             // Text button cancel
      onConfirm: () => { this.props.processVideo(media._id); },    // Action after Confirm
      onCancel: () => console.log("Cancelled delete")     // Action after C
    });

    e && e.preventDefault();
    e && e.stopPropagation();
  }

  confirm = (e, param) => {

    confirmAlert({
      title: 'Warning!!',                        // Title dialog
      message: 'Do you want to delete the file- ' + param + '?',               // Message dialog
      childrenElement: () => <div></div>,       // Custom UI or Component
      confirmLabel: 'REMOVE NOW',                           // Text button confirm
      cancelLabel: 'CANCEL',                             // Text button cancel
      onConfirm: () => { if (this.state.modalOpen) { this.toggleModal(e); this.props.deleteMedia(param); } else { this.props.deleteMedia(param); } },    // Action after Confirm
      onCancel: () => console.log("Cancelled delete")     // Action after C
    });

    e && e.preventDefault();
    e && e.stopPropagation();
  };

  confirmFolderDel = (e, folderId, folderName) => {
    let isMoveToCommon = this.state.isMoveToCommon;
    confirmAlert({
      title: 'Warning!!',                        // Title dialog
      message: "Do you want to delete folder along with it's media files of- " + folderName + "?",               // Message dialog
      childrenElement: () => <div className={'check-small-container '} style={{ position: 'absolute', top: '140px', left: '40px' }} >
        <input type='checkbox' style={{ marginLeft: '0px' }} onChange={(e) => this.toggleMoveToCommon()} />

        <span style={{
          marginLeft: '5px', fontWeight: 'bold',
          color: '#6d6d6d'
        }} className='lbl-check' > Move media files to Common folder?
        </span></div>,
      confirmLabel: 'DELETE',                           // Text button confirm
      cancelLabel: 'CANCEL',                             // Text button cancel
      onConfirm: () => this.props.deleteFolder(folderId, this.state.isMoveToCommon),    // Action after Confirm
      onCancel: () => console.log("Cancelled delete")     // Action after C
    });

    e && e.preventDefault();
    e && e.stopPropagation();
  }

  toggleAdminCheck() {
    this.setState({
      isPublicGallery: !this.state.isPublicGallery
    })
  }

  toggleSelect() {
    this.setState({
      isSelectActive: !this.state.isSelectActive,
      selectedMedia: []
    })
  }
  togglePubMedia() {
    let folderFltrArr = !this.state.isPublicMedia ? this.props.user.folders.folderList.filter(folder => folder.userId !== this.props.user.user._id) : this.props.user.folders.folderList.filter(folder => folder.userId == this.props.user.user._id);
    let defaultFolderId = folderFltrArr.length > 0 ? folderFltrArr[0]._id : "";
    ; this.setState({
      isPublicMedia: !this.state.isPublicMedia,
      uploadFolderId: defaultFolderId
    });
  }
  toggleFreeToUse() {
    this.setState({
      isFreeToUse: !this.state.isFreeToUse
    });
  }
  toggleSponsored() {
    this.setState({
      isSponsored: !this.state.isSponsored
    });
  }

  togglePreview() {
    this.setState({
      modalOpen: !this.state.modalOpen
    });

  }

  createNewFolder(evt) {
    var newFolderName = document.getElementById('folderInput');
    this.props.saveFolder(newFolderName.value);
    this.showAddNewFolder(evt);
  }
  selectMedia(e, mediaId) {
    e.stopPropagation();
    let selectedArr = this.state.selectedMedia;
    if (this.state.selectedMedia.indexOf(mediaId) == -1) {
      selectedArr.push(mediaId);
    } else {
      let indx = this.state.selectedMedia.indexOf(mediaId);
      selectedArr.splice(indx, 1);
    }
    this.setState({ selectedMedia: selectedArr });
    if (this.props.selectMedia) {
      this.props.selectMedia(e, mediaId, this.state.gallery);
    }
  }

  showAddNewFolder(e) {
    this.setState({
      showAddNewFolderInput: !this.state.showAddNewFolderInput
    });
  }

  getModalContent() {
    let media = this.previewPath;

    if (this.getMediaType(media) == 'IMAGE') {

      return (<div><img src={media} style={{ maxWidth: '300px', height: 'auto' }} /><div className="media-title">{'Name: ' + media.split(this.props.user.user._id + '/')[1]}</div><span style={{ float: 'right', marginBottom: '10px' }} className="glyphicon glyphicon-trash" onClick={(e) => this.confirm(e, media.split(this.props.user.user._id + '/')[1])}></span></div>);

    }
    else if (this.getMediaType(media) == 'VIDEO') {

      return (<div><video src={media} style={{ maxWidth: '400px', height: 'auto' }} autoPlay controls /><div className="media-title">{'Name: ' + media.split(this.props.user.user._id + '/')[1]}</div><span style={{ float: 'right', marginBottom: '10px' }} className="glyphicon glyphicon-trash" onClick={(e) => this.confirm(e, media.split(this.props.user.user._id + '/')[1])}></span></div>);

    }

    else if (this.getMediaType(media) == 'AUDIO') {

      return (<div><audio src={media} style={{ maxWidth: '300px', height: '40px', margin: '10px' }} autoPlay controls /><div className="media-title">{'Name: ' + media.split(this.props.user.user._id + '/')[1]}</div><span style={{ float: 'right', marginBottom: '10px' }} className="glyphicon glyphicon-trash" onClick={(e) => this.confirm(e, media.split(this.props.user.user._id + '/')[1])}></span></div>);

    }
    else if (this.previewPath.toLowerCase() == 'folders') {
      var folders = this.props.user.folders.folderList;
      console.log(folders);
      return (<div className='react-confirm-alert' ><h1 style={{ padding: '5px 30px' }}>Library Folders</h1>
        <input id="folderInput" style={{ marginLeft: '20px', marginTop: '5px', padding: '5px 10px' }} type="input" placeholder="New folder name..." />
        <Link
          to="#"
          style={{ marginLeft: '10px', marginRight: '20px' }}
          className="btn btn-success btn-single"
          onClick={(evt) => this.createNewFolder(evt)}>
          {' Save'}
        </Link>
        <ul className='popup-list'>{folders.map((folder, index) => <li index={index} path={folder._id}>{folder.folder_name}<span style={{ float: 'right' }} className="glyphicon glyphicon-trash" onClick={(e) => this.confirm(e, media.original.split(this.props.user.user._id + '/')[1])}></span></li>)}</ul></div>);

    }
    else if (this.previewPath.toLowerCase() == 'upload') {
      let folders = this.props.user.folders.folderList;

      return (<div className='react-confirm-alert' ><h1 style={{ padding: '5px 30px' }}>Upload New Media</h1>
        <div className="form-in-pop">

          {this.props.user.config.settings.isGalleryAdvanced &&
            <div>
              <li>
                <input className={'long-input  effect-16 has-content'} id="mediaTitle" type='input' placeholder="Media Title..." />

              </li>
              <li>
                <input className={'long-input effect-16 has-content'} id="mediaDesc" type='input' placeholder="Short description..." />
              </li>
              <li >
                <input className={'long-input effect-16 has-content'} id="tags" type='input' placeholder="Tags like  #todays..." />
              </li>
              <li style={{ marginTop: '10px' }}>
                <CheckBox isChecked={this.state.isPublicMedia} text='Make Public' onClickFn={evt => this.togglePubMedia()} />
              </li>
              {this.state.isPublicMedia && <div>
                <li style={{ marginTop: '10px' }}>
                  <CheckBox isChecked={this.state.isFreeToUse} text="Free To Use" onClickFn={evt => this.toggleFreeToUse()} />
                  <CheckBox style={{ marginLeft: '10px' }} isChecked={!this.state.isFreeToUse} text="Pay-Per-View" onClickFn={evt => this.toggleFreeToUse()} />
                </li>

                {!this.state.isFreeToUse && <li >
                  <input className={'long-input effect-16 has-content'} id="mediaPrice" type='input' placeholder="Set Price..." />
                </li>}
                <li style={{ marginTop: '10px' }}>
                  <CheckBox isChecked={this.state.isSponsored} text="Sponsored" onClickFn={evt => this.toggleSponsored()} />

                </li>

              </div>}

            </div>
          }
          {!this.props.user.config.settings.isGalleryAdvanced &&
            <li>
              <input className={'long-input  effect-16 has-content'} id="mediaTitle" type='input' placeholder="Media Title..." />

            </li>}
          <li>
            <label for='folders-list'>Select folder:  </label>
            <select name='folders-list'
              className="btn btn-default"
              value={this.state.uploadFolderId}
              onChange={e => this.handleFolderChange(e)}>
              {!this.state.isPublicMedia && folders.filter(folder => folder.userId == this.props.user.user._id).map(folder => <option value={folder._id}>{folder.folder_name}</option>)}
              {this.state.isPublicMedia && folders.filter(folder => folder.userId != this.props.user.user._id).map(folder => <option value={folder._id}>{folder.folder_name}</option>)}

            </select>

            {!this.state.isPublicMedia && <Link
              to="#"
              style={{ float: 'right', color: this.props.user.config.settings.color_primary }}
              className="btn btn-primary-link btn-single"
              onClick={(evt) => this.showAddNewFolder(evt)}>
              <span style={{ color: this.props.user.config.settings.color_primary }} className="glyphicon glyphicon-plus"></span>{' New Folder'}
            </Link>}</li>
          {this.state.showAddNewFolderInput && <li>
            <div className="">
              <input className={'effect-16 has-content'} id="folderInput" type='input' placeholder="Enter folder name.." required />
              <div className="edit-tool-box-in"><span className="glyphicon glyphicon-ok" onClick={(evt) => this.createNewFolder(evt)}  ></span>
                <span className="glyphicon glyphicon-remove" onClick={(evt) => this.showAddNewFolder(evt)}  ></span>
              </div>
            </div>

          </li>}

          <li>

            {<div id="react-file-drop-demo" className='drop-area'>
              <FileDrop onDrop={this.handleDrop.bind(this)}>
                Drop some files here!

                <br />
                OR
                <FileUploadProgress
                  key="ex1"
                  url={this.uploadURL}
                  folderId={this.state.uploadFolderId ? this.state.uploadFolderId : this.props.user.folders.folderList[0]._id}
                  userIds={this.state.userIds ? this.state.userIds : this.props.user.user._id}
                  title={"No Name"}
                  isPublic={this.state.isPublicMedia}
                  isFree={this.state.isFreeToUse}
                  price={document.getElementById('mediaPrice') && document.getElementById('mediaPrice').value}
                  mediaDesc={document.getElementById('mediaDesc') && document.getElementById('mediaDesc').value}
                  tags={""}
                  other_a={this.state.isSponsored}
                  other_b={!this.state.isFreeToUse}
                  themecolor={this.themecolor}
                  onProgress={(e, request, progress) => {
                  }}
                  onLoad={(e, req) => {
                    console.log("load", req);
                    var allMedia = JSON.parse(req.response);
                    allMedia = allMedia.mediaData;
                    this.getFilteredMedia('all', allMedia.reverse());
                    this.toggelUpload();
                  }}
                  onError={(e, request) => {
                    console.log("error", e, request);
                  }}
                  onAbort={(e, request) => {
                    console.log("abort", e, request);
                  }}
                />
              </FileDrop>
              {this.state.isUploading && <div><span style={{ color: 'green' }}>{this.state.uploadMsg}</span> <div className="progress" >
                <div className="progress-bar" style={{ width: this.state.uploadPercent + '%' }} role="progressbar" aria-valuenow={this.state.uploadPercent}
                  aria-valuemin="0" aria-valuemax="100" >
                  {this.state.uploadPercent + '%'}
                </div><span style={{ float: 'right', display: 'inline' }} onClick={(e) => this.xhr.abort()} className="glyphicon glyphicon-remove"></span>
              </div></div>}
              <span style={{ color: 'red' }}>{this.state.uploadError}</span>
            </div>}
          </li>
        </div>
        <Link
          to="#"
          style={{ float: 'right', margin: '10px' }}
          className="btn btn-primary-link"
          onClick={(evt) => { this.toggelUpload(evt) }}>
          {'CLOSE'}
        </Link>
      </div>);
    }
    else {
      return ("Preview Not supported files!!");
    }

  }

  getMediaType(mediaName) {
    if (/\.(jpe?g|png|gif)$/i.test(mediaName)) {
      return "IMAGE";
    } else if (/\.(mp4|mov|wmo|3gp|ogg|webM|quicktime)$/i.test(mediaName)) {
      return "VIDEO";
    } else if (/\.(mp3|wav|mpeg)$/i.test(mediaName)) {
      return "AUDIO";
    } else {
      return "OTHER";
    }
  }

  isSupportedFormat(mediaName) {

    if (/\.(jpe?g|png|gif|bmp|tiff)$/i.test(mediaName)) {
      return true;
    } else if (/\.(mp4|wmo|mov|3gp|ogg|webM|webm|WebM)$/i.test(mediaName)) {
      return true;
    } else if (/\.(mp3)$/i.test(mediaName)) {
      return true;
    } else {
      return false;

    }
  }

  handleChange(evt) {
    evt.preventDefault();
    this.getFilteredMedia(evt.target.value);
    this.setState({
      galleryFilter: evt.target.value
    });
  }

  handleFolderChange(evt) {
    evt.preventDefault();
    console.log(evt.target.value);
    this.setState({
      uploadFolderId: evt.target.value
    });

  }

  uploadFile(file) {
    let _self = this;
    const payload = new FormData();
    payload.append('media-upload', file);
    let folderId = this.props.user.folders.folderList.filter(list => list.userId == this.props.user.user._id)[0]._id;

    payload.append('folderId', this.state.uploadFolderId ? this.state.uploadFolderId : folderId);

    payload.append('userIds', this.state.userIds ? this.state.userIds : this.props.user.user._id);
    if (_self.props.user.config.settings.isGalleryAdvanced && document.getElementById('mediaDesc')) {
      payload.append('mediaDesc', document.getElementById('mediaDesc') ? document.getElementById('mediaDesc').value : '');
      payload.append('tags', document.getElementById('tags').value);
      payload.append('title', document.getElementById('mediaTitle') ? document.getElementById('mediaTitle').value : '');
      payload.append('isPublic', _self.state.isPublicMedia);
      payload.append('isFree', _self.state.isFreeToUse);
      payload.append('price', _self.state.isPublicMedia ? document.getElementById('mediaPrice').value : "$0");
      payload.append('other_a', _self.state.isSponsored);
      payload.append('other_b', !_self.state.isFreeToUse);
    }
    else {
      payload.append('mediaDesc', "");
      payload.append('tags', "");
      payload.append('title', document.getElementById('mediaTitle') ? document.getElementById('mediaTitle').value : '');
      payload.append('isPublic', false);
      payload.append('isFree', true);
      payload.append('price', '$0');
      payload.append('other_a', false);
      payload.append('other_b', false);
    }
    this.xhr = new XMLHttpRequest();


    this.xhr.upload.addEventListener('progress', function (e) {
      const done = e.position || e.loaded
      const total = e.totalSize || e.total;
      const perc = (Math.floor(done / total * 1000) / 10);

      if (perc >= 100) {
        _self.setState({
          uploadPercent: perc
        });

      } else {
        _self.setState({
          uploadPercent: perc
        });
      }
    });


    this.xhr.addEventListener('load', function (e) {
      console.log('done uploading' + _self.dragUploadIndex);
      console.log('total', _self.draggedFiles.length);
      if (_self.xhr.status >= 200 && _self.xhr.status <= 299) {
        _self.setState({
          uploadPercent: '100%'
        });

      } else {
        _self.setState({
          uploadError: '*[' + _self.draggedFiles[_self.dragUploadIndex].name + '] Some error while upload. ' + _self.state.uploadError
        });
      }
      _self.dragUploadIndex = _self.dragUploadIndex + 1;

      if (_self.dragUploadIndex == _self.draggedFiles.length) {
        toast.success('UPLOADED SUCCESSFULLY!');
        _self.dragUploadIndex = 0;
        _self.setState({
          isUploading: false,
          uploadMsg: '',
          uploadError: '',
          modalOpen: false
        });
        _self.props.getAllUserMedia();

      } else if (_self.dragUploadIndex < _self.draggedFiles.length) {
        _self.processUpload();
      }

    });


    this.xhr.upload.addEventListener('abort', function (e) {
      _self.setState({
        isUploading: false,
        uploadMsg: '',
        uploadError: '',
        uploadPercent: 0
      });
      this.dragUploadIndex = 0;
      toast.success('UPLOADED CANCELLED!');
    });
    this.xhr.open('POST', this.uploadURL);
    this.xhr.setRequestHeader("Authorization", "Bearer " + sessionStorage.getItem('jwtToken'));
    this.xhr.send(payload);

  }

  processUpload() {
    if (this.draggedFiles.length > 0 && this.draggedFiles.length < 5 && this.isSupportedFormat(this.draggedFiles[this.dragUploadIndex].name)) {
      console.log('valide file start upload');
      this.setState({
        isUploading: true,
        uploadMsg: 'Plz wait...Uploading(' + this.draggedFiles[this.dragUploadIndex].name + ')...' + (this.dragUploadIndex + 1) + '/' + this.draggedFiles.length
      });
      this.uploadFile(this.draggedFiles[this.dragUploadIndex]);
    } else if (this.draggedFiles.length > 0 && this.draggedFiles.length > 5) {
      this.setState({
        uploadError: '*Max upload limit is 5 at once.' + ' *' + this.state.uploadError
      });
    }
    else if (!this.isSupportedFormat(this.draggedFiles[this.dragUploadIndex].name)) {
      this.setState({
        uploadError: '*' + this.draggedFiles[this.dragUploadIndex].name + '-' + 'This is not supported format. Please upload file with one of the following format - jpg, jpeg, png, gif, mp4, wmo, 3gp, ogg, webM, mp3.' + ' *' + this.state.uploadError
      });
    }
  }

  handleDrop(files, event) {
    console.log(files, event);
    //const supportedFilesTypes = ['image/jpeg', 'image/png'];
    //const { type } = event.dataTransfer.files[0];
    if (!this.state.isUploading) {
      this.draggedFiles = files;
      this.processUpload();
    }
    event.preventDefault();

  }

  getFilteredMedia(selectedType, myAllMedia) {
    let user = this.props.user;
    let mediaArr = [];
    var myMedia = myAllMedia ? myAllMedia : (
      user.mymedia && user.mymedia.mediaList ? user.mymedia.mediaList : []);
    myMedia = myMedia && myMedia instanceof Array ? myMedia : [];
    //let userMediaPath = BASE_SERVER + "/preview/" + media.userId;
    mediaArr = myMedia.map(media => {

      media.original = BASE_SERVER + "/preview/" + media.userId + "/" + media.original_file_name;
      media.thumbnail = BASE_SERVER + "/preview/" + media.userId + "/thumbnails/" + media.base64_data;
      return media
    });
    let getMediaType = this.getMediaType;
    mediaArr = mediaArr.filter(media => {
      if (selectedType == 'all' && this.isSearchMedia(media)) {
        return true;
      } else if (
        (getMediaType(media.original) == selectedType.toUpperCase()) && this.isSearchMedia(media)) {
        return true;
      }
    });
    console.log('media', mediaArr);

    this.setState({
      gallery: mediaArr
    });
  }
  closePreview(e, i) {
    let imgShow = document.getElementsByClassName(
      "image-gallery-slide-wrapper"
    );
    imgShow[i].style.display = 'none';
    var galContent = document.getElementsByClassName('list-group-item');
    galContent[i].style.height = '240px';
    let closeTool = document.getElementsByClassName('preview-tool-box');
    closeTool[i].style.display = "none";
    this.setState({
      playAudioThumb: "",
      selectThumbMedia: "",
      playVideoThumb: ""
    });
  }
  thumbClickHandler(e, index, i) {
    console.log(i);
    if (!this.state.gallery[index]) return;
    let imgShow = document.getElementsByClassName(
      "image-gallery-slide-wrapper"
    );
    var galContent = document.getElementsByClassName('list-group-item');
    galContent[i].style.height = '680px';
    let closeTool = document.getElementsByClassName('preview-tool-box');
    closeTool[i].style.display = "block";
    imgShow[i].style.display = "block";

    if (this.getMediaType(this.state.gallery[index].original) == "VIDEO") {
      if (imgShow[i]) imgShow[i].style.display = "none";
      this.setState({
        playVideoThumb: this.state.gallery[index].original,
        selectThumbMedia: this.state.gallery[index].original,
        playAudioThumb: "",
        gallerySelectedFolderIndex: i,
        selectedMediaDetailsFor: this.state.gallery[index]
      });

    } else if (this.getMediaType(this.state.gallery[index].original) == "AUDIO") {
      if (imgShow[i]) imgShow[i].style.display = "none";
      this.setState({
        playAudioThumb: this.state.gallery[index].original,
        selectThumbMedia: this.state.gallery[index].original,
        playVideoThumb: "",
        gallerySelectedFolderIndex: i,
        selectedMediaDetailsFor: this.state.gallery[index]
      });

    } else {
      console.log('selected', this.state.gallery[index].original);
      if (imgShow[i]) imgShow[i].style.display = "block";
      this.setState({
        playVideoThumb: "",
        playAudioThumb: "",
        selectThumbMedia: this.state.gallery[index].original,
        gallerySelectedFolderIndex: i
      });
    }
  }

  getMediaDetails(media) {
    let isAdvGal = this.props.user.config && this.props.user.config.settings.isGalleryAdvanced ? true : false;
    return (<div><h3>{media.title}</h3>
      {isAdvGal && (<div style={{ "width": '100%' }}><label>{media.mediaDesc}</label><label><span>Tags  </span>{media.tags ? media.tags : '#'}</label><label><span>Price  </span>{media.isFree ? "Free" : media.price}</label></div>)}

      <label><span>File Name  </span>{media.original_file_name}</label>
      {isAdvGal && (<div style={{ "width": '100%' }}><label><span>Avaialbe As  </span>{media.isPublic ? "PUBLIC" : "PRIVATE"}</label>
        <label><span>Provider  </span>{media.other_a ? "SPONSORED" : ""}</label></div>)}
      <label><span>Uploaded On  </span>{media.createdAt.substr(0, 10)}</label>
      {isAdvGal && (<label>{media.other_b ? media.other_b : ""}<span className={'glyphicon glyphicon-star stars'} >{media.stars}</span></label>)}


    </div>);
  }

  renderFolder(folder, i, filterProp, category) {

    return <div>
      {folder && <h4 className={'folder-name'} onClick={(e) => this.collapseToggle(e, folder.folder_name)} ><span style={{ marginRight: '10px', marginLeft: '5px' }} className={this.state.toggleExpand[folder.folder_name] ? "glyphicon glyphicon-folder-close" : "glyphicon glyphicon-folder-open"} ></span>{folder.folder_name}
        {folder.userId == this.props.user.user._id && folder.folder_name.toLowerCase() !== 'common' && i !== 0 && <span className={'hidden-actions'}>
          <span className="glyphicon glyphicon-trash" onClick={(e) => this.confirmFolderDel(e, folder._id, folder.folder_name)}></span>
        </span>}
      </h4>}
      <div className={this.state.toggleExpand[folder && folder.folder_name] ? "list-group-item gallery collapsed" : "list-group-item gallery"}>
        <div className={'preview-tool-box'}> <span
          className="btn-right  glyphicon glyphicon-remove" onClick={e =>
            this.closePreview(e, i)}
          data-tip="Close preview"
        ></span><span
          className="btn-right  glyphicon glyphicon-trash" onClick={(e) => this.confirm(e, this.state.selectThumbMedia.split(this.props.user.user._id + '/')[1])}
          data-tip="Delete Selected"
        ></span></div>
        {this.state.playVideoThumb && this.state.gallerySelectedFolderIndex == i && (

          <div className="video-container  ">
            <video
              src={decodeURIComponent(this.state.playVideoThumb)}
              className="popup-video"
              controls
              autoPlay
            ></video>
            <span >{this.getMediaDetails(this.state.selectedMediaDetailsFor)}</span>
          </div>
        )}
        {this.state.playAudioThumb && this.state.gallerySelectedFolderIndex == i && (
          <div className="audio-container">
            <audio
              src={decodeURIComponent(this.state.playAudioThumb)}
              className="popup-video"
              style={{ height: '50px' }}
              controls
              autoPlay
            ></audio>
          </div>
        )}
        <ImageGallery

          items={this.state.gallery.filter((item, index) => {
            if (category == 'PURCHASED' && item.price && ['free', 'undefined', 'null', '$0'].indexOf(item.price.toLowerCase()) == -1 && item.userId != this.props.user.user._id) {
              console.log(item.price.toLowerCase());
              item.thumbnailLabel = item.original.split(this.props.user.user._id + '/')[1];
              item.folderIndex = i;
              item.mediaIndex = index;
              item.description = this.getMediaDetails(item)
              return item;
            }
            else if (category == 'FREE' && item.isFree && item.isPublic) {
              console.log(item.price.toLowerCase());
              item.thumbnailLabel = item.original.split(this.props.user.user._id + '/')[1];
              item.folderIndex = i;
              item.mediaIndex = index;
              item.description = this.getMediaDetails(item)
              return item;
            }
            else if (category == 'ADDED' && (item.sharedWithUsers.indexOf(this.props.user.user._id) != -1)) {
              console.log(item.price.toLowerCase());
              item.thumbnailLabel = item.original.split(this.props.user.user._id + '/')[1];
              item.folderIndex = i;
              item.mediaIndex = index;
              item.description = this.getMediaDetails(item)
              return item;
            }
            else if ((category == 'SHARED' && item.sharedWithUsers.indexOf(this.props.user.user._id) != -1)) {
              item.thumbnailLabel = item.original.split(this.props.user.user._id + '/')[1];
              item.folderIndex = i;
              item.mediaIndex = index;
              item.description = this.getMediaDetails(item)
              return item;
            }

            else if (folder && folder._id == item.folderId) {
              item.thumbnailLabel = item.original.split(this.props.user.user._id + '/')[1];
              item.folderIndex = i;
              item.mediaIndex = index;
              item.description = this.getMediaDetails(item)
              return item;
            }

            else {
              return false;
            }
          })
          }


          renderThumbInner={this.renderMedia}
          lazyLoad={true}
          startIndex={-1}
          showFullscreenButton={false}
          showNav={false}
          disableThumbnailScroll={false}
        /></div>
    </div>;
  }

  renderMedia(media) {
    let isAdvGal = this.props.user.config && this.props.user.config.settings.isGalleryAdvanced ? true : false;
    return <div
      className={isAdvGal ? "adv-gallery image-gallery-thumbnail-inner " : "gallery image-gallery-thumbnail-inner "} >
      <img onClick={(e, index) => !this.props.selectView ? this.thumbClickHandler(e, media.mediaIndex, media.folderIndex) : this.selectMedia(e, media._id)} src={media.thumbnail} />
      {media.mediaType && media.mediaType.toLowerCase() !== 'image' &&
        <span className='video-icon-gal'></span>}


      {this.props.selectView &&
        <span className={this.state.selectedMedia.indexOf(media._id) !== -1 ? 'checked-box selected-check' : 'uncheck-box select-check'} onClick={(e) => this.selectMedia(e, media._id)}>
        </span>}

      <div style={{ textAlign: 'left' }} >
        <div className="image-gallery-thumbnail-label"><b>{media.title ? media.title : media.thumbnailLabel}</b>
          <div className="sub-desc"><b>{'By:'}</b> {this.props.user.user.username} <span style={{ marginLeft: '10px' }}><b >{'On:'}</b> {media.createdAt.substr(0, 10)}</span><br />
            {isAdvGal && <label>{media.tags ? media.tags : ""}</label>}

          </div>
        </div>
        <span className='menu-dots upside-options'>
          <Dropdown autoOpen={true} arrowClassName='menu-dots-inner' className={'player-drop'}>
            <Dropdown.Toggle title="" />
            <Dropdown.MenuWrapper>
              <Dropdown.Menu>

                {<MenuItem onClick={(e) => { this.confirm(e, media.original_file_name) }}>
                  <span className="glyphicon glyphicon-trash" data-tip="DELETE" ></span><span>DELETE</span>
                </MenuItem>}

                {false && <MenuItem onClick={(evt) => { this.thumbClickHandler(evt, media.mediaIndex, media.folderIndex) }}>
                  <span data-tip="Set to Screens" className="glyphicon glyphicon-ok" ></span><span>ADD TO PLAYLIST</span>
                </MenuItem>}

                {media.mediaType && media.mediaType.toLowerCase() == 'video' && <MenuItem onClick={(e) => { this.confirmProcessVideo(e, media) }}>
                  <span className="glyphicon glyphicon-wrench"  ></span><span> PROCESS IT</span>
                </MenuItem>}

                {<MenuItem onClick={(e) => { this.props.toggleRootModal("SHARE", media) }}>
                  <span style={{ textAlign: 'center' }} className="glyphicon glyphicon-share-alt" data-tip="SHARE" ></span><span>SHARE</span>
                </MenuItem>}

              </Dropdown.Menu>
            </Dropdown.MenuWrapper>
          </Dropdown></span>

        {isAdvGal && <div><span className={'glyphicon glyphicon-star stars'} >{media.stars}</span>
        </div>}
      </div>

    </div>;
  }

  render() {

    const { folders, config } = this.props.user;

    let selectedConsole = this.props.selectView ? (this.props.galleryType == 'GALLERY' ? 'GALLERY' : 'PUB-GALLERY') : this.props.common.selectedConsole;
    return (
      <div className={config.settings.isGalleryAdvanced ? 'adv-contain gallery-container' : 'gallery-container'}>

        {selectedConsole !== 'PUB-GALLERY' ? <div className="title-container">
          <h2 className="header-title">My Libraries</h2>
          <Search
            changeConsole={this.props.changeConsole}
            onSearchChange={this.onSearchChange}
          />
          <div className='search-bar'>
            <Link
              to="#"
              style={{ float: 'right', background: this.props.user.config.settings.color_primary }}
              className="btn btn-primary btn-single d-none"
              onClick={(evt) => this.toggelUpload(evt)}>
              <span className="glyphicon glyphicon-upload"></span>{' Upload New Media'}
            </Link></div>
        </div> :

          <div className="title-container">
            <h2 className="header-title">Public library</h2>
            <Search
              changeConsole={this.props.changeConsole}
              onSearchChange={this.onSearchChange}
            />
          </div>}

        {this.props.user.config.settings.isGalleryAdvanced ?

          <div className="inner-container">
            {selectedConsole !== 'PUB-GALLERY' ? <Tabs>

              <Pane label="UPLOADED">
                <ul id="uploaded" className="panel-body">

                  {this.props.user.user && folders.folderList.filter(folder => folder.userId == this.props.user.user._id).map((folder, i) => this.renderFolder(folder, i))}
                </ul>
              </Pane>
              <Pane label="PURCHASED">
                <ul id="purchased" className="panel-body">

                  {this.props.user.user && folders.folderList.filter(folder => folder.userId == this.props.user.user._id && folder.folder_name.toLowerCase() == 'common').map((folder, i) => this.renderFolder(folder, i, '', 'PURCHASED'))}
                </ul>
              </Pane>

              <Pane label="ADDED">
                <ul id="added" className="panel-body">

                  {this.props.user.user && folders.folderList.filter(folder => folder.userId == this.props.user.user._id && folder.folder_name.toLowerCase() == 'common').map((folder, i) => this.renderFolder(folder, i, '', 'ADDED'))}
                </ul>
              </Pane>

              <Pane label="SHARED">
                <ul id="shared" className="panel-body">

                  {this.renderFolder("", -1, '', 'SHARED')}
                </ul>
              </Pane>
            </Tabs>
              :

              <Tabs>

                <Pane label="FREE">
                  <ul id="free" className="panel-body">
                    {this.renderFolder("", -1, '', 'FREE')}
                  </ul>
                </Pane>
                <Pane label="SPONSORED">
                  <ul id="free" className="panel-body">

                    {folders.folderList.filter(folder => folder.userId !== this.props.user.user._id).map((folder, i) => this.renderFolder(folder, i, 'is'))}
                  </ul>
                </Pane>
                <Pane label="PAY-PER-VIEW">
                  <ul id="ppv" className="panel-body">

                    {folders.folderList.filter(folder => folder.userId !== this.props.user.user._id).map((folder, i) => this.renderFolder(folder, i, 'price'))}
                  </ul>
                </Pane>
              </Tabs>

            }
          </div>

          :
          <div>
            <div style={{ width: '100%' }} className="toolbar-header">

              {<div className="check-small-container">

                <select
                  className="btn"
                  value={this.state.galleryFilter}
                  onChange={e => this.handleChange(e)}>
                  {options.map(option => <option value={option.value}>{option.label}</option>)}
                </select>
                <span className='lbl-action btn-primary-link'><span className={this.state.isCollapseAll ? 'glyphicon glyphicon-plus' : 'glyphicon glyphicon-minus'} style={{ color: this.props.user.config.settings.color_primary }} onClick={(e) => this.toggleCollapseAll()}></span><span style={{ color: this.props.user.config.settings.color_primary }} onClick={(e) => this.toggleCollapseAll()}>{this.state.isCollapseAll ? 'Expand All' : 'Collapse All'}</span></span>
                <span className='lbl-action btn-primary-link' style={{ color: this.props.user.config.settings.color_primary }} onClick={(e) => this.props.getAllUserMedia()}>{'REFRESH LIST'}</span>
              </div>}



            </div>
            <div className="inner-container">
              {folders.folderList.filter(folder => folder.userId == this.props.user.user._id).map((folder, i) => this.renderFolder(folder, i))}

            </div>
          </div>

        }



        <ModalLocal className={"modal-form modal-default"} isOpen={this.state.modalOpen} >
          <span style={{ position: 'absolute', top: '-20px', right: '-5px' }} className="glyphicon glyphicon-remove" onClick={(e) => this.toggleModal(e)} ></span>{this.state.modalOpen ? this.getModalContent() : ''}</ModalLocal>

      </div>
    );
  }
}


export default Gallery;
