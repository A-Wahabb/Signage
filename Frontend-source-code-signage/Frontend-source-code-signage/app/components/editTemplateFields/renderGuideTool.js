import React, { Component } from 'react';
import {ReactDOM,findDOMNode} from 'react-dom';
import {BASE_SERVER} from '../../constants/Config';
import ReactTooltip from 'react-tooltip';

class RenderGuideTool extends React.Component { 


  showToolTip(guideImg){
      let toolTipGuide= document.getElementById('toolTipGuide');
      toolTipGuide.innerHTML=guideImg;
      ReactTooltip.show(findDOMNode(this.refs.thumbGuideToolTip));
      
    }

  render() {
  	let {appDetail} =this.props;
    console.log('--tooltip guide--', appDetail);
    let guidePath =appDetail.thumb|| appDetail.thumbnailPath ? BASE_SERVER+'/'+ appDetail.thumbnailPath.replace('app-thumbnail','thumb').replace('.png','.jpg'):"";
        guidePath = !guidePath && appDetail._id ? BASE_SERVER+'/thumb/'+ appDetail._id+'.jpg':guidePath;
    let guideImg ="<img  src='"+guidePath+"' width=100% alt='242x200'/>";

    return (
              <span className="guide-msg" style={{top: '-1px'}}>
    <span ref='thumbGuideToolTip' data-for="toolTipGuide" data-tip={guideImg} data-html={true}></span>
    <span onMouseOver={() => { this.showToolTip(guideImg) }} onClick={() => { this.showToolTip(guideImg) }} onMouseOut={() => { ReactTooltip.hide(findDOMNode(this.refs.thumbGuideToolTip)) }} className="glyphicon glyphicon-info-sign guide-icon"></span>
    <ReactTooltip position="right" persist={true} data-offset={{top: 20, right: 20}} id="toolTipGuide" place="left" effect="solid" html={true} /></span>
              )
  }
}

export default RenderGuideTool;

