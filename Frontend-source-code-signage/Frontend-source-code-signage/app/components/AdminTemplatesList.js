import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router-dom';
var _reactDom = require('react-dom');
import  { Tabs,Pane } from './Tabs';
import emptyScreen from '../assets/signage-empty.png';
import {BASE_SERVER, LOCAL_SERVER, PrimaryColor} from '../constants/Config';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {Loading,Title,Error,ZoomoutPreview} from './commonDumbs';
import ModalLocal from './modal-local';
import TemplateEditPg from './../pages/TemplateEditPg';
import ReactTooltip from 'react-tooltip';
import Search from './search/SearchContainer.js';
import UploadTemplateContainer  from './upload-template/UploadTemplateContainer.js';
import PickerPopup  from './media-content-picker/PickerPopup.js';
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    DropdownButton
} from '@trendmicro/react-dropdown';

class AdminTemplatesList extends Component {

  constructor(){
    super();
    this.state = {
      preview:false,
      previewOriginal:false,
      modalOpen:false,
      selectedAppId:"",
      isNewView: false,
      isEditView: false,
      searchText:'',
      filteredTemplate: null,
      isPickerActive: false,
      uploadTemplateContent: false
    };
    this.allowedApps=[];
    this.previewApp=null;
    this.thumbpath= false;
    this.selectApp=null;
    this.isSelectView=false;
    this.selectedPlayers=null;
    this.generateEmbedUrl=null;
    this.isInformed=false;
    this.frameInterval=false;
    this.toggleMediaPicker = this.toggleMediaPicker.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onMediaSelected = this.onMediaSelected.bind(this);
    this.closeModalPopup = this.closeModalPopup.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.replaceTemplateThumb= this.replaceTemplateThumb.bind(this);
    this.publishNow=this.publishNow.bind(this);
    this.uploadTemplateContent= this.uploadTemplateContent.bind(this);
    this.changeIsTemplate = this.changeIsTemplate.bind(this);
    this.templateFiltersOptions = [
        { value: 'all', label: 'All' },
        { value: 'Corporates', label: 'Corporates' },
        { value: 'Education', label: 'Education' },
        { value: 'Entertainment', label: 'Entertainment' },
        { value: 'Events', label: 'Events' },
        { value: 'Fitness', label: 'Fitness' },
        { value: 'finance', label: 'Financial' },
        { value: 'Healthcare', label: 'Healthcare' },
        { value: 'Hospitality', label: 'Hospitality' },
        { value: 'Manufacturing', label: 'Manufacturing' },
        { value: 'Restaurant', label: 'Restaurant' },
        { value: 'Retails', label: 'Retails' },
        { value: 'Salon', label: 'Salon' },
        { value: 'Supermarket', label: 'Supermarket' },
        { value: 'Transport', label: 'Transport' },
        { value: 'Others', label: 'Others' },
        { value: "common", label: "Common" },
        { value: "native", label: "Native" },
        { value: "portait", label: "Portait" }
      ];
  }
  componentWillMount() {
    var userId = this.props.user._id;
    this.props.resetMe();
    this.isSelectView =this.props.common.selectedConsole == 'TEMPLATE_LIST'? false:true;
    const { user : { user: { customer } } } = this.props;
 

    this.setState({ filteredTemplate: 'ALL'});
  }


componentDidUpdate(prevState,prevProps){

    if(this.state.modalOpen && this.state.preview ){
      let _self=this;
      ZoomoutPreview(_self);
    }
  }

componentWillUnmount()
{
  clearTimeout(this.frameInterval);
  if(window.frameInterval){
        clearInterval(window.frameInterval);
      }
}

  tooltiphide(){
    try{
      
      document.getElementsByClassName('__react_component_tooltip show place-top type-light customTheme')[0].style.visibility='hidden';
      document.getElementsByClassName('__react_component_tooltip show place-top type-light customTheme')[0].style.display='none !important';
    }catch(e){
      console.log(e);
    }
  }

