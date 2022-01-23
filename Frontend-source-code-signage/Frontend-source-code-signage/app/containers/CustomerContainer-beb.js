import { connect } from 'react-redux'
import CustomerBebWeb from '../components/Customer-bebweb';
import { showModal, hideModal, updateKey } from '../actions/popup';
import { changeSelectedConsole, changeSelectedApp } from '../actions/popup';
import { toast } from 'react-toastify';
import { saveBebWeb,updateBebWeb, saveWebDataSuccess,fetchBebWeb,uploadImgBeb} from '../actions/customer-bebweb';


const mapStateToProps = (state) => {
  console.log("[Custom APP]", state);
  return {
    bebweb: state.beb.bebweb,
    user: state.user
  };
}

const mapDispatchToProps = (dispatch) => {
  let token = sessionStorage.getItem('jwtToken');
  return {
    resetMe: () => {
      console.log('reset');
    },

    fetchBebWebReq: () => {
    return  dispatch(fetchBebWeb(token)).then((response) => {
        if(!response.error){ 
            //var Teamsdata=Object.assign([],);
        
       console.log('web',response);
       dispatch(saveWebDataSuccess(response.payload.data));
    }
 
    });
    },

    updateBebWeb: (updateData) => {
  
    return  dispatch(updateBebWeb(token,updateData)).then((response) => {
        if(!response.error)  
            {
                toast.success("UPDATED SUCCESSFULLY!");
            
            dispatch(fetchBebWeb(token)).then((response) => {
        !response.error ?  dispatch(saveWebDataSuccess(response.payload.data)) :  dispatch(saveWebDataSuccess(response.payload.data));
      });

            } 
        
      });
    },

     saveBebWebData: (pgData) => {
        
    return dispatch(saveBebWeb(token, pgData))
  .then((result) => {
    // Note: Error's "data" is in result.payload.response.data (inside "response")
    // success's "data" is in result.payload.data
    if (result.payload.response && result.payload.response.status !== 200) {
      console.log('err');
      return;
    }
    console.log('---beb web data', result);
     toast.success("SAVED SUCCESSFULLY!");
    dispatch(signInUserSuccess(result.payload.data));
  });
    },

  
    changeConsole: (consoleName) =>{
      return dispatch(changeSelectedConsole(consoleName));
    },

    uploadFile: (formData, dir) => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(uploadImgBeb(token,formData,dir)).then(result => {
        if (result.payload.response && result.payload.response.status !== 200) {
          toast.error("UPLOAD FAILED!");
        }else{
        toast.success("UPLOADED!!");
        }
      });
    }


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerBebWeb);
