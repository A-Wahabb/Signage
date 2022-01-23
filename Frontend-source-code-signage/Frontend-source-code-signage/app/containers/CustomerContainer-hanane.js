import { connect } from 'react-redux'
import CustomerHanane from '../components/Customer-hanane';
import { showModal, hideModal, updateKey } from '../actions/popup';
import {fetchDeals,fetchDealsFailure, fetchDealsSuccess,fetchCities,delDeals,delDealsFailure,updateDeals,updateDealsFailure, updateDealsSuccess,addDeals,addDealsFailure,addProperty,uploadImg} from '../actions/customer-hanane';
import { changeSelectedConsole, changeSelectedApp } from '../actions/popup';
import { toast } from 'react-toastify';

const mapStateToProps = (state) => {
  console.log("[Custom APP]", state);
  return {
    trans: state.optins,
    user: state.user,
    activePlayer: state.posts.activePlayer
  };
}

const mapDispatchToProps = (dispatch) => {
  let token = sessionStorage.getItem('jwtToken');
  return {
    resetMe: () => {
      console.log('reset');
    },

    fetchOptins: () => {
    return  dispatch(fetchDeals(token)).then((response) => {
        if(!response.error){ 
            //var Dealsdata=Object.assign([],);
        
       console.log('optins',response);
       dispatch(fetchDealsSuccess(response.payload.data));
    }
    else{  
        dispatch(fetchDealsFailure(response.payload.data));
        }
    });
    },

    updateDeal: (updateData) => {
  
    return  dispatch(updateDeals(token,updateData)).then((response) => {
        if(!response.error)  
            {
                toast.success("UPDATED SUCCESSFULLY!");
            
            dispatch(fetchDeals(token)).then((response) => {
        !response.error ? dispatch(fetchDealsSuccess(response.payload.data)) : dispatch(fetchDealsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("UPDATED FAILED!");
            dispatch(updateDealsFailure(response.payload.data));
        }
      });
    },


    deleteDealById: (dealId) => {
       console.log('delete', dealId);
    return  dispatch(delDeals(token,dealId)).then((response) => {
        if(!response.error)  
            {
                toast.success("DELETED SUCCESSFULLY!");
            
            dispatch(fetchDeals(token)).then((response) => {
        !response.error ? dispatch(fetchDealsSuccess(response.payload.data)) : dispatch(fetchDealsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("DELETE FAILED!");
            dispatch(delDeals(response.payload.data));
        }
      });
    },

    

    refreshListData:(evt)=> {
     
            dispatch(fetchDeals(token)).then((response) => {
        !response.error ? dispatch(fetchDealsSuccess(response.payload.data)) : dispatch(fetchDealsFailure(response.payload.data));
      });


    },

    



     addTransDeal: (pgData) => {
        
    return  dispatch(addDeals(token,pgData)).then((response) => {
        if(!response.error)  
            {
                toast.success("ADDED SUCCESSFULLY!");
                //dispatch(updateDealsSuccess(response.payload.data));
               
            dispatch(fetchDeals(token)).then((response) => {
        !response.error ? dispatch(fetchDealsSuccess(response.payload.data)) : dispatch(fetchDealsFailure(response.payload.data));
      });

            } 
        else{ 
            toast.error("ADDING DEAL FAILED!");
            dispatch(addDealsFailure(response.payload.data));
        }
      });
    },

   
    uploadImg:(uploadObj,subfolder)=>{
      return  dispatch(uploadImg(token,uploadObj,subfolder)).then((response) => {
        if(!response.error)  
            {
      }
     else{ 
            toast.error("Upload image FAILED!");
            //dispatch(addPropertyFailure(response.payload.data));
        }

      });

    },

    uploadPdf:(uploadObj,subfolder)=>{
      return  dispatch(uploadImg(token,uploadObj,subfolder)).then((response) => {
        if(!response.error)  
            {
      }
     else{ 
            toast.error("Upload image FAILED!");
            //dispatch(addPropertyFailure(response.payload.data));
        }

      });

    },
    
    updateModal: (param) =>{
      return param && param.isModalOpen? dispatch(showModal(param)): dispatch(hideModal());
    },

    changeConsole: (consoleName) =>{
      return dispatch(changeSelectedConsole(consoleName));
    }


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHanane);
