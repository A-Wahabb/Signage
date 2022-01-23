import React, { Component } from 'react';

class RenderInputTitle extends React.Component { 
constructor(props) {
    super(props);
   	this.state={
   		isEditing:false
   	};
   	this.toggleEditing = this.toggleEditing.bind(this);
    }

  toggleEditing(){
  	this.setState({
  		isEditing:!this.state.isEditing
  	});
  }
  render() {
    let appName = this.props.appName;
    return (!this.state.isEditing?<div style={{display:'inline',width:'200px',marginLeft:'10px'}}><h2 className='header-title appname-title'>{appName}</h2><span style={{fontSize:'0.8em'}} className="glyphicon glyphicon-pencil" onClick={this.toggleEditing}  ></span></div>: <input style={{display:'inline',width:'200px',marginLeft:'10px'}} id="appTitle"
              defaultValue={appName} className={"effect-16 has-content panel-heading"} 
              onChange={(evt) => this.props.updateTitleChange(evt)} 
              type="text" /> );
  }
}

export default RenderInputTitle;

