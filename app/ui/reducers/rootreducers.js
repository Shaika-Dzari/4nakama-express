import { combineReducers } from 'redux';
import { messageReducers } from './messageReducers.js';
import { categoryReducers } from './categoryReducers.js';
import { navigationReducers } from './navigationReducers.js';
import { userReducers } from './userReducers.js';

const RootReducers = combineReducers({
    navigation: navigationReducers,
    messages: messageReducers,
    categories: categoryReducers,
    user: userReducers
});

export default RootReducers;