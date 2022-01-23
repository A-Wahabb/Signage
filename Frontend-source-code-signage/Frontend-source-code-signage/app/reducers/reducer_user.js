import {
  FETCH_STORAGE, FETCH_STORAGE_SUCCESS, FETCH_STORAGE_FAILURE,VALIDATE_EMAIL,DELETE_MEDIA, VALIDATE_EMAIL_SUCCESS, VALIDATE_EMAIL_FAILURE,
  ME_FROM_TOKEN, ME_FROM_TOKEN_SUCCESS, ME_FROM_TOKEN_FAILURE, RESET_TOKEN,
  SIGNUP_USER, SIGNUP_USER_SUCCESS, SIGNUP_USER_FAILURE, RESET_USER,
  SIGNIN_USER, SIGNIN_USER_SUCCESS,  SIGNIN_USER_FAILURE,
  LOGOUT_USER,UPLOAD_MEDIA,UPLOAD_MEDIA_SUCCESS, UPLOAD_MEDIA_FAILURE, UPDATE_USER_EMAIL, FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE, RESET_USERS, USER_MEDIA, USER_MEDIA_SUCCESS, USER_MEDIA_FAILURE,EDITING_USER,EDITING_USER_SUCCESS,EDITING_USER_FAILURE,DELETE_USER,SAVE_FOLDER,FETCH_FOLDERS_SUCCESS,FETCH_FOLDERS_FAILURE,FETCH_FOLDER,FETCH_SETTINGS,FETCH_SETTINGS_SUCCESS,FETCH_SETTINGS_FAILURE,PROCESS_MEDIA, UPDATE_SETTINGS,UPDATE_SETTINGS_SUCCESS,UPDATE_SETTINGS_FAILURE,VALIDATE_OTP,VALIDATE_OTP_SUCCESS,VALIDATE_OTP_FAILURE,
        FIND_USERS,FIND_USERS_SUCCESS, FIND_USERS_FAILURE
} from '../actions/users';
import {FETCH_IM_SETTINGS_SUCCESS} from '../actions/iamuser';

const INITIAL_STATE = {usersList: {users: [], error:null, loading: false},
 user: null,
 mediaUploadedSize:1,
 playerVersion:"",
 all_storage:{storageInfo:null,  error:null, loading: false},
 mymedia:{mediaList:null,  error:null, loading: false} ,status:null,actionType:"", error:null, loading: false, editingUser:{user:{},error:null, loadding:false},folders:{folderList:[],error:null, loading: false}, config:{settings:{},error:null, loading:false},imconfig:{imsettings:[],error:null, loading:false}};

