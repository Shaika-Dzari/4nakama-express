import 'whatwg-fetch';
import {doStartLoading, doStopLoading} from './navigationActions.js';

export const CATEGORY_FETCH = 'CATEGORY_FETCH';
export const CATEGORY_RECEIVE = 'CATEGORY_RECEIVE';
export const CATEGORY_UPDATED = 'CATEGORY_UPDATED';
export const CATEGORY_ERROR = 'CATEGORY_ERROR';

const CATEGORY_URL = '/api/categories';


export function doCategoryFetch() {
    return dispatch => {
        dispatch(doStartLoading());

        return fetch(CATEGORY_URL, {credentials: 'include'})
                .then(r => r.json())
                .then(cats => {
                    dispatch(doStopLoading());
                    dispatch(doCategoryReceive(cats))
                });
    };
}

export function doCategoryReceive(categories) {
    return {
        type: CATEGORY_RECEIVE,
        categories
    }
}

export function doCategoryUpdated(category) {
    return {
        type: CATEGORY_UPDATED,
        category
    }
}

export function doCategoryError(error) {
    return {
        type: CATEGORY_ERROR,
        error
    }
}

export function doCategorySave(category) {
    return dispatch => {
        dispatch(doStartLoading());
        let cid = category._id;
        let url = CATEGORY_URL + (cid === 'new' ? '' : '/' + cid);
        let protocol = cid === 'new' ? 'PUT' : 'POST';

        let params = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: protocol,
            body: JSON.stringify(category),
            credentials: 'include'
        };

        return fetch(url, params)
            .then(r = r.json())
            .then(c => {
                dispatch(doStopLoading());
                dispatch(doCategoryUpdated(c))
            }).catch(e => {
                dispatch(doStopLoading());
                dispatch(doCategoryError(e))
            });
    }
}