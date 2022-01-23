import axios from 'axios';

//show and hide all types of  popup
export const SHOW_POPUP = 'SHOW_POPUP';
export const HIDE_POPUP = 'HIDE_POPUP';
export const UPDATE_KEY = 'UPDATE_KEY';
export const SELECTED_CONSOLE= 'SELECTED_CONSOLE';
export const PARENT_CONSOLE= 'PARENT_CONSOLE';
export const SELECTED_PLAYER_ID='SELECTED_PLAYER_ID';
export const SELECTED_APP_ID='SELECTED_APP_ID';
export const LIST_DISPLAY_TYPE='LIST_DISPLAY_TYPE';
export const TOGGLE_LEFTMENU_ACTIVE='TOGGLE_LEFTMENU_ACTIVE';
export const UPDATE_SEARCH_TEXT = 'UPDATE_SEARCH_TEXT';

export function showModal(params) {

  return {
    type: SHOW_POPUP,
    payload: params
  };
}

export function hideModal() {

  return {
    type: HIDE_POPUP
  };
}

export function updateKey(params) {

  return {
    type: UPDATE_KEY,
    payload:params
  };
}

export function changeSelectedConsole(nextConsole,backConsole) {
  
    return {
      type: SELECTED_CONSOLE,
      payload:{selected:nextConsole,back:backConsole}
    };
  }

  export function changeParentConsole(params) {
    
      return {
        type: PARENT_CONSOLE,
        payload:params
      };
    }

export function changeSelectedPlayer(params) {
    
      return {
        type: SELECTED_PLAYER_ID,
        payload:params
      };
    }

export function changeSelectedApp(params) {
      
      return {
          type: SELECTED_APP_ID,
          payload:params
        };
      }

export function changeListDisplayType(params) {
      
      return {
          type: LIST_DISPLAY_TYPE,
          payload:params
        };
      }

export function changeLeftMenuActive(isActive) {
      
      return {
          type: TOGGLE_LEFTMENU_ACTIVE,
          payload:isActive
        };
      }

export function updateSearchText(searchText) {
      
      return {
          type: UPDATE_SEARCH_TEXT,
          payload:searchText
        };
      }
