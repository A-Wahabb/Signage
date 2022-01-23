import {
  FETCH_BEBWEB, FETCH_BEBWEB_SUCCESS, 
  ADD_BEBWEB,
  UPDATE_BEBWEB, SAVE_BEBWEB_SUCCESS,SAVE_BEBWEB_FAILURE} from '../actions/customer-bebweb';

const INITIAL_STATE = {bebweb: {list: {}, error:null, loading: false}};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

    case FETCH_BEBWEB:
    return { ...state, bebweb: {...state.bebweb,loading: true}};
    
    case FETCH_BEBWEB_SUCCESS:
    return { ...state, bebweb: {list: action.payload, error:null, loading: false}} ;
    
    case ADD_BEBWEB:
    return { ...state, bebweb: {...state.bebweb,loading: false}};
    
    case SAVE_BEBWEB_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, bebweb: {...state.bebweb, error: error, loading: false}};

    case SAVE_BEBWEB_SUCCESS:
    return { ...state, bebweb: {list: action.payload, error:null, loading: false}} ;
    
    case UPDATE_BEBWEB:
    return { ...state, bebweb: {...state.bebweb,loading: false}};
    
    
    default:
    return state;
  }
}
