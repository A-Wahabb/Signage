import {
  FETCH_TEAMS, FETCH_TEAMS_SUCCESS, FETCH_TEAMS_FAILURE,
  UPDATE_TEAMS, UPDATE_TEAMS_SUCCESS, UPDATE_TEAMS_FAILURE, 
  ADD_TEAMS, ADD_TEAMS_FAILURE, DEL_TEAM, DEL_TEAM_FAILURE,
  FETCH_MATCHES, FETCH_MATCHES_SUCCESS, FETCH_MATCHES_FAILURE,ADD_MATCHES, ADD_MATCHES_FAILURE,UPDATE_MATCHES
,DEL_MATCH, DEL_MATCH_FAILURE} from '../actions/customer-teams';

const INITIAL_STATE = {teams: {list: [], error:null, loading: false},
matches: {list: [], error:null, loading: false}};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

    case FETCH_TEAMS:
    return { ...state, teams: {...state.teams,loading: true}};
    
    case FETCH_TEAMS_SUCCESS:
    return { ...state, teams: {list: action.payload, error:null, loading: false}} ;
    
    case FETCH_TEAMS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, teams: {...state.teams, error: error, loading: false}};

    case ADD_TEAMS:
    return { ...state, teams: {...state.teams,loading: false}};
    case ADD_TEAMS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, teams: {...state.teams, error: error, loading: false}};

    case FETCH_MATCHES:
    return { ...state, matches: {...state.matches,loading: true}};
    
    case FETCH_MATCHES_SUCCESS:
    return { ...state, matches: {list: action.payload, error:null, loading: false}} ;
    
    case FETCH_MATCHES_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, matches: {...state.matches, error: error, loading: false}};

    case ADD_MATCHES:
    return { ...state, matches: {...state.matches,loading: false}};
    case ADD_MATCHES_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, matches: {...state.matches, error: error, loading: false}};
    case UPDATE_MATCHES:
    return { ...state, matches: {...state.matches,loading: false}};

    case DEL_TEAM:
    return { ...state, teams: {...state.teams,loading: false}};
    case DEL_TEAM_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, teams: {...state.teams, error: error, loading: false}};

    case DEL_MATCH:
    return { ...state, matches: {...state.matches,loading: false}};
    case DEL_MATCH_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, matches: {...state.matches, error: error, loading: false}};

    

    case UPDATE_TEAMS:
    return { ...state, teams: {...state.teams,loading: false}};
    
    case UPDATE_TEAMS_SUCCESS:
    return { ...state, teams: {list: action.payload, error:null, loading: false}} ;
    
    case UPDATE_TEAMS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, teams: {...state.teams, error: error, loading: false}};

    default:
    return state;
  }
}
