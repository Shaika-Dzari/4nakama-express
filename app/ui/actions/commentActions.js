import 'whatwg-fetch';
import {doStartLoading, doStopLoading} from './navigationActions.js';
import makeActionCreator from './actionCreator.js';
export const COMMENT_FETCHFORMESSAGE = 'COMMENT_FETCHFORMESSAGE';
export const COMMENT_FETCH = 'COMMENT_FETCH';
export const COMMENT_SAVED = 'COMMENT_SAVED';
export const COMMENT_SAVEDERROR = 'COMMENT_SAVEDERROR';

const COMMENT_URL = "/api/messages/:messageId/comments"

export const doCommentFetchForMessage = makeActionCreator(COMMENT_FETCHFORMESSAGE);
export const doCommentFetch = makeActionCreator(COMMENT_FETCH, 'page');
export const doCommentSaved = makeActionCreator(COMMENT_SAVED, 'comment');
export const doCommentSavedError = makeActionCreator(COMMENT_SAVEDERROR, 'error');

export function doCommentAdd(messageId, comment) {

    return dispatch => {

        if (!messageId) {
            dispatch(doCommentSavedError(new Error('Missing message id.')));
            return;
        }

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
                    })
    }
}

export function doCommentApprove(commentId) {
    return dispatch => {
        if (!commentId) {
            dispatch(doCommentSavedError(new Error('Missing comment id.')));
            return;
        }

        return fetch(COMMENT_URL, {})
            .then(c = c.json())
            .then(c => {

            })
            .catch(e => {
                dispatch(doStopLoading());
                dispatch(doCommentSavedError(e));
            });

    }
}

export function doCommentDelete(commentId) {
    return dispatch => {
        if (!commentId) {
            dispatch(doCommentSavedError(new Error('Missing comment id.')));
            return;
        }

        return fetch(COMMENT_URL, {})
            .then(c = c.json())
            .then(c => {

            })
            .catch(e => {
                dispatch(doStopLoading());
                dispatch(doCommentSavedError(e));
            });

    }
}
