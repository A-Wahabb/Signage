import React, { Component } from 'react';
import { updateTimer } from '../actions/timers';

class renderCheckbox extends React.Component { // eslint-disable-line react/prefer-stateless-function

  checkChange(evt,value){
    console.log('check change',evt);
    this.props.parent.updateContent(evt,value,true);

  }

  render() {
    
    const { input, label } = this.props;
    console.log('checkbox area',input);
    if(input.value=="none"){
      return null;
    }
    return (
      <div>
        
      <label className="check-label" onClick={event => this.checkChange(event,!input.value)} htmlFor={label}><div className="myCheckbox">
      <input type="checkbox" {...input}   checked={input.value}/><span {...input}></span>
      </div>{label}</label>&nbsp;&nbsp;
      </div>
    );
  }
}

export default renderCheckbox;