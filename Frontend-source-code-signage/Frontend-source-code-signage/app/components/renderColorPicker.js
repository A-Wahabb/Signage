import React, { Component } from 'react';

class renderColorPicker extends Component {

    render() {
        const {
          input, label ,type 
        } = this.props;

        if(input.value=="none"){
          return null;
        }
        return (
          <div className="num-label">
         
      <input  className={'effect-16 has-content'}   {...input}  type='color' />
      <label   htmlFor={label}>
      {label}</label>

        </div>
       );
   }
}
export default renderColorPicker;