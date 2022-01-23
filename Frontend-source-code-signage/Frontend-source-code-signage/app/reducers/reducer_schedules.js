import {
	FETCH_SCHEDULES, FETCH_SCHEDULES_SUCCESS, FETCH_SCHEDULES_FAILURE,RESET_NEW_SCHEDULE,
	FETCH_SCHEDULE, FETCH_SCHEDULE_SUCCESS,  FETCH_SCHEDULE_FAILURE,
  CREATE_SCHEDULE,CREATE_SCHEDULE_SUCCESS, CREATE_SCHEDULE_FAILURE
} from '../actions/schedules';


	const INITIAL_STATE = {
							schedules: {list: {schedules:[],content:[]}, error:null, loading: false},
              schedule: {items: [], error:null, loading: false},
							newSchedule: {details: null, error:null, loading: false},
							deletedSchedule: {status: null, error:null, loading: false},
						};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {
		case FETCH_SCHEDULES:
			return { ...state, schedules: {...state.schedules, error: null, loading: true} };
		case FETCH_SCHEDULES_SUCCESS:
			return { ...state, schedules: {list: action.payload, error:null, loading: false} };
		case FETCH_SCHEDULES_FAILURE:
			error = action.payload || {message: action.payload.message};
			return { ...state, allPlaylist: {...state.list, error: error, loading: false} };

  case FETCH_SCHEDULE:
    return { ...state, schedule:{...state.schedule, loading: true}};
  case FETCH_SCHEDULE_SUCCESS:
    return { ...state, schedule: {items: action.payload, error:null, loading: false}};
  case FETCH_SCHEDULE_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
    return { ...state, schedule: {items: [], error:error, loading:false}};

  case CREATE_SCHEDULE:
  	return {...state, newSchedule:{...state.newSchedule, loading: true}}
  case CREATE_SCHEDULE_SUCCESS:
  	return {...state, newSchedule: {details: action.payload, error:null, loading: false}}
  case CREATE_SCHEDULE_FAILURE:
    error = action.payload || {message: action.payload.message};//2nd one is network or server down errors
  	return {...state, newSchedule: {...state.details, error:null, loading: false}}
  case RESET_NEW_SCHEDULE:
  	return {...state,  newSchedule: {details: null, error:error, loading:false}}

  default:
    return state;
  }
}
