import React, { Component } from 'react';
import {ReactDOM,findDOMNode} from 'react-dom';
import RenderJSON from './editTemplateFields/renderJson';
import RenderHeader from './editTemplateFields/renderHeader';
import RenderInputTitle from  './editTemplateFields/renderInputTitle';
import {BASE_SERVER,FontFamilies} from '../constants/Config';
import {Loading,Title,Error,updateActiveApp,ZoomoutPreview} from './commonDumbs';
import ModalLocal from './modal-local';
import CustomerNen from './Customer-nen';
import { confirmAlert } from 'react-confirm-alert';
import PickerPopup  from './media-content-picker/PickerPopup.js';
import { toast } from 'react-toastify';

class TemplateEdit extends Component {
  
  constructor(props) {
    super(props);
    this.showCustomDataModal=false;
    this.isDoneConfirm=false;
    this.mediaPath = "";
    this.themeColor=this.props.user.config.settings.color_primary;
    this.previewApp=null;
    this.state={
      titleValue: '',
      selectedSldIndx:0,
      slides:[],
      preview:false,
      modalOpen:false,
      isEditing:true,
      isPickerActive:false,
      appDetail:null,
      appData:null
    };

    this.frameInterval=false;
    this.togglePreview = this.togglePreview.bind(this);
    this.closeModalPopup = this.closeModalPopup.bind(this);
    this.toggleMediaPicker = this.toggleMediaPicker.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onMediaSelected = this.onMediaSelected.bind(this);
    this.objType = this.objType.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.assignAppToState= this.assignAppToState.bind(this);
    this.setAppData = this.setAppData.bind(this);
    this.saveChanges= this.saveChanges.bind(this);
    this.getModalContent = this.getModalContent.bind(this);
    this.updateTitleChange = this.updateTitleChange.bind(this);
    this.addNewContent = this.addNewContent.bind(this);
    this.removeContent = this.removeContent.bind(this);
    this.confirmTemplateName = this.confirmTemplateName.bind(this);
    this.publishNow = this.publishNow.bind(this);
    this.toggleCustomDataSmall=this.toggleCustomDataSmall.bind(this);
  }

  componentDidMount() {
    this.props.resetMe();
    this.props.fetchAppDetail(this.props.selectedAppId);
  }

  componentDidUpdate(prevProps,prevState){
 
  if(this.state.isEditing !== prevState.isEditing && !this.state.isEditing && !this.isDoneConfirm){
    this.isDoneConfirm=true;
     this.confirmPublish();
    }

    if(prevProps.activeApp.app && 
      prevProps.activeApp.app.appDetail && 
      this.props.activeApp.app && this.props.activeApp.app.appDetail&&
      (JSON.stringify(this.props.activeApp.app.appDetail) != JSON.stringify(prevProps.activeApp.app.appDetail)) && 
      this.props.activeApp.app.appDetail.domain == 'customs'){
      this.props.changeConsole('CUSTOMS_TEMPLATE_EDIT');
      return;
    }
    if(this.props.selectedAppId && (this.props.selectedAppId != prevProps.selectedAppId)){
    this.props.fetchAppDetail(this.props.selectedAppId);
    }   
    
    if((!this.state.appDetail && 
      this.props.activeApp &&
      this.props.activeApp.app &&
       this.props.activeApp.app.appDetail)||(
       this.state.appDetail &&
       this.props.activeApp &&
      this.props.activeApp.app &&
       this.props.activeApp.app.appDetail&&
       (this.state.appDetail._id != this.props.activeApp.app.appDetail._id)))
       {
      this.assignAppToState();
    }
    if(this.state.modalOpen && this.state.preview ){
      let _self=this;
      ZoomoutPreview(_self);
    }
    }

  assignAppToState() {
     
      if(!this.state.appDetail || (JSON.stringify(this.props.activeApp.app.appDetail) !== JSON.stringify(this.state.appDetail))){
      this.setState({
        appDetail: this.props.activeApp.app.appDetail
      });
    }
    if (!this.state.appData || (JSON.stringify(this.props.activeApp.app.appData) !== JSON.stringify(this.state.appData))) {
      this.setState({
        appData: this.props.activeApp.app.appData
      });
    }
 }


  updateTitleChange(evt) {
    evt.preventDefault();
    this.setState({
      titleValue: evt.target.value
    });
  }


  closeModalPopup(){
    this.showCustomDataModal = false;
    this.setState({
      modalOpen:false,
      isPickerActive:false,
      preview:false
    });
  }

  publishNow(evt){
    evt&&evt.preventDefault();
    let app=this.state.appDetail;
    app.contentType='TEMPLATE';
    this.props.toggleRootModal("PUBLISH",app);
    this.props.rootModal('','',false);
    
  }

  saveChanges(){
    let udpatedActiveApp={app:{}};
    udpatedActiveApp.app['appDetail'] = Object.assign({},this.state.appDetail);
    udpatedActiveApp.app['appData'] = Object.assign({},this.state.appData);
    
    if(this.state.titleValue!==''){
      udpatedActiveApp.app['appDetail'].appName=this.state.titleValue;
    }
      if(!udpatedActiveApp.app.appDetail.thumb)
      {
       let app= this.props.appsList.apps.filter(app=> app._id ===udpatedActiveApp.app.appDetail._id);
       udpatedActiveApp.app.appDetail.thumb =app.length>0?app[0].thumb:udpatedActiveApp.app.appDetail.thumb;
      }
    this.props.validateAndSaveApp(udpatedActiveApp);
    this.setState({
      isEditing:false
    });
    
  }

   confirmPublish= () => {
      confirmAlert({
        title: 'Ready to Publish?',                      
        message: 'Do you want to continue updating or Ready to publish into screen?', 
        childrenElement: () => <div></div>,       
        confirmLabel: 'PUBLISH',                           
        cancelLabel: "CONTINUE UPDATE",                             
        onConfirm: () => { this.publishNow()},    
        onCancel: () => {
          this.setState({isEditing:true});
          this.isDoneConfirm=false;
        }

      });
    };

  goBack(evt){
    evt.preventDefault();
    this.props.changeConsole(this.props.backConsole);
  }
  
  confirmTemplateName(){
      let getUpdatedAppDetail= appDetail => {
        let appNameIp= document.getElementById('template-new-name');
        appDetail.appName = appNameIp.value?appNameIp.value:appNameIp.defaultValue;
        this.setState({
          appDetail: appDetail
        });
        return true;};
      
      confirmAlert({
        title: 'Template Name',                        
        message: 'Save template as-',
        childrenElement: () => <div>
          <input id='template-new-name' type='text' 
            className="single-popup-input" 
            required

            placeholder="Enter New Template Name..."
           />
           </div>,      
        confirmLabel: 'Save',                           
        cancelLabel: "Close",                             
        onConfirm: () => { 
          let appNameIp= document.getElementById('template-new-name');
          if (!appNameIp.value){
            toast.error("New Template name is mandatory !");
            return;
          }
          getUpdatedAppDetail(this.state.appDetail);
          this.saveChanges()},   
        onCancel: () => {console.log('go back');},      
      });
    };


  toggleMediaPicker(jsonIndex, mediaPath){
    if(!this.state.isPickerActive){
    this.jsonIndex= jsonIndex;
    this.mediaPath = mediaPath;
    }
    this.setState({
      isPickerActive : !this.state.isPickerActive,
      modalOpen : !this.state.modalOpen
    })
  }

  toggleModal() {
    this.setState({
      modalOpen : !this.state.modalOpen
    });
   
    }

