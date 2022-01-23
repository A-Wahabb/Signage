import React, { Component } from 'react';
import {findDOMNode} from 'react-dom';
import { reduxForm, Field,FieldArray} from 'redux-form';
import renderField from './renderField';
import renderSelect from './renderSelect';
import renderLabel from './renderLabel';
import renderNumber from './renderNumber';
import renderCheckbox from './renderCheckbox';
import renderColorPicker from './renderColorPicker';

import {BASE_SERVER} from '../constants/Config';
import {Loading,Title,Error,SelectionPopup} from './commonDumbs';
import ReactTooltip from 'react-tooltip';



class CustomTemplateEdit extends Component {
  
  constructor(props) {
    super(props);
      this.handleEditChange = this.handleEditChange.bind(this)
    this.state={updateKey:"none",udateKeyIndex:0,titleValue: '',
    showSlideSelection:false,
    slides:['../assets/slide-1.png','../assets/slide-2.png','../assets/slide-3.png','../assets/slide-4.png'],
    selectedSlide:'slide-1',
    selectSlides:[['Select']],
    text: ''
    };
  }

  componentWillMount() {
    
    this.props.fetchAppDetail(this.props.selectedAppId);
    this.setUpdateKey();
  }

  componentDidMount(){
    
    // try{
    //   that.clickedTimer=  window.setInterval(function(){
    //     console.log("---clicked ID--");
    //     let frame = document.getElementById("preview_iframe");
    //     let frameDoc = frame.contentDocument  || frame.contentWindow;
    //     var clickedValue=frameDoc && frameDoc.getElementById('update_key')&&frameDoc.getElementById('update_key').value ;
    //     if(clickedValue != that.props.update_key){
    //       that.props.updateKey(frameDoc.getElementById('update_key').value);

    //       console.log("---clicked ID--", frameDoc.getElementById('update_key'));
    //     }

    //   },5000)}
    // catch(e){}
  }

handleEditChange(value) {
    this.setState({ text: value })
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
      return JSON.stringify(nextProps.activeApp) !== JSON.stringify(this.props.activeApp) || (nextState !== this.state)|| (nextProps.update_key !== this.props.update_key) || (!nextProps.modal.isModalOpen && this.props.modal.isModalOpen);
  }

  

  componentWillUnmount() {
   // if(this.clickedTimer)window.clearInterval(this.clickedTimer);
   this.props.resetForm("edit_form");
   this.props.resetMe();
    //AppStore.removeChangeListener(this.onChange);
  }

  UNSAFE_componentWillReceiveProps(nextProps,nextState) {
    console.log('selected app',this.props.selectedAppId);
    if(this.props.selectedAppId && (nextProps.selectedAppId !== this.props.selectedAppId)){
    this.props.fetchAppDetail(this.props.selectedAppId);
    }   
    if(!this.state.updateKey || (this.state.updateKey=="none")){
      this.setUpdateKey();
    }
    //that.props.updateKey(frameDoc.getElementById('update_key').value);
    // if (this.props.modal.imagePreviewName != nextProps.modal.imagePreviewName)) {
    //   //browserHistory.goBack();
    //   //  browserHistory.push("/players/"+this.props.params.playerId+"/apps")
    // }

  }

  selectApp(evt){
    evt.preventDefault();
    let app=this.props.activeApp.app&&this.props.activeApp.app.appDetail?this.props.activeApp.app.appDetail:{};
    let activePlayer=this.props.activePlayer.player?this.props.activePlayer.player:{};
    //this.props.updatePlayerApp(app,activePlayer);
    this.props.moveToLiveFolder(app,activePlayer);
    this.resetCurrentProps();
    this.props.changeConsole("LANDING");
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
    this.props.validateAndSaveApp(values,newActiveApp);
    
  }

  goBack(evt){
    //browserHistory.goBack();
    evt.preventDefault();
    this.resetCurrentProps();
    this.props.changeConsole('PLAYER_DETAILS');
  }

