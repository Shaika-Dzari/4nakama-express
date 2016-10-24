import { createStore, applyMiddleware } from 'redux';
import { browserHistory } from 'react-router';
import thunkMiddleware from 'redux-thunk'
import RootReducers from '../reducers/rootreducers.js';
import createLogger from 'redux-logger';
import { routerReducer, routerMiddleware } from 'react-router-redux';

const logger = createLogger();
const reduxRouterMiddleware = routerMiddleware(browserHistory);

const store = createStore(
  RootReducers,
  applyMiddleware (thunkMiddleware, reduxRouterMiddleware, logger)
);

export default store;