import React from 'react';
import Payment from '../components/Payment.js';
import { connect } from 'react-redux';
import {newSubscription, newSubscriptionSuccess, newSubscriptionFailure,resetNewPayment, makePayment, makePaymentSuccess, makePaymentFailure,
getSubPlans,getSubPlansSuccess, getSubPlansFailure,getUserSubPlanByEmail,getSubPlanByEmailSuccess,newBillUserRegistration,delSubsPlan,
getInvoices,getInvoicesSuccess,getInvoicesFailure} from './../actions/payment';
import { changeParentConsole,changeSelectedConsole } from '../actions/popup';
import { toast } from 'react-toastify';

const mapDispatchToProps = (dispatch) => {
    
  return {
   resetMe: () =>{
      dispatch(resetNewPayment());
    },
    changeConsole: (consoleName) => {
      return dispatch(changeParentConsole(consoleName));
    },

    makePayment: (payMethod) => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(makePayment(token,payMethod)).then((response) => {
        if(!response.error){
          dispatch(makePaymentSuccess(response.payload.data));
          toast.success("CHEERS! PAYMENT IS SUCCESSFUL, THANK YOU!");
        } else{ 
          dispatch(makePaymentFailure(response.payload.data));
          toast.error("PAYMENT FAILED, TRY AGAIN!");
        }
      });
    },

    getSubscriptions: () => {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(getSubPlans(token)).then((response) => {
        if(!response.error){
          dispatch(getSubPlansSuccess(response.payload.data));
          
          //toast.success("CHEERS! PAYMENT IS SUCCESSFUL, THANK YOU!");
        } else{ 
          dispatch(getSubPlansFailure(response.payload.data));
          //toast.error("PAYMENT FAILED, TRY AGAIN!");
        }
      });
    },

    saveSubs: (subObj)=> {
      let token = sessionStorage.getItem('jwtToken');
      dispatch(newSubscription(token,subObj)).then((response) => {
        if(!response.error){
          dispatch(newSubscriptionSuccess(response.payload));
          toast.success("THANK YOU!");
          dispatch(changeParentConsole('USER_HOME'));
        } else{
          //dispatch(getSubPlansFailure(response.payload.data));
          //toast.error("PAYMENT FAILED, TRY AGAIN!");
        }
      });
    },

    delServiceById: (subsId) =>{
      let token = sessionStorage.getItem('jwtToken');
      dispatch(delSubsPlan(token,subsId)).then((response) => {
        if(!response.error){
          ///dispatch(newSubscriptionSuccess(response.payload));
          //toast.success("THANK YOU!");
          //dispatch(changeParentConsole('USER_HOME'));
          console.log('delete sub service id success');
          dispatch(getUserSubPlanByEmail(token)).then((subs) => {
                !subs.error ? dispatch(getUserSubPlanByEmailSuccess(subs.payload.data)) : dispatch(getUserSubPlanByEmailFailure(subs.payload));
              });

        } else{
          //dispatch(getSubPlansFailure(response.payload.data));
          //toast.error("PAYMENT FAILED, TRY AGAIN!");
        }
      });

    },


    registerBillingUser: (billUserRegApi, userDetails) =>{
      let token = sessionStorage.getItem('jwtToken');
      let body ={api: billUserRegApi, userDetails:userDetails};
      dispatch(newBillUserRegistration(token, body)).then((response) => {
        if(!response.error){
          //dispatch(newSubscriptionSuccess(response.payload));
          ///toast.success("THANK YOU!");
        } else{
          //dispatch(getSubPlansFailure(response.payload.data));
          //toast.error("PAYMENT FAILED, TRY AGAIN!");
        }
      });
    },

    fetchInvoices: (billToken) =>{
      console.log('getting invoices--------');
      let token = sessionStorage.getItem('jwtToken');
      dispatch(getInvoices(token, billToken)).then((response) => {
        if(!response.error){
          console.log('invoices', response.payload);
          dispatch(getInvoicesSuccess(response.payload.data));
          ///toast.success("THANK YOU!");
        } else{
          dispatch(getInvoicesFailure(response.payload.data));
          //toast.error("PAYMENT FAILED, TRY AGAIN!");
        }
      });
    }

  }
}

function mapStateToProps(state, ownProps) {

  return {
    user: ownProps.user,
    common: ownProps.popup,
    newPayment: state.payment.newPayment,
    subscriptions: state.payment.subscriptions,
    userSubs: state.payment.userSubs,
    invoices: state.payment.invoices
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
