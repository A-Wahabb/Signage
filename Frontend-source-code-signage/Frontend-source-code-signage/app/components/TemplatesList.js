import React, { Component, PropTypes } from 'react';
import { Link} from 'react-router-dom';
import  { Tabs,Pane } from './Tabs';
import emptyScreen from '../assets/signage-empty.png';
import {BASE_SERVER, LOCAL_SERVER,PrimaryColor} from '../constants/Config';
import { confirmAlert } from 'react-confirm-alert'; // Import
import {Loading,Title,Error,ZoomoutPreview} from './commonDumbs';
import ModalLocal from './modal-local';
import TemplateEditPg from './../pages/TemplateEditPg';
import ReactTooltip from 'react-tooltip';
import Search from './search/SearchContainer.js';
import Dropdown, {
    DropdownToggle,
    DropdownMenu,
    DropdownMenuWrapper,
    MenuItem,
    DropdownButton
} from '@trendmicro/react-dropdown';

class TemplatesList extends Component {

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
      filteredTemplate: null
    };
    this.allowedApps=[];
    this.previewApp=null;
    this.selectApp=null;
    this.isSelectView=false;
    this.selectedPlayers=null;
    this.generateEmbedUrl=null;
    this.isInformed=false;
    this.frameInterval=false;
    this.closeModalPopup = this.closeModalPopup.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.publishNow=this.publishNow.bind(this);
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
    let isDemoUser = this.props.user.user && this.props.user.user.status.toUpperCase()=='DEMO'? true: false;

    this.setState({ filteredTemplate: isDemoUser?'ALL':customer });
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
    if(!app){
      app = sessionStorage.getItem('designTemplate');
      app = JSON.parse(app);
    }
    if(app){
    this.props.toggleRootModal("PUBLISH",app);
    }
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

  if(template.appName.toLowerCase().indexOf(this.state.searchText.toLowerCase())!= -1 || template.domain.toString().indexOf(this.state.searchText)!= -1){
    return true;
  }else{
    return false;
  }

}

