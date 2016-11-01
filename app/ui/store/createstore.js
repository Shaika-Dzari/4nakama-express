import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk'
import RootReducers from '../reducers/rootreducers.js';
import logger from '../utils/ActionsLogger.js'
import { routerReducer, routerMiddleware } from 'react-router-redux';

const reduxRouterMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  RootReducers,
  applyMiddleware (thunkMiddleware, reduxRouterMiddleware, logger)
);

export default store;