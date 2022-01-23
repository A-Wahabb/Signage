import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';
export const FETCH_IM_SETTINGS = 'FETCH_IM_SETTINGS';
export const FETCH_IM_SETTINGS_SUCCESS = 'FETCH_IM_SETTINGS_SUCCESS';
export const FETCH_IM_SETTINGS_FAILURE = 'FETCH_IM_SETTINGS_FAILURE';

export const UPDATE_IM_SETTINGS = 'UPDATE_IM_SETTINGS';
export const UPDATE_IM_SETTINGS_SUCCESS = 'UPDATE_IM_SETTINGS_SUCCESS';
export const UPDATE_IM_SETTINGS_FAILURE = 'UPDATE_IM_SETTINGS_FAILURE';

export const SAVE_IM_SETTINGS = 'SAVE_IM_SETTINGS';
export const SAVE_IM_SETTINGS_SUCCESS = 'SAVE_IM_SETTINGS_SUCCESS';
export const SAVE_IM_SETTINGS_FAILURE = 'SAVE_IM_SETTINGS_FAILURE';

export const REMOVE_IM_SETTINGS = 'REMOVE_IM_SETTINGS';
export const REMOVE_IM_SETTINGS_SUCCESS = 'REMOVE_IM_SETTINGS_SUCCESS';
export const REMOVE_IM_SETTINGS_FAILURE = 'REMOVE_IM_SETTINGS_FAILURE';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';



export function updateIamSettings(tokenFromStorage,props) {
  const request = axios({
    method: 'put',
    data: props,
    url: `${ROOT_URL}/iamuser`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: "UPDATE_IM_SETTINGS",
    payload: request
  };
}

export function updateIamSettingsSuccess(imuser) {
  return {
    type: UPDATE_IM_SETTINGS_SUCCESS,
    payload: imuser
  };
}


export function addIamSettings(tokenFromStorage,props) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/iamuser`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: "SAVE_IM_SETTINGS",
    payload: request
  };
}

export function addIamSettingsSuccess(imuser) {
  return {
    type: SAVE_IM_SETTINGS_SUCCESS,
    payload: imuser
  };
}

export function addIamSettingsFailure(imuser) {
  return {
    type: SAVE_IM_SETTINGS_SUCCESS,
    payload: imuser
  };
}

export function fetchIMSettings(tokenFromStorage,imuserId){
  console.log('imuserId-----',imuserId);
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/iamuser/${imuserId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: FETCH_IM_SETTINGS,
    payload: request
  };
}

export function fetchIMSettingsByName(tokenFromStorage,imuserName){
  console.log('imuserName-----',imuserName);
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/iamuserbyname/${imuserName}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: FETCH_IM_SETTINGS,
    payload: request
  };
}

export function fetchIMSettingsSuccess(iamSettings) {
  console.log('---action--',iamSettings);
  return {
    type: FETCH_IM_SETTINGS_SUCCESS,
    payload: iamSettings
  };
}

export function deleteIM(tokenFromStorage,imId) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/iamuser/${imId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: REMOVE_IM_SETTINGS,
    payload: request
  };
}
