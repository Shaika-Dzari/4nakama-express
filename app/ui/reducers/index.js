import { combineReducers } from 'redux';
import { messageReducers } from './messageReducers.js';
import { categoryReducers } from './categoryReducers.js';
import { navigationReducers } from './navigationReducers.js';

const Reducers = combineReducers({
    navigation: navigationReducers,
    messages: messageReducers,
    categories: categoryReducers
});

export default Reducers;