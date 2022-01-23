import React, { Component } from 'react';
import {BASE_SERVER} from '../../constants/Config';
import RenderGuideTool from './renderGuideTool';

class RenderHeader extends React.Component { 

constructor(props) {
    super(props);
    this.isExtraTypeSmall = false;
    this.isExtraType =false; 
    this.togglePreview= this.togglePreview.bind(this);
    }
    
  togglePreview(){
    let appDetail = this.props.appDetail;
    let previewPath=BASE_SERVER+'/drft/'+appDetail.appLocation+'/index.html';
        
    let previewcontnet = <iframe id='preview-frame' width='960px' height='540px' className="preview-content" src={previewPath} ></iframe>;
    if(appDetail.orientation.toLowerCase()=='portrait')
    {
      previewcontnet = <iframe id='preview-frame' width='347px' height='540px' className="preview-content" src={previewPath} ></iframe>
    }
    this.props.togglePreview(previewcontnet);

  }

  render() {
    let {domain, isLoading, themeColor, appDetail,togglePreview}= this.props;
    this.isExtraTypeSmall=domain.indexOf('extra-small') !== -1?true:false;
    this.isExtraType =!this.isExtraTypeSmall && (domain.indexOf('extra') !== -1)?true:false;
    return (
    
   <div className="tools-contains"> 
              
{this.isExtraType && 
  <button className="btn btn-danger" style={{padding:'2px 4px',border:'none'}} onClick={e=>this.props.changeConsole("CUSTOMER")}>{"CUSTOM"}</button> }
{this.isExtraTypeSmall && 
  <button className="btn btn-danger" style={{padding:'2px 4px'}} onClick={e=>this.props.toggleCustomDataSmall(e)}>{"CUSTOM"}</button> } 

<button style={{marginLeft:'20px',marginTop:'-8px',color:themeColor}} className="btn btn-primary-link" onClick={(e)=>{this.togglePreview(e);}}>PREVIEW</button>

<button style={{marginLeft:'20px',marginTop:'0px', backgroundColor:'+themeColor+'}} onClick={this.props.save}  className="btn btn-primary" disabled={ isLoading}> {isLoading?'SAVING...':'SAVE'} </button>
</div>

              )
  }
}

export default RenderHeader;

