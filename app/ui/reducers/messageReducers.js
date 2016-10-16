import {MESSAGE_FETCH, MESSAGE_OPEN, MESSAGE_RECEIVE} from '../actions/messageActions.js';

export function messageReducers(state = {items: []}, action) {
    switch (action.type) {
        case MESSAGE_RECEIVE:
            return Object.assign({}, state, {items: action.messages, page: action.page});
        default:
            return state;
    }
}