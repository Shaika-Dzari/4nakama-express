import 'whatwg-fetch';
import { browserHistory } from 'react-router';
import {doStartLoading, doStopLoading} from './navigationActions.js';

export const USER_LP_USERNAME_KEYPRESS = 'USER_LP_LOGIN_KEYPRESS';
export const USER_LP_PASSWD_KEYPRESS = 'USER_LP_PASSWD_KEYPRESS';
export const USER_LP_SUBMIT = 'USER_LP_SUBMIT';
export const USER_SUCCESS_LOGIN = 'USER_SUCCESS_LOGIN';
export const USER_BAD_CREDENTIAL = 'USER_BAD_CREDENTIAL';

export function doLoginPageUsernameKp(value) {
    return {
        type: USER_LP_USERNAME_KEYPRESS,
        value
    };
}

export function doLoginPagePasswdKp(value) {
    return {
        type: USER_LP_PASSWD_KEYPRESS,
        value
    };
}

export function doLoginPageSubmit(username, passwd) {

    return dispatch => {

        dispatch(doStartLoading());

        let u = 'username=' + encodeURIComponent(username);
        let p = 'password=' + encodeURIComponent(passwd);


        let opts = {
            method: "POST",
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            body: u + "&" + p,
            credentials: 'include'
        };

        return fetch("/api/sec/login", opts)
            .then(r => {
                dispatch(doStopLoading());
                return r.json();
            })
            .then(user => {
                sessionStorage.setItem('4nuser', user);
                dispatch(doSuccessLogin(user));
                browserHistory.push('/');
            })
            .catch(e => dispatch(doBadCredential(e)));
    };

}

export function doSuccessLogin(user) {
    return {
        type: USER_SUCCESS_LOGIN,
        user
    };
}

export function doBadCredential(error) {
    return {
        type: USER_BAD_CREDENTIAL,
        error
    };
}