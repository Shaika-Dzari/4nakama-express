import 'whatwg-fetch';
import {doStartLoading, doStopLoading, doRaiseGlobalError} from '../actions/navigationActions.js';

function isObject(obj) {
  return obj === Object(obj);
}

function isFunction(func) {
    return typeof func === 'function';
}

function callOrDispatch(dispatch, callback, arg) {
    if (isFunction(callback)) {
        dispatch(callback(arg));
    } else {
        callback.action(arg);
    }
}

export function get(dispatch, url, option, successCallback, errorCallback) {
    dispatch(doStartLoading());
    return fetch(url, option)
            .then(response => {
                dispatch(doStopLoading());
                let ok = response.ok;

                response.json().then(j => {
                    callOrDispatch(dispatch, ok ? successCallback : errorCallback, j);
                });
            }).catch(e => {
                dispatch(doStopLoading());
                dispatch(doRaiseGlobalError(e));
            });
}

export function saveOrUpdate(dispatch, operation, url, obj, successCallback, errorCallback) {

    let isJsonObject = isObject(obj);
    let val = isJsonObject ? JSON.stringify(obj) : obj;
    let headers = isJsonObject ? {'Accept': 'application/json', 'Content-Type': 'application/json'} : {"Content-Type": "application/x-www-form-urlencoded"};

    let opts = {
        headers: headers,
        method: operation,
        body: val,
        credentials: 'include'
    }

    return fetch(url, opts)
            .then(response => {
                dispatch(doStopLoading());
                let ok = response.ok;

                response.json().then(j => {
                    callOrDispatch(dispatch, ok ? successCallback : errorCallback, j);
                });

            }).catch(e => {
                dispatch(doStopLoading());
                dispatch(doRaiseGlobalError(e));
            });
}

export function post(dispatch, url, obj, successCallback, errorCallback) {
    return saveOrUpdate(dispatch, 'POST', url, obj, successCallback, errorCallback);
}

export function put(dispatch, url, obj, successCallback, errorCallback) {
    return saveOrUpdate(dispatch, 'PUT', url, obj, successCallback, errorCallback);
}
