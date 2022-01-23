import React, { Component } from 'react';

import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';

let createSliderWithTooltip = Slider.createSliderWithTooltip;
let Range = createSliderWithTooltip(Slider.Range);
let Handle = Slider.Handle;

let handle = (props) => {
  let { value, dragging, index, ...restProps } = props;
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

let wrapperStyle = { width: '100%', margin: '30px 10px' };

class renderRangeSlide extends Component {
  
getArrIpVal(){
    let propipVal = typeof this.props.input.value == 'string' ?  this.props.input.value.split('~'):this.props.input.value;
        propipVal = propipVal.map(val => parseInt(val));
        return propipVal;
}

checkChange(evt,value,name){
    let event={};
    event.preventDefault=function(){return true;}
    event.target={};
    event.target.name=name;
    this.props.parent.updateContent(event,value.join('~'));
  }
   
    render() {
        const {
          input, label ,type ,name,max
        } = this.props;

        if(input.value=="none"){
          return null;
        }
        input.value = this.getArrIpVal();

        return (
          <div className="num-label">
         
      <div style={wrapperStyle}>
      <p>{label}</p>
      <Range id='range' min={1}  onAfterChange={(event) => this.checkChange(event,input.value,input.name)} max={max} {...input} value={input.value} tipFormatter={value => `${value}`} />

      
    </div>


        </div>
       );
}
}
export default renderRangeSlideFixed;