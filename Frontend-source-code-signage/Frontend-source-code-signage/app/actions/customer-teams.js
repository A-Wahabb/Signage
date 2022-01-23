import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';

//update  email
export const FETCH_TEAMS = 'FETCH_TEAMS';
export const FETCH_TEAMS_SUCCESS = 'FETCH_TEAMS_SUCCESS';
export const FETCH_TEAMS_FAILURE = 'FETCH_TEAMS_FAILURE';

export const ADD_TEAMS = 'ADD_TEAMS';
export const ADD_TEAMS_FAILURE = 'ADD_TEAMS_FAILURE';

export const DEL_TEAM = 'DEL_TEAM';
export const DEL_TEAM_FAILURE ='DEL_TEAM_FAILURE';

export const UPDATE_TEAMS = 'UPDATE_TEAMS';
export const UPDATE_TEAMS_SUCCESS = 'UPDATE_TEAMS_SUCCESS';
export const UPDATE_TEAMS_FAILURE = 'UPDATE_TEAMS_FAILURE';

export const FETCH_MATCHES = 'FETCH_MATCHES';
export const FETCH_MATCHES_SUCCESS = 'FETCH_MATCHES_SUCCESS';
export const FETCH_MATCHES_FAILURE = 'FETCH_MATCHES_FAILURE';

export const ADD_MATCHES = 'ADD_MATCHES';
export const ADD_MATCHES_FAILURE = 'ADD_MATCHES_FAILURE';

export const DEL_MATCH = 'DEL_MATCH';
export const DEL_MATCH_FAILURE ='DEL_MATCH_FAILURE';

export const UPDATE_MATCHES = 'UPDATE_MATCHES';
export const UPDATE_MATCHES_SUCCESS = 'UPDATE_MATCHES_SUCCESS';
export const UPDATE_MATCHES_FAILURE = 'UPDATE_MATCHES_FAILURE';


export const UPLOAD_IMG ="UPLOAD_IMG";

const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';

export function fetchTeams(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/teams`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_TEAMS,
    payload: request
  };
}

export function fetchTeamsSuccess(data) {
  console.log('TEAMS',data);
  return {
    type: FETCH_TEAMS_SUCCESS,
    payload: data
  };
}

export function fetchTeamsFailure(error) {
  return {
    type: FETCH_TEAMS_FAILURE,
    payload: error
  };
}


export function delTeam(tokenFromStorage,teamId) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/teams/${teamId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: DEL_TEAM,
    payload: request
  };
}


export function delTeamFailure(error) {
  return {
    type: DEL_TEAM_FAILURE,
    payload: error
  };
}


export function delMatch(tokenFromStorage,matchId) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/matches/${matchId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: DEL_MATCH,
    payload: request
  };
}


export function delMatchFailure(error) {
  return {
    type: DEL_MATCH_FAILURE,
    payload: error
  };
}

export function addTeams(tokenFromStorage,pgData) {
  const request = axios({
    method: 'post',
    data:pgData,
    url: `${ROOT_URL}/teams`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: ADD_TEAMS,
    payload: request
  };
}

export function addTeamsFailure(error) {
  return {
    type: ADD_TEAMS_FAILURE,
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
    url: `${ROOT_URL}/teams/upload${subfodler}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }

  });

  return {
    type: UPLOAD_IMG,
    payload: request
  };
}

export function updateTeams(tokenFromStorage,dealUpdateData) {
  const request = axios({
    method: 'put',
    data:dealUpdateData,
    url: `${ROOT_URL}/teams`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPDATE_TEAMS,
    payload: request
  };
}

export function updateTeamsSuccess(data) {
  console.log('TEAMS',data);
  return {
    type: UPDATE_TEAMS_SUCCESS,
    payload: data
  };
}

export function updateTEAMSFailure(error) {
  return {
    type: UPDATE_TEAMS_FAILURE,
    payload: error
  };
}


export function fetchMatches(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/matches`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_MATCHES,
    payload: request
  };
}

export function fetchMatchesSuccess(data) {
  console.log('MATCHES',data);
  return {
    type: FETCH_MATCHES_SUCCESS,
    payload: data
  };
}

export function fetchMatchesFailure(error) {
  return {
    type: FETCH_MATCHES_FAILURE,
    payload: error
  };
}

export function addMatchTeams(tokenFromStorage,matchData) {
  const request = axios({
    method: 'post',
    data:matchData,
    url: `${ROOT_URL}/matches`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: ADD_MATCHES,
    payload: request
  };
}

export function addMatchTeamsFailure(error) {
  return {
    type: ADD_MATCHES_FAILURE,
    payload: error
  };
}

export function updateMatch(tokenFromStorage,matchObj) {
  const request = axios({
    method: 'put',
    data:matchObj,
    url: `${ROOT_URL}/matches`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPDATE_MATCHES,
    payload: request
  };
}

export function updateMatchesSuccess(data) {
  console.log('matches',data);
  return {
    type: UPDATE_MATCHES_SUCCESS,
    payload: data
  };
}