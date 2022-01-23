import React, { Component, PropTypes } from 'react';
class ModalLocal extends React.Component {
    render() {
      if (this.props.isOpen === false){
        return null;}

      return (
        <div className={this.props.containerClassName} >
          <div className={this.props.className} style={this.props.style}>
            {this.props.children}
          </div>
          { <div className="popup-backdrop"
                   onClick={e => this.close(e)}/>}
        </div>
      )
    }

    close(e) {
      e.preventDefault()

      if (this.props.onClose) {
        this.props.onClose();
      }
    }
  }

export default ModalLocal
