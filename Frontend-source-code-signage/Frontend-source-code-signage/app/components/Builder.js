import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import { reduxForm, Field,FieldArray } from 'redux-form';
import renderField from './renderField';
import renderSelect from './renderSelect';
import renderLabel from './renderLabel';
import renderNumber from './renderNumber';
import renderCheckbox from './renderCheckbox';
import renderColorPicker from './renderColorPicker';
import renderRangeSlide from './renderRangeSlide';
import {BASE_SERVER} from '../constants/Config';
import {Loading,Title,Error} from './commonDumbs';
import ReactTooltip from 'react-tooltip';

import ModalLocal from './modal-local';
import CustomerNen from './Customer-nen';
import { confirmAlert } from 'react-confirm-alert';



class TemplateNew extends Component {
  
  constructor(props) {
    super(props);
    this.isExtraType=false;
    this.isExtraTypeSmall=false;
    this.showCustomDataModal=false;
    this.isAppNameConfirmed=false;
    this.isDoneConfirm=false;
    this.state={
      updateKey:"none",
      udateKeyIndex:0,
      titleValue: '',
      selectSlides:[],
      preview:true,
      modalOpen:false,
      isEditing:true
    };
  }

  componentWillMount() {
    this.props.resetMe();
    this.props.fetchAppDetail(this.props.selectedAppId);
    this.setUpdateKey();
  }

  componentDidUpdate(prevState){
    console.log('isEditing', this.state.isEditing);
    console.log('isDone', this.isDoneConfirm);
    if(this.state.isEditing !== prevState.isEditing && !this.state.isEditing && !this.isDoneConfirm){
      console.log('launch done confirm',this.props.selectedPlayerId);
      this.isDoneConfirm=true;
     this.props.selectedPlayerId? this.confirmPublish() : this.confirmDoneEditing();
    }

    ReactTooltip.rebuild();
    if(this.state.modalOpen && !this.isExtraTypeSmall){
      let frame= document.getElementById('preview-frame');
      let templateBody =frame.contentWindow.document.getElementsByTagName('body');
       setTimeout(function(){
          if(templateBody[0]){
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.zoom =0.5;
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.overflow='hidden';
       }},2*1000);
    setTimeout(function(){
          if(templateBody[0]){
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.zoom =0.5;
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.overflow='hidden';
       }},5*1000);
        setTimeout(function(){
          if(templateBody[0]){
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.zoom =0.5;
         document.getElementById('preview-frame').contentWindow.document.getElementsByTagName('body')[0].style.overflow='hidden';
       }},10*1000);
      }
    }


  updateTitleChange(evt) {
    evt.preventDefault();
    this.setState({
      titleValue: evt.target.value
    });
  }

shouldComponentUpdate(nextProps, nextState) {

      return true;
  }

  selectApp(evt){
    evt&&evt.preventDefault();
    let app=this.props.activeApp.app&&this.props.activeApp.app.appDetail?this.props.activeApp.app.appDetail:{};
    let activePlayer=this.props.activePlayer.player?this.props.activePlayer.player:{};
    //this.props.updatePlayerApp(app,activePlayer);
    let allPlayers= this.props.posts.playersList.players?this.props.posts.playersList.players:[];
    this.props.moveToLiveFolder(app,activePlayer,allPlayers);
    this.resetCurrentProps();
    
    this.props.changeConsole(this.props.backConsole);
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

  confirmPublish= () => {
      confirmAlert({
        title: 'Ready to Publish?',                      
        message: 'Do you want to continue editing in the template or Ready to publish into screen?', 
        childrenElement: () => <div></div>,       
        confirmLabel: 'Publish',                           
        cancelLabel: "Continue Editing",                             
        onConfirm: () => { this.selectApp()},    
        onCancel: () => {this.setState({isEditing:true});this.isDoneConfirm=false;console.log('go back');},      
      });
    };

  
  confirmDoneEditing= () => {
      console.log('done props',this.props);
      confirmAlert({
        title: 'Are You Done?',                      
        message: 'Do you want to continue editing in the template or Done?', 
        childrenElement: () => <div></div>,       
        confirmLabel: 'Done',                           
        cancelLabel: "Continue Editing",                             
        onConfirm: () => { this.editDone()},    
        onCancel: () => {this.setState({isEditing:true});this.isDoneConfirm=false;console.log('go back');},      
      });
    };

  editDone(){
    this.props.changeConsole(this.props.backConsole);
  }

  goBack(evt){

    evt.preventDefault();
    this.resetCurrentProps();
    this.props.changeConsole(this.props.backConsole);
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

  confirmTemplateName= (value,activeApp) => {
      let getUpdatedApp= actApp => {let appNameIp= document.getElementById('template-new-name');
      actApp.app.appDetail.appName = appNameIp.value?appNameIp.value:appNameIp.defaultValue;
      return activeApp;};
      confirmAlert({
        title: 'Template Name',                        
        message: 'Save template as-',               // Message dialog
        childrenElement: () => <div><input id='template-new-name' type='text' className="single-popup-input" defaultValue={activeApp.app.appDetail.appName} /></div>,       
        confirmLabel: 'Save',                           
        cancelLabel: "Close",                             
        onConfirm: () => { this.saveChanges(value,getUpdatedApp(activeApp))},    
        onCancel: () => {console.log('go back');},      
      });
    };

  saveChanges(values, activeApp){

    let newActiveApp = Object.assign({},activeApp);
    console.log('active App saving', newActiveApp);
    newActiveApp.app.appDetail=Object.assign({},newActiveApp.app.appDetail);
    if(this.state.titleValue!==''){
    newActiveApp.app.appDetail.appName=this.state.titleValue;
  }
    if(!newActiveApp.app.appDetail.thumb)
    {
     let app= this.props.appsList.apps.filter(app=> app._id ===newActiveApp.app.appDetail._id);
     newActiveApp.app.appDetail.thumb =app.length>0?app[0].thumb:newActiveApp.app.appDetail.thumb;
    }
 
    this.props.validateAndSaveApp(values,newActiveApp);
    this.setState({
      isEditing:false
    });
  }

   scheduleApp(evt,apps, previewName){
     var selectedIndex =evt.currentTarget.selectedIndex;
     //TODO: copy app selected, to schedule res
     if(selectedIndex ==0) return;
     console.log(apps[selectedIndex-1]);
     // '#~' is identfier to know template name, it important and used in backedn file-utils
     var item = {
       "base64_data":apps[selectedIndex-1].thumb,
       "original_file_name":'~#'+apps[selectedIndex-1].appLocation+'#~/'+apps[selectedIndex-1].thumb
     }
     if(item){
     this.props.tempAppUpdate(previewName.replace("base64_data","original_data") , item.original_file_name,this.props.activeApp);
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

        let originalPath = item.original.split('/').reverse();
        let original_file_name=originalPath[0];

        this.props.tempAppUpdate(this.props.modal.imagePreviewName.replace("base64_data","original_data") , "res/"+original_file_name,this.props.activeApp);
        this.props.tempAppUpdate(this.props.modal.imagePreviewName , item.thumbnail.replace(BASE_SERVER+'/',''),this.props.activeApp);
console.log('Active app after popup close', this.props.activeApp);
        var fd = new FormData();
        fd.append('jsonIndex', this.props.modal.imagePreviewName);
        fd.append('newFile', original_file_name);
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
      //event&&event.preventDefault();
      var newInput =typeof arguments[1] !== 'undefined'? value: event.target.value;
      console.log(event);
      var targetName= event.target.name?event.target.name:event.target.getAttribute('name');
      var inputName =targetName.replace("base64_data","original_data");
      this.props.tempAppUpdate(inputName , newInput,this.props.activeApp);
      this.props.tempAppUpdate(targetName , newInput,this.props.activeApp);
      this.props.updateKey(new Date().getTime().toString());
      if(newInput&&newInput.toString().startsWith('#')){
        this.props.reset();
      }
    }

     setDefaultThumb(evt, mediaPath){
    
    if(mediaPath && mediaPath.value && (mediaPath.value.item_media.indexOf('thumbnails')!== -1) && (mediaPath.value.item_media.match(/\.(jpeg|jpg|gif)$/) != null)){
      let thumbPath = mediaPath.value.item_media.split('.')[0]+'.png';
      console.log(mediaPath);
      evt.target.src=BASE_SERVER+'/'+thumbPath;
      }
else{
  evt.target.style.visibility= 'hidden';
    evt.target.parentElement.style.backgroundImage='url('+BASE_SERVER+'/preview/player_thumb/no-thumb.png)';
    }
    
    console.log('default set', mediaPath);
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

 toggleCustomDataSmall(){
      this.showCustomDataModal=true;
this.setState({
  modalOpen:!this.state.modalOpen
});

    }

togglePreview(){
this.setState({
  modalOpen:!this.state.modalOpen
});

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
      console.log('preview',this.props.activeApp);

      if(this.isExtraTypeSmall){
        return <CustomerNen locs={this.props.locs} selectedLoc={this.props.selectedLoc}
          fetchLocs={this.props.fetchLocs} setSelectedLocs={this.props.setSelectedLocs}  setSelectedAppId={this.props.setSelectedAppId}/>
      }

      else if(this.state.preview && this.props.activeApp &&this.props.activeApp.app &&this.props.activeApp.app.appDetail.appLocation){
        
        let previewPath=BASE_SERVER+'/drft/'+this.props.activeApp.app.appDetail.appLocation+'/index.html';
        if(this.props.activeApp.app.appDetail.orientation =='landscape'){
        return (
          <iframe id='preview-frame' width='960px' height='540px' className="preview-content" src={previewPath} ></iframe>
        );
          }
          else{
            return (
          <iframe id='preview-frame' width='540px' height='960px' className="preview-content" src={previewPath} ></iframe>
        );
          }
      }else{
        return ("Template Not available for preview!!");
      }

    }

    render() {
      const {handleSubmit, newApp,  appsList, activeApp} = this.props;
      console.log('****NEW APP', activeApp);

      let update_key= this.state.updateKey?this.state.updateKey:"";
      
      let application = activeApp.app && activeApp.app.appDetail ? activeApp.app:null;
     this.isExtraTypeSmall=application && (application.appDetail.domain.indexOf('extra-small') !== -1)?true:false;
      this.isExtraType = !this.isExtraTypeSmall && application && (application.appDetail.domain.indexOf('extra') !== -1)?true:false;
      let guidePath= application && application.appDetail.thumbnailPath ?BASE_SERVER+'/'+ application.appDetail.thumbnailPath.replace('app-thumbnail','thumb').replace('.png','.jpg'):'';
      guidePath = application && !guidePath && application.appDetail._id ?BASE_SERVER+'/thumb/'+ application.appDetail._id+'.jpg':guidePath;
      let videoName=application && application.appDetail.thumbnailPath ? application.appDetail.thumbnailPath.replace('app-thumbnail/','').replace('.png',''):'';

      videoName =application && videoName.length==0 && application.appDetail._id ?application.appDetail._id:videoName;
      let guideImg ="<img  src='"+guidePath+"' width=100% alt='242x200'/>";

      let error= newApp.error|| (newApp.app && newApp.app.error) ||  activeApp.error||null;
      let isSchedulerApp =application&& application.appDetail.domain &&  application.appDetail.domain== "schedules"?true:false;
      var scheduleSelectApps =[];
      if(isSchedulerApp){scheduleSelectApps=appsList.apps.filter((item)=>(!item.isTemplate && (item.domain !== "schedules") ));}
let appName=activeApp.app&&activeApp.app.appDetail?activeApp.app.appDetail.appName:"";
    
      const listJSON = ({input}) => (
        <li>
        {Object.keys(input.value).map((item, index) =>
          <div  key={input.name+index} className={item.startsWith('nocls_')?"item-right-small":input.value.child_class} >
          { item.endsWith("arr") && <FieldArray name={input.name+`.${item}`} component={listArr}/> }
          { item.endsWith("json")  && <Field  name={input.name+`.${item}`}  type="text" component={listJSON}  /> }
          { (item.endsWith("str") )   && <Field   name={input.name+`.${item}`}  type="text" onBlur={(event)=>this.updateContent(event)} component={renderField}  /> }
          { (item.endsWith("chk") )   && <Field   name={input.name+`.${item}`}  type="checkbox" parent={this} label ={input.value.chk_label} component={renderCheckbox}  /> }

          { (item.endsWith("range") )   && <Field   name={input.name+`.${item}`}  type="range"   component={renderRangeSlide} max={input.value[item+'_max']}  parent={this}  /> }

          {(item.endsWith("select") ) && <Field
                 name={input.name+`.${item}`}
                 type="select"
                 onChange={(event)=>this.updateContent(event)}
                 component={renderSelect}
                 label=""
                  parent={this}
                  small={true}
                 ddValues={input.value[item+'_items']} />}

          { (item.endsWith("num") )   && <Field   name={input.name+`.${item}`}    label ={input.value[item+'_lbl']} onDrop={(event)=>this.updateContent(event)} onBlur={(event)=>this.updateContent(event)} component={renderNumber} step="1" min="0" max="1000" /> }
          {  item.endsWith("date") && <Field  name={input.name+`.${item}`}  type="datetime-local" onBlur={(event)=>this.updateContent(event)} component={renderField}  />}
          {  item.endsWith("list") && <Field  name={input.name+`.${item}`}  type="text" onBlur={(event)=>this.updateContent(event)} component={renderField}  />}

          {  (item.endsWith("img") || item.endsWith("media") )&& <div className="image-thumb-holder"><img name={input.name+`.${item}`} onError={evt => this.setDefaultThumb(evt,input)}  className= "small-thumb "  src={BASE_SERVER+ '/'+ input.value[item].replace('app-thumbnail/','thumb/').replace('uploads','preview')} />
          <div className='thumb-overlay'>
          <span  className="glyphicon glyphicon-edit thumb-edit" onClick={(e) => this.toggleModal(e,true ,"MYMEDIA", input.name+`.${item}`,"SHOW_GALLERY_PICKER",item)}></span></div>
         
          {isSchedulerApp && <select className="btn btn-danger-trans" style={{position:'absolute',left:'0px'}} onChange={(e) => this.scheduleApp(e,scheduleSelectApps,input.name+`.${item}`)}>
          <option>{"My Apps"}</option>
          {scheduleSelectApps.map((app)=><option key={app._id} >{app.appName}</option>)};
          </select>}
          

          </div>}
          { item.endsWith("app") && <Field  name={"base64_data"+`.${update_key}`}   component={renderApp}  />}
          </div>)}  </li>
        )


        const listArr= ({fields }) => (
          <li>{
            fields.map((item, index) =>
            <div key={item.name} className={fields.get(index).class_name}>
            {(item.indexOf('slider_fixed') === -1) && <span className='circle-index'>{index+1}</span>}
            {(item.indexOf('fixed') === -1) && <button name={`${item }`+"~remove"} className="remove" onClick={(e) => {fields.remove(index);this.removeContent(e)}}><span  className="glyphicon glyphicon-minus" ></span></button>}
            {item.endsWith("arr_arr["+index+"] ") && <FieldArray name={`${item}`} component={listArr}/> }
            {item.endsWith("json_arr["+index+"]") && <Field  name={`${item }`}  type="text" component={listJSON}  />}
            {(item.endsWith("str_arr["+index+"]") )  && <Field  name={`${item }`}  type="text" onBlur={(event)=>this.updateContent(event)} component={renderField} placeholder="" />}
            {item.endsWith("img_arr["+index+"]") && <Field  name={`${item }`}  type="text" component={renderImgBlob} placeholder="" />}
            </div>)}
            {fields.name.indexOf('fixed') == -1 && <button className="add" name={`${fields.name}`+"~add"} onClick={(e) => {this.addNewContent(e,fields)}}><span  className="glyphicon glyphicon-plus-sign"  ></span></button>}
            </li >
          )

          const renderImgBlob = ({input}) => (
            <li >{
              <div ><img name={input.name} className="small-thumb" src={BASE_SERVER+'/'+ input.value.replace('app-thumbnail/','thumb/').replace('uploads','preview')} />
            <div className="btn-container">  <button className="btn btn-danger-trans" onClick={(e) => this.toggleModal(e,true, "MYMEDIA",input.name,"SHOW_GALLERY_PICKER",input)}>{"My Media"}{isSchedulerApp && <select className="btn btn-danger-trans" onChange={(e) => this.toggleModal(e,true, "MY  MEDIA",input.name,"SHOW_GALLERY_PICKER",input)}>
            {appsList.apps.map((app)=><option key={app._id} >{app.appName}</option>)};
            </select>}</button>
            </div>
              </div>}</li >
            )

            const renderApp = ({input}) => (
              <li>
                <div><img name={input.name} className="small-thumb" src={"data:image/png;base64," +input.value} />
              <div className="btn-container">  <select className="btn btn-danger-trans" >
              {appsList.apps.map((app)=><option key={app._id} >{app.appName}</option>)};
              </select></div>
                </div></li>
              )

              const InputTitle= () => (<input id="appTitle"
              defaultValue={appName}
              className={"effect-16 has-content panel-heading"}
               onBlur={(evt) => this.updateTitleChange(evt)} type="text"/>)

            const listStyleArr= ({fields }) => (
              <div className="col-lg-2 col-md-3 col-sm-4 style-small">{
                fields.map((item, index) =>
                <div key={index}>
                {(item.indexOf("style_label") != -1)&& <label className={"form-group col-3 style-lbl "} htmlFor={`${item }`}  >{fields.get(index)}</label>}
                {(item.indexOf("fontSize") != -1)&& <Field  name={`${item }`}  type="range"  onDrop={(event)=>this.updateContent(event)} onBlur={(event)=>this.updateContent(event)} label={index==0?"Font Size ":""} min="0.1" max="20.0" step="0.1"  component={renderNumber}  />}
                {(item.indexOf("color") !=-1) && <Field id={new Date().getTime().toString()}  name={`${item }`}  type="color"  onChange={(event)=>this.updateContent(event)}  label={index==0?"Font Color":""} component={renderColorPicker}  />}
                {(item.indexOf("backgroundColor") !=-1) && <Field  name={`${item }`}  type="color"  onBlur={(event)=>this.updateContent(event)} onChange={(event)=>this.updateContent(event)} label="Color" component={renderField} label="Background Color" component={renderField}  />}
                {(item.indexOf("backgroundImage") !=-1) && <Field  name={`${item }`}  type="text"  parent={this} label="Background Image" component={renderImgBlob}  />}
                {(item.indexOf("borderColor") !=-1) && <Field  name={`${item }`}  type="color"  onBlur={(event)=>this.updateContent(event)} onChange={(event)=>this.updateContent(event)} label="Color" component={renderField} label="Border Color" component={renderField}  />}
                {(item.indexOf("borderWidth") !=-1) && <Field  name={`${item }`}  type="text"  onBlur={(event)=>this.updateContent(event)} onChange={(event)=>this.updateContent(event)} label="Color" component={renderField} label="Border Width" component={renderField}  />}
                {(item.indexOf("borderStyle") !=-1) && <Field  name={`${item }`}  type="text"  onBlur={(event)=>this.updateContent(event)} onChange={(event)=>this.updateContent(event)} label="Color" component={renderField} label="Border Style" component={renderField}  />}
                {(item.indexOf("width") !=-1) && <Field  name={`${item }`}  type="text"  onBlur={(event)=>this.updateContent(event)} onChange={(event)=>this.updateContent(event)} label="Color" component={renderField} label="Width" component={renderField}  />}
                {(item.indexOf("height") !=-1) && <Field  name={`${item }`}  type="text"  onBlur={(event)=>this.updateContent(event)} onChange={(event)=>this.updateContent(event)} label="Color" component={renderField} label="Height" component={renderField}  />}
                {(item.indexOf("marginLeft") !=-1) && <Field  name={`${item }`}  type="text"  onBlur={(event)=>this.updateContent(event)} onChange={(event)=>this.updateContent(event)} label="Color" component={renderField}label="Margin Left" component={renderField}  />}
                {(item.indexOf("marginTop") !=-1) && <Field  name={`${item }`}  type="text"  onBlur={(event)=>this.updateContent(event)} onChange={(event)=>this.updateContent(event)} label="Color" component={renderField}label="Margin Top" component={renderField}  />}
                {(item.indexOf("margin") !=-1) && <Field  name={`${item }`}  type="text"  onBlur={(event)=>this.updateContent(event)} onChange={(event)=>this.updateContent(event)} label="Color" component={renderField}label="Margin" component={renderField}  />}

                </div>)}
                </div>
              )
            return (
              <div className="title-container"><span className="glyphicon glyphicon-arrow-left bk-btn" onClick={(e) => this.editDone(e)}></span><h2 className="header-title">Update Template</h2>
              <div className="inner-container">
              <Loading isLoading={newApp.loading || activeApp.loading}/>
              <Error error={error}/>
                {application && application.appDetail && application.appDetail._id &&
                  <div >
                  <p className="header-top">
                  <div className="col-lg-4 col-md-4 col-sm-12" >
                  
                  {InputTitle && <InputTitle/>}</div>
                  <Field
                 name="select_title"
                 type="select"
                 onChange={(evt) => this.setUpdateKey(evt)}
                 component={renderSelect}
                 label=""
                 parent={this}
                 val={this.state.selectSlides[0]?this.state.selectSlides[0][this.state.udateKeyIndex]:0}
                 ddValues={this.state.selectSlides[0] } />
                <span className="guide-msg" style={{top: '-1px'}}>
<span ref='thumbGuideToolTip' data-for="toolTipGuide" data-tip={guideImg} data-html={true}></span>
<span onMouseOver={() => { this.showToolTip(guideImg,application.appData.original_data.tooltips[update_key]) }} onClick={() => { this.showToolTip(guideImg,application.appData.original_data.tooltips[update_key]) }} onMouseOut={() => { ReactTooltip.hide(findDOMNode(this.refs.thumbGuideToolTip)) }} className="glyphicon glyphicon-info-sign guide-icon"></span>
<ReactTooltip position="right" persist={true} data-offset={{top: 20, right: 20}} id="toolTipGuide" place="left" effect="solid" html={true} /></span>

{this.isExtraType && <button className="btn btn-danger" style={{padding:'2px 12px'}} onClick={e=>this.props.changeConsole("CUSTOMER")}>{"Custom Data"}</button> }
{this.isExtraTypeSmall && <button className="btn btn-danger" style={{padding:'2px 12px'}} onClick={e=>this.toggleCustomDataSmall(e)}>{"Custom Data"}</button> }

<div className="tools-contains">


<span style={{marginTop:'5px',marginLeft:'15px'}} data-tip="Customized Template Preview" className="glyphicon glyphicon-eye-open " data-toggle="modal" data-target="#exampleModalCenter" onClick={(e)=>{this.tooltiphide();this.togglePreview(e)}} ></span>
<span style={{top:'-1px',top: '0px'}} className="glyphicon glyphicon-play video-icon" data-tip="Original Template Preview" onClick={(e) => {this.tooltiphide();this.toggleModal(e,true, "MYMEDIA","","PLAY_TEMP_APP","Admin/"+videoName+".mp4")}} ></span></div>

                  </p>
                  <form role="form" name="edit_form" className="form-horizontal"  encType="multipart/form-data" onSubmit={handleSubmit((values)=>(application.appDetail.isTemplate?this.confirmTemplateName(values,activeApp) : this.saveChanges(values,activeApp)))}>
                 
                  <ul className="list-small-items">
                  { update_key.endsWith("arr") && <FieldArray name={"base64_data"+`.${update_key}`} component={listArr}/> }
                  { update_key.endsWith("json")  && <Field  name={"base64_data"+`.${update_key}`}  type="text" component={listJSON}  /> }
                  { update_key.endsWith("str")    && <Field  name={"base64_data"+`.${update_key}`}  type="text"  onBlur={(event)=>this.updateContent(event)} component={renderField}  /> }
                  { (update_key.endsWith("chk") )   && <Field   name={"base64_data"+`.${update_key}`}  type="checkbox" parent={this}  component={renderCheckbox}  /> }
          { (update_key.endsWith("num") )   && <Field   name={"base64_data"+`.${update_key}`}  onDrop={(event)=>this.updateContent(event)} onBlur={(event)=>this.updateContent(event)}  component={renderNumber} step="1" min="0" max="1000" /> }
                  { update_key.endsWith("label")    && <Field  name={"base64_data"+`.${update_key}`}  type="label"  parent={this} component={renderLabel}  /> }
                  { update_key.endsWith("img") && <Field  name={"base64_data"+`.${update_key}`}   component={renderImgBlob}  />}
                  { update_key.endsWith("app") && <Field  name={"base64_data"+`.${update_key}`}   component={renderApp}  />}

                  {update_key.length>0 && <li className="sub-header-contain col-lg-12 col-md-12  col-xs-11"><h4 className="sub-header">{'Styles'}</h4>
                  <FieldArray name={"base64_data.css[0]"+`.${update_key}`+"[0].style_label"} component={listStyleArr} />
                  <FieldArray name={"base64_data.css[0]"+`.${update_key}`+"[0].fontSize"} component={listStyleArr} />
                  

                  <FieldArray name={"base64_data.css[0]"+`.${update_key}`+"[0].color"} component={listStyleArr}  />

                  <FieldArray name={"base64_data.css[0]"+`.${update_key}`+"[0].width"} component={listStyleArr} />

                  <FieldArray name={"base64_data.css[0]"+`.${update_key}`+"[0].height"} component={listStyleArr} />

                  <FieldArray name={"base64_data.css[0]"+`.${update_key}`+"[0].marginLeft"} component={listStyleArr} />

                  <FieldArray name={"base64_data.css[0]"+`.${update_key}`+"[0].marginTop"} component={listStyleArr} />

                  <FieldArray name={"base64_data.css[0]"+`.${update_key}`+"[0].backgroundColor"} component={listStyleArr}/>
                  <FieldArray name={"base64_data.css[0]"+`.${update_key}`+"[0].backgroundImage"} component={listStyleArr}/>

                  <FieldArray name={"base64_data.css[0]"+`.${update_key}`+"[0].borderColor"} component={listStyleArr}/></li>}

                  </ul>
                  <div className="btn-footer">
                  
                  
                  <button style={{marginTop:'0px',marginLeft:'10px'}} className="btn btn-danger-trans" onClick={() => this.props.changeConsole('TEMPLATE_LIST')} >Cancel</button>
                  
                  <button style={{marginLeft:'12px',marginTop:'0px'}} type="submit" className="btn btn-primary" disabled={ activeApp.loading}> {activeApp.loading?'Saving..':'Save'} </button>
                  </div>


                  </form>

                  </div>

              }
              <ModalLocal  className={this.isExtraTypeSmall?"modal-local white-border":"modal-local"} onClose={e=>this.togglePreview(e)} isOpen={this.state.modalOpen} >
<span  style={{position:'absolute', top:'-20px', left:'-25px'}} className="glyphicon glyphicon-remove" onClick={(e) => this.togglePreview(e)} ></span>{this.state.modalOpen?this.getModalContent():''}</ModalLocal>

              </div>
          </div>
            );
          }
        }

        export default reduxForm({
          form: 'TemplateNew',// a unique identifier for this form
          FieldArray,
          Field
        })(TemplateNew) ;
       