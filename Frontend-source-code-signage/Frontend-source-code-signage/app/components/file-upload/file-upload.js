import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router-dom';
import {Loading,Title,Error,ToolTip} from '../commonDumbs';
import {BASE_SERVER,LOCAL_SERVER} from '../../constants/Config';
import { confirmAlert } from 'react-confirm-alert';
import { toast } from 'react-toastify';
import axios from 'axios';
 
class FileUpload extends Component {
  
    state = {
 
      // Initially, no file is selected
      selectedFile: null
    };
    
    // On file select (from the pop up)
    onFileChange = event => {
    
      // Update the state
      this.setState({ selectedFile: event.target.files[0] });
    
    };
    
    // On file upload (click the upload button)
    onFileUpload = () => {
      toast.info('UPLOADING...PLEASE WAIT...!')
      // Create an object of formData
      const formData = new FormData();
    
      // Update the formData object
      formData.append(
        "uploader",
        this.state.selectedFile,
        this.state.selectedFile.name
      );
    
      // Details of the uploaded file
      console.log(this.state.selectedFile);
    
      // Request made to the backend api
      // Send formData object
      //axios.post("api/uploadfile", formData);
      this.props.uploadFile(formData,this.props.replacePathCode);
    };
    
    // File content to be displayed after
    // file upload is complete
    fileData = () => {
    
      if (this.state.selectedFile) {
         
        return (
       <div></div>   
      )
    }
  };
    
    render() {
    
      return (
        <div>
            <div>
                <input type="file" onChange={this.onFileChange} style={{display:'inline-block'}}/>
                <button style={{color:this.props.themeColor,display:'inline-block'}} className="btn btn-primary-link" onClick={this.onFileUpload}>
                  UPLOAD
                </button>
            </div>
          {this.fileData()}
        </div>
      );
    }
  }
 
  


export default FileUpload;
