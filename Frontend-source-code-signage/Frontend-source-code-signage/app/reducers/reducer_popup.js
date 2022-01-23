
import {UPDATE_SEARCH_TEXT, SHOW_POPUP, HIDE_POPUP, UPDATE_KEY,SELECTED_CONSOLE,SELECTED_PLAYER_ID,SELECTED_APP_ID,PARENT_CONSOLE,LIST_DISPLAY_TYPE,TOGGLE_LEFTMENU_ACTIVE } from '../actions/popup';


const INITIAL_STATE = {
  modal:{isModalOpen:false},
  updateKey:"",
  selectedConsole:"LANDING",
  backConsole:'',
  parentConsole:"SIGN_IN",
  selectedPlayerId:null,
  selectedAppId:null,
  listDisplayType:'LIST',
  searchText: '',
  isLeftMenuActive: window.matchMedia("(orientation: landscape)").matches
};
export default function(state = INITIAL_STATE, action) {
  let error;
  switch(action.type) {

    case SHOW_POPUP:
    return { ...state, modal:action.payload};
    case HIDE_POPUP:
    return { ...state, modal:{isModalOpen:false}};
    case UPDATE_KEY :
    return {...state, updateKey:action.payload };
    case SELECTED_CONSOLE :
    return {...state, selectedConsole:action.payload.selected,backConsole:action.payload.back };
    case PARENT_CONSOLE :
    return {...state, parentConsole:action.payload };
    case SELECTED_PLAYER_ID :
    return {...state, selectedPlayerId:action.payload };
    case SELECTED_APP_ID :
    return {...state, selectedAppId:action.payload };
    case LIST_DISPLAY_TYPE :
    return {...state, listDisplayType:action.payload };
    case TOGGLE_LEFTMENU_ACTIVE :
    return {...state, isLeftMenuActive:action.payload };
    case UPDATE_SEARCH_TEXT :
    return {...state, searchText:action.payload };
    default:
    return state;
  }
}
