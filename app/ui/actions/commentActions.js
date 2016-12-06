import 'whatwg-fetch';
import {doStartLoading, doStopLoading} from './navigationActions.js';
import makeActionCreator from './actionCreator.js';
import { getUrlParamsString } from '../utils/UrlParamUtils.js';

export const COMMENT_RECEIVE = 'COMMENT_RECEIVE';
export const COMMENT_SAVED = 'COMMENT_SAVED';
export const COMMENT_SAVEDERROR = 'COMMENT_SAVEDERROR';

const COMMENT_URL = "/api/comments";

function doCommentOperation(commentId, operation) {

    let params = {
        method: 'POST',
        body: 'op=' + operation,
        credentials: 'include'
    };

    return dispatch => {

        if (!commentId) {
            dispatch(doCommentSavedError(new Error('Missing comment id.')));
            return;
        }

        return fetch(COMMENT_URL + '/' + commentId, params)
            .then(c = c.json())
            .then(c => {
                dispatch(doStopLoading());
                dispatch(doCommentSaved(c));
            })
            .catch(e => {
                dispatch(doStopLoading());
                dispatch(doCommentSavedError(e));
            });
    }
}


export const doCommentReceive = makeActionCreator(COMMENT_RECEIVE, 'comments', 'page');
export const doCommentSaved = makeActionCreator(COMMENT_SAVED, 'comment');
export const doCommentSavedError = makeActionCreator(COMMENT_SAVEDERROR, 'error');

export function doCommentFetch(messageId, page) {
    return dispatch => {
        dispatch(doStartLoading());
        let urlParam = getUrlParamsString(page, messageId ? ['messageid=' + encodeURIComponent(messageId)] : null);

        return fetch(COMMENT_URL + urlParam, {credentials: 'include'})
                    .then(c => c.json())
                    .then(c => {
                        dispatch(doStopLoading());
                        dispatch(doCommentReceive(c));
                    })
                    .catch(e => {
                        dispatch(doStopLoading());
                        dispatch(doCommentSavedError(e));
                    })
    };
}

export function doCommentAdd(messageId, comment) {

    return dispatch => {

        if (!messageId) {
            dispatch(doCommentSavedError(new Error('Missing message id.')));
            return;
        }

        let params = {
            method: 'POST',
            body: JSON.stringify(comment),
            credentials: 'include'
        };

        dispatch(doStartLoading());

        return fetch(COMMENT_URL.replace(':messageId', messageId), params)
                    .then(c = c.json())
                    .then(c => {
                        dispatch(doStopLoading());
                        dispatch(doCommentSaved(c));
                    })
                    .catch(e => {
                        dispatch(doStopLoading());
                        dispatch(doCommentSavedError(e));
                    });
    }
}

export function doCommentApprove(commentId) {
    return doCommentOperation(commentId, 'approve');
}

export function doCommentDelete(commentId) {
    return doCommentOperation(commentId, 'delete');
}
