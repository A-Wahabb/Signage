import React from 'react';
import Collapsible from 'react-collapsible';

import {BASE_SERVER, LOCAL_SERVER, PrimaryColor} from '../constants/Config';
const HelpContents= () => {
  
    return (<div>
          <button style={{display:'inline-block',position:'absolute',top:'1px',right:'130px',margin:'5px',backgroundColor:PrimaryColor}}
      className="btn btn-primary" >
      <span  className="glyphicon glyphicon-download inline-icon"></span> <a target="_blank" href={BASE_SERVER+'/skd/upgrade.apk'}>
          {'DOWNLOAD PLAYER APP'}
          </a>
      </button>
          <Collapsible trigger={"Setup Guide"}  key={'guide-1'}>
          <a target="_blank" href={BASE_SERVER+'/preview/help/Setup_Instrucations_and_Usage_Guide.pdf'} >Digital sigange setup instructions and usage guide </a>
          <br/>
          <a target="_blank" href={BASE_SERVER+'/skd/upgrade.apk'}>
          {'Download player app here and install in Android device'}
          </a>
        </Collapsible>
        <Collapsible trigger={"Content Types & Usage"}  key={'contents-1'}>
            
          <a target="_blank" href={BASE_SERVER+'/preview/help/Digital_Signage_Contents_and_Usage_Guide.pdf'} >Digital sigange Contents and usage guide </a>
         
        </Collapsible>

        <Collapsible trigger={"FAQs"}  key={'faqs-1'}>
            
          <a target="_blank" href={BASE_SERVER+'/preview/help/Digital_Signage_FAQs.pdf'} >Digital Signage FAQs </a>
         
        </Collapsible>

      <div className={'section-holder'}>
      <h4>{'Video Guide'}</h4>
      <div style={{display: 'inline-block',width: '100%'}} className={'dashboard-items-hodler'}>
        <li className="col-xs-12 col-sm-12 col-md-6 col-lg-4 list-group-item">
        <div className="thumbnail summary" >
        <video src={BASE_SERVER+'/preview/help/client-quick-guide.mp4'} width='100%' height='auto' controls />
         <div className="caption center-btn">
          <label>Quick walkthrough</label>
            </div>
        </div>
        </li>
        <li className="col-xs-12 col-sm-12 col-md-6 col-lg-4 list-group-item">
        <div className="thumbnail summary" >
        <video src={BASE_SERVER+'/preview/help/how-to-add-screen-content.mp4'} width='100%' height='auto' controls />
          <div className="caption center-btn">
          <label>Add screen & contents</label>
            </div>
        
        </div>
        </li>
        <li className="col-xs-12 col-sm-12 col-md-6 col-lg-4 list-group-item">
        <div className="thumbnail summary" >
        <video src={BASE_SERVER+'/preview/help/how-to-edit-contents.mp4'} width='100%' height='auto' controls />
        <div className="caption center-btn">
          <label>Edit contents and publish</label>
            </div>
        </div>
        </li>

      </div>
      </div>

        </div>);  
};



module.exports= {HelpContents}
