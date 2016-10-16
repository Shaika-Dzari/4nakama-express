import { combineReducers } from 'redux';
import { messageReducers } from './messageReducers.js';
import { navigationReducers } from './navigationReducers.js';

const NakamaApp = combineReducers({
    navigation: navigationReducers,
    messages: messageReducers
});

export default NakamaApp;