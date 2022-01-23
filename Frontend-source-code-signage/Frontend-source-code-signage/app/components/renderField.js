import React, { Component } from 'react';

export default class renderField extends Component {

  constructor(props){
    super(props);
  }

  blurred(evt){
    console.log(this.props);
    this.props.parent.updateContent(evt);
  }

    render() {
        const {
          input, label ,type,defaultValue,
          meta: { touched, error, invalid, warning }
        } = this.props;

        if(input.value=="none"){
          return null;
        }
        return (
          <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>

            <div className="col-3">

            <input  className={`effect-16 ${ invalid ? '' : 'has-content'}`}   {...input}  type={type}  required/>

            <label>{label}</label>
            <span className="focus-border"></span>

          </div>
          <div className="help-block">
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
          </div>
        </div>
       );
   }
}
