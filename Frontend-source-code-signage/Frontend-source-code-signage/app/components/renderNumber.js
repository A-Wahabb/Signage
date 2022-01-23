import React, { Component } from 'react';

class renderNumber extends React.Component { // eslint-disable-line react/prefer-stateless-function

  checkChange(evt){
    //console.log('Number change',evt);
    this.props.parent.updateContent(evt);
  }

  render() {
    const { input, label, max, min, step } = this.props;
    //console.log('number area',input);
    if(input.value=="none"){
      return null;
    }
    return (
      <div className="num-label">
      
      <input className={'effect-16 has-content'}  type="number" min={min} max={max} step={step}  {...input} />
      <label   htmlFor={label}>
      {label}</label>
      </div>
    );
  }
}

export default renderNumber;