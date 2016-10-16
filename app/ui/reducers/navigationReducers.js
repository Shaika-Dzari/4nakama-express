import {LOGIN, LOGOUT, STARTLOADING, STOPLOADING} from '../actions/navigationActions.js';

export function navigationReducers(state = {isloading: false}, action) {

    switch (action.type) {

        case STARTLOADING:
            return Object.assign({}, state, {isloading: true});
        case STOPLOADING:
            return Object.assign({}, state, {isloading: false});
        default:
            return state;
    }
}