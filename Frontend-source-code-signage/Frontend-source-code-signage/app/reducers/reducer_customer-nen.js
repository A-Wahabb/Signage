import {
  FETCH_LOCS, FETCH_LOCS_SUCCESS, FETCH_LOCS_FAILURE,SELECT_LOC_SUCCESS
} from '../actions/customer-nen';

const INITIAL_STATE = {locs: {list: [], error:null, loading: false},selectedLoc:''};

export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

    case FETCH_LOCS:
    return { ...state, locs: {...state.locs,loading: true}};
    
    case FETCH_LOCS_SUCCESS:
    return { ...state, locs: {list: action.payload, error:null, loading: false}} ;
    
    case FETCH_LOCS_FAILURE:// return error and make loading = false
    error = action.payload;
    return { ...state, locs: {...state.locs, error: error, loading: false}};
    
    case SELECT_LOC_SUCCESS:
    console.log('selected',action.payload);
    return { ...state, selectedLoc: action.payload } ;
    default:
    return state;
  }
}
