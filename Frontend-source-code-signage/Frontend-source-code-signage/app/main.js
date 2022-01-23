import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Routes from './routes';
//import { AppContainer } from 'react-hot-loader';
import configureStore from './store/configureStore.js';

const store = configureStore();


if (process.env.NODE_ENV === 'development') {
  console.log("---Development enviornment--");
  const { AppContainer } = require('react-hot-loader');
  const hotRender = (Component) => {
    ReactDOM.render(
      <Provider store={store}>

        <Component />

      </Provider>,
      document.getElementById('root')
    );
  }

  hotRender(Routes)

  if (module.hot) {
    console.log("---Hot module enviornment--");
    module.hot.accept('./routes', () => {
      const NewApp = require('./routes').default
      hotRender(NewApp)
    })
  }
} else {
  console.log("---Production enviornment--");
  ReactDOM.render(<Provider store={store}><Routes/>
</Provider>, document.getElementById('root'))
}
