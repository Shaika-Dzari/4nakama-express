import {MSG_LIST_FETCH, MSG_OPEN, MSG_LIST_RECEIVE, MSG_UPDATE_SAVEERROR} from '../actions/messageActions.js';

export function messageReducers(state = {items: []}, action) {
    switch (action.type) {

        case MSG_LIST_RECEIVE:
            return Object.assign({}, state, {items: action.messages, page: action.page});

        case MSG_OPEN:
            return Object.assign({}, state, {selectedid: action.messageid});

        case MSG_UPDATE_SAVEERROR:
            return Object.assign({}, state, {error: action.error});



        default:
            return state;
    }
}