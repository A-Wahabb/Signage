import {
  FETCH_DEALS, FETCH_DEALS_SUCCESS, FETCH_DEALS_FAILURE, FETCH_CITY, FETCH_CITY_SUCCESS, FETCH_CITY_FAILURE,
  UPDATE_DEALS, UPDATE_DEALS_SUCCESS, UPDATE_DEALS_FAILURE, FETCH_PROS, FETCH_PROS_SUCCESS, FETCH_PROS_FAILURE,
  FETCH_OFFICE, FETCH_OFFICE_SUCCESS, FETCH_OFFICE_FAILURE,FETCH_AGENTS,FETCH_AGENTS_SUCCESS,
  FETCH_AGENTS_FAILURE,ADD_DEALS,ADD_DEALS_FAILURE,DEL_DEALS,DEL_DEALS_FAILURE,ADD_PROPERTY,ADD_PROPERTY_FAILURE,ADD_AGENT,ADD_AGENT_FAILURE,UPDATE_PROPERTY_FAILURE,UPDATE_PROPERTY,DEL_PROP,DEL_PROP_FAILURE,DELETE_AGENT,DELETE_AGENT_FAILURE,UPDATE_AGENT,UPDATE_AGENT_FAILURE,FETCH_EVENTS, FETCH_EVENTS_SUCCESS, FETCH_EVENTS_FAILURE,ADD_EVENT,ADD_EVENT_FAILURE,DELETE_EVENT,DELETE_EVENT_FAILURE,UPDATE_EVENT, UPDATE_EVENT_FAILURE
} from '../actions/customer-av';

const INITIAL_STATE = {
    deals: {list: [], error:null, loading: false},
    cities:{list:[], error:null, loading: false},
    office:{details:null, error:null, loading: false},
    pros:{list: [], error:null, loading: false}, 
    agents:{list: [], error:null, loading: false}, 
    events:{list: [], error:null, loading: false}};

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

    case UPDATE_PROPERTY:
    return { ...state, deals: {...state.deals,loading: false}};
    case UPDATE_PROPERTY_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, deals: {...state.deals, error: error, loading: false}};

    case UPDATE_AGENT:
    return { ...state, agents: {...state.agents,loading: false}};
    case UPDATE_AGENT_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, agents: {...state.agents, error: error, loading: false}};

    case UPDATE_EVENT:
    return { ...state, events: {...state.events,loading: false}};
    case UPDATE_EVENT_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, events: {...state.events, error: error, loading: false}};

    case ADD_AGENT:
    return { ...state, agents: {...state.agents,loading: false}};
    
    
    case ADD_AGENT_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, agents: {...state.agents, error: error, loading: false}};

    case ADD_PROPERTY:
    return { ...state, pros: {...state.pros,loading: false}};
    
    case ADD_PROPERTY_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, pros: {...state.pros, error: error, loading: false}};
    
    case DEL_DEALS:
    return { ...state, deals: {...state.deals,loading: false}};
    case DEL_DEALS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, deals: {...state.deals, error: error, loading: false}};

    case DELETE_AGENT:
    return { ...state, agents: {...state.agents,loading: false}};
    case DELETE_AGENT_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, agents: {...state.agents, error: error, loading: false}};

    case DEL_PROP:
    return { ...state, pros: {...state.pros,loading: false}};
    case DEL_PROP_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, pros: {...state.pros, error: error, loading: false}};

    case DELETE_EVENT:
    return { ...state, events: {...state.events,loading: false}};
    case DELETE_EVENT_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, events: {...state.events, error: error, loading: false}};

    case UPDATE_DEALS:
    return { ...state, deals: {...state.deals,loading: false}};
    
    case UPDATE_DEALS_SUCCESS:
    return { ...state, deals: {list: action.payload, error:null, loading: false}} ;
    
    case UPDATE_DEALS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, deals: {...state.deals, error: error, loading: false}};

    case FETCH_PROS:
    return { ...state, pros: {...state.pros,loading: true}};
    
    case FETCH_PROS_SUCCESS:
    return { ...state, pros: {list: action.payload, error:null, loading: false}} ;
    
    case FETCH_PROS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, pros: {...state.pros, error: error, loading: false}};

    case FETCH_AGENTS:
    return { ...state, agents: {...state.agents,loading: true}};
    
    case FETCH_AGENTS_SUCCESS:
    return { ...state, agents: {list: action.payload, error:null, loading: false}} ;
    
    case FETCH_AGENTS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, agents: {...state.agents, error: error, loading: false}};

    case FETCH_CITY:
    return { ...state, cities: {...state.cities,loading: true}};
    
    case FETCH_CITY_SUCCESS:
    return { ...state, cities: {list: action.payload, error:null, loading: false}} ;
    
    case FETCH_CITY_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, cities: {...state.cities, error: error, loading: false}};

    case FETCH_OFFICE:
    return { ...state, office: {...state.office,loading: true}};
    
    case FETCH_OFFICE_SUCCESS:
    return { ...state, office: {details: action.payload, error:null, loading: false}} ;
    
    case FETCH_OFFICE_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, office: {...state.office, error: error, loading: false}};

    case FETCH_EVENTS:
    return { ...state, events: {...state.events,loading: true}};
    
    case FETCH_EVENTS_SUCCESS:
    return { ...state, events: {list: action.payload, error:null, loading: false}} ;
    
    case FETCH_EVENTS_FAILURE:// return error and make loading = false
    error = action.payload.data || {message: action.payload.message};
    return { ...state, events: {...state.events, error: error, loading: false}};

case ADD_EVENT:
    return { ...state, events: {...state.events,loading: true}};
    
    case ADD_EVENT_FAILURE:
    return { ...state, events: {list: action.payload, error:null, loading: false}} ;

    default:
    return state;
  }
}