isSelectTemplate(template){
  if(this.state.filteredTemplate){
    if((template.domain.toUpperCase().indexOf(this.state.filteredTemplate.toUpperCase()) != -1 || template.domain.toUpperCase() === "COMMON")){
      return true;
    }else if(this.state.filteredTemplate.toUpperCase() == 'ALL'){
      return true;
    }else{
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
        onCancel: () => {this.isInformed=false; },      
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
               media.original=BASE_SERVER+'/preview/'+media.userId+'/'+media.original_file_name;
                media.thumbnail=BASE_SERVER+'/preview/'+media.userId+'/thumbnails/'+media.base64_data;

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
        sessionStorage.removeItem('designTemplate');
        
        sessionStorage.setItem('selectedAppId',appId);
        sessionStorage.setItem('playerDetail',JSON.stringify({}));
        sessionStorage.setItem('playerList',JSON.stringify(this.props.playersList.players));
        sessionStorage.setItem('userInfo',JSON.stringify(this.props.user.user));
        sessionStorage.setItem('media',JSON.stringify(mediaList));
        sessionStorage.setItem('BASE_SERVER',BASE_SERVER);
        sessionStorage.setItem('commonFolderId',this.props.user.folders.folderList[0]._id);
        sessionStorage.setItem('primaryColor', PrimaryColor);
        sessionStorage.setItem('selectedAppName', app.appName);
        if(!app.isTemplate){
        sessionStorage.setItem('designTemplate',JSON.stringify(app));
        }
        

        if(domain.indexOf('custom-editor') == -1){
          
        let slideEditor = <iframe src={BASE_SERVER+'/builder'} width='100%' height='100%' />;
        this.props.rootModal(slideEditor, 'EXTRA-LARGE', true);
        }else{
          sessionStorage.setItem('appLoc', app.appLocation);
          let designEditor = <div style={{width:'100%', height:'100%'}}><Link
              to="#"
              style={{position:'fixed',paddingLeft:'2px',right:'35px',top:'3px',background:this.props.user.config.settings.color_primary}}
              className="btn btn-primary btn-single"
              onClick={()=> this.publishNow()}>
              <span className="glyphicon glyphicon-send"></span>{' PUBLISH'}
            </Link><iframe src={BASE_SERVER+'/design-editor'} width='100%' height='100%' /></div>;
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
    this.setState({
        modalOpen:false,
        isEditView: false,
        isNewView: false,
        preview:false,
        previewOriginal:false
      });

   this.previewApp=null;
    this.selectApp=null;
    this.isSelectView=false;
    this.selectedPlayers=null;
    this.generateEmbedUrl=null;
    this.props.resetMe();
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

getModalContent(){
      let app = this.previewApp;
 
      if(this.state.preview && this.previewApp){
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
        this.selectApp.contentType = 'TEMPLATE'
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
     app.contentType ="TEMPLATE";
     let isAccessAllowed =this.allowedApps.filter(ap => ap._id == app._id).length>0?true:false;
    return (
      <li className="col-xs-12 col-sm-6 col-md-4 col-lg-4 list-group-item" key={app._id}>

      <div className="thumbnail apps" >
      <span className={isAccessAllowed?'':'locked'}></span>
      <img src={appThumbnail}  alt="242x200" onClick={this.isSelectView ?(evt)=>(this.setSelection(app)): ()=>{this.gotoEditApp(app._id,this.props.selectedPlayerId,app.domain,app.isTemplate,app)}}/>
      {!this.isSelectView ? <span className='menu-dots'>
          <Dropdown autoOpen= {true} arrowClassName='menu-dots-inner' className={'player-drop'}>
      <Dropdown.Toggle title="" />
      <Dropdown.MenuWrapper>
        <Dropdown.Menu>
            {isAccessAllowed && <MenuItem  onClick={()=>{this.gotoEditApp(app._id,this.props.selectedPlayerId,app.domain,app.isTemplate,app)}}>
              <span className="glyphicon glyphicon-pencil"  ></span><span>{app.domain.indexOf('customs') !== -1 && app.isTemplate?'NEW DESIGN':'UPDATE TEMPLATE'}</span>
            </MenuItem>}

            {!app.isTemplate && 
              <MenuItem 
              onClick={()=>this.publishNow(app)} >
                <span data-tip="Publish to screens" className="glyphicon glyphicon-send"  >
                </span>
                {'PUBLISH TO SCREENS'}
            </MenuItem>}

            {!app.isTemplate && 
              <MenuItem onClick={()=>{this.previewApp=app;this.togglePreview();this.togglePreviewWindow()}}>
             <span className="glyphicon glyphicon-eye-open " data-tip="Preview customized Template" data-toggle="modal" data-target="#exampleModalCenter"  ></span>
             <span>PREVIEW</span>
            </MenuItem>
            }

            {!app.isTemplate && 
            <MenuItem  onClick={(e)=>{this.props.toggleRootModal("SHARE",app)}}>
              <span className="glyphicon glyphicon-share-alt"  ></span>
                <span>SHARE</span>
            </MenuItem>
            }
            
           {app.isTemplate &&  
            <MenuItem  onClick={(evt) => {this.toggleOriginalPreview(evt,app);this.togglePreview();}}>
              <span data-tip="Original Template Preview" className="glyphicon glyphicon-play"></span><span>PREVIEW TEMPLATE</span>
            </MenuItem>}

              { !app.isTemplate && <MenuItem  onClick={()=>{this.props.copyTemplate(app._id)}} >
             <span className="glyphicon glyphicon-duplicate" data-tip="Make duplicate" ></span><span>MAKE A COPY</span>
            </MenuItem> } 

            { !app.isTemplate &&  <MenuItem  onClick={()=>{this.confirm(app)}}>
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
      </div>
      </div>
      </li>
    )
  }

  renderUserRunningApps(apps) {
    var runningApps =apps.filter(app => !app.isTemplate && (app.status=="RUNNING"||app.status=="DRAFT") && this.isSearchTemplate(app)).map((app) =>this.getTemplateItem(app));
    return runningApps;
  }


  renderTemplateApps(apps) {
    var templateApps =apps.filter(app => (app.isTemplate && (app.domain.indexOf("services") == -1 && app.domain.indexOf("customs") == -1 && app.domain.indexOf("rss_ss") == -1 ) && this.isSelectTemplate(app) && this.isSearchTemplate(app))).map((app) => this.getTemplateItem(app));
    return templateApps;
  }

  renderCustomApps(apps) {
    var templateApps =apps.filter(app => (app.isTemplate && (app.domain.indexOf("customs") !== -1 ) && this.isSearchTemplate(app))).reverse().map((app) => this.getTemplateItem(app));
    return templateApps;
  }

  renderScheduleAndCampaigns(apps){
  var templateApps =apps.filter(app => (app.isTemplate && app.domain.indexOf("schedules") !== -1 && this.isSearchTemplate(app))).map((app) => this.getTemplateItem(app));
    return templateApps;
 }

 renderServices(apps){
  var templateApps =apps.filter(app => (app.isTemplate && app.domain.indexOf("services") !==-1 && this.isSearchTemplate(app))).map((app) => this.getTemplateItem(app));
    return templateApps;
 }

 renderRSS(apps){
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
  }

getModalClass(){
    if(this.previewApp || this.state.preview || this.state.previewOriginal){
      return 'modal-local modal-preview';
    }
    else if(this.state.isNewView || this.state.isEditView){
      return 'modal-local modal-default modal-large col-sm-12 col-lg-10 col-md-10';
    }
    else{
      return 'modal-local modal-default ';
    }
  }

 filterTemplatesChange = (e)=>{
    const selected = e.target.value;

    this.setState({ filteredTemplate: (selected==='all'? null: selected) });
  }

  render() {
    const { apps, loading, error} = this.props.appsList;
  
    const {newPlayer} =this.props;
    var userSets = this.props.user.config.settings;
    if(this.props.user.user.status.toUpperCase() == 'DEMO'){
     this.allowedApps= apps.filter( app => (!app.isTemplate || userSets.allowedTemplates.indexOf(app._id) != -1 || userSets.isAllTemplateAllowed) );
    }else if(this.props.user.user.status.toUpperCase() == 'PAID'){
      this.allowedApps = apps.filter( app => (!app.isTemplate || userSets.isAllTemplateAllowed || userSets.allowedTemplates.indexOf(app._id) != -1) );
    }
    const userId= this.props.user.user._id;
    
    var selectedTab=0;
    let customized=  apps.filter(app => (!app.isTemplate));
    selectedTab=customized.length==0?1:0;
    
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
     
      <Tabs selected={selectedTab} filterTemplates={this.templateFiltersOptions} defaultFilter={this.state.filteredTemplate} filterTemplatesChange={this.filterTemplatesChange} onRefresh={()=>this.props.fetchApps(userId)} >

      <Pane label="CUSTOMIZED">
        <ul id="myapps" className="panel-body">
        <Loading/>
        <Error error={error}/>
        {this.renderUserRunningApps(apps)}
        </ul>
        </Pane>

      <Pane  label="PRE-DEFINED" >
        <ul id="templates" className="panel-body">
        <Loading/>
        <Error error={error}/>
        {this.renderTemplateApps(apps)}
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

<ModalLocal  className={this.getModalClass()} isOpen={this.state.modalOpen} >
          {this.state.modalOpen?this.getModalContent():''}
          <span  style={{position:'fixed', top:'-20px', right:'1px',background:'#e7e5e5',borderRadius:'11px',padding:'2px'}} className="glyphicon glyphicon-remove" 
          onClick={(e) => this.closeModalPopup(e)} >
          </span>

      </ModalLocal>

<ReactTooltip type="light" effect="solid" className="customTheme" ref={this.tooltip}/>
</div>
</div>
    );
  }
}


export default TemplatesList;
//window.location.href=LOCAL_SERVER+'/builder/index.html';

