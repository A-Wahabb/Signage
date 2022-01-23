import React, { Component } from 'react';
import GalleryContainer from '../containers/GalleryContainer.js';

export default class GalleryPg extends Component {

  render() {
    console.log('---gallery page--',this.props);
    return (

        <GalleryContainer 
        		      user= {this.props.user}
                  common = {this.props.common}
                  rootModal = {this.props.rootModal}
                  toggleRootModal = {this.props.toggleRootModal}
                  selectView ={this.props.selectView}
                  galleryType = {this.props.galleryType}
                  selectMedia = {this.props.selectMedia}
                 
        />
    );
  }
}