    onMediaSelected(selectedMediaArr, mediaList){
     
      let mediaArr = mediaList;
      let item = mediaArr.filter(media => media._id == selectedMediaArr[0]);
      if(item && item.length>0){
        item = item[0];
        let originalPath = item.original;
        let original_file_name=item.original_file_name;

        updateActiveApp(this.jsonIndex.replace("base64_data","original_data") , "res/"+original_file_name,this.state.appData);
        updateActiveApp(this.jsonIndex , item.thumbnail.replace(BASE_SERVER+'/',''),this.state.appData,this.setAppData);

        var mediaInfo={};
         mediaInfo['jsonIndex'] = this.jsonIndex;
         mediaInfo['newFile'] =original_file_name;
         mediaInfo['appLocation'] =this.state.appDetail.appLocation;
        this.props.updateMedia(mediaInfo);
        this.toggleMediaPicker();
      }
      return false;
    }


    uploadMedia(event) {
      event.preventDefault();
      var selectedMedia = event.target.files[0];
      var inputName= event.target.name.slice(0,-7);

      var fd = new FormData();
      fd.append('jsonIndex', inputName);
      fd.append('newFile', selectedMedia);
      fd.append('appLocation', this.props.activeApp.app.appDetail.appLocation);
      this.props.tempAppUpdate(inputName.replace("base64_data","original_data") , "res/"+selectedMedia.name,this.props.activeApp);
      this.props.updateMedia(fd,this.props.activeApp);

    }

    setAppData(newAppData){
      this.setState({
        appData: newAppData
      });
    }

    updateContent(event,value, inputType) {
      var newInput =typeof arguments[1] !== 'undefined'? value: event.target.value;
      if(inputType=='number'){
        newInput = parseInt(newInput);
      }
      if(inputType=='checkbox'){
        newInput = !value;
      }
      var targetName= event.target.name?event.target.name:event.target.getAttribute('name');
    
       var inputName =targetName.replace("base64_data","original_data");
       updateActiveApp(inputName , newInput,this.state.appData);
       updateActiveApp(targetName , newInput,this.state.appData,this.setAppData);
  }

    removeContent(event){
      event.preventDefault();
      var itemName=event.currentTarget.attributes.getNamedItem('name').value;
      var inputName =itemName && itemName.split('~')[0].replace("base64_data","original_data");
      updateActiveApp(inputName, "DELETE",this.state.appData);//remove from original
      updateActiveApp(itemName.split('~')[0] , "DELETE",this.state.appData,this.setAppData);
    }

    addNewContent(event,arrObj){
      event.preventDefault();
      var itemName=event.currentTarget.attributes.getNamedItem('name').value;
      var inputName =itemName && itemName.split('~')[0].replace("base64_data","original_data.formats");

      updateActiveApp(inputName , "ADD",this.state.appData);
      updateActiveApp(itemName.split('~')[0].replace("base64_data","base64_data.formats") , "ADD",this.state.appData,this.setAppData);
    }

  

    toggleCustomDataSmall(){
      this.showCustomDataModal=true;
      this.setState({
        modalOpen:!this.state.modalOpen
      });
    }

    togglePreview(content){
        this.setState({
          preview:content?content:false,
          modalOpen:!this.state.modalOpen
        });

    }


 objType(object) {
    let stringConstructor = "test".constructor;
    let arrayConstructor = [].constructor;
    let objectConstructor = ({}).constructor;

    if (object === null) {
        return "null";
    }
    else if (object === undefined) {
        return "undefined";
    }
    else if (object.constructor === stringConstructor && object.startsWith('#') && object.length==7) {
        return "Color";
    }
    else if (object.constructor === stringConstructor) {
        return "String";
    }
    else if (object.constructor === arrayConstructor) {
        return "Array";
    }
    else if (object.constructor === objectConstructor) {
        return "Json";
    }
    else if (typeof(object) === 'number') {
        return "Number";
    }
    else if (typeof(object) === 'boolean') {
        return "Bool";
    }
    else {
        return "unknown";
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
  
    getModalContent(){
     
     if(this.state.isPickerActive){
        return <PickerPopup  
              closePicker={this.toggleMediaPicker,this.toggleModal}
              onSelect = {this.onMediaSelected}
              user= {this.props.user}
              common = {this.props.common}
              isSingleSelect = {true}
          />
      }
      else if(this.showCustomDataModal){
        return <CustomerNen locs={this.props.locs} selectedLoc={this.props.selectedLoc}
          fetchLocs={this.props.fetchLocs} setSelectedLocs={this.props.setSelectedLocs}  setSelectedAppId={this.props.setSelectedAppId}/>
      }
      if(this.state.preview){
        return (
          <div>{this.state.preview}</div>
        );
      }
      else{
        return ("Template Not available for preview!!");
      }

    }

    getModalClass(){
    if(this.state.preview){
      return 'modal-local modal-preview';
    }
    else if(this.state.isPickerActive){
      return 'modal-local modal-default modal-large-inner col-sm-12 col-lg-12 col-md-12';
    }
    else{
      return 'modal-local modal-default ';
    }
  }


    render() {
      let {activeApp} = this.props;
      let application = null;
      let guidePath= '';
      let appDetail =null;
      let videoName= '';
      let isSchedulerApp =false;
      let appName ='';
      let appData = this.state.appData;
      let isLoading =this.props.activeApp.loading;
      if(this.state.appDetail){
        application = this.props.activeApp.app;

        appDetail =application.appDetail;
        appDetail.thumb = appDetail && appDetail.thumb ? appDetail.thumb : "";
        appDetail.thumbnailPath = appDetail && appDetail.thumbnailPath ? appDetail.thumbnailPath : "";
        appData = application.appData;
        
          videoName = videoName.length==0 && appDetail._id ? appDetail._id:videoName;
        appName=appDetail?appDetail.appName:"";
        this.previewApp = appDetail;
      }
      
     
      let error= activeApp.error||null;

    

return (
  <div style={{height:'100%'}}>
  <h4 className="header-title">Edit Template</h4>
  <div className='center-app-title'> 
  
  <RenderInputTitle 
  appName={appName}
  updateTitleChange={this.updateTitleChange} />

  </div>

  {appDetail?<RenderHeader  domain={appDetail.domain} isLoading={isLoading} themeColor={this.themeColor}
    changeConsole={this.props.changeConsole}
    save={appDetail.isTemplate && !this.props.user.user.admin? this.confirmTemplateName : this.saveChanges}
    appDetail={appDetail}
    togglePreview={ this.togglePreview}
    toggleCustomDataSmall= {this.toggleCustomDataSmall} /> : null }
  <div className="inner-container" style={{height:'calc(100% - 50px)'}}>
    
    <Loading isLoading={this.props.activeApp.loading}/>
    <Error error={error}/>
              
    {application &&
    
    <div style={{height:'100%'}}>
    
    <div id="edit_form" className="form-horizontal">         
    <ul className="list-small-items pop-editor">

    { appData && this.objType(appData.original_data) === 'Json'&& appDetail.appLocation  && 
    <RenderJSON updateContent={this.updateContent}
     jsonObj={appData.base64_data}
     objType={this.objType}
     themeColor={this.themeColor}
     rootProperty='base64_data'
     appLocation={appDetail.appLocation}
     toggleMediaPicker={this.toggleMediaPicker}
     removeContent={this.removeContent}
     addNewContent={this.addNewContent}
     appDetail={appDetail} />
    }         
    </ul>

    </div>
</div>
}

{this.state.modalOpen &&
  <ModalLocal  className={this.getModalClass()} isOpen={this.state.modalOpen} >
    {this.getModalContent()}
  <span className="glyphicon glyphicon-remove" style={{position:'fixed', top:'-20px', right:'1px',background:'#e7e5e5',borderRadius:'11px',padding:'2px'}} onClick={(e) => this.closeModalPopup(e)} >
    </span>

</ModalLocal>}

</div>
</div>
            );
          }
        }

export default TemplateEdit;
       
