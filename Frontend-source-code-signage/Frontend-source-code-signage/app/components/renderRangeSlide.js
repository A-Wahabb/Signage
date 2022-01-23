import React, { Component } from 'react';

import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
let maxUpdate=0;
let isTempActive=false;
let ipValAfter= [];
class renderRangeSlide extends Component {
  constructor(props) {
    super(props);
this.createSliderWithTooltip = Slider.createSliderWithTooltip;
this.Range = Slider.createSliderWithTooltip(Slider.Range);
this.Handle = Slider.Handle;
//ipValAfter= [];
//isTempActive=false;
this.state={time:new Date().getTime()}
//maxUpdate=false;
this.handle = (props) => {
  let { value, dragging, index, ...restProps } = props;
  let Handle = this.Handle;
  return (

    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle  value={value} {...restProps} />
    </Tooltip>
  );
};

this.wrapperStyle = { width: '100%', margin: '30px 10px' };


  }
getArrIpVal(){
    let propipVal = typeof this.props.input.value == 'string' ?  this.props.input.value.split('~'):this.props.input.value;
        propipVal = propipVal.map(val => parseInt(val));
        return propipVal;
}

 

checkChange(evt,value,name){
  console.log('mounnt');
  let event={};
    event.preventDefault=function(){return true;};
    event.target={};
    event.target.name=name;
    this.props.parent.updateContent(event,value.join('~'));
  }

limitchange(evt,value,name){
    let event={};
    event.preventDefault=function(){return true;};
    event.target={};
    event.target.name=name;
    this.props.parent.updateContent(event,value);
    
}

addNewHandle(e){
  e&& e.preventDefault();
  let afterAdd= JSON.parse(JSON.stringify(this.getArrIpVal()));
  afterAdd.push(maxUpdate-2);
  ipValAfter=Object.assign([],afterAdd);
  isTempActive=true;
  this.checkChange(e,afterAdd,this.props.input.name);
  e&& e.stopPropagation();
}

removeOneHandle(e){
  e.preventDefault();
  let afterRemove= JSON.parse(JSON.stringify(this.getArrIpVal()));
  afterRemove.splice(-1,1);
  afterRemove =afterRemove?afterRemove:[];
  console.log(afterRemove);
  ipValAfter=Object.assign([],afterRemove);
  isTempActive=true;
  this.checkChange(e,afterRemove,this.props.input.name);
  e.stopPropagation();
}

addMaxLimit(e){

  maxUpdate=maxUpdate+1;
  this.limitchange({},maxUpdate,this.props.input.name+'_max');
 
}
reduceMaxLimit(e){

  maxUpdate=maxUpdate-1;
  this.limitchange({},maxUpdate,this.props.input.name+'_max');

}
  
    render() {
        const {
          input, label ,type ,name,max,handles
        } = this.props;
        let Range = this.Range;
        if(input.value=="none"){
          return null;
        }

        input.value = this.getArrIpVal();
        if(isTempActive){
          input.value = ipValAfter;
        }
        isTempActive=false;
        
        if(!parseInt(localStorage.getItem('isRangeRender'))){
        maxUpdate =max?parseInt(max):24;
        localStorage.setItem('isRangeRender','1');
        }
      
        
        
        return (
          <div className="num-label" >
         
      <div style={this.wrapperStyle}>
      <p>{label}</p>
      <Range id='range' min={1} onAfterChange={(event) => this.checkChange(event,input.value,input.name)} max={maxUpdate} {...input} value={input.value} tipFormatter={value => `${value}`} />

    <div className={'tablet-btn item-right-small'}> 
      <button type="button" onClick={(event) => this.reduceMaxLimit()}>{'-'}</button>{' LIMIT ['+maxUpdate+'] '}<button type="button" onClick={(event) => this.addMaxLimit()}>{'+'}</button></div>

     <div className={'tablet-btn item-right-small'}> 
      <button type="button" onClick={(event) => this.removeOneHandle(event)}>{'-'}</button>{' ITEMS ['+input.value.length+'] '}<button type="button" onClick={(event) => this.addNewHandle(event)}>{'+'}</button></div>
      
    </div>


        </div>
       );
}
}
export default renderRangeSlide;