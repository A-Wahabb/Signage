import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';

//update  email
export const FETCH_BEBWEB = 'FETCH_BEBWEB';
export const FETCH_BEBWEB_SUCCESS = 'FETCH_BEBWEB_SUCCESS';

export const ADD_BEBWEB = 'ADD_BEBWEB';

export const UPDATE_BEBWEB = 'UPDATE_BEBWEB';
export const SAVE_BEBWEB_SUCCESS = 'SAVE_BEBWEB_SUCCESS';
export const SAVE_BEBWEB_FAILURE = 'SAVE_BEBWEB_FAILURE';




export const UPLOAD_IMG_BEB ="UPLOAD_IMG_BEB";

const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';

export function fetchBebWeb(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/bebweb`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_BEBWEB,
    payload: request
  };
}

export function fetchBebWebSuccess(data) {
  console.log('BEBWEB',data);
  return {
    type: FETCH_BEBWEB_SUCCESS,
    payload: data
  };
}


export function saveBebWeb(tokenFromStorage,pgData) {
  console.log(tokenFromStorage);
  const request = axios({
    method: 'post',
    data:pgData,
    url: `${ROOT_URL}/bebweb`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: ADD_BEBWEB,
    payload: request
  };
}

export function updateBebWeb(tokenFromStorage,dealUpdateData) {
  const request = axios({
    method: 'put',
    data:dealUpdateData,
    url: `${ROOT_URL}/BEBWEB`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPDATE_BEBWEB,
    payload: request
  };
}

export function saveWebDataSuccess(data) {
  console.log('BEBWEB',data);
  return {
    type: SAVE_BEBWEB_SUCCESS,
    payload: data
  };
}

export function uploadImgBeb(tokenFromStorage,uploadObj,subfodler) {

  const request = axios({
    method: 'post',
    data: uploadObj,
    arrayKey: '',
    url: `${ROOT_URL}/bebweb/upload/${subfodler}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }

  });

  return {
    type: UPLOAD_IMG_BEB,
    payload: request
  };
}
