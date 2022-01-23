import FileUpload from './file-upload.js';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import { uploadFile} from '../../actions/common';

const mapDispatchToProps = (dispatch) => {
  return {
    	
    uploadFile:(uploadFormData, pathCode)=> {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(uploadFile(token,uploadFormData,pathCode)).then(result => {
        if (result.payload.response && result.payload.response.status !== 200) {
          toast.error("UPLOAD FAILED!");
        }else{
        toast.success("UPLOADED!!");
        }
      });;
    }
	}
}

function mapStateToProps(state, ownProps) {
  return {
  		replacePathCode:ownProps.replacePathCode,
  		themeColor:ownProps.themeColor
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FileUpload);
