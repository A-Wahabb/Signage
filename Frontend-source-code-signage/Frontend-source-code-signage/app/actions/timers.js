import axios from 'axios';
import {BASE_SERVER} from '../constants/Config.js';

const ROOT_URL = location.href.indexOf('localhost') > 0 ? BASE_SERVER+'/api' : '/api';



export function updateTimer(props) {
  const request = axios({
    method: 'put',
    data: props,
    url: `${ROOT_URL}/timers`,
    headers: {
     
    }
  });

  return {
    type: "TIMER_UPDATE",
    payload: request
  };
}
