import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';

//update  email
export const FETCH_DEALS = 'FETCH_DEALS';
export const FETCH_DEALS_SUCCESS = 'FETCH_DEALS_SUCCESS';
export const FETCH_DEALS_FAILURE = 'FETCH_DEALS_FAILURE';

export const ADD_DEALS = 'ADD_DEALS';
export const ADD_DEALS_FAILURE = 'ADD_DEALS_FAILURE';

export const DEL_DEALS = 'DEL_DEALS';
export const DEL_DEALS_FAILURE ='DEL_DEALS_FAILURE';

export const DEL_PROP = 'DEL_PROP';
export const DEL_PROP_FAILURE ='DEL_PROP_FAILURE';

export const UPDATE_DEALS = 'UPDATE_DEALS';
export const UPDATE_DEALS_SUCCESS = 'UPDATE_DEALS_SUCCESS';
export const UPDATE_DEALS_FAILURE = 'UPDATE_DEALS_FAILURE';

export const UPLOAD_IMG ="UPLOAD_IMG";

const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';

export function fetchDeals(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/abbes/optins`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_DEALS,
    payload: request
  };
}

export function fetchDealsSuccess(data) {
  console.log('DEALS',data);
  return {
    type: FETCH_DEALS_SUCCESS,
    payload: data
  };
}

export function fetchDealsFailure(error) {
  return {
    type: FETCH_DEALS_FAILURE,
    payload: error
  };
}


export function delDeals(tokenFromStorage,dealId) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/abbes/optins/${dealId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: DEL_DEALS,
    payload: request
  };
}


export function delDealsFailure(error) {
  return {
    type: DEL_DEALS_FAILURE,
    payload: error
  };
}



export function addDeals(tokenFromStorage,pgData) {
  const request = axios({
    method: 'post',
    data:pgData,
    url: `${ROOT_URL}/abbes/optins`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: ADD_DEALS,
    payload: request
  };
}

export function addDealsFailure(error) {
  return {
    type: ADD_DEALS_FAILURE,
    payload: error
  };
}


export function uploadImg(tokenFromStorage,uploadObj,subfodler) {
  let propData = new FormData();
//  propData.append('probObj',JSON.stringify(propObj));

console.log(uploadObj);
propData.append('photo_path',uploadObj);

//propData.append('featured_photo_path',uploadObj);

  const request = axios({
    method: 'post',
    data: propData,
    arrayKey: '',
    url: `${ROOT_URL}/abbes/upload${subfodler}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }

  });

  return {
    type: UPLOAD_IMG,
    payload: request
  };
}

export function updateDeals(tokenFromStorage,dealUpdateData) {
  const request = axios({
    method: 'put',
    data:dealUpdateData,
    url: `${ROOT_URL}/abbes/optins`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPDATE_DEALS,
    payload: request
  };
}

export function updateDealsSuccess(data) {
  console.log('DEALS',data);
  return {
    type: UPDATE_DEALS_SUCCESS,
    payload: data
  };
}

export function updateDealsFailure(error) {
  return {
    type: UPDATE_DEALS_FAILURE,
    payload: error
  };
}

