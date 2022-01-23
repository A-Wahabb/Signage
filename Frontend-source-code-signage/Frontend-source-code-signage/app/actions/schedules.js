import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';
//Schedule list
export const FETCH_SCHEDULES = 'FETCH_SCHEDULES';
export const FETCH_SCHEDULES_SUCCESS = 'FETCH_SCHEDULES_SUCCESS';
export const FETCH_SCHEDULES_FAILURE = 'FETCH_SCHEDULES_FAILURE';


//Create schedule
export const CREATE_SCHEDULE = 'CREATE_SCHEDULE';
export const CREATE_SCHEDULE_SUCCESS = 'CREATE_SCHEDULE_SUCCESS';
export const CREATE_SCHEDULE_FAILURE = 'CREATE_SCHEDULE_FAILURE';
export const RESET_NEW_SCHEDULE = 'RESET_NEW_SCHEDULE';

//Create schedule
export const UPDATE_SCHEDULE = 'UPDATE_SCHEDULE';
export const UPDATE_SCHEDULE_SUCCESS = 'UPDATE_SCHEDULE_SUCCESS';
export const UPDATE_SCHEDULE_FAILURE = 'UPDATE_SCHEDULE_FAILURE';

//Fetch Schedule
export const FETCH_SCHEDULE_CONTENT = 'FETCH_SCHEDULE_CONTENT';
export const FETCH_SCHEDULE_CONTENT_SUCCESS = 'FETCH_SCHEDULE_CONTENT_SUCCESS';
export const FETCH_SCHEDULE_CONTENT_FAILURE = 'FETCH_SCHEDULE_CONTENT_FAILURE';

//Delete Schedule
export const DELETE_SCHEDULE = 'DELETE_SCHEDULE';
export const DELETE_SCHEDULE_SUCCESS = 'DELETE_SCHEDULE_SUCCESS';
export const DELETE_SCHEDULE_FAILURE = 'DELETE_SCHEDULE_FAILURE';

//Create new schedule conent
export const CREATE_SCHEDULE_CONTENT = 'CREATE_SCHEDULE_CONTENT';
export const CREATE_SCHEDULE_CONTENT_SUCCESS = 'CREATE_SCHEDULE_CONTENT_SUCCESS';
export const CREATE_SCHEDULE_CONTENT_FAILURE = 'CREATE_SCHEDULE_CONTENT_FAILURE';

//Create new schedule conent
export const UPDATE_SCHEDULE_CONTENT = 'UPDATE_SCHEDULE_CONTENT';
export const UPDATE_SCHEDULE_CONTENT_SUCCESS = 'UPDATE_SCHEDULE_CONTENT_SUCCESS';
export const UPDATE_SCHEDULE_CONTENT_FAILURE = 'UPDATE_SCHEDULE_CONTENT_FAILURE';
export const RESET_NEW_SCHEDULE_CONTENT = 'RESET_NEW_SCHEDULE_CONTENT';


export const DELETE_SCHEDULES = 'DELETE_SCHEDULES';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';

export function fetchSchedules(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/schedules`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_SCHEDULES,
    payload: request
  };
}

export function fetchSchedulesSuccess(results) {
  return {
    type: FETCH_SCHEDULES_SUCCESS,
    payload: results
  };
}

export function fetchSchedulesFailure(error) {
  return {
    type: FETCH_SCHEDULES_FAILURE,
    payload: error
  };
}


export function resetScheduleFields() {
  return {
    type: RESET_NEW_SCHEDULE
  }
};

export function updateSchedule(tokenFromStorage, schedule) {
  const request = axios({
    method: 'put',
    data: playListBody,
    url: `${ROOT_URL}/schedule`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_PLAYLIST,
    payload: request
  };
}

export function createSchedule(tokenFromStorage, schedulebody) {
  console.log('Saving new schedule');
  const request = axios({
    method: 'post',
    data: schedulebody,
    url: `${ROOT_URL}/schedules`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_SCHEDULE,
    payload: request
  };
}

export function createScheduleSuccess(newSchedule) {
  return {
    type: CREATE_SCHEDULE_SUCCESS,
    payload: newSchedule
  };
}

export function createScheduleFailure(error) {
  return {
    type: CREATE_SCHEDULE_FAILURE,
    payload: error
  };
}

export function resetNewSchedule() {
  return {
    type: RESET_NEW_SCHEDULE
 
  };
}





export function createScheduleContent(tokenFromStorage, scheduleContentObj) {
  console.log('Saving new schedule content');
  const request = axios({
    method: 'post',
    data: scheduleContentObj,
    url: `${ROOT_URL}/schedule-content`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_SCHEDULE_CONTENT,
    payload: request
  };
}

export function createScheduleContentSuccess(scheduleContentObj) {
  return {
    type: CREATE_SCHEDULE_CONTENT_SUCCESS,
    payload: scheduleContentObj
  };
}

export function createScheduleContentFailure(error) {
  return {
    type: CREATE_SCHEDULE_CONTENT_FAILURE,
    payload: error
  };
}

export function updateScheduleContent(tokenFromStorage, scheduleContentObj) {
  console.log('Update new schedule content');
  const request = axios({
    method: 'put',
    data: scheduleContentObj,
    url: `${ROOT_URL}/schedule-content`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPDATE_SCHEDULE_CONTENT,
    payload: request
  };
}

export function updateScheduleContentSuccess(scheduleContentObj) {
  return {
    type: UPDATE_SCHEDULE_CONTENT_SUCCESS,
    payload: scheduleContentObj
  };
}

export function updateScheduleContentFailure(error) {
  return {
    type: UPDATE_SCHEDULE_CONTENT_FAILURE,
    payload: error
  };
}


export function fetchScheduleContent(tokenFromStorage,scheduleId) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/schedule/${scheduleId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_SCHEDULE_CONTENT,
    payload: request
  };
}

export function fetchScheduleContentSuccess(results) {
  return {
    type: FETCH_SCHEDULE_CONTENT_SUCCESS,
    payload: results
  };
}

export function fetchScheduleContentFailure(error) {
  return {
    type: FETCH_SCHEDULE_CONTENT_FAILURE,
    payload: error
  };
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

export function deleteSchedules(tokenFromStorage,itemsIdsStr) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/schedules/${itemsIdsStr}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: DELETE_SCHEDULES,
    payload: request
  };
}




export function deletePlaylist( tokenFromStorage,playlistId) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/playlist/${playlistId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: DELETE_PLAYLIST,
    payload: request
  };
}

export function deletePlaylistSuccess(deletedApp) {
  return {
    type: DELETE_PLAYLIST_SUCCESS,
    payload: deletedApp
  };
}

export function deletePlaylistFailure(response) {
  return {
    type: DELETE_PLAYLIST_FAILURE,
    payload: response
  };
}
