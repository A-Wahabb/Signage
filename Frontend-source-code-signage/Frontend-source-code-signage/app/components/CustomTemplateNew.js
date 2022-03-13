import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import { reduxForm, Field,FieldArray } from 'redux-form';
import renderField from './renderField';
import renderSelect from './renderSelect';
import renderLabel from './renderLabel';
import renderNumber from './renderNumber';
import renderCheckbox from './renderCheckbox';
import renderColorPicker from './renderColorPicker';
import {BASE_SERVER} from '../constants/Config';
import {Loading,Title,Error} from './commonDumbs';
import ReactTooltip from 'react-tooltip';
//import _ from 'lodash';

class CustomTemplateNew extends Component {
  
  constructor(props) {
    super(props);
    this.state={
      updateKey:"none",
      udateKeyIndex:0,
      titleValue: '',
      selectSlides:[]
    };
  }

  componentWillMount() {
    this.props.resetMe();
    //let paramPlayerId=this.props.params.appId;
    this.props.fetchAppDetail(this.props.selectedAppId);
    this.setUpdateKey();
  }

  componentDidMount(){
    // var that =this;
    // try{
    //   that.clickedTimer=  window.setInterval(function(){
       
    //     let frame = document.getElementById("preview_iframe");
    //     let frameDoc = frame.contentDocument  || frame.contentWindow;
    //     var clickedValue=frameDoc && frameDoc.getElementById('update_key')&&frameDoc.getElementById('update_key').value ;
    //     if(clickedValue != that.props.update_key){
    //       that.props.updateKey(frameDoc.getElementById('update_key').value);

    //     }

    //   },20000)}
    // catch(e){}
  }

  updateTitleChange(evt) {
    evt.preventDefault();
    this.setState({
      titleValue: evt.target.value
    });
  }

shouldComponentUpdate(nextProps, nextState) {

      //console.log('IS LODASH  apctive App isEqual',JSON.stringify(nextProps.activeApp) == JSON.stringify(this.props.activeApp));
      //console.log((!nextProps.modal.isModalOpen && this.props.modal.isModalOpen));
      // console.log('IS LODASH updatekey isEqual',_.isEqual(nextProps.update_key, this.props.update_key));
      //console.log('IS LODASH media isEqual',_.isEqual(nextProps.user.mymedia, this.props.mymedia));
      return JSON.stringify(nextProps.activeApp) !== JSON.stringify(this.props.activeApp) || (nextState.updateKey !== this.state.updateKey) || (!nextProps.modal.isModalOpen && this.props.modal.isModalOpen) ;
  }

  selectApp(evt){
    evt.preventDefault();
    let app=this.props.activeApp.app&&this.props.activeApp.app.appDetail?this.props.activeApp.app.appDetail:{};
    let newPlayer=this.props.newPlayer.player?this.props.newPlayer.player:{};
     
      this.props.moveToLiveFolder(app,newPlayer);
      this.props.updatePlayerApp(app,newPlayer);
      this.resetCurrentProps();
      this.props.changeConsole("NEW_PLAYER_FORM");
  }


  componentWillUnmount() {

    if(this.clickedTimer)window.clearInterval(this.clickedTimer);
    this.props.resetForm("edit_form");
    //AppStore.removeChangeListener(this.onChange);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.selectedAppId && (nextProps.selectedAppId !== this.props.selectedAppId)){
    this.props.fetchAppDetail(this.props.selectedAppId);
    }
       
    if(!this.state.updateKey || (this.state.updateKey=="none")){
      this.setUpdateKey();
    }
  }

  editDone(){

    this.props.changeConsole('NEW_PLAYER_FORM');
  }

  goBack(evt){

    evt.preventDefault();
    this.resetCurrentProps();
    this.props.changeConsole('NEW_PLAYER_FORM');
  }

  resetCurrentProps(){
    this.props.resetMe();
    this.props.setSelectedAppId("");
    this.props.resetForm("edit_form");
  }

  setUpdateKey(e){
   //e.preventDefault();
   let keysArr=[];
   let slides=[];
    keysArr=this.props.activeApp.app && this.props.activeApp.app.appData && Object.keys(this.props.activeApp.app.appData.original_data);
    if(keysArr && keysArr.length>0){
   keysArr.splice(keysArr.indexOf("css"),1);
   keysArr.splice(keysArr.indexOf("tooltips"),1);
   keysArr.splice(keysArr.indexOf("formats"),1);
   slides.push(keysArr.map(key => this.props.activeApp.app.appData.original_data[key]["root_label"]));
   
   let currentIndx=e&&e.target && e.target.selectedIndex?e.target.selectedIndex:this.state.udateKeyIndex;

  console.log('Next Selected index', currentIndx);
   
  let nextKey =e && e.target&& keysArr?keysArr[e.target.selectedIndex]:keysArr[0];
  
  if(nextKey !== this.state.updateKey){
  this.setState({updateKey:nextKey,udateKeyIndex:currentIndx,selectSlides:slides});
}

     }
  }

  saveChanges(values, activeApp){
    let newActiveApp = Object.assign({},activeApp);
  
    newActiveApp.app.appDetail=Object.assign({},newActiveApp.app.appDetail);
    if(this.state.titleValue!==''){
    newActiveApp.app.appDetail.appName=this.state.titleValue;
  }
    if(!newActiveApp.app.appDetail.thumb)
    {
     let app= this.props.appsList.apps.filter(app=> app._id ===newActiveApp.app.appDetail._id);
     newActiveApp.app.appDetail.thumb =app.length>0?app[0].thumb:newActiveApp.app.appDetail.thumb;
    }
    // let frame = document.getElementById("preview_iframe");
    // let frameDoc = frame.contentDocument  || frame.conetentWindow;
    // let thumbImage=frameDoc.getElementById('thumbnail');
    // if(thumbImage){
    // activeApp.app.appDetail.thumbnailPath=thumbImage.src.length>22?thumbImage.src.slice(22):activeApp.app.appDetail.thumbnailPath;
    // }
    
    //this.props.updateKey("none");
    this.props.validateAndSaveApp(values,newActiveApp);
  }

   scheduleApp(evt,apps, previewName){
     var selectedIndex =evt.currentTarget.selectedIndex;
     //TODO: copy app selected, to schedule res
     if(selectedIndex ==0) return;
     var item = {
       "base64_data":apps[selectedIndex-1].thumb,
       "original_file_name":apps[selectedIndex-1].appLocation+"/res/logo.png"
     }
     if(item){
     this.props.tempAppUpdate(previewName.replace("base64_data","original_data") , "res/"+item.original_file_name,this.props.activeApp);
     this.props.tempAppUpdate(previewName , item.base64_data,this.props.activeApp);
     }
   }


  toggleModal(evt,IsOpen,contentType,jsonIndex,mtype,path) {

    evt.preventDefault();
    //content - "PREVIEW"/ "MYMEDIA"
    this.props.updateModal({isModalOpen: IsOpen,
      modalContent :contentType,imagePreviewName:jsonIndex,mediaType:mtype,mediaPath:path, hideModal:(e,item)=>this.closeEditModal(e,item)});
      return true;
    }

    closeEditModal(evt,item){
      evt && evt.preventDefault();
      if(item){
        this.props.tempAppUpdate(this.props.modal.imagePreviewName.replace("base64_data","original_data") , "res/"+item.original_file_name,this.props.activeApp);
        this.props.tempAppUpdate(this.props.modal.imagePreviewName , item.base64_data,this.props.activeApp);

        var fd = new FormData();
        fd.append('jsonIndex', this.props.modal.imagePreviewName);
        fd.append('newFile', item.original_file_name);
        fd.append('appLocation', this.props.activeApp.app.appDetail.appLocation);
        this.props.updateMedia(fd,this.props.activeApp);
      }
      //this.props.updateModal();
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

    updateContent(event,value) {
      event.preventDefault();
      var newInput =typeof arguments[1] !== 'undefined'? value: event.target.value;
      var targetName= event.target.name?event.target.name:event.target.getAttribute('name');
      var inputName =targetName.replace("base64_data","original_data");
      this.props.tempAppUpdate(inputName , newInput,this.props.activeApp);
      this.props.tempAppUpdate(targetName , newInput,this.props.activeApp);
      this.props.updateKey(new Date().getTime().toString());
      if(newInput&&newInput.toString().startsWith('#')){
        this.props.reset();
      }
    }

    removeContent(event){
      event.preventDefault();
      //var newInput =event.target.value;
      //event.target.parentElement.style.display="none";
      var itemName=event.currentTarget.attributes.getNamedItem('name').value;
      var inputName =itemName && itemName.split('~')[0].replace("base64_data","original_data");
      inputName&&this.props.tempAppUpdate(inputName , "DELETE",this.props.activeApp);//remove from original
      inputName&&this.props.tempAppUpdate(itemName.split('~')[0] , "DELETE",this.props.activeApp);//remove from base64
      //this.props.UpdateAppData(this.props.activeApp.app);
    }

    addNewContent(event,fields){
      event.preventDefault();
      //var that = this;
      //var newInput =event.target.value;
      var itemName=event.currentTarget.attributes.getNamedItem('name').value;
      var inputName =itemName && itemName.split('~')[0].replace("base64_data","original_data.formats");

      inputName&&this.props.tempAppUpdate(itemName.split('~')[0].replace("base64_data","base64_data.formats") , "ADD",this.props.activeApp,function(addNewVal){fields.push(addNewVal);});// add to base64
      //add to original
      inputName&&this.props.tempAppUpdate(inputName , "ADD",this.props.activeApp);
      //this.props.UpdateAppData(this.props.activeApp.app);
    }

    showToolTip(guideImg, text){
      let toolTipGuide= document.getElementById('toolTipGuide');
      toolTipGuide.innerHTML=guideImg+"<p>"+text+"</p>";
      ReactTooltip.show(findDOMNode(this.refs.thumbGuideToolTip));

    }

    render() {
      const {handleSubmit, newApp,  appsList, activeApp} = this.props;
        let error = newApp.error;
      
            return (
              <div className="title-container"><h2 className="header-title">Update Template</h2>
              <div className="container ">
              <Loading isLoading={newApp.loading || activeApp.loading}/>
              <Error error={error}/>
                
                  <div >
     <iframe href='http://localhost:8080/builder/index.html' style={{width:'900px',height:'700px'}} />             
</div>
              </div>
          </div>
            );
          }
        }

        export default reduxForm({
          form: 'CustomTemplateNew',// a unique identifier for this form
          FieldArray,
          Field
        })(CustomTemplateNew) ;
   