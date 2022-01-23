import React, { Component, PropTypes } from 'react';

class EditTools extends Component {
    constructor(){
      super();
    }

    render() {
      console.log(this.props);
      return (
        <div className="edit-tool-box">
          {!this.props.isEditing && <div className="edit-tool-box-in"><span className="glyphicon glyphicon-pencil" onClick={(evt)=>this.props.showEdit(evt,this.props.id)}  ></span>
          </div>}
          {this.props.isEditing && <div className="edit-tool-box-in"><span className="glyphicon glyphicon-ok" onClick={(evt)=>this.props.saveEdit(evt)}  ></span>
          <span className="glyphicon glyphicon-remove" onClick={(evt)=>this.props.cancelEdit(evt)}  ></span>
          </div>}
        </div>
      )
    }
  }

export default EditTools;
