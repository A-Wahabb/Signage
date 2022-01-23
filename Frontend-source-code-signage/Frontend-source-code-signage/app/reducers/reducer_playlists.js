import {
	FETCH_PLAYLISTS, FETCH_PLAYLISTS_SUCCESS, FETCH_PLAYLISTS_FAILURE,RESET_NEW_PLAYLIST,
	FETCH_PLAYLIST, FETCH_PLAYLIST_SUCCESS,  FETCH_PLAYLIST_FAILURE,
  CREATE_PLAYLIST,CREATE_PLAYLIST_SUCCESS, CREATE_PLAYLIST_FAILURE
} from '../actions/playlists';


	const INITIAL_STATE = {
							allPlaylist: {lists: [], error:null, loading: false},
              playList: {items: [], error:null, loading: false},
							newPlaylist: {details: null, error:null, loading: false},
							deletedPlaylist: {status: null, error:null, loading: false},
						};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
		case FETCH_PLAYLISTS:// start fetching posts and set loading = true
			return { ...state, allPlaylist: {...state.allPlaylist, error: null, loading: true} };
		case FETCH_PLAYLISTS_SUCCESS:// return list of posts and make loading = false
			return { ...state, allPlaylist: {lists: action.payload, error:null, loading: false} };
		case FETCH_PLAYLISTS_FAILURE:// return error and make loading = false
			error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
			return { ...state, allPlaylist: {...state.lists, error: error, loading: false} };

  case FETCH_PLAYLIST:
    return { ...state, playList:{...state.playList, loading: true}};
  case FETCH_PLAYLIST_SUCCESS:
    return { ...state, playList: {items: action.payload, error:null, loading: false}};
  case FETCH_PLAYLIST_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, playList: {items: [], error:error, loading:false}};

  case CREATE_PLAYLIST:
  	return {...state, newPlaylist:{...state.newPlaylist, loading: true}}
  case CREATE_PLAYLIST_SUCCESS:
  	return {...state, newPlaylist: {details: action.payload, error:null, loading: false}}
  case CREATE_PLAYLIST_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, newPlaylist: {...state.details, error:null, loading: false}}
  case RESET_NEW_PLAYLIST:
  	return {...state,  newPlaylist: {details: null, error:error, loading:false}}

  default:
    return state;
  }
}
