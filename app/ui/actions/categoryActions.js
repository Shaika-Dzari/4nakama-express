import 'whatwg-fetch';
import {doStartLoading, doStopLoading} from './navigationActions.js';

export const CATEGORY_FETCH = 'CATEGORY_FETCH';
export const CATEGORY_RECEIVE = 'CATEGORY_RECEIVE';

export function doCategoryFetch() {
    return dispatch => {
        dispatch(doStartLoading());

        return fetch('/api/categories', {credentials: 'include'})
                .then(r => r.json())
                .then(cats => dispatch(doCategoryReceive(cats)));
    };
}

export function doCategoryReceive(categories) {
    return {
        type: CATEGORY_RECEIVE,
        categories
    }
}