import {
	FETCH_APPS, FETCH_APPS_SUCCESS, FETCH_APPS_FAILURE, RESET_APPS,
	FETCH_APP, FETCH_APP_SUCCESS,  FETCH_APP_FAILURE, RESET_ACTIVE_APP,
	CREATE_APP, CREATE_APP_SUCCESS, CREATE_APP_FAILURE, RESET_NEW_APP,UPLOAD_APP_MEDIA,
	UPLOAD_APP_MEDIA_SUCCESS, UPLOAD_APP_MEDIA_FAILURE, RESET_UPLOAD_APP_MEDIA,
	DELETE_APP, DELETE_APP_SUCCESS, DELETE_APP_FAILURE, RESET_DELETED_APP,
  VALIDATE_APP,VALIDATE_APP_SUCCESS, VALIDATE_APP_FAILURE, RESET_APP
} from '../actions/apps';


	const INITIAL_STATE = {
							appsList: {apps: [], error:null, loading: false},
							newApp: {app: null, error:null, loading: false},
							uploadApp :{uploadDetail: null, error:null, loading: false},
							activeApp:{app:null, error:null, loading: false},
							deletedApp: {app: null, error:null, loading: false},
						};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
		case FETCH_APPS:// start fetching posts and set loading = true
			return { ...state, appsList: {...state.appsList, error: null, loading: true} };
		case FETCH_APPS_SUCCESS:// return list of posts and make loading = false
			return { ...state, appsList: {apps: action.payload, error:null, loading: false} };
		case FETCH_APPS_FAILURE:// return error and make loading = false
			error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
			return { ...state, appsList: {...state.appsList, error: error, loading: false} };
		case RESET_APPS:// reset postList to initial state
				return { ...state, appsList: {apps: [], error:null, loading: false} };



  case FETCH_APP:
    return { ...state, activeApp:{...state.activeApp, loading: true}};
  case FETCH_APP_SUCCESS:
    return { ...state, activeApp: {app: action.payload, error:null, loading: false}};
  case FETCH_APP_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, activeApp: {app: null, error:error, loading:false}};
  case RESET_ACTIVE_APP:
    return { ...state, activeApp: {app: null, error:null, loading: false}};

  case CREATE_APP:
  	return {...state, activeApp:{...state.activeApp, loading: true}}
  case CREATE_APP_SUCCESS:
  	return {...state, activeApp: {app: action.payload, error:null, loading: false}}
  case CREATE_APP_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, activeApp: {...state.activeApp, error:null, loading: false}}
  case RESET_NEW_APP:
  	return {...state,  activeApp: {app: null, error:error, loading:false}}


 case UPLOAD_APP_MEDIA:
 		return {...state, uploadMedia: {...state.uploadMedia, loading: true}}
case UPLOAD_APP_MEDIA_SUCCESS:
		return { ...state, uploadMedia: {uploadDetail:action.payload, error:null, loading: false}};
case UPLOAD_APP_MEDIA_FAILURE:
			error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
		return { ...state, uploadMedia: {uploadDetail: null, error:error, loading:false}};
		case RESET_UPLOAD_APP_MEDIA:
		return { ...state, uploadMedia: {uploadDetail: null, error:null, loading: false}};

  case DELETE_APP:
   	return {...state, deletedApp: {...state.deletedApp, loading: true}}
  case DELETE_APP_SUCCESS:
  	return {...state, appsList: {apps: action.payload, error:null, loading: false}}
  case DELETE_APP_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, deletedApp: {post:null, error:error, loading: false}}
  case RESET_DELETED_APP:
  	return {...state,  deletedApp:{app:null, error:null, loading: false}}

  case VALIDATE_APP:
    return {...state, newApp:{...state.newApp, error: null, loading: true}}
  case VALIDATE_APP_SUCCESS:
    return {...state, newApp:{...state.newApp, error: null, loading: false}}
  case VALIDATE_APP_FAILURE:
    let result = action.payload;
    if(!result) {
      error = {message: action.payload.message};
    } else {
      error = {title: result.title, categories: result.categories, description: result.description};
    }
    return {...state, newApp:{...state.newApp, error: error, loading: false}}
  case RESET_APP:
    return {...state, newApp:{...state.newApp, error: null, loading: null}}
  default:
    return state;
  }
}
