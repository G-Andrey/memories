import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { GoogleOAuthProvider } from '@react-oauth/google';

import reducers from './reducers';

import App from './App';
import './index.css';

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDom.render(
  <GoogleOAuthProvider clientId="498536074256-4cvmkog4nj16ffrr5qsaabro54ur5iah.apps.googleusercontent.com">
    <Provider store={store}>
      < App/>
    </Provider>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
