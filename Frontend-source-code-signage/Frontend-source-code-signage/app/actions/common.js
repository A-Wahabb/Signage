import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';
//APPS list
export const FETCH_APPS = 'FETCH_APPS';
export const FETCH_APPS_SUCCESS = 'FETCH_APPS_SUCCESS';
export const FETCH_APPS_FAILURE = 'FETCH_APPS_FAILURE';


//Create new app
export const CREATE_APP = 'CREATE_APP';
export const CREATE_APP_SUCCESS = 'CREATE_APP_SUCCESS';
export const CREATE_APP_FAILURE = 'CREATE_APP_FAILURE';
export const RESET_NEW_APP = 'RESET_NEW_APP';
export const DUPLICATE_APP ='CREATE_APP';


//Validate post fields like Title, Categries on the server
export const VALIDATE_APP_FIELDS = 'VALIDATE_APP_FIELDS';
export const VALIDATE_APP_FIELDS_SUCCESS = 'VALIDATE_APP_FIELDS_SUCCESS';
export const VALIDATE_APP_FIELDS_FAILURE = 'VALIDATE_APP_FIELDS_FAILURE';
export const RESET_APP_FIELDS = 'RESET_APP_FIELDS';

//Fetch app
export const FETCH_APP = 'FETCH_APP';
export const FETCH_APP_SUCCESS = 'FETCH_APP_SUCCESS';
export const FETCH_APP_FAILURE = 'FETCH_APP_FAILURE';
export const RESET_ACTIVE_APP= 'RESET_ACTIVE_APP';

//Delete app
export const DELETE_APP = 'DELETE_APP';
export const DELETE_APP_SUCCESS = 'DELETE_APP_SUCCESS';
export const DELETE_APP_FAILURE = 'DELETE_APP_FAILURE';
export const RESET_DELETED_APP= 'RESET_DELETED_APP';

//UPLOAD app
export const UPLOAD_APP_MEDIA = 'UPLOAD_APP_MEDIA';
export const UPLOAD_APP_MEDIA_SUCCESS = 'UPLOAD_APP_MEDIA_SUCCESS';
export const UPLOAD_APP_MEDIA_FAILURE = 'UPLOAD_APP_MEDIA_FAILURE';
export const RESET_UPLOAD_APP_MEDIA = 'RESET_UPLOAD_APP_MEDIA';


//upload siglefiles-
export const UPLOAD_FILE = 'UPLOAD_FILE';



const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';

export function fetchApps(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/apps`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_APPS,
    payload: request
  };
}

export function fetchAppsSuccess(apps) {
  return {
    type: FETCH_APPS_SUCCESS,
    payload: apps
  };
}

export function fetchAppsFailure(error) {
  return {
    type: FETCH_APPS_FAILURE,
    payload: error
  };
}



export function validateAppFields(props) {
  //note: we cant have /posts/validateFields because it'll match /posts/:id path!
  const request = axios.post(`${ROOT_URL}/apps/validate/fields`, props);

  return {
    type: VALIDATE_APP_FIELDS,
    payload: request
  };
}

export function validateAppFieldsSuccess() {
  return {
    type: VALIDATE_APP_FIELDS_SUCCESS
  };
}

export function validateAppFieldsFailure(error) {
  return {
    type: VALIDATE_APP_FIELDS_FAILURE,
    payload: error
  };
}

export function resetAppFields() {
  return {
    type: RESET_APP_FIELDS
  }
}
;


export function createApp(props, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/apps`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_APP,
    payload: request
  };
}

export function createAppSuccess(newApp) {
  return {
    type: CREATE_APP_SUCCESS,
    payload: newApp
  };
}

export function createAppFailure(error) {
  return {
    type: CREATE_APP_FAILURE,
    payload: error
  };
}

export function resetNewApp() {
  return {
    type: RESET_NEW_APP
  };
}

export function makeDuplicateApp(appId,tokenFromStorage){
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/app/duplicate/${appId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_APP,
    payload: request
  };
}

export function uploadNewMedia(formData,tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: formData,
    url: `${ROOT_URL}/uploads`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPLOAD_APP_MEDIA,
    payload: request
  };
}

export function uploadNewMediaSuccess(uploadDetail) {
  return {
    type: UPLOAD_APP_MEDIA_SUCCESS,
    payload: uploadDetail
  };
}

export function uploadNewMediaFailure(error) {
  return {
    type: UPLOAD_APP_MEDIA_FAILURE,
    payload: error
  };
}
export function resetUploadNewMedia() {
  return {
    type: RESET_UPLOAD_APP_MEDIA
  };

}

export function resetDeletedApp() {
  return {
    type: RESET_DELETED_APP
  };

}

export function fetchApp(id,tokenFromStorage) {
  console.log("---[APP ACTION]getting app detail", id);
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/app/${id}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_APP,
    payload: request
  };
}


export function fetchAppSuccess(activeApp) {
  return {
    type: FETCH_APP_SUCCESS,
    payload: activeApp
  };
}

export function fetchAppFailure(error) {
  return {
    type: FETCH_APP_FAILURE,
    payload: error
  };
}

export function resetActiveApp() {
  return {
    type: RESET_ACTIVE_APP
  }
}


export function moveToLive(formData,tokenFromStorage) {
  console.log("---[APP ACTION] frm temp folder to client-app move");
  const request = axios({
    method: 'post',
    data: formData,
    url: `${ROOT_URL}/app/live`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_APP,
    payload: request
  };
}


export function deleteApp( tokenFromStorage,appId) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/apps/${appId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: DELETE_APP,
    payload: request
  };
}

export function deleteAppSuccess(deletedApp) {
  return {
    type: DELETE_APP_SUCCESS,
    payload: deletedApp
  };
}

export function deleteAppFailure(response) {
  return {
    type: DELETE_APP_FAILURE,
    payload: response
  };
}

export function updateTimer(props, tokenFromStorage) {
  const request = axios({
    method: 'put',
    data: props,
    url: `${ROOT_URL}/timers`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: "TIMER_UPDATE",
    payload: request
  };
}

export function uploadFile(tokenFromStorage,formData,uploadPathCode) {
  const request = axios({
    method: 'post',
    data: formData,
    url: `${ROOT_URL}/uploader/${uploadPathCode}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPLOAD_FILE,
    payload: request
  };
}