export default function(state = INITIAL_STATE, action) {
  let error;
  console.log('--action user', action);
  switch(action.type) {

    case FETCH_STORAGE:
    return { ...state, all_storage: {...state.all_storage,loading: true}};
    case FETCH_STORAGE_SUCCESS:
    return { ...state, all_storage: {storageInfo: action.payload, error:null, loading: false}} ;
    case FETCH_STORAGE_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, all_storage: {...state.all_storage, error: error, loading: false}};

    case VALIDATE_EMAIL://check email verification token
    return { ...state, user: null, status:'validate_email', error:null, loading: true};
    case VALIDATE_EMAIL_SUCCESS:
    return { ...state, user: action.payload.data.user, status:'authenticated', error:null, loading: false}; //<-- authenticated & email verified
    case VALIDATE_EMAIL_FAILURE:
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, user:null, status:'validate_email', error:error, loading: false}; //<-- authenticated

    case ME_FROM_TOKEN:// loading currentUser("me") from jwttoken in local/session storage storage,
    return { ...state, user: null, status:'storage', error:null, loading: true};
    case ME_FROM_TOKEN_SUCCESS://return user, status = authenticated and make loading = false
    return { ...state, user: action.payload.data.user,mediaUploadedSize:action.payload.data.mediaSize,playerVersion:action.payload.data.playerVersion, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case ME_FROM_TOKEN_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, user: null, status:'storage', error:error, loading: false};

    case FIND_USERS:
    return { ...state, error:null, loading: true};
    case FIND_USERS_SUCCESS:
    let user= state.user;
    user.find=  action.payload;
    console.log('find users', user);
    return { ...state, user: user, error:null, loading: false}; 
    case FIND_USERS_FAILURE:// return error and make loading = false
    user= state.user;
    user.find=[];
    return { ...state, user: user,  error:error, loading: false};

    case RESET_TOKEN:// remove token from storage make loading = false
    return { ...state, user: null, status:'storage', error:null, loading: false};

    case SIGNUP_USER:// sign up user, set loading = true and status = signup
    return { ...state, usersList: {...state.usersList}, actionType:'signup', error:null, loading: true};
    case SIGNUP_USER_SUCCESS://return user, status = authenticated and make loading = false
    
    let usersAferSignUp={...state.usersList.users.push(action.payload.user)};

    return { ...state, actionType:'signup_success', error:null, loading: false}; //<-- authenticated
    case SIGNUP_USER_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state,usersList: {...state.usersList, loading: false}, actionType:'signup_failed', error:error, loading: false};

    case VALIDATE_OTP:
    return { ...state, usersList: {...state.usersList}, actionType:'signup', error:null, loading: true};
    case VALIDATE_OTP_SUCCESS:
    
    let usersAferOpt={...state.usersList.users.pop()};
    let usersAferOtp = {...state.usersList.users.push(action.payload.user)};
    return { ...state, actionType:'otp_success', error:null, loading: false}; //<-- authenticated
    case VALIDATE_OTP_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state,usersList: {...state.usersList, loading: false}, actionType:'signup_failed', error:error, loading: false};


    case SIGNIN_USER:// sign in user,  set loading = true and status = signin
    return { ...state, user: null, status:'signin', error:null, loading: true};
    case SIGNIN_USER_SUCCESS://return authenticated user,  make loading = false and status = authenticated
    return { ...state, user: action.payload.user,mediaUploadedSize:action.payload.mediaSize,playerVersion:action.payload.playerVersion, status:'authenticated', error:null, loading: false}; //<-- authenticated
    case SIGNIN_USER_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, user: null, status:'signin', error:error, loading: false};

    case USER_MEDIA:
    return { ...state, mymedia: {...state.mymedia,loading: true}};
    case USER_MEDIA_SUCCESS:
    return { ...state, mymedia: {mediaList: action.payload.mediaData, error:null, loading: false}} ;
    case USER_MEDIA_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, mymedia: {...state.mymedia, error: error, loading: false}};

    case UPLOAD_MEDIA:
    return { ...state, mymedia: {...state.mymedia,loading: true}};
    case UPLOAD_MEDIA_SUCCESS:
    return { ...state, mymedia: action.payload} ;
    case UPLOAD_MEDIA_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, mymedia: {...state.mymedia, error: error, loading: false}};


    case FETCH_FOLDER:
    return { ...state, folders: {...state.folders,loading: true}};
    case FETCH_FOLDERS_SUCCESS:
    return { ...state, folders: {folderList:action.payload, error: error, loading: false}} ;
    case FETCH_FOLDERS_FAILURE:
    return { ...state, folders: {...state.folders, error: error, loading: false}} ;


    case FETCH_SETTINGS:
    return { ...state, config: {...state.config,loading: true}};
    case FETCH_SETTINGS_SUCCESS:
    return { ...state, config: {settings:action.payload, error: error, loading: false}} ;
    case FETCH_SETTINGS_FAILURE:
    return { ...state, config: {...state.config, error: error, loading: false}} ;

    case FETCH_IM_SETTINGS_SUCCESS:
    console.log('----reducer', action.payload);
    return { ...state, imconfig: {imsettings:action.payload, error: null, loading: false}} ;

    case UPDATE_SETTINGS:
    return { ...state, config: {...state.config,loading: true}};
    case UPDATE_SETTINGS_SUCCESS:
    return { ...state, config: {settings:action.payload, error: error, loading: false}} ;
    case UPDATE_SETTINGS_FAILURE:
    return { ...state, config: {...state.config, error: error, loading: false}} ;

    case UPDATE_USER_EMAIL:
    return{...state, user:{...state.user, email:action.payload.email}};

    case DELETE_MEDIA:
    return{...state,mymedia: {...state.mymedia,loading: false}};

    case PROCESS_MEDIA:
    return{...state,mymedia: {...state.mymedia,loading: false}};
    

    case LOGOUT_USER:
    return {...state, user:null, status:'logout',actionType:'singin', error:null, loading: false};

    case RESET_USER:// reset authenticated user to initial state
    return { ...state, user: null, status:null, error:null, loading: false};

    case DELETE_USER:
    return { ...state, usersList: {...state.usersList,loading: true}};

    case FETCH_USERS:// start fetching posts and set loading = true
 
    return { ...state, usersList: {...state.usersList,loading: true}};
    case FETCH_USERS_SUCCESS:// return list of posts and make loading = false
   
    return { ...state, usersList: {users: action.payload, error:null, loading: false} };
    case FETCH_USERS_FAILURE:// return error and make loading = false
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, usersList: {...state.usersList, error: error, loading: false} };
    case RESET_USERS:// reset postList to initial state
    return { ...state, usersList: {users: [], error:null, loading: false} };

    case EDITING_USER:// sign in user,  set loading = true and status = signin
    return { ...state, editingUser:{user:action.payload, loading:true},actionType:'edit_user' , error:null, loading: true};
    case EDITING_USER_SUCCESS://return authenticated user,  make loading = false and status = authenticated
    return { ...state, editingUser:{user:action.payload, loading:false}, status:'authenticated',actionType:'edit_user_success', error:null, loading: false}; //<-- authenticated
    case EDITING_USER_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, editingUser:{user:action.payload,error:action.payload.error, loading:false},actionType:'edit_user_failed', status:'', error:error, loading: false};
    default:
    return state;
  }
}
