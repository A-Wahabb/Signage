import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';
//User list
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const RESET_USERS = 'RESET_USERS';

//Users find
export const FIND_USERS = 'FIND_USERS';
export const FIND_USERS_SUCCESS = 'FIND_USERS_SUCCESS';
export const FIND_USERS_FAILURE = 'FIND_USERS_FAILURE';

//storage info
export const FETCH_STORAGE= 'FETCH_STORAGE';
export const FETCH_STORAGE_SUCCESS = 'FETCH_STORAGE_SUCCESS';
export const FETCH_STORAGE_FAILURE = 'FETCH_STORAGE_FAILURE';

//Get current user(me) from token in localStorage
export const ME_FROM_TOKEN = 'ME_FROM_TOKEN';
export const ME_FROM_TOKEN_SUCCESS = 'ME_FROM_TOKEN_SUCCESS';
export const ME_FROM_TOKEN_FAILURE = 'ME_FROM_TOKEN_FAILURE';
export const RESET_TOKEN = 'RESET_TOKEN';

//Sign Up User
export const SIGNUP_USER = 'SIGNUP_USER';
export const SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS';
export const SIGNUP_USER_FAILURE = 'SIGNUP_USER_FAILURE';
export const RESET_USER = 'RESET_USER';

//Sign In User
export const SIGNIN_USER = 'SIGNIN_USER';
export const SIGNIN_USER_SUCCESS = 'SIGNIN_USER_SUCCESS';
export const SIGNIN_USER_FAILURE = 'SIGNIN_USER_FAILURE';

//User_ Media
export const USER_MEDIA = 'USER_MEDIA';
export const USER_MEDIA_SUCCESS = 'USER_MEDIA_SUCCESS';
export const USER_MEDIA_FAILURE = 'USER_MEDIA_FAILURE';

//EDITING USER
export const EDITING_USER = 'EDITING_USER';
export const EDITING_USER_SUCCESS = 'EDITING_USER_SUCCESS';
export const EDITING_USER_FAILURE = 'EDITING_USER_FAILURE';

//DELETING USER
export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';
export const PROCESS_MEDIA = 'PROCESS_MEDIA';

//UPLOAD app
export const UPLOAD_MEDIA = 'UPLOAD_MEDIA';
export const UPLOAD_MEDIA_SUCCESS = 'UPLOAD_MEDIA_SUCCESS';
export const UPLOAD_MEDIA_FAILURE = 'UPLOAD_MEDIA_FAILURE';
export const RESET_UPLOAD_MEDIA = 'RESET_UPLOAD_MEDIA';

//SAVE MEDIA FOLDER

export const SAVE_FOLDER = 'SAVE_FOLDER';
export const SAVE_FOLDER_SUCCESS = 'SAVE_FOLDER_SUCCESS';
export const SAVE_FOLDER_FAILURE = 'SAVE_FOLDER_FAILURE';

//DELETE FOLDER 
export const DELETE_FOLDER = 'DELETE_FOLDER';
export const DELETE_FOLDER_SUCCESS = 'DELETE_FOLDER_SUCCESS';
export const DELETE_FOLDER_FAILURE = 'DELETE_FOLDER_FAILURE';

//FETCH FOLDER

export const FETCH_FOLDER = 'FETCH_FOLDER';
export const FETCH_FOLDERS_SUCCESS = 'FETCH_FOLDER_SUCCESS';
export const FETCH_FOLDERS_FAILURE = 'FETCH_FOLDER_FAILURE';

//FETCH SETTINGS

export const FETCH_SETTINGS = 'FETCH_SETTINGS';
export const FETCH_SETTINGS_SUCCESS = 'FETCH_SETTINGS_SUCCESS';
export const FETCH_SETTINGS_FAILURE = 'FETCH_SETTINGS_FAILURE';

export const UPDATE_SETTINGS = 'UPDATE_SETTINGS';
export const UPDATE_SETTINGS_SUCCESS = 'UPDATE_SETTINGS_SUCCESS';
export const UPDATE_SETTINGS_FAILURE = 'UPDATE_SETTINGS_FAILURE';

//validate email, if success, then load user and login
export const VALIDATE_EMAIL = 'VALIDATE_EMAIL';
export const VALIDATE_EMAIL_SUCCESS = 'VALIDATE_EMAIL_SUCCESS';
export const VALIDATE_EMAIL_FAILURE = 'VALIDATE_EMAIL_FAILURE';

//validate email, if success, then load user and login
export const VALIDATE_OTP = 'VALIDATE_OTP';
export const VALIDATE_OTP_SUCCESS = 'VALIDATE_OTP_SUCCESS';
export const VALIDATE_OTP_FAILURE = 'VALIDATE_OTP_FAILURE';

export const RESEND_OTP = 'RESEND_OTP';

//called when email is updated in profile to update main user's email state
export const UPDATE_USER_EMAIL = 'UPDATE_USER_EMAIL';

//log out user
export const LOGOUT_USER = 'LOGOUT_USER';

// delete media
export const DELETE_MEDIA= 'DELETE_MEDIA';

// delete media
export const UPDATE_MEDIA= 'UPDATE_MEDIA';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';

export function validateEmail(validateEmailToken) {
  //check if token from welcome email is valid, if so, update email as verified and login the user from response
  const request = axios.get(`${ROOT_URL}/validateEmail/${validateEmailToken}`);

  return {
    type: VALIDATE_EMAIL,
    payload: request
  };
}

export function validateEmailSuccess(currentUser) {
  return {
    type: VALIDATE_EMAIL_SUCCESS,
    payload: currentUser
  };
}

export function validateEmailFailure(error) {
  return {
    type: VALIDATE_EMAIL_FAILURE,
    payload: error
  };
}

export function meFromToken(tokenFromStorage,imuserDetails) {
  //check if the token is still valid, if so, get me from the server

  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/me/from/token?token=${tokenFromStorage}&im=${imuserDetails}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: ME_FROM_TOKEN,
    payload: request
  };
}

export function meFromTokenSuccess(currentUser) {
  return {
    type: ME_FROM_TOKEN_SUCCESS,
    payload: currentUser
  };
}

export function meFromTokenFailure(error) {
  return {
    type: ME_FROM_TOKEN_FAILURE,
    payload: error
  };
}

export function fetchStorage(tokenFromStorage){
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/users/storage-size?token=${tokenFromStorage}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: FETCH_STORAGE,
    payload: request
  };
}

export function fetchStorageSuccess(storageInfo) {
  return {
    type: FETCH_STORAGE_SUCCESS,
    payload: storageInfo
  };
}

export function fetchStorageFailure(error) {
  return {
    type: FETCH_STORAGE_FAILURE,
    payload: error
  };
}

export function resetToken() {//used for logout
  return {
    type: RESET_TOKEN
  };
}


export function findUsers(token, findtxt){
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/users/find/${findtxt}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return {
    type: FIND_USERS,
    payload: request
  };
}

export function findUsersSuccess(users) {
  return {
    type: FIND_USERS_SUCCESS,
    payload: users
  };
}

export function findUsersFailure(error) {
  return {
    type: FIND_USERS_FAILURE,
    payload: error
  };
}


export function saveLibFolder(folderName,tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: {folderName:folderName},
    url: `${ROOT_URL}/users/library/folder`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: SAVE_FOLDER,
    payload: request
  };
}

export function deleteFolder(tokenFromStorage,folderId, isMoveMediaToCommon) {
  const request = axios({
    method: 'delete',
    data: {isMoveMediaToCommon:isMoveMediaToCommon},
    url: `${ROOT_URL}/users/library/folder/${folderId}?isMoveMediaToCommon=${isMoveMediaToCommon}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: FETCH_FOLDER,
    payload: request
  };
}


export function fetchSettings(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/user/settings`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: FETCH_SETTINGS,
    payload: request
  };
}

export function fetchSettingsSuccess(list) {
  return {
    type: FETCH_SETTINGS_SUCCESS,
    payload: list.message
  };
}

export function fetchSettingsFailure(error) {
  return {
    type: FETCH_SETTINGS_FAILURE,
    payload: error
  };
}

export function resendOTP(mob, email) {
  const request = axios({
    method: 'post',
    data: {'mob': mob, 'email':email},
    url: `${ROOT_URL}/user/resend-otp`,
    headers: {
     
    }
  });
  return {
    type: RESEND_OTP,
    payload: request
  };
}

export function validateOpt(mob, otp, email) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/user/validate-otp?mob=${mob}&otp=${otp}&email=${email}`,
    headers: {
     
    }
  });
  return {
    type: VALIDATE_OTP,
    payload: request
  };
}

export function validateOptSuccess(data) {
  return {
    type: VALIDATE_OTP_SUCCESS,
    payload: data
  };
}

export function validateOptFailure(error) {
  return {
    type: VALIDATE_OTP_FAILURE,
    payload: error
  };
}

export function fetchFolders(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/users/library/folders`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: FETCH_FOLDER,
    payload: request
  };
}

export function fetchFoldersSuccess(list) {
  return {
    type: FETCH_FOLDERS_SUCCESS,
    payload: list.folders
  };
}

export function fetchFoldersFailure(error) {
  return {
    type: FETCH_FOLDER_FAILURE,
    payload: error
  };
}

export function signUpUser(token,formValues) {
  
  var request =null;
  if(token && token.length>10){
     request = axios({
      method: 'post',
      data: formValues,
      url: `${ROOT_URL}/users/signup`,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  }
  else{
    request = axios.post(`${ROOT_URL}/users/signup`,formValues)
  }

  return {
    type: SIGNUP_USER,
    payload: request
  };
}

export function signUpUserSuccess(user) {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: user
  };
}

export function signUpUserFailure(error) {
  return {
    type: SIGNUP_USER_FAILURE,
    payload: error
  };
}


export function resetUser() {
  return {
    type: RESET_USER,
  };
}

export function signInUser(formValues) {
  const request = axios.post(`${ROOT_URL}/users/signin`, formValues);

  return {
    type: SIGNIN_USER,
    payload: request
  };
}

export function signInUserSuccess(user) {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: user
  };
}

export function signInUserFailure(error) {
  return {
    type: SIGNIN_USER_FAILURE,
    payload: error
  };
}

export function updateSettings(tokenFromStorage, updateData) {
    console.log('setting updaet', updateData);
   const request = axios({
    method: 'put',
    data: updateData,
    url: `${ROOT_URL}/user/settings`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: UPDATE_SETTINGS,
    payload: request
  };
}

export function updateSettingsSuccess(user) {
  return {
    type: UPDATE_SETTINGS_SUCCESS,
    payload: user
  };
}

export function updateSettingsFailure(error) {
  return {
    type: UPDATE_SETTINGS_FAILURE,
    payload: error
  };
}

export function editingUser(formValues,tokenFromStorage) {
  //const request = axios.put(`${ROOT_URL}/users/user`, formValues);
  const request = axios({
    method: 'put',
    data: formValues,
    url: `${ROOT_URL}/users/user`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: EDITING_USER,
    payload: request
  };
}

export function editingUserSuccess(user) {
  return {
    type: EDITING_USER_SUCCESS,
    payload: user
  };
}

export function editingUserFailure(error) {
  return {
    type: EDITING_USER_FAILURE,
    payload: error
  };
}

export function deleteUser(tokenFromStorage,userId) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/user/${userId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: DELETE_USER,
    payload: request
  };
}


export function statusChangeUser(tokenFromStorage,userId, status) {
  const request = axios({
    method: 'put',
    url: `${ROOT_URL}/user/${userId}/status/${status}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: EDITING_USER,
    payload: request
  };
}




export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}
export function updateUserEmail(email) {
  return {
    type: UPDATE_USER_EMAIL,
    payload:email
  };
}
export function fetchUsers(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/users`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_USERS,
    payload: request
  };
}

export function fetchUsersSuccess(users) {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users
  };
}

export function fetchUsersFailure(error) {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  };
}

export function fetchUserMedia(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/user/media`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: USER_MEDIA,
    payload: request
  };
}

export function fetchUserMediaSuccess(users) {
  console.log('--[app container] Fetching all user media--',users);
  return {
    type: USER_MEDIA_SUCCESS,
    payload: users
  };
}

export function fetchUserMediaFailure(error) {
  return {
    type: USER_MEDIA_FAILURE,
    payload: error
  };
}

export function uploadMedia(formData,tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: formData,
    url: `${ROOT_URL}/user/media`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPLOAD_MEDIA,
    payload: request
  };
}

export function uploadMediaSuccess(uploadDetail) {
  return {
    type: UPLOAD_MEDIA_SUCCESS,
    payload: uploadDetail
  };
}

export function uploadMediaFailure(error) {
  return {
    type: UPLOAD_MEDIA_FAILURE,
    payload: error
  };
}

export function updateMedia(tokenFromStorage,updateData) {
  const request = axios({
    method: 'put',
    data: updateData,
    url: `${ROOT_URL}/user/media`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPDATE_MEDIA,
    payload: request
  };
}

export function resetUploadMedia() {
  return {
    type: RESET_UPLOAD_MEDIA
  };

}
export function deleteMedia(deleteFiles,tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/user/media/${deleteFiles}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: DELETE_MEDIA,
    payload: request
  };
}

export function processVideo(tokenFromStorage, mediaId) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/media/process/${mediaId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: PROCESS_MEDIA,
    payload: request
  };
}