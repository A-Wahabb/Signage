import React, { Component } from 'react';

class renderLabel extends React.Component { // eslint-disable-line react/prefer-stateless-function


  render() {
    
    const { input, label } = this.props;

    if(input.value=="none"){
      return null;
    }
    return (
      <div className="form-group">
        <h3>{input.value}</h3>
       
      </div>
    );
  }
}

export default renderLabel;

