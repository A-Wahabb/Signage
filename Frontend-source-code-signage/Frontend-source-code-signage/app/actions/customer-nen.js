import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';

//update  email
export const FETCH_LOCS = 'FETCH_LOCS';
export const FETCH_LOCS_SUCCESS = 'FETCH_LOCS_SUCCESS';
export const FETCH_LOCS_FAILURE = 'FETCH_LOCS_FAILURE';
export const RESET_UPDATE_EMAIL_STATE = 'RESET_UPDATE_EMAIL_STATE';
export const SELECT_LOC_SUCCESS = 'SELECT_LOC_SUCCESS';


//const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';

export function fetchLocas(data) {
  
  var formData = new FormData();
formData.append("username", data.username);
formData.append("password", data.password);
  const request = axios({
    method: 'post',
    data: formData,
    url: 'https://hub.nento.com/apis/signageLogin'
  });

  return {
    type: FETCH_LOCS,
    payload: request
  };
}

export function fetchLocsSuccess(data) {
  console.log('Locs',data);
  return {
    type: FETCH_LOCS_SUCCESS,
    payload: data.data
  };
}

export function fetchLocsFailure(error) {
  return {
    type: FETCH_LOCS_FAILURE,
    payload: error
  };
}


export function selectedLocSuccess(data) {
  console.log('Locs',data);
  return {
    type: SELECT_LOC_SUCCESS,
    payload: data
  };
}


