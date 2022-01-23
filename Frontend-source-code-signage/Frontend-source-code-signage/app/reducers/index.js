import { combineReducers } from 'redux';
import PostsReducer from './reducer_posts';
import UserReducer from './reducer_user';
import AppsReducer from './reducer_apps';
import ValidateUserFieldsReducer from './reducer_validateUserFields';
import ResendEmailReducer from './reducer_resendEmail';
import UpdateEmailReducer from './reducer_updateEmail';
import PopupReducer from './reducer_popup';
import PlaylistsReducer from './reducer_playlists';
import SchedulesReducer from './reducer_schedules';
import PaymentReducer from './reducer_payment';
//import CustomerAvReducer from './reducer_customer-av';
//import CustomerNenReducer from './reducer_customer-nen';
//import CustomerHananeReducer from './reducer_customer-hanane';
//import CustomerTeamsReducer from './reducer_customer-teams';
import CustomerBebReducer from './reducer_customer-beb';

import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  user: UserReducer,
  validateFields: ValidateUserFieldsReducer,
  posts: PostsReducer, //<-- Posts
  form: formReducer, // <-- redux-form
  apps : AppsReducer,
  popup :PopupReducer,
  payment:PaymentReducer,
  resendEmail: ResendEmailReducer,
  updateEmail: UpdateEmailReducer,
  //trans: CustomerAvReducer,
  //locs:CustomerNenReducer,
  //optins: CustomerHananeReducer,
  playlists: PlaylistsReducer,
  schedules: SchedulesReducer,
  //teams:CustomerTeamsReducer,
  beb: CustomerBebReducer
});

export default rootReducer;
