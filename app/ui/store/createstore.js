import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk'
import RootReducers from '../reducers/rootreducers.js';
import logger from '../utils/ActionsLogger.js'
import { routerReducer, routerMiddleware } from 'react-router-redux';
import { createHtmlBody } from '../utils/HtmlUtils.js';

const reduxRouterMiddleware = routerMiddleware(browserHistory);
const preloadedState = JSON.parse(window.__PRELOADED_STATE__ || '{}');

if (preloadedState && preloadedState.messages && preloadedState.messages.items) {
    for (let mid in preloadedState.messages.items) {
        createHtmlBody(preloadedState.messages.items[mid]);
    }
}

// Initial Language state
preloadedState.language = {locale: 'en_CA'};

const store = createStore(
  RootReducers,
  preloadedState,
  applyMiddleware (thunkMiddleware, reduxRouterMiddleware, logger)
);

export default store;