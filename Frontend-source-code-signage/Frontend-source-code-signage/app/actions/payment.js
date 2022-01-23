import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';

export const MAKE_PAYMENT = 'MAKE_PAYMENT';
export const MAKE_PAYMENT_SUCCESS = 'MAKE_PAYMENT_SUCCESS';
export const MAKE_PAYMENT_FAILURE = 'MAKE_PAYMENT_FAILURE';
export const RESET_PAYMENT = 'RESET_PAYMENT';

export const SUBSCRIPTION_PLANS = 'SUBSCRIPTION_PLANS';
export const SUBSCRIPTION_PLANS_SUCCESS = 'SUBSCRIPTION_PLANS_SUCCESS';
export const SUBSCRIPTION_PLANS_FAILURE = 'SUBSCRIPTION_PLANS_FAILURE';

export const RESET_SUBSCRIPTION_PLANS = 'RESET_SUBSCRIPTION_PLANS';

export const GET_SUBSCRIPTION_BY_EMAIL = 'GET_SUBSCRIPTION_BY_EMAIL';
export const GET_SUBSCRIPTION_BY_EMAIL_SUCCESS = 'GET_SUBSCRIPTION_BY_EMAIL_SUCCESS';

export const NEW_SUBSCRIPTION = 'NEW_SUBSCRIPTION';
export const NEW_SUBSCRIPTION_SUCCESS = 'NEW_SUBSCRIPTION_SUCCESS';
export const NEW_SUBSCRIPTION_FAILURE = 'NEW_SUBSCRIPTION_FAILURE';

export const DELETE_SUBSCRIPTION = 'DELETE_SUBSCRIPTION';

export const NEW_BILL_USER_REGISTRATION = "NEW_BILL_USER_REGISTRATION";

export const SUBSCRIPTIONS_LIST = 'SUBSCRIPTIONS_LIST';
export const SUBSCRIPTIONS_LIST_SUCCESS = 'SUBSCRIPTIONS_LIST_SUCCESS';
export const SUBSCRIPTIONS_LIST_FAILURE = 'SUBSCRIPTIONS_LIST_FAILURE';

export const INVOICE_LIST = 'INVOICE_LIST';
export const INVOICE_LIST_SUCCESS = 'INVOICE_LIST_SUCCESS';
export const INVOICE_LIST_FAILURE = 'INVOICE_LIST_FAILURE';

export function newSubscription(authToken, subObj) {
  const request = axios({
    method: 'POST',
    data: subObj,
    url: `${ROOT_URL}/payment/new-subscription`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  return {
    type: "NEW_SUBSCRIPTION",
    payload: request
  };
}

export function newSubscriptionSuccess(results) {
  return {
    type: NEW_SUBSCRIPTION_SUCCESS,
    payload: results
  };
}

export function newSubscriptionFailure(error) {
  return {
    type: NEW_SUBSCRIPTION_FAILURE,
    payload: error
  };
}


export function delSubsPlan(authToken, serveId) {
  const request = axios({
    method: 'DELETE',
    url: `${ROOT_URL}/payment/service-instance/${serveId}`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  return {
    type: DELETE_SUBSCRIPTION,
    payload: request
  };
}


export function getSubPlans(authToken) {
  const request = axios({
    method: 'GET',
    url: `${ROOT_URL}/payment/offerings`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  return {
    type: SUBSCRIPTION_PLANS,
    payload: request
  };
}

export function getSubPlansSuccess(results) {
  return {
    type: SUBSCRIPTION_PLANS_SUCCESS,
    payload: results
  };
}

export function getSubPlansFailure(error) {
  return {
    type: SUBSCRIPTION_PLANS_FAILURE,
    payload: error
  };
}

export function resetPlans() {
  return {
    type: RESET_SUBSCRIPTION_PLANS,
    payload: null
  };
}


export function getInvoices(authToken,billing_token) {
  const request = axios({
    method: 'GET',
    url: `${ROOT_URL}/payment/invoices/${billing_token}`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  return {
    type: INVOICE_LIST,
    payload: request
  };
}

export function getInvoicesSuccess(results) {
  return {
    type: INVOICE_LIST_SUCCESS,
    payload: results
  };
}

export function getInvoicesFailure(error) {
  return {
    type: INVOICE_LIST_FAILURE,
    payload: error
  };
}

export function getSubscriptions(authToken) {
  const request = axios({
    method: 'GET',
    url: `${ROOT_URL}/payment/subscriptions`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  return {
    type: SUBSCRIPTIONS_LIST,
    payload: request
  };
}

export function getSubscriptionsSuccess(results) {
  return {
    type: SUBSCRIPTIONS_LIST_SUCCESS,
    payload: results
  };
}

export function getSubscriptionsFailure(error) {
  return {
    type: SUBSCRIPTIONS_LIST_FAILURE,
    payload: error
  };
}


export function getUserSubPlanByEmail(authToken) {
  const request = axios({
    method: 'GET',
    url: `${ROOT_URL}/payment/subscription-by-email`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  return {
    type: GET_SUBSCRIPTION_BY_EMAIL,
    payload: request
  };
}

export function getUserSubPlanByEmailSuccess(results) {
  return {
    type: GET_SUBSCRIPTION_BY_EMAIL_SUCCESS,
    payload: results
  };
}

export function getUserSubPlanByEmailFailure(results) {
  return {
    type: GET_SUBSCRIPTION_BY_EMAIL_FAILURE,
    payload: results
  };
}

export function makePayment(authToken, payMethod) {
  const request = axios({
    method: 'POST',
    data: payMethod,
    url: `${ROOT_URL}/payment`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  return {
    type: "MAKE_PAYMENT",
    payload: request
  };
}


export function newBillUserRegistration(authToken, billUserApiAndDetails) {
  const request = axios({
    method: 'POST',
    data: billUserApiAndDetails,
    url: `${ROOT_URL}/payment/bill-new-registration`,
    headers: {
      'Authorization': `Bearer ${authToken}`
    }
  });

  return {
    type: "NEW_BILL_USER_REGISTRATION",
    payload: request
  };
}

export function makePaymentSuccess(results) {
  return {
    type: MAKE_PAYMENT_SUCCESS,
    payload: results
  };
}

export function makePaymentFailure(error) {
  return {
    type: MAKE_PAYMENT_FAILURE,
    payload: error
  };
}

export function resetNewPayment() {
  return {
    type: RESET_PAYMENT,
    payload: null
  };
}