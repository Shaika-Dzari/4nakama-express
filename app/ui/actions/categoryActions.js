import * as FetchUtils from '../utils/FetchUtils.js';
import makeActionCreator from './actionCreator.js';

const CATEGORY_URL = '/api/categories';

export const CATEGORY_FETCH = 'CATEGORY_FETCH';
export const CATEGORY_RECEIVE = 'CATEGORY_RECEIVE';
export const CATEGORY_UPDATED = 'CATEGORY_UPDATED';
export const CATEGORY_ERROR = 'CATEGORY_ERROR';

export const doCategoryReceive = makeActionCreator(CATEGORY_RECEIVE, 'categories');
export const doCategoryUpdated = makeActionCreator(CATEGORY_UPDATED, 'category');
export const doCategoryError = makeActionCreator(CATEGORY_ERROR, 'error');

export function doCategoryFetch() {

    return (dispatch, getState) => {
        let cs = getState().categories.index;

        if (!cs || cs.length == 0) {

            return FetchUtils.get(dispatch, CATEGORY_URL, {}, doCategoryReceive, doCategoryError);
        }
    };
}

export function doCategorySave(category) {
    let cid = category.id;
    let url = CATEGORY_URL + (cid === 'new' ? '' : '/' + cid);

    return dispatch => {
        if (cid === 'new') {
            return FetchUtils.post(dispatch, url, category, doCategoryUpdated, doCategoryError);
        } else {
            return FetchUtils.put(dispatch, url, category, doCategoryUpdated, doCategoryError);
        }
    };
}
