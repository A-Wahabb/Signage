import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';


//Validate user fields like name and password
export const VALIDATE_USER_FIELDS = 'VALIDATE_USER_FIELDS';
export const VALIDATE_USER_FIELDS_SUCCESS = 'VALIDATE_USER_FIELDS_SUCCESS';
export const VALIDATE_USER_FIELDS_FAILURE = 'VALIDATE_USER_FIELDS_FAILURE';
export const RESET_VALIDATE_USER_FIELDS = 'RESET_VALIDATE_USER_FIELDS';


//Note when running locally, the node server running on localhost:3000 and the dev-server is running on 8080
//When running on Heroku, we run both on the same port and so just /api is enough.
const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';

export function validateUserFields(values) {
  //note: we cant have /users/validateFields because it'll match /users/:id path!
  const request = axios.post(`${ROOT_URL}/users/validate/fields`, values);

  return {
    type: VALIDATE_USER_FIELDS,
    payload: request
  };
}

export function validateUserFieldsSuccess() {
  return {
    type: VALIDATE_USER_FIELDS_SUCCESS
  };
}

export function validateUserFieldsFailure(error) {
  return {
    type: VALIDATE_USER_FIELDS_FAILURE,
    payload: error
  };
}

export function resetValidateUserFields() {
  return {
    type: RESET_VALIDATE_USER_FIELDS
  }
};
