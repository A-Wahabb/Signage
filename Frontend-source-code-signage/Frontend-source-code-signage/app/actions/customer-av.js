import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';

//update  email
export const FETCH_DEALS = 'FETCH_DEALS';
export const FETCH_DEALS_SUCCESS = 'FETCH_DEALS_SUCCESS';
export const FETCH_DEALS_FAILURE = 'FETCH_DEALS_FAILURE';

export const ADD_DEALS = 'ADD_DEALS';
export const ADD_DEALS_FAILURE = 'ADD_DEALS_FAILURE';


export const DEL_DEALS = 'DEL_DEALS';
export const DEL_DEALS_FAILURE ='DEL_DEALS_FAILURE';

export const DEL_PROP = 'DEL_PROP';
export const DEL_PROP_FAILURE ='DEL_PROP_FAILURE';

export const UPDATE_DEALS = 'UPDATE_DEALS';
export const UPDATE_DEALS_SUCCESS = 'UPDATE_DEALS_SUCCESS';
export const UPDATE_DEALS_FAILURE = 'UPDATE_DEALS_FAILURE';

export const FETCH_CITY = 'FETCH_CITY';
export const FETCH_CITY_SUCCESS = 'FETCH_CITY_SUCCESS';
export const FETCH_CITY_FAILURE = 'FETCH_CITY_FAILURE';

export const FETCH_OFFICE = 'FETCH_OFFICE';
export const FETCH_OFFICE_SUCCESS = 'FETCH_OFFICE_SUCCESS';
export const FETCH_OFFICE_FAILURE = 'FETCH_OFFICE_FAILURE';

export const ADD_PROPERTY = 'ADD_PROPERTY';
export const ADD_PROPERTY_FAILURE = 'ADD_PROPERTY_FAILURE';

export const ADD_AGENT = 'ADD_AGENT';
export const ADD_AGENT_FAILURE = 'ADD_AGENT_FAILURE';

export const UPDATE_AGENT = 'UPDATE_AGENT';
export const UPDATE_AGENT_FAILURE = 'UPDATE_AGENT_FAILURE';

export const DELETE_AGENT = 'DELETE_AGENT';
export const DELETE_AGENT_FAILURE = 'DELETE_AGENT_FAILURE';

export const DELETE_EVENT = 'DELETE_EVENT';
export const DELETE_EVENT_FAILURE = 'DELETE_EVENT_FAILURE';

export const FETCH_PROS = 'FETCH_PROS';
export const FETCH_PROS_SUCCESS = 'FETCH_PROS_SUCCESS';
export const FETCH_PROS_FAILURE = 'FETCH_PROS_FAILURE';

export const FETCH_AGENTS = 'FETCH_AGENTS';
export const FETCH_AGENTS_SUCCESS = 'FETCH_AGENTS_SUCCESS';
export const FETCH_AGENTS_FAILURE = 'FETCH_AGENTS_FAILURE';
export const  UPLOAD_IMG='UPLOAD_IMG';
export const RESET_UPDATE_EMAIL_STATE = 'RESET_UPDATE_EMAIL_STATE';

export const UPDATE_PROPERTY= 'UPDATE_PROPERTY';
export const UPDATE_PROPERTY_FAILURE = 'UPDATE_PROPERTY_FAILURE';

export const UPDATE_EVENT = 'UPDATE_EVENT';
export const UPDATE_EVENT_FAILURE= 'UPDATE_EVENT_FAILURE';

export const ADD_EVENT = 'ADD_EVENT';
export const ADD_EVENT_FAILURE = 'ADD_EVENT_FAILURE';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS';
export const FETCH_EVENTS_FAILURE = 'FETCH_EVENTS_FAILURE';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';

export function fetchDeals(tokenFromStorage,cityId) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/av/deals/${cityId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_DEALS,
    payload: request
  };
}

export function fetchDealsSuccess(data) {
  console.log('DEALS',data);
  return {
    type: FETCH_DEALS_SUCCESS,
    payload: data
  };
}

export function fetchDealsFailure(error) {
  return {
    type: FETCH_DEALS_FAILURE,
    payload: error
  };
}


export function delDeals(tokenFromStorage,dealId) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/av/deals/${dealId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: DEL_DEALS,
    payload: request
  };
}


export function delDealsFailure(error) {
  return {
    type: DEL_DEALS_FAILURE,
    payload: error
  };
}

export function delEvent(tokenFromStorage,eventId) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/av/events/${eventId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: DELETE_EVENT,
    payload: request
  };
}


export function delEventFailure(error) {
  return {
    type: DELETE_EVENT_FAILURE,
    payload: error
  };
}

export function delProp(tokenFromStorage,propId) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/av/property/${propId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: DEL_PROP,
    payload: request
  };
}


export function delPropFailure(error) {
  return {
    type: DEL_PROP_FAILURE,
    payload: error
  };
}

export function delAgent(tokenFromStorage,agentId) {
  const request = axios({
    method: 'delete',
    url: `${ROOT_URL}/av/agent/${agentId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: DELETE_AGENT,
    payload: request
  };
}


export function delAgentFailure(error) {
  return {
    type: DELETE_AGENT_FAILURE,
    payload: error
  };
}



export function fetchPros(tokenFromStorage,cityId) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/av/properties/${cityId}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_PROS,
    payload: request
  };
}

export function fetchProsSuccess(data) {
  console.log('Pros sucses',data);
  return {
    type: FETCH_PROS_SUCCESS,
    payload: data
  };
}

export function fetchProsFailure(error) {
  return {
    type: FETCH_PROS_FAILURE,
    payload: error
  };
}

export function fetchEvents(tokenFromStorage,officeID) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/av/events/${officeID}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_EVENTS,
    payload: request
  };
}

export function fetchEventsSuccess(data) {
  console.log('Events sucses',data);
  return {
    type: FETCH_EVENTS_SUCCESS,
    payload: data
  };
}

export function fetchEventsFailure(error) {
  return {
    type: FETCH_EVENTS_FAILURE,
    payload: error
  };
}

export function fetchAgents(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/av/agents`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_AGENTS,
    payload: request
  };
}

export function fetchAgentsSuccess(data) {
  console.log('Agents',data);
  return {
    type: FETCH_AGENTS_SUCCESS,
    payload: data
  };
}

export function fetchAgentsFailure(error) {
  return {
    type: FETCH_AGENTS_FAILURE,
    payload: error
  };
}

export function addDeals(tokenFromStorage,dealData) {
  const request = axios({
    method: 'post',
    data:dealData,
    url: `${ROOT_URL}/av/deals`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: ADD_DEALS,
    payload: request
  };
}

export function addDealsFailure(error) {
  return {
    type: ADD_DEALS_FAILURE,
    payload: error
  };
}

export function addEvent(tokenFromStorage,eventData) {
  const request = axios({
    method: 'post',
    data:eventData,
    url: `${ROOT_URL}/av/events`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: ADD_EVENT,
    payload: request
  };
}

export function addEventFailure(error) {
  return {
    type: ADD_EVENT_FAILURE,
    payload: error
  };
}


export function addAgent(tokenFromStorage,agentData) {
  const request = axios({
    method: 'post',
    data:agentData,
    url: `${ROOT_URL}/av/agents`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: ADD_AGENT,
    payload: request
  };
}

export function addAgentFailure(error) {
  return {
    type: ADD_AGENT_FAILURE,
    payload: error
  };
}


export function uploadImg(tokenFromStorage,uploadObj,subfodler) {
  let propData = new FormData();
//  propData.append('probObj',JSON.stringify(propObj));

console.log(uploadObj);
propData.append('photo_path',uploadObj);

//propData.append('featured_photo_path',uploadObj);

  const request = axios({
    method: 'post',
    data: propData,
    arrayKey: '',
    url: `${ROOT_URL}/av/upload${subfodler}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }

  });

  return {
    type: UPLOAD_IMG,
    payload: request
  };
}

export function addProperty(tokenFromStorage,propObj) {
  let propData = new FormData();
  propData.append('probObj',JSON.stringify(propObj));
propData.append('photo_path',propObj.photo_path);
propData.append('featured_photo_path',propObj.featured_photo_path);

  const request = axios({
    method: 'post',
    data: propObj,
    url: `${ROOT_URL}/av/properties`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }

  });

  return {
    type: ADD_PROPERTY,
    payload: request
  };
}

export function addPropertyFailure(error) {
  return {
    type: ADD_PROPERTY_FAILURE,
    payload: error
  };
}

export function updateProperty(tokenFromStorage,updateData) {
  const request = axios({
    method: 'put',
    data:updateData,
    url: `${ROOT_URL}/av/property`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPDATE_PROPERTY,
    payload: request
  };
}


export function updatePropertyFailure(error) {
  return {
    type: UPDATE_PROPERTY_FAILURE,
    payload: error
  };
}

export function updateEvent(tokenFromStorage,updateData) {
  const request = axios({
    method: 'put',
    data:updateData,
    url: `${ROOT_URL}/av/event`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPDATE_EVENT,
    payload: request
  };
}


export function updateEventFailure(error) {
  return {
    type: UPDATE_EVENT_FAILURE,
    payload: error
  };
}

export function updateAgent(tokenFromStorage,updateData) {
  const request = axios({
    method: 'put',
    data:updateData,
    url: `${ROOT_URL}/av/agent`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPDATE_AGENT,
    payload: request
  };
}


export function updateAgentFailure(error) {
  return {
    type: UPDATE_AGENT_FAILURE,
    payload: error
  };
}

export function updateDeals(tokenFromStorage,dealUpdateData) {
  const request = axios({
    method: 'put',
    data:dealUpdateData,
    url: `${ROOT_URL}/av/deals`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: UPDATE_DEALS,
    payload: request
  };
}

export function updateDealsSuccess(data) {
  console.log('DEALS',data);
  return {
    type: UPDATE_DEALS_SUCCESS,
    payload: data
  };
}

export function updateDealsFailure(error) {
  return {
    type: UPDATE_DEALS_FAILURE,
    payload: error
  };
}

export function fetchOffice(tokenFromStorage,officeName) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/av/office/${officeName}`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_OFFICE,
    payload: request
  };
}

export function fetchOfficeSuccess(data) {
  console.log('OFFice',data);
  return {
    type: FETCH_OFFICE_SUCCESS,
    payload: data[0]
  };
}

export function fetchOfficeFailure(error) {
  return {
    type: FETCH_OFFICE_FAILURE,
    payload: error
  };
}

  
export function fetchCities(tokenFromStorage) {
  const request = axios({
    method: 'get',
    url: `${ROOT_URL}/av/cities`,
    headers: {
      'Authorization': `Bearer ${tokenFromStorage}`
    }
  });

  return {
    type: FETCH_CITY,
    payload: request
  };
}

export function fetchCitySuccess(data) {
  console.log('City',data);
  return {
    type: FETCH_CITY_SUCCESS,
    payload: data[0]
  };
}

export function fetchCityFailure(error) {
  return {
    type: FETCH_CITY_FAILURE,
    payload: error
  };
}


