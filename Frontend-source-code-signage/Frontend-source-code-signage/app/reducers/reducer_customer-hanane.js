import {
  FETCH_DEALS, FETCH_DEALS_SUCCESS, FETCH_DEALS_FAILURE,
  UPDATE_DEALS, UPDATE_DEALS_SUCCESS, UPDATE_DEALS_FAILURE, 
  ADD_DEALS, ADD_DEALS_FAILURE, DEL_DEALS, DEL_DEALS_FAILURE
} from '../actions/customer-hanane';

const INITIAL_STATE = {deals: {list: [], error:null, loading: false}};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

    case FETCH_DEALS:
    return { ...state, deals: {...state.deals,loading: true}};
    
    case FETCH_DEALS_SUCCESS:
    return { ...state, deals: {list: action.payload, error:null, loading: false}} ;
    
    case FETCH_DEALS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, deals: {...state.deals, error: error, loading: false}};

    case ADD_DEALS:
    return { ...state, deals: {...state.deals,loading: false}};
    case ADD_DEALS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, deals: {...state.deals, error: error, loading: false}};

    

    case DEL_DEALS:
    return { ...state, deals: {...state.deals,loading: false}};
    case DEL_DEALS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, deals: {...state.deals, error: error, loading: false}};

    

    case UPDATE_DEALS:
    return { ...state, deals: {...state.deals,loading: false}};
    
    case UPDATE_DEALS_SUCCESS:
    return { ...state, deals: {list: action.payload, error:null, loading: false}} ;
    
    case UPDATE_DEALS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, deals: {...state.deals, error: error, loading: false}};

    default:
    return state;
  }
}
