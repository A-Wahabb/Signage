import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {Loading,Title,Error} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER,BizTypes} from '../../constants/Config';
import  { Tabs,Pane } from './../Tabs';
import Multiselect from 'multiselect-react-dropdown';
import FileUploadContainer from './../file-upload/file-upload-container.js'; 
import Dropdown, {
          DropdownToggle,
          DropdownMenu,
          DropdownMenuWrapper,
          MenuItem,
          DropdownButton
} from '@trendmicro/react-dropdown';

class UploadTemplate extends Component {

  constructor (props) {
    super(props);
    this.state={
      errors:null,
      options: BizTypes.map(name=> {return {name:name,id:name.toLowerCase()}}),
      selectedValues: [],
      settings: this.props.settings,
      selectedFileName:"Select Files to replace"
    }
    this.onBizSelect = this.onBizSelect.bind(this);
    this.onBizSelectRemove = this.onBizSelectRemove.bind(this);
    this.updateTemplateDomain=this.updateTemplateDomain.bind(this);
  }

  componentWillMount(){
    this.props.resetMe();
    console.log(this.props.settings);
    console.log('---options---', this.state.options);
  }

  componentDidMount(){
    let templateDomain = this.props.template.domain;
    let selectedDomains= this.state.options.filter( option => templateDomain.toLowerCase().indexOf(option.id) != -1);
    this.setState({
      selectedValues : selectedDomains
    });
  }

onBizSelect(selectedList, selectedItem){
  console.log('selectedList',selectedList);
  console.log('selectedItem',selectedItem);
  this.setState({
      selectedValues : selectedList
    });
}

onBizSelectRemove(selectedList, removedItem){
    this.setState({
      selectedValues : selectedList
    });
}

updateTemplateDomain(){
  console.log('---Updating template--', this.props.template);
  let domains= '';
  this.state.selectedValues.map(domain => {domains=domains+domain.id;return true});
  this.props.updateApp(this.props.template._id, {domain:domains});
}

render() {
  let user = this.props.user;
  let template= this.props.template;
  let thumb = template.thumb?template.thumb.replace('app-thumbnail','thumb'):'thumb/'+template._id+'.png';
  let guidePath= 'thumb/'+template._id+'.jpg';
  let originalPath= BASE_SERVER +'/preview/Admin/'+template._id+'.mp4';
  return (<div style={{height:'100%'}}>
      <div className='col-lg-12 col-md-12 col-sm-12' style={{height:'100%'}}>
      <Title title={'UPLOAD TEMPLATE & RESOURCES'}/>
      <div style={{height:'calc(100% - 70px)', overflow:'hidden', overflowY:'scroll'}}>
            {template.isTemplate && <div style={{borderBottom:'1px solid #e6e4e4',margin:'20px'}}><h4>{'SET TEMPLATE THUMBNAILS'}</h4>
                  <div><label>{'Set new thumbnail for this template(best fit 634*354px)'}</label></div>
                  <img style={{width:'200px',height:'auto'}} src={BASE_SERVER+'/'+thumb}/>
                  <FileUploadContainer id='temp-thumb'
                  replacePathCode={template.isTemplate?'PREDEFINED-TEMP-THUMB~~'+template._id:'USER-TEMP-THUMB~~'+template._id}
                  themeColor={this.state.settings.color_primary}/>
                  </div>
                }
                 
                  {template.isTemplate && <div style={{borderBottom:'1px solid #e6e4e4',margin:'20px'}}><h4>{'SET TEMPLATE GUIDE IMAGE'}</h4>
                   <div><label>{'Set template guide thumbnail for this template(any size is fine)'}</label></div>
                  <img style={{width:'200px',height:'auto'}} src={BASE_SERVER+'/'+guidePath}/>
                <FileUploadContainer id='temp-guide'
                replacePathCode={'GUIDE-IMG~~'+template._id}
                themeColor={this.state.settings.color_primary}/></div>}

                {template.isTemplate && <div style={{borderBottom:'1px solid #e6e4e4',margin:'20px'}}><h4>{'SET TEMPLATE VIDEO PREVIEW'}</h4>
                   <div><label>{'Set template original video preview(supported format .mp4, any any size is fine)'}</label></div>
                  
                {template && template.orientation.toLowerCase()=='landscape' ?
                <div><video src={originalPath} width='576px'  autoplay loop controls/></div>:
        
              <div><video src={originalPath} width='347px'  autoplay loop controls/></div>}
        
                <FileUploadContainer id='video-preview'
                replacePathCode={'VIDEO-TEMP~~'+template._id}
                themeColor={this.state.settings.color_primary}/></div>}

                <div style={{borderBottom:'1px solid #e6e4e4',margin:'20px'}}><h4>{'UPLOAD TMEPLATE ZIP'}</h4>
                <div><label>{'Upload the template zip file (*Make sure file name and folder structure remains same.)'}</label></div>
                <FileUploadContainer id='template-zip'
                replacePathCode={template.isTemplate?'PREDEFINED-ZIP~~'+template.appLocation:'CUSTOM-TEMP-ZIP~~'+template.appLocation}
                themeColor={this.state.settings.color_primary}/>
                </div>

                <div style={{borderBottom:'1px solid #e6e4e4',margin:'20px'}}>
              <h4>{'TEMPLATE FOR BUSINESS TYPE'}</h4>
              <div>
                <label>{'Select Biz names, who can mostly use this template'}</label></div>
                  <Multiselect
                  options={this.state.options} 
                  selectedValues={this.state.selectedValues} 
                  onSelect={this.onBizSelect} 
                  onRemove={this.onBizSelectRemove} 
                  displayValue="name" 
                  />
                  <button style={{color:this.state.settings.color_primary,display:'inline-block',float:'right'}} className="btn btn-primary-link" onClick={this.updateTemplateDomain}>
                    UPDATE
                  </button>
              </div>

              </div>


              
      </div>
      </div>)
  }
}


export default UploadTemplate;