  publishNow(app){  
    this.props.toggleRootModal("PUBLISH",app);
    }

manageChecks(e,playerId){
      e.preventDefault();
      if(e.target.tagName.toLowerCase()=='span'){
        e.target.className=e.target.className=='uncheck-box'?'checked-box':'uncheck-box';
        this.selectedPlayers.indexOf(playerId) != -1? this.selectedPlayers.splice(1,this.selectedPlayers.indexOf(playerId)):this.selectedPlayers.push(playerId);
}
return true;
    }

isSearchTemplate(template){
   let userby= this.props.usersList && this.props.usersList.users.filter(user => user._id == template.userId);
  userby = userby && userby.length>0 ? userby[0] : null;

  let searchTxt = this.state.searchText.toLowerCase();

  if(template.appName.toLowerCase().indexOf(this.state.searchText.toLowerCase())!= -1 || template.domain.toString().indexOf(this.state.searchText)!= -1 || (userby && userby.name.toLowerCase().indexOf(searchTxt) != -1)){
    return true;
  }else{
    return false;
  }

}

isSelectTemplate(template){
  if(this.state.filteredTemplate ){
    if((template.domain.toUpperCase().indexOf(this.state.filteredTemplate.toUpperCase()) != -1 || template.domain.toUpperCase() === "COMMON")){
      return true;
    } else if(this.state.filteredTemplate.toUpperCase() == 'ALL'){
      return true;
    }
    else{
      return false;
    }
  }else{
    return true;
  }
}

onSearchChange(e){
      this.setState({
        searchText: e.target.value
      });
  }

setSelection(app){
    let selectedAppId = this.state.selectedAppId==app._id? "":app._id;
    let player = this.props.selectedPlayer;
    this.setState({
      selectedAppId:selectedAppId
    });

    if(selectedAppId && player){
      player.appId = app._id;
      player.contentType = "TEMPLATE";
      //player.orientation= content.orientation;
      this.props.moveToLiveFolder(app);
      this.props.publishToSreens([player]);
      this.props.closeModalPopup();
    }else{
      this.props.onSelect(app);
      this.props.closeModalPopup();
    }
  }

    informTemplate= () => {
      
      confirmAlert({
        title: 'Tip!',                        
        message: 'Choose your choice of template and click update icon to customize.',               // Message dialog
        childrenElement: () => <div></div>,       
        confirmLabel: '',                           
        cancelLabel: "Ok, Got It!",                             
        onConfirm: () => {},    
        onCancel: () => {this.isInformed=false; console.log('go back');},      
      })
    };

    confirm= (param) => {
      
      confirmAlert({
        title: 'Warning!!',                        // Title dialog
        message: 'Do you want to delete template -'+param.appName+'?',               // Message dialog
        childrenElement: () => <div></div>,       // Custom UI or Component
        confirmLabel: 'Remove',                           // Text button confirm
        cancelLabel: 'Cancel',                             // Text button cancel
        onConfirm: () => this.props.removingApp(param),    // Action after Confirm
        onCancel: () => console.log("Cancelled delete")     // Action after C
      })
    };

  gotoEditApp(appId,playerId,domain,isTemplate,app){
    if(appId)
    {
 
     
      this.props.setSelectedAppId(appId);
      let editConsole;
      if(domain.indexOf('customs') !== -1){
        let mediaList = Object.assign([],this.props.user.mymedia.mediaList);
         mediaList = mediaList.map(media => {
              if(media.description){
                delete media.description;
              }
              return media;
         });
        sessionStorage.removeItem('playerDetail');
        sessionStorage.removeItem('playerList');
        sessionStorage.removeItem('userInfo');
        sessionStorage.removeItem('media');
        sessionStorage.removeItem('selectedAppId');
        sessionStorage.removeItem('BASE_SERVER');
        sessionStorage.removeItem('commonFolderId');
        sessionStorage.removeItem('appLoc');
        sessionStorage.removeItem('primaryColor');
        sessionStorage.removeItem('selectedAppName');
        
        sessionStorage.setItem('selectedAppId',appId);
        sessionStorage.setItem('playerDetail',JSON.stringify({}));
        sessionStorage.setItem('playerList',JSON.stringify(this.props.playersList.players));
        sessionStorage.setItem('userInfo',JSON.stringify(this.props.user.user));
        sessionStorage.setItem('media',JSON.stringify(mediaList));
        sessionStorage.setItem('BASE_SERVER',BASE_SERVER);
        sessionStorage.setItem('commonFolderId',this.props.user.folders.folderList[0]._id);
        sessionStorage.setItem('primaryColor', PrimaryColor);
        sessionStorage.setItem('selectedAppName', app.appName);

        if(domain.indexOf('custom-editor') == -1){
          
        let slideEditor = <iframe src={BASE_SERVER+'/builder'} width='100%' height='100%' />;
        this.props.rootModal(slideEditor, 'EXTRA-LARGE', true);
        }else{
          sessionStorage.setItem('appLoc', app.appLocation);
          let designEditor = <iframe src={BASE_SERVER+'/design-editor'} width='100%' height='100%' />;
         this.props.rootModal(designEditor, 'EXTRA-LARGE', true);

        }
        
        return true;
      }else{
        editConsole = !isTemplate  ?"TEMPLATE_EDIT":"TEMPLATE_NEW";
        this.setState({
          isEditView : (editConsole == "TEMPLATE_EDIT"? true:false),
          isNewView : (editConsole == "TEMPLATE_NEW"? true:false),
          selectedAppId: appId
        });
         let templateContent = <TemplateEditPg
            user= {this.props.user}
            common = {this.props.common}
            selectedAppId={appId}
            appsList={this.props.appsList}
            rootModal={this.props.rootModal}
            toggleRootModal={this.props.toggleRootModal}
            />;
         this.props.rootModal(templateContent, 'MEDIUM', true);
      }
      
    }
  }

  removeApp(app){
    if(app)
    {
      this.props.removingApp(app);
    }
  }

  closeModalPopup(){
    console.log('closing modal for edit template');
    if(this.state.uploadTemplateContent){
      this.props.fetchApps(this.props.user.user._id);
    }
    this.setState({
        modalOpen:false,
        isEditView: false,
        isNewView: false,
        preview:false,
        previewOriginal:false,
        isPickerActive:false,
        uploadTemplateContent:false
      });

   this.previewApp=null;
    this.selectApp=null;
    this.isSelectView=false;
    this.selectedPlayers=null;
    this.generateEmbedUrl=null;
    this.props.resetMe();
  }


  toggleMediaPicker(jsonIndex, mediaPath, isThumb, thumbpath){
    if(!this.state.isPickerActive){
      this.jsonIndex= jsonIndex;
      this.mediaPath = mediaPath;

      if(isThumb){
        this.thumbpath = thumbpath
      }
    }

    this.setState({
      isPickerActive : !this.state.isPickerActive,
      modalOpen : !this.state.modalOpen
    });

  }

replaceTemplateThumb(rawFrom, rawTo){
  let mediaPaths= {};

  let fromPath = './uploads/'+rawFrom.split('preview/')[1];
  let toPath= './app-thumbnail/'+rawTo.split('thumb/')[1];

  mediaPaths.fromPath = fromPath;
  mediaPaths.toPath = toPath;

  this.props.replaceMediaFiles(mediaPaths);
}

togglePreview(){
      this.setState({
        modalOpen:!this.state.modalOpen
      });
    }

toggleOriginalPreview(evt, previewOriginalMediaName){
  this.setState({
    previewOriginal: previewOriginalMediaName
  });

}



togglePreviewWindow(){

this.setState({
        preview:!this.state.preview
      });

}


onMediaSelected(selectedMediaArr, mediaList){
     
      let mediaArr = mediaList;
      let item = mediaArr.filter(media => media._id == selectedMediaArr[0]);
      if(item && item.length>0){
        item = item[0];
        let originalPath = item.original;
        let original_file_name=item.original_file_name;
        if(this.jsonIndex){
        updateActiveApp(this.jsonIndex.replace("base64_data","original_data") , "res/"+original_file_name,this.state.appData);
        updateActiveApp(this.jsonIndex , item.thumbnail.replace(BASE_SERVER+'/',''),this.state.appData,this.setAppData);

        var mediaInfo={};
         mediaInfo['jsonIndex'] = this.jsonIndex;
         mediaInfo['newFile'] =original_file_name;
         mediaInfo['appLocation'] =this.state.appDetail.appLocation;
        this.props.updateMedia(mediaInfo);
        }else if(this.thumbpath){
          let fromPath= item && item.original?item.original:"";
          this.replaceTemplateThumb(fromPath, this.thumbpath);
        }
        this.toggleMediaPicker();
      }
      return false;
}

toggleModal() {
    this.setState({
      modalOpen : !this.state.modalOpen
    });
   
    }

uploadTemplateContent(app){

  this.setState({
    modalOpen: !this.state.modalOpen,
    uploadTemplateContent: app
  })

}

downloadTemplate(app){

  if(app.isTemplate){
    return BASE_SERVER+'/pub/'+app.appLocation+'.zip';
  }else{
    return BASE_SERVER+'/pub/'+app.appLocation+'.zip';
  }

}

changeIsTemplate(app){
        let appObj = {
          isTemplate: !app.isTemplate
        };
        this.props.updateAppProperty(app._id, appObj);
}

getModalContent(){
      let app = this.previewApp;
       if(this.state.isPickerActive){
        return <div style={{height:'100%'}}> 
                <PickerPopup  
              closePicker={this.toggleMediaPicker}
              onSelect = {this.onMediaSelected}
              user= {this.props.user}
              common = {this.props.common}
              isSingleSelect = {true}
          /> </div>
      }
      else if(this.state.uploadTemplateContent){
        return <div style={{height:'100%'}}> 
            <UploadTemplateContainer  
              closePicker={this.closeModalPopup}
              user= {this.props.user}
              settings= {this.props.user.config.settings}
              template= {this.state.uploadTemplateContent}
          /> </div>
      }
      else if(this.state.preview && this.previewApp){
        let folder = app.status == 'DRAFT'? '/drft/':'/pub/';
        let previewPath=BASE_SERVER+folder+app.appLocation+'/index.html';
          if(app.orientation.toLowerCase()=='landscape'){
            return (
            <iframe id='preview-frame' width='960px' height='540px' className="preview-content" src={previewPath} ></iframe>
        );
        }else{
          return (
          <iframe id='preview-frame' width='347px' height='540px' className="preview-content" src={previewPath} ></iframe>
        );
      }
      }
      else if(this.selectApp){
        let players= this.props.playersList.players.filter(player=>player.appId !== this.selectApp._id);
        this.selectedPlayers=[];
        this.selectedPlayers = players.filter(player=> {if(player.appId== this.selectApp._id){return player._id;}});
        this.selectedPlayers = this.selectedPlayers.map(player => player._id);
        this.selectApp.contentType = 'TEMPLATE';
        return (
        <ul className='small-select-list'>
            <h3>{'Select sreens to assign template- ['+this.selectApp.appName+']'}
            </h3>
            {players.map(player => <li onClick={(e)=>this.manageChecks(e,player._id)}><span className={this.selectedPlayers.indexOf(player._id) != -1?'checked-box':'uncheck-box'}></span>
            <h4>{player.playerName}</h4></li>)}
          <li style={{paddingLeft:'30%'}}>
            <button disabled={players.length==0?true:false} className="btn btn-primary " onClick={() => this.props.toggleRootModal("PUBLISH",this.selectApp)} >
              PUBLISH ON SELECTED
            </button>
          </li>
        </ul>
        )
                
      }else if(this.generateEmbedUrl){
          return(<div style={{padding:'10px'}}><h4 style={{padding:'5px',borderBottom:'1px solid #ccc'}}>Copy the below code and paste to embed this template in you webpage!</h4><div>{`<embed src="${location.href}pub/${this.generateEmbedUrl}/index.html" width="960" height="540"/>`}</div></div>)
      }

      else if(this.state.previewOriginal){
         let orgApp =this.state.previewOriginal;
         let originalPath= BASE_SERVER +'/preview/Admin/'+this.state.previewOriginal._id+'.mp4';
         if(orgApp && orgApp.orientation.toLowerCase()=='landscape'){
          return <div><video src={originalPath} width='576px'  autoplay loop controls/></div>;
        }else{
          return <div><video src={originalPath} width='347px'  autoplay loop controls/></div>;
        }
      }


      else{
        return ("Template Not available for preview!!");
      }

    }

  getTemplateItem(app){

    let appThumbnail = app && app.thumb ? (BASE_SERVER + app.thumb.replace('app-thumbnail','/thumb')) : (BASE_SERVER +'/thumb/'+ app._id+'.png');
    let userStatus=this.props.user.user? this.props.user.user.status.toUpperCase():'DEMO';
    let user = this.props.user.user;
    let userby= this.props.usersList && this.props.usersList.users.filter(user => user._id == app.userId);
    if(user._id == app.userId){
      userby= user;
    }else{
    userby = userby && userby.length>0 ? userby[0] : null;
    }
     app.contentType ="TEMPLATE";
    console.log('user', userby);
    return (
      <li className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item" key={app._id}>

      <div className="thumbnail apps" >
     
      <img src={appThumbnail}  alt="242x200" onClick={this.isSelectView ?(evt)=>(this.setSelection(app)): ()=>{!app.isTemplate ?this.gotoEditApp(app._id,this.props.selectedPlayerId,app.domain,app.isTemplate,app):true}}/>
      {!this.isSelectView ? <span className='menu-dots'>
          <Dropdown autoOpen= {true} arrowClassName='menu-dots-inner' className={'player-drop'}>
      <Dropdown.Toggle title="" />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            {<MenuItem  onClick={()=>{this.gotoEditApp(app._id,this.props.selectedPlayerId,app.domain,app.isTemplate,app)}}>
              <span className="glyphicon glyphicon-pencil" data-tip="Edit Template"  ></span><span>{'UPDATE TEMPLATE'}</span>
            </MenuItem>}

            {false && app.isTemplate && 
              <MenuItem 
              onClick={()=>this.toggleMediaPicker(null,null, true, appThumbnail)} >
                <span data-tip="Replace template thumbnail" className="glyphicon glyphicon-pencil"  >
                </span>
                {'REPLACE THUMBNAIL(size 634*354px)'}
            </MenuItem>}

            {<MenuItem 
              onClick={()=>this.publishNow(app)} >
                <span data-tip="Publish to screens" className="glyphicon glyphicon-ok"  >
                </span>
                {'PUBLISH'}
            </MenuItem>}

            {<MenuItem 
              onClick={()=>this.changeIsTemplate(app)} >
                <span data-tip="Make it publically available" className="glyphicon glyphicon-ok"  >
                </span>
                {!app.isTemplate?  'MAKE IT PUBLIC': 'MAKE IT PRIVATE' }
            </MenuItem>}

            {
              <MenuItem onClick={()=>{this.previewApp=app;this.togglePreview();this.togglePreviewWindow()}}>
             <span className="glyphicon glyphicon-eye-open " data-tip="Preview customized Template" data-toggle="modal" data-target="#exampleModalCenter"  ></span>
             <span>LIVE PREVIEW</span>
            </MenuItem>
            }
            
           {app.isTemplate &&  
            <MenuItem  onClick={(evt) => {this.toggleOriginalPreview(evt,app);this.togglePreview();}}>
              <span data-tip="Original Template Preview" className="glyphicon glyphicon-play"></span><span>ORIGINAL PREVIEW AS VIDEO</span>
            </MenuItem>}

            
            <MenuItem >
              <span data-tip="Download Template" className="glyphicon glyphicon-download"></span><a style={{textDecoration:'none'}} href={this.downloadTemplate(app)} target='_blank'>DOWNLOAD TEMPLATE</a>
            </MenuItem>

           
            <MenuItem  onClick={(evt) => {this.uploadTemplateContent(app)}}>
              <span data-tip="UPLOAD TEMPLATE" className="glyphicon glyphicon-upload"></span><span>MANAGE TEMPLATE</span>
            </MenuItem> 

            {app.isTemplate && <MenuItem  onClick={()=>{this.props.copyTemplate(app._id)}}>
              <span  data-tip="Clone Template" className="glyphicon glyphicon-duplicate"  ></span><span>MAKE A COPY</span>
            </MenuItem>}          

            { <MenuItem  onClick={()=>{this.confirm(app)}}>
              <span  data-tip="Delete Template" className="glyphicon glyphicon-trash"  ></span><span>DELETE</span>
            </MenuItem>}

        </Dropdown.Menu>
        </Dropdown.MenuWrapper>
        </Dropdown></span>
        :
      <span className={this.state.selectedAppId == app._id?'checked-box selected-check':'uncheck-box select-check'} onClick={(e)=> this.setSelection(app)}>
      </span>
    }

      <div className="caption center-btn">
      <label><span className={app.status=='DRAFT'?'draft-icon':''}></span>{app.appName}</label>
      {user.admin && <span style={{fontSize:'0.8em',position:'absolute',left:'15px',bottom: '18px'}}>{'By: '+(userby && userby.name?userby.name:'Not found') }</span>}
      </div>
      </div>
      </li>
    )
  }

  renderUserRunningApps(apps) {
    ReactTooltip.rebuild();
    var runningApps =apps.filter(app => !app.isTemplate && this.isSearchTemplate(app)).map((app) =>this.getTemplateItem(app));
    return runningApps;
  }


  renderTemplateApps(apps) {
   
    var templateApps =apps.filter(app => (app.isTemplate && (app.domain.indexOf("services") == -1 && app.domain.indexOf("customs") == -1 && app.domain.indexOf("rss_ss") == -1 ) && this.isSelectTemplate(app) && this.isSearchTemplate(app))).map((app) => this.getTemplateItem(app));
    return templateApps;
  }

  renderCustomApps(apps) {
    ReactTooltip.rebuild();
    var templateApps =apps.reverse().filter(app => (app.isTemplate && (app.domain.indexOf("customs") !== -1 ) && this.isSearchTemplate(app))).map((app) => this.getTemplateItem(app));
    return templateApps;
  }

  renderScheduleAndCampaigns(apps){
    ReactTooltip.rebuild();
  var templateApps =apps.filter(app => (app.isTemplate && app.domain.indexOf("schedules") !== -1 && this.isSearchTemplate(app))).map((app) => this.getTemplateItem(app));
    return templateApps;
 }

 renderServices(apps){
  ReactTooltip.rebuild();
  var templateApps =apps.filter(app => (app.isTemplate && app.domain.indexOf("services") !==-1 && this.isSearchTemplate(app))).map((app) => this.getTemplateItem(app));
    return templateApps;
 }

 renderRSS(apps){
  ReactTooltip.rebuild();
  var templateApps =apps.filter(app => app.isTemplate && app.domain.indexOf("rss_ss") !==-1 && this.isSearchTemplate(app)).map((app) => this.getTemplateItem(app));
    return templateApps;
 }

goToDashboard(evt) {
    evt && evt.preventDefault();
    this.props.resetMe();
    this.props.setSelectedAppId("");
    this.props.changeConsole('LANDING');

  }
  
handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  }

getModalClass(){
    if(this.previewApp || this.state.preview || this.state.previewOriginal){
      return 'modal-local modal-preview';
    }
   
    else if(this.state.isNewView || this.state.isEditView || this.state.isPickerActive){
      return 'modal-local modal-default modal-large col-sm-12 col-lg-10 col-md-10';
    }
    else if(this.state.uploadTemplateContent){
      return 'modal-local modal-default modal-large col-sm-12 col-lg-6 col-md-8 ';
    }
    else{
      return 'modal-local modal-default ';
    }
  }

 filterTemplatesChange = (e)=>{
    const selected = e.target.value;

    this.setState({ filteredTemplate: (!selected? 'all': selected) });
  }

  render() {
    const { apps, loading, error} = this.props.appsList;
    const {newPlayer} =this.props;
    var userSets = this.props.user.config.settings;
    
    var selectedTab=0;
    
    
    if(apps.length == 0 ){//|| !loading
      return null;
    }
    return (
      <div className="title-container">
      {this.isSelectView ?<h2 className="header-title">Select Template</h2>:
      <div>
      
      <h2 className="header-title">Templates</h2>
      <Search 
          changeConsole = {this.props.changeConsole} 
          onSearchChange = {this.onSearchChange}
        />
      </div>}
      
      <div className={this.isSelectView?"inner-container modal-big-scroll":"inner-container"}>
     
      <Tabs selected={selectedTab} filterTemplates={this.templateFiltersOptions} selectedTab={0} defaultFilter={this.state.filteredTemplate} filterTemplatesChange={this.filterTemplatesChange}>

      <Pane  label="PRE-DEFINED" >
        <ul id="templates" className="panel-body">
        <Loading/>
        <Error error={error}/>
        {this.renderTemplateApps(apps)}
        </ul>
        </Pane>

        <Pane label="EDIT/ASSIGN">
        <ul id="myapps" className="panel-body">
        <Loading/>
        <Error error={error}/>
        {this.renderUserRunningApps(apps)}
        </ul>
        </Pane>

        {!this.isSelectView && <Pane  label="CREATE FROM SCRATCH" >
        <ul id="custom" className="panel-body">
        <Loading/>
        <Error error={error}/>
        {this.renderCustomApps(apps)}
        </ul>
        </Pane>}

      {!this.isSelectView && <Pane label= "SERVICES">
      <ul id="services" className="panel-body">
      <Loading />
      <Error error={error}/>
      {this.renderServices(apps)}
      </ul>
      </Pane>}

      <Pane label= "RSS & SS">
      <ul id="rss_ss" className="panel-body">
      <Loading/>
      <Error error={error}/>
      {this.renderRSS(apps)}
      </ul>
      </Pane>
      </Tabs>

<ModalLocal className={this.getModalClass()} isOpen={this.state.modalOpen} >
          {this.state.modalOpen?this.getModalContent():''}
          <span  style={{position:'fixed', top:'0px', right:'1px',background:'#e7e5e5',borderRadius:'11px',padding:'2px'}} className="glyphicon glyphicon-remove" 
          onClick={(e) => this.closeModalPopup(e)} >
          </span>

      </ModalLocal>

<ReactTooltip type="light" effect="solid" className="customTheme" ref={this.tooltip}/>
</div>
</div>
    );
  }
}


export default AdminTemplatesList;

