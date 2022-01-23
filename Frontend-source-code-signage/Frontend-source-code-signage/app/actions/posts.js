import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';

//PLAYERS list
export const FETCH_PLAYERS = 'FETCH_PLAYERS';
export const FETCH_PLAYERS_SUCCESS = 'FETCH_PLAYERS_SUCCESS';
export const FETCH_PLAYERS_FAILURE = 'FETCH_PLAYERS_FAILURE';
//PLAYER ONLINE STATUS
export const FETCH_PLAYERS_ONLINE_STATUS = 'FETCH_PLAYERS_ONLINE_STATUS';

//Create new player
export const CREATE_PLAYER = 'CREATE_PLAYER';
export const CREATE_PLAYER_SUCCESS = 'CREATE_PLAYER_SUCCESS';
export const CREATE_PLAYER_FAILURE = 'CREATE_PLAYER_FAILURE';
export const RESET_NEW_PLAYER = 'RESET_NEW_PLAYER';

//Validate post fields like Title, Categries on the server
export const VALIDATE_POST_FIELDS = 'VALIDATE_POST_FIELDS';
export const VALIDATE_POST_FIELDS_SUCCESS = 'VALIDATE_POST_FIELDS_SUCCESS';
export const VALIDATE_POST_FIELDS_FAILURE = 'VALIDATE_POST_FIELDS_FAILURE';
export const RESET_POST_FIELDS = 'RESET_POST_FIELDS';

//Fetch player
export const FETCH_PLAYER = 'FETCH_PLAYER';
export const FETCH_PLAYER_SUCCESS = 'FETCH_PLAYER_SUCCESS';
export const FETCH_PLAYER_FAILURE = 'FETCH_PLAYER_FAILURE';
export const RESET_ACTIVE_PLAYER = 'RESET_ACTIVE_PLAYER';

//Delete post
export const DELETE_PLAYER = 'DELETE_PLAYER';
export const DELETE_PLAYER_SUCCESS = 'DELETE_PLAYER_SUCCESS';
export const DELETE_PLAYER_FAILURE = 'DELETE_PLAYER_FAILURE';
export const RESET_DELETED_PLAYER = 'RESET_DELETED_PLAYER';

//PLAYERS list
export const FETCH_LOGS = 'FETCH_LOGS';
export const FETCH_LOGS_SUCCESS = 'FETCH_LOGS_SUCCESS';
export const FETCH_LOGS_FAILURE = 'FETCH_LOGS_FAILURE';

//PLAYER ITEMS DOWNLOAD AND COUNT
export const FETCH_PLAYER_ITEMS_STATUS = 'FETCH_PLAYER_ITEMS_STATUS';
export const FETCH_PLAYER_ITEMS_STATUS_SUCCESS = 'FETCH_PLAYER_ITEMS_STATUS_SUCCESS';
export const FETCH_PLAYER_ITEMS_STATUS_FAILURE = 'FETCH_PLAYER_ITEMS_STATUS_FAILURE';


//PLAYERS status logs
export const FETCH_STATUS_LOGS = 'FETCH_STATUS_LOGS';
export const FETCH_STATUS_LOGS_SUCCESS = 'FETCH_STATUS_LOGS_SUCCESS';
export const FETCH_STATUS_LOGS_FAILURE = 'FETCH_STATUS_LOGS_FAILURE';

export const SCREEN_RESET = 'SCREEN_RESET';
export const SCREEN_REBOOT = 'SCREEN_REBOOT';
export const TAKE_SCREENSHOT= 'TAKE_SCREENSHOT';
export const TAKE_SCREENLOGS= 'TAKE_SCREENLOGS';
export const PLAYER_UPGRADE= 'PLAYER_UPGRADE';
export const PLAYER_UNINSTALL = 'PLAYER_UNINSTALL';
export const PLAYER_LAUNCH = 'PLAYER_LAUNCH';
export const PLAYER_HEARTBEAT = 'PLAYER_HEARTBEAT';

export const FETCH_GEO = 'FETCH_GEO';
export const FETCH_GEO_SUCCESS = 'FETCH_GEO_SUCCESS';
export const FETCH_GEO_FAILURE = 'FETCH_GEO_FAILURE';

export const FETCH_GROUPS = 'FETCH_GROUPS';
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';
export const FETCH_GROUPS_FAILURE = 'FETCH_GROUPS_FAILURE';

export const SAVE_GROUP = 'SAVE_GROUP';
export const SAVE_GROUP_SUCCESS = 'SAVE_GROUP_SUCCESS';
export const SAVE_GROUP_FAILURE = 'SAVE_GROUP_FAILURE';

export const UPDATE_PLAYER_EXTRA = 'UPDATE_PLAYER_EXTRA';
export const TRIGGER_BULK_ACTION = 'TRIGGER_BULK_ACTION';

export const UPDATE_APP_THUMB_WITH_SNAP = 'UPDATE_APP_THUMB_WITH_SNAP';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';

export function fetchPlayers(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/players`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_PLAYERS,
    payload: request
  };
}

export function fetchPlayersSuccess(players) {
  return {
    type: FETCH_PLAYERS_SUCCESS,
    payload: players
  };
}

export function fetchPlayersFailure(error) {
  return {
    type: FETCH_PLAYERS_FAILURE,
    payload: error
  };
}

export function fetchPlayersOnlineStatus(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/players/online-status`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_PLAYERS,
    payload: request
  };
}

export function fetchLogs(screenNum, tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/player/logs/${screenNum}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_LOGS,
    payload: request
  };
}

export function fetchLogsSuccess(logs) {
  return {
    type: FETCH_LOGS_SUCCESS,
    payload: logs
  };
}

export function fetchLogsFailure(error) {
  return {
    type: FETCH_LOGS_FAILURE,
    payload: error
  };
}

export function fetchPlayerItemsStatus(tokenFromStorage,body) {
  const request = axios({
    method: 'post',
    data: body,
    url: `${ROOT_URL}/get-screen-playlistitem`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_LOGS,
    payload: request
  };
}

export function fetchPlayerItemsStatusSuccess(status) {
  return {
    type: FETCH_PLAYER_ITEMS_STATUS_SUCCESS,
    payload: status
  };
}

export function fetchPlayerItemsStatusFailure(error) {
  return {
    type: FETCH_PLAYER_ITEMS_STATUS_FAILURE,
    payload: error
  };
}

export function triggerBulkAction(tokenFromStorage, action_name) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/bulkjob?action=${action_name}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: TRIGGER_BULK_ACTION,
    payload: request
  };
}

export function fetchStatusLogs(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/players-statuslogs`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_STATUS_LOGS,
    payload: request
  };
}

export function fetchStatusLogsSuccess(logs) {
  return {
    type: FETCH_STATUS_LOGS_SUCCESS,
    payload: logs
  };
}

export function fetchStatusLogsFailure(error) {
  return {
    type: FETCH_STATUS_LOGS_FAILURE,
    payload: error
  };
}

export function fetchLatLon(token,ip) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/player/latlon/${ip}`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return {
    type: FETCH_GEO,
    payload: request
  };
}

export function fetchGeoSuccess(logs) {
  return {
    type: FETCH_GEO_SUCCESS,
    payload: logs
  };
}

export function fetchGeoFailure(error) {
  return {
    type: FETCH_GEO_FAILURE,
    payload: error
  };
}

export function fetchGroups(token) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/groups`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return {
    type: FETCH_GROUPS,
    payload: request
  };
}

export function fetchGroupsSuccess(logs) {
  return {
    type: FETCH_GROUPS_SUCCESS,
    payload: logs
  };
}

export function fetchGroupsFailure(error) {
  return {
    type: FETCH_GROUPS_FAILURE,
    payload: error
  };
}


export function saveGroup(token, groupBody) {
  const request = axios({
    method: 'post',
    data: groupBody,
    url: `${ROOT_URL}/groups`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return {
    type: SAVE_GROUP,
    payload: request
  };
}

export function saveGroupSuccess(data) {
  return {
    type: SAVE_GROUP_SUCCESS,
    payload: data
  };
}

export function saveGroupFailure(error) {
  return {
    type: SAVE_GROUP_FAILURE,
    payload: error
  };
}

export function validatePostFields(props) {
  //note: we cant have /posts/validateFields because it'll match /posts/:id path!
  const request = axios.post(`${ROOT_URL}/posts/validate/fields`, props);

  return {
    type: VALIDATE_POST_FIELDS,
    payload: request
  };
}

export function validatePostFieldsSuccess() {
  return {
    type: VALIDATE_POST_FIELDS_SUCCESS
  };
}

export function validatePostFieldsFailure(error) {
  return {
    type: VALIDATE_POST_FIELDS_FAILURE,
    payload: error
  };
}

export function resetPostFields() {
  return {
    type: RESET_POST_FIELDS
  }
}
;


export function createPlayer(props, tokenFromStorage) {
  console.log('[players action]',props);
  const request = axios({
    method: 'post',
    data: props,
    url: `${ROOT_URL}/players`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_PLAYER,
    payload: request
  };
}

export function createPlayerSuccess(newPost) {
  return {
    type: CREATE_PLAYER_SUCCESS,
    payload: newPost
  };
}

export function createPlayerFailure(error) {
  return {
    type: CREATE_PLAYER_FAILURE,
    payload: error
  };
}

export function resetNewPlayer() {
  return {
    type: RESET_NEW_PLAYER
  }
}
;


export function takeNewScreenShot(playerId, tokenFromStorage) {
  console.log('[players screenshot]',playerId);
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/player/screen-shot/${playerId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: TAKE_SCREENSHOT
  };
}

export function requestScreenRefresh(playerId, tokenFromStorage) {
  console.log('[players screen refresh]',playerId);
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/player/screen-refresh/${playerId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: SCREEN_RESET
  };
}

export function requestScreenReboot(playerId, tokenFromStorage) {
  console.log('[players screen reboot]',playerId);
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/player/screen-reboot/${playerId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: SCREEN_REBOOT
  };
}

export function requestPlayerLaunch(playerId, tokenFromStorage) {
  console.log('[player launch]',playerId);
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/player/screen-relaunch/${playerId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: PLAYER_LAUNCH
  };
}

export function requestPlayerUninstall(playerId, tokenFromStorage) {
  console.log('[player uninstall]',playerId);
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/player/uninstall/${playerId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: PLAYER_UNINSTALL
  };
}

export function requestPlayerHeartbeat(playerId, tokenFromStorage) {
  console.log('[player heartbeat request]',playerId);
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/player/heartbeat/${playerId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: PLAYER_HEARTBEAT
  };
}


export function upgradePlayer(playerId, tokenFromStorage) {
  console.log('[players upgrade request]',playerId);
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/player/install-new-apk/${playerId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: PLAYER_UPGRADE
  };
}

export function requestToScreenLogs(playerId, tokenFromStorage) {
  console.log('[players logs request]',playerId);
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/player/screen-logs/${playerId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: TAKE_SCREENLOGS
  };
}

export function updatePlayers(tokenFromStorage,players) {
  console.log('UPDATE payeyers',players);
  const request = axios({
    method: 'put',
    data: players,
    url: `${ROOT_URL}/players-arr`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_PLAYER,
    payload: request
  };
}


export function updatePlayer(props, tokenFromStorage) {
  console.log('UPDATE payeyer');
  console.log('[players action]',props);
  const request = axios({
    method: 'put',
    data: props,
    url: `${ROOT_URL}/players`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_PLAYER,
    payload: request
  };
}

export function resetDeletedPost() {
  return {
    type: RESET_DELETED_POST
  }
}
;

export function fetchPlayer(id,tokenFromStorage) {

  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/players/${id}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: FETCH_PLAYER,
    payload: request
  };
}


export function fetchPlayerSuccess(activePlayer) {
  return {
    type: FETCH_PLAYER_SUCCESS,
    payload: activePlayer
  };
}

export function fetchPlayerFailure(error) {
  return {
    type: FETCH_PLAYER_FAILURE,
    payload: error
  };
}

export function resetActivePlayer() {
  return {
    type: RESET_ACTIVE_PLAYER
  }
}


export function deletePlayer(id, tokenFromStorage) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/player/${id}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: DELETE_PLAYER,
    payload: request
  };
}

export function deletePlayerSuccess(deletedPlayer) {
  return {
    type: DELETE_PLAYER_SUCCESS,
    payload: deletedPlayer
  };
}

export function deletePlayerFailure(response) {
  return {
    type: DELETE_PLAYER_FAILURE,
    payload: response
  };
}

export function updatePlayerExtra(tokenFromStorage,extraBody,playerId) {
  const request = axios({
    method: 'put',
    data: extraBody,
    url: `${ROOT_URL}/player-extra/${playerId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPDATE_PLAYER_EXTRA,
    payload: request
  };
}

export function updateAppThumbWithSnap(token, player){
  const request = axios({
    method: 'put',
    data: player,
    url: `${ROOT_URL}/player-extra/app-thumb-snap`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return {
    type: UPDATE_APP_THUMB_WITH_SNAP,
    payload: request
  };
}

export function replaceMedia(token, mediaPaths){
  const request = axios({
    method: 'put',
    data: mediaPaths,
    url: `${ROOT_URL}/player-extra/media-replace`,
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return {
    type: UPDATE_APP_THUMB_WITH_SNAP,
    payload: request
  };
}