  resetCurrentProps(){
    this.props.resetMe();
    this.props.setSelectedAppId("");
    this.props.resetForm("edit_form");
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

    //console.log('Next Selected index', currentIndx);
     
    let nextKey =e && e.target&& keysArr?keysArr[e.target.selectedIndex]:keysArr[0];
    
    if(nextKey !== this.state.updateKey){
    this.setState({updateKey:nextKey,udateKeyIndex:currentIndx,selectSlides:slides});
  }
 
       }
   }

  toggleModal(evt,IsOpen,contentType,jsonIndex,mtype,path) {

    evt.preventDefault();
    //content - "PREVIEW"/ "MYMEDIA"
    this.props.updateModal({isModalOpen: IsOpen,
      modalContent :contentType,imagePreviewName:jsonIndex,mediaType:mtype,mediaPath:path, hideModal:(e,item)=>this.closeEditModal(e,item)});
      return true;
    }

    toggleSlidesList(){
      console.log('slide popuup');
      let showSlides= !this.state.showSlideSelection;
this.setState({
  showSlideSelection: showSlides
});
    }

 setSelectedSlide(slideIndex){
  console.log(slideIndex);
  this.setState({
    selectedSlide: 'slide-'+slideIndex
  })
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

    changeListDisplay(type){
        this.props.setListDisplayType(type);
  }

    showToolTip(guideImg, text){
      let toolTipGuide= document.getElementById('toolTipGuide');
      toolTipGuide.innerHTML=guideImg+"<p>"+text+"</p>";
      ReactTooltip.show(findDOMNode(this.refs.thumbGuideToolTip));

    }


    render() {
      const {handleSubmit, newApp, appsList,activeApp} = this.props;
      let update_key= this.state.updateKey?this.state.updateKey:"";
      console.log('activeapp',activeApp);
      //console.log('keyIndex',this.state.udateKeyIndex );
      //console.log('slides',this.state.selectSlides[0]&& this.state.selectSlides[0][this.state.udateKeyIndex] );
      let application = activeApp.app && activeApp.app.appDetail ? activeApp.app:null;
      let guidePath= application && application.appDetail.thumbnailPath ?BASE_SERVER+'/'+ application.appDetail.thumbnailPath.replace('app-thumbnail','thumb').replace('.png','.jpg'):'';
      guidePath = application && !guidePath && application.appDetail._id ?BASE_SERVER+'/thumb/'+ application.appDetail._id+'.jpg':guidePath;
      let videoName=application && application.appDetail.thumbnailPath ? application.appDetail.thumbnailPath.replace('app-thumbnail/','').replace('.png',''):'';

      videoName =application && videoName.length==0 && application.appDetail._id ?application.appDetail._id:videoName;
      let guideImg ="<img  src='"+guidePath+"' width=100% alt='242x200'/>";

      let error= newApp.error|| (newApp.app && newApp.app.error) ||  activeApp.error||null;
      let isSchedulerApp =application&& application.appDetail.domain &&  application.appDetail.domain== "schedules"?true:false;
      let appName=activeApp.app&&activeApp.app.appDetail?activeApp.app.appDetail.appName:"";
      var scheduleSelectApps =[];
      if(isSchedulerApp){scheduleSelectApps=appsList.apps.filter((item)=>(!item.isTemplate && (item.domain !== "schedules") ));}

      let slideType= this.props.listDisplayType;
    let portaitSelect= slideType=='portrait'?'portrait selected-tool':'portrait';
    let landscapeSelect = slideType=='landscape'?'landscape selected-tool':'landscape';


      const listJSON = ({input}) => (
        <li>
        {Object.keys(input.value).map((item, index) =>
          <div  key={input.name+index} className={input.value.child_class} >
          { item.endsWith("arr") && <FieldArray name={input.name+`.${item}`} component={listArr}/> }
          { item.endsWith("json")  && <Field  name={input.name+`.${item}`}  type="text" component={listJSON}  /> }
          { (item.endsWith("str") )   && <Field   name={input.name+`.${item}`}  type="text" onBlur={(event)=>this.updateContent(event)} component={renderField}  /> }
          { (item.endsWith("chk") )   && <Field   name={input.name+`.${item}`}  type="checkbox" parent={this} label ={input.value.chk_label} component={renderCheckbox}  /> }
          { (item.endsWith("num") )   && <Field   name={input.name+`.${item}`}    label ={input.value[item+'_lbl']} onDrop={(event)=>this.updateContent(event)} onBlur={(event)=>this.updateContent(event)}  component={renderNumber} step="1" min="0" max="1000"/> }
          {  item.endsWith("date") && <Field  name={input.name+`.${item}`}  type="datetime-local" onBlur={(event)=>this.updateContent(event)} component={renderField}  />}
          {  item.endsWith("list") && <Field  name={input.name+`.${item}`}  type="text" onBlur={(event)=>this.updateContent(event)} component={renderField}  />}
          {  (item.endsWith("img") || item.endsWith("media") )&& <div><img name={input.name+`.${item}`} className= "small-thumb "  src={'data:image/png;base64,'+ input.value[item]} />
          
          <span  className="glyphicon glyphicon-picture" onClick={(e) => this.toggleModal(e,true ,"MYMEDIA", input.name+`.${item}`,"SHOW_GALLERY",item)}></span>
         
          {isSchedulerApp && <select className="btn btn-danger-trans" onChange={(e) => this.scheduleApp(e,scheduleSelectApps,input.name+`.${item}`)}>
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
            <div key={item.name+'~'+new Date().getTime()} className={fields.get(index).class_name}>
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
              <div ><img name={input.name} className="small-thumb" src={"data:image/png;base64," +input.value} />
            <div className="btn-container">  <button className="btn btn-danger-trans" onClick={(e) => this.toggleModal(e,true, "MYMEDIA",input.name,"SHOW_GALLERY",input)}>{"My Media"}</button>
            {isSchedulerApp && <select className="btn btn-danger-trans" onChange={(e) => this.toggleModal(e,true, "MY  MEDIA",input.name,"SHOW_GALLERY",input)}>
            {appsList.apps.map((app)=><option key={app._id} >{app.appName}</option>)};
            </select>}</div>
              </div>}</li >
            )

            const renderApp = ({input}) => (
              <li>
                <div><img name={input.name} className="small-thumb" src={"data:image/png;base64," +input.value} />
              <div className="btn-container">  <select className="btn btn-danger-trans" ><option key={app._id} >{app.appName}</option>)};
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
                {(item.indexOf("fontSize") != -1)&& <Field  name={`${item }`}  type="number"   onDrop={(event)=>this.updateContent(event)} onBlur={(event)=>this.updateContent(event)} label={index==0?"Font Size":""} min="0.1" max="20.0" step="0.1" component={renderNumber}  />}
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
              <div className="title-container"><h2 className="header-title">Update Template</h2>
              <div className="container">
              <Loading isLoading={newApp.loading || activeApp.loading}/>
              <Error error={error}/>
                {application && application.appDetail && application.appDetail._id &&
                  <div>
                  <div className="header-top">
                  <div className="col-lg-4 col-md-4 col-sm-12" >
                  
                  {InputTitle && <InputTitle/>}
</div>
                  
                  <Field
                 name="select_title"
                 type="select"
                 onChange={(evt) => this.setUpdateKey(evt)}
                 component={renderSelect}
                 label="Select Section: "
                 value={this.state.selectSlides[0]?this.state.selectSlides[0][this.state.udateKeyIndex]:this.state.selectSlides[0][0]}
                 ddValues={this.state.selectSlides[0] } />
                
                
<div className="tools-contains">
<span className="guide-msg">
<span ref='thumbGuideToolTip' data-for="toolTipGuide" data-tip={guideImg} data-html={true}></span>
<span onMouseOver={() => { this.showToolTip(guideImg,application.appData.original_data.tooltips[update_key]) }} onClick={() => { this.showToolTip(guideImg,application.appData.original_data.tooltips[update_key]) }} onMouseOut={() => { ReactTooltip.hide(findDOMNode(this.refs.thumbGuideToolTip)) }} className="glyphicon glyphicon-info-sign guide-icon"></span>
<ReactTooltip position="right" persist={true} data-offset={{top: 20, right: 20}} id="toolTipGuide" place="left" effect="solid" html={true} /></span>
<span className="glyphicon glyphicon-play video-icon" onClick={(e) => this.toggleModal(e,true, "MYMEDIA","","PLAY_TEMP_APP","Admin/"+videoName+".mp4")} ></span></div>
</div>
<div className="toolbar-container">
<div className="display-mode">
<div className='slide-select'>
<span className={landscapeSelect} onClick={()=>this.changeListDisplay('LANDSCAPE')} > </span>
      <span className={portaitSelect} onClick={()=>this.changeListDisplay('PORTRAIT')}> </span></div>
</div>

<div className="slide-section" onClick={()=>this.toggleSlidesList()}>
<span className={'slide '+this.state.selectedSlide}  > </span>
<span className={'glyphicon glyphicon-triangle-bottom select-more'} > </span>
<SelectionPopup title={'Choose Slide Layout'} data={this.state.slides} isHide={!this.state.showSlideSelection} close={this.toggleSlidesList.bind(this)} itemSelect={this.setSelectedSlide.bind(this)}/>
</div>
<div className="editor-tools"></div>
</div>
                <div className="preview-container">{"Editor here."}</div>
                  <form role="form" name="edit_form" className="form-inline"  encType="multipart/form-data" onSubmit={handleSubmit((values)=>this.saveChanges(values,activeApp))}>
                 
                  <ul className="list-small-items">
                  { update_key.endsWith("arr") && <FieldArray name={"base64_data"+`.${update_key}`} component={listArr}/> }
                  { update_key.endsWith("json")  && <Field  name={"base64_data"+`.${update_key}`}  type="text" component={listJSON}  /> }
                  { update_key.endsWith("str")    && <Field  name={"base64_data"+`.${update_key}`}  type="text"  onBlur={(event)=>this.updateContent(event)} component={renderField}  /> }
                  { (update_key.endsWith("chk") )   && <Field   name={"base64_data"+`.${update_key}`}  type="checkbox" parent={this}  component={renderCheckbox}  /> }
          { (update_key.endsWith("num") )   && <Field   name={"base64_data"+`.${update_key}`} onDrop={(event)=>this.updateContent(event)} onBlur={(event)=>this.updateContent(event)} component={renderNumber} step="1" min="0" max="1000" /> }
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
    )
                  <div className="btn-footer">
                  <button type="submit" className="btn btn-primary" disabled={ activeApp.loading}> {activeApp.loading?'Saving..':'Save Draft'} </button>
                  <button className="btn btn-primary-trans btn-not-first" onClick={(e) => this.selectApp(e)} >Publish</button>
                  <button className="btn btn-danger-trans" onClick={(e) => this.goBack(e)} >Back</button>
                  </div>

                  </form>

                  </div>

              }

              </div>
              </div>
            );
          }
        }

        export default reduxForm({
          form: 'CustomTemplateEdit',// a unique identifier for this form
          FieldArray,
          Field
        })(CustomTemplateEdit) ;
        //<iframe className="preview-content" src={"https://still-retreat-43533.herokuapp.com/api/host/"+application.appDetail.appLocation} ></iframe>

{/* <div className="col-lg-10 col-md-12 col-sm-12 preview-container">
                  <iframe id="preview_iframe" className="preview-frame" src={BASE_SERVER+"/api/host/"+application.appDetail.appLocation} ></iframe></div> */}
        /**
        //<Field  name="base64_data" type="text" component={listJSON}  />
        **/


        // {modal.modalContent&&modal.modalContent.toUpperCase() == "PREVIEW" &&
        // <iframe className="preview-frame " src={"https://still-retreat-43533.herokuapp.com/api/host/"+application.appDetail.appLocation} ></iframe>}
