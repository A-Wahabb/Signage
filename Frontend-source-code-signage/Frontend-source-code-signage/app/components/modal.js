import React, { Component, PropTypes } from 'react';
class Modal extends React.Component {
    render() {
      if (this.props.isOpen === false){
        return null;}

      return (
        <div className={this.props.containerClassName}>
          <div className={this.props.className} >
            {this.props.children}
          </div>
          {!this.props.noBackdrop &&
              <div className="popup-backdrop"
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

export default Modal
