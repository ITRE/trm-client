import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import throttle from 'lodash/throttle';

import configureStore from "./modules/store";
import {loadState, saveState} from './modules/localStorage';

import './style/main.scss';
import App from './App';

const solidState = loadState()

const store = configureStore(solidState);

store.subscribe(throttle(() => {
  saveState(store.getState())
}, 1000))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
