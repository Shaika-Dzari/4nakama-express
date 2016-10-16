import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import reducers from '../reducers';
import createLogger from 'redux-logger';

const logger = createLogger();

const store = createStore(
  reducers,
  applyMiddleware (thunkMiddleware, logger)
);

export default store;