import React from 'react';
//import {Route,IndexRoute} from 'react-router';
import { BrowserRouter as Router, Route,Switch } from 'react-router-dom';

import AppPg from './pages/AppPg';
import HomePg from './pages/HomePg';


const Root = () => {
  console.log('--Init Root--');
  return (
    <Router >
    <AppPg>
    
    <Switch>
      <Route exact path="/" component={HomePg}/>
      </Switch>
      </AppPg>
    </Router>
  );
};

export default Root;