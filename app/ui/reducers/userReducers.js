import {USER_LP_USERNAME_KEYPRESS, USER_LP_PASSWD_KEYPRESS, USER_SUCCESS_LOGIN, USER_BAD_CREDENTIAL, USER_LOGOUT} from '../actions/userActions.js';


export function userReducers(state = {username: '', passwd: ''}, action) {
    switch (action.type) {
        case USER_LP_USERNAME_KEYPRESS:
            return Object.assign({}, state, {username: action.value});
        case USER_LP_PASSWD_KEYPRESS:
            return Object.assign({}, state, {passwd: action.value});
        case USER_SUCCESS_LOGIN:
            return Object.assign({}, state, {connectedUser: action.user, passwd: null, username: null});
        case USER_BAD_CREDENTIAL:
            return Object.assign({}, state, {error: action.error});
        case USER_LOGOUT:
            return Object.assign({}, state, {connectedUser: null});
        default:
            return state;
    }
}