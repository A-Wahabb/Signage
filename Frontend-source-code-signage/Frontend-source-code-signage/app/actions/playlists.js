import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';
//Playlists list
export const FETCH_PLAYLISTS = 'FETCH_PLAYLISTS';
export const FETCH_PLAYLISTS_SUCCESS = 'FETCH_PLAYLISTS_SUCCESS';
export const FETCH_PLAYLISTS_FAILURE = 'FETCH_PLAYLISTS_FAILURE';


//Create Playlist
export const CREATE_PLAYLIST = 'CREATE_PLAYLIST';
export const CREATE_PLAYLIST_SUCCESS = 'CREATE_PLAYLIST_SUCCESS';
export const CREATE_PLAYLIST_FAILURE = 'CREATE_PLAYLIST_FAILURE';
export const RESET_NEW_PLAYLIST = 'RESET_NEW_PLAYLIST';
export const DUPLICATE_PLAYLIST ='CREATE_APP';


//Fetch playlist
export const FETCH_PLAYLIST = 'FETCH_PLAYLIST';
export const FETCH_PLAYLIST_SUCCESS = 'FETCH_PLAYLIST_SUCCESS';
export const FETCH_PLAYLIST_FAILURE = 'FETCH_PLAYLIST_FAILURE';

//Delete app
export const DELETE_PLAYLIST = 'DELETE_PLAYLIST';
export const DELETE_PLAYLIST_SUCCESS = 'DELETE_PLAYLIST_SUCCESS';
export const DELETE_PLAYLIST_FAILURE = 'DELETE_PLAYLIST_FAILURE';


const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';

export function fetchPlaylists(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/playlists`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_PLAYLISTS,
    payload: request
  };
}

export function fetchPlaylistsSuccess(results) {
  return {
    type: FETCH_PLAYLISTS_SUCCESS,
    payload: results
  };
}

export function fetchPlaylistsFailure(error) {
  return {
    type: FETCH_PLAYLISTS_FAILURE,
    payload: error
  };
}


export function resetPlaylistFields() {
  return {
    type: RESET_NEW_PLAYLIST
  }
};

export function updatePlaylist(playListBody, tokenFromStorage) {
  const request = axios({
    method: 'put',
    data: playListBody,
    url: `${ROOT_URL}/playlist`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_PLAYLIST,
    payload: request
  };
}

export function createPlaylist(playListBody, tokenFromStorage) {
  const request = axios({
    method: 'post',
    data: playListBody,
    url: `${ROOT_URL}/playlist`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_PLAYLIST,
    payload: request
  };
}

export function createPlaylistSuccess(newApp) {
  return {
    type: CREATE_PLAYLIST_SUCCESS,
    payload: newApp
  };
}

export function createPlaylistFailure(error) {
  return {
    type: CREATE_PLAYLIST_FAILURE,
    payload: error
  };
}

export function makeDuplicatePlaylist(playListId,tokenFromStorage){
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/playlist/duplicate/${playListId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: CREATE_PLAYLIST,
    payload: request
  };
}


export function fetchPlaylist(tokenFromStorage,playlistId) {

  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/playlist/${playlistId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_PLAYLIST,
    payload: request
  };
}


export function fetchPlaylistSuccess(playlistDetails) {
  return {
    type: FETCH_PLAYLIST_SUCCESS,
    payload: playlistDetails
  };
}

export function fetchPlaylistFailure(error) {
  return {
    type: FETCH_PLAYLIST_FAILURE,
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

export function deletePlaylistItems(tokenFromStorage,itemsIdsStr) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/playlist-items/${itemsIdsStr}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });
  return {
    type: FETCH_PLAYLISTS,
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
