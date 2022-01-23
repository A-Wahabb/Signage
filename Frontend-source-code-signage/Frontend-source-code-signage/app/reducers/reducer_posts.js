import {
	FETCH_PLAYERS, FETCH_PLAYERS_SUCCESS, FETCH_PLAYERS_FAILURE, RESET_PLAYERS,
	FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE, RESET_POSTS,
	FETCH_PLAYER, FETCH_PLAYER_SUCCESS,  FETCH_PLAYER_FAILURE, RESET_ACTIVE_PLAYER,
	CREATE_PLAYER, CREATE_PLAYER_SUCCESS, CREATE_PLAYER_FAILURE, RESET_NEW_PLAYER,
	DELETE_POST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE, RESET_DELETED_POST,
  VALIDATE_POST_FIELDS,VALIDATE_POST_FIELDS_SUCCESS, VALIDATE_POST_FIELDS_FAILURE, RESET_POST_FIELDS, FETCH_LOGS, FETCH_LOGS_SUCCESS, FETCH_LOGS_FAILURE,
  FETCH_STATUS_LOGS, FETCH_STATUS_LOGS_SUCCESS, FETCH_STATUS_LOGS_FAILURE,
  FETCH_PLAYER_ITEMS_STATUS, FETCH_PLAYER_ITEMS_STATUS_SUCCESS, FETCH_PLAYER_ITEMS_STATUS_FAILURE,
  FETCH_GEO, FETCH_GEO_SUCCESS,FETCH_GEO_FAILURE,
  FETCH_GROUPS, FETCH_GROUPS_SUCCESS,FETCH_GROUPS_FAILURE,
  SAVE_GROUP, SAVE_GROUP_SUCCESS,SAVE_GROUP_FAILURE
} from '../actions/posts';


	const INITIAL_STATE = {
							playersList: {players: [], error:null, loading: false},
							newPlayer: {player: null, error:null, loading: false},
							activePlayer:{player:null, error:null, loading: false},
              deletedPost: {post: null, error:null, loading: false},
              playerLog:{logs:"",error:null, loading:false},
              playerGeo:{loc: null, error:null, loading:false},
              onlineStatus:{logs:[],error:null,loading:false},
              playerItemsStatus:{items:[],error:null, loading:false},
              playerGroups:{groups: [], error:null, loading: false}
						};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
		case FETCH_PLAYERS:// start fetching posts and set loading = true
			return { ...state, playersList: {players:[], error: null, loading: true} };
		case FETCH_PLAYERS_SUCCESS:// return list of posts and make loading = false
			return { ...state, playersList: {players: action.payload, error:null, loading: false} };
		case FETCH_PLAYERS_FAILURE:// return error and make loading = false
			error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
			return { ...state, playersList: {players: [], error: error, loading: false} };
		case RESET_PLAYERS:// reset postList to initial state
				return { ...state, playersList: {players: [], error:null, loading: false} };


  case FETCH_PLAYER:
    return { ...state, activePlayer:{...state.activePlayer, loading: true}};
  case FETCH_PLAYER_SUCCESS:
    return { ...state, activePlayer: {player: action.payload, error:null, loading: false}};
  case FETCH_PLAYER_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, activePlayer: {player: null, error:error, loading:false}};
  case RESET_ACTIVE_PLAYER:
    return { ...state, activePlayer: {player: null, error:null, loading: false}};

  case CREATE_PLAYER:
  	return {...state, newPlayer: {...state.newPlayer, loading: true}}
  case CREATE_PLAYER_SUCCESS:
  	return {...state, newPlayer: {player:action.payload, error:null, loading: false}}
  case CREATE_PLAYER_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, newPlayer: {player:null, error:error, loading: false}}
  case RESET_NEW_PLAYER:
  	return {...state,  newPlayer:{player:null, error:null, loading: false}}

    case FETCH_LOGS:
    return { ...state, playerLog:{...state.playerLog, loading: true}};
    case FETCH_LOGS_SUCCESS:
    return { ...state, playerLog: {logs: action.payload, error:null, loading: false}};
    case FETCH_LOGS_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, playerLog: {logs: null, error:error, loading:false}};

    case FETCH_GEO:
    return { ...state, playerGeo:{...state.playerGeo, loading: true}};
    case FETCH_GEO_SUCCESS:
    return { ...state, playerGeo: {loc: action.payload, error:null, loading: false}};
    case FETCH_GEO_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, playerGeo: {loc: null, error:error, loading:false}};

    case FETCH_GROUPS:
    return { ...state, playerGroups:{...state.groups, loading: true}};
    case FETCH_GROUPS_SUCCESS:
    return { ...state, playerGroups: {groups: action.payload, error:null, loading: false}};
    case FETCH_GROUPS_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, playerGroups: {...state.groups, error:error, loading:false}};

    case SAVE_GROUP:
    return { ...state, playerGroups:{...state.groups, loading: true}};
    case SAVE_GROUP_SUCCESS:
    return { ...state, playerGroups: {groups: action.payload, error:null, loading: false}};
    case SAVE_GROUP_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, playerGroups: {...state.groups, error:error, loading:false}};

    case FETCH_STATUS_LOGS:
    return { ...state, onlineStatus:{...state.onlineStatus, loading: true}};
  case FETCH_STATUS_LOGS_SUCCESS:
    return { ...state, onlineStatus: {logs: action.payload, error:null, loading: false}};
  case FETCH_STATUS_LOGS_FAILURE:
    error = action.payload || {message: action.payload};//2nd one is network or server down errors
    return { ...state, onlineStatus: {...state.onlineStatus, error:error, loading:false}};

    case FETCH_PLAYER_ITEMS_STATUS:
    return { ...state, playerItemsStatus:{...state.playerItemsStatus, loading: true}};
  case FETCH_PLAYER_ITEMS_STATUS_SUCCESS:
    return { ...state, playerItemsStatus: {items: action.payload, error:null, loading: false}};
  case FETCH_PLAYER_ITEMS_STATUS_FAILURE:
    error = action.payload || {message: action.payload};//2nd one is network or server down errors
    return { ...state, playerItemsStatus: {...state.playerItemsStatus, error:error, loading:false}};


  case DELETE_POST:
   	return {...state, deletedPost: {...state.deletedPost, loading: true}}
  case DELETE_POST_SUCCESS:
  	return {...state, deletedPost: {post:action.payload, error:null, loading: false}}
  case DELETE_POST_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, deletedPost: {post:null, error:error, loading: false}}
  case RESET_DELETED_POST:
  	return {...state,  deletedPost:{post:null, error:null, loading: false}}

  case VALIDATE_POST_FIELDS:
    return {...state, newPost:{...state.newPost, error: null, loading: true}}
  case VALIDATE_POST_FIELDS_SUCCESS:
    return {...state, newPost:{...state.newPost, error: null, loading: false}}
  case VALIDATE_POST_FIELDS_FAILURE:
    let result = action.payload;
    if(!result) {
      error = {message: action.payload.message};
    } else {
      error = {title: result.title, categories: result.categories, description: result.description};
    }
    return {...state, newPost:{...state.newPost, error: error, loading: false}}
  case RESET_POST_FIELDS:
    return {...state, newPost:{...state.newPost, error: null, loading: null}}
  default:
    return state;
  }
}
