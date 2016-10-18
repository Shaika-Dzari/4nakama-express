import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import RootReducers from '../reducers/rootreducers.js';
import createLogger from 'redux-logger';

const logger = createLogger();

const store = createStore(
  RootReducers,
  applyMiddleware (thunkMiddleware, logger)
);

export default store;