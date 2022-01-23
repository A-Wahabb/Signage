import React, { Component } from 'react';

class renderSelect extends React.Component { // eslint-disable-line react/prefer-stateless-function

  renderSelectOptions = (value,selected) => (
    <option className='reder-select-option' value={value} key={value+''+new Date().getTime()}>{value}</option>
  )

  render() {
    
    const { input, label, small,title } = this.props;
    if(input.value=="none"){
      return null;
    }
    let selectLabel= label;
    let styleSelect= small?"small-select":"styled-select green-back rounded";
    
    return (
      <div className={"select-container"} >
      <label className="ddl-label" htmlFor={label}>{label}</label>
      <div className={styleSelect}>
        
        <select name={label}  className='has-content'  {...input}>
          
          {this.props.ddValues && this.props.ddValues.length>0?this.props.ddValues.map(val=>this.renderSelectOptions(val,input.value)):[]}
        </select>
        
      </div>
      </div>
    );
  }
}

export default renderSelect;