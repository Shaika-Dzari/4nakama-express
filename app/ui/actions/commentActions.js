import makeActionCreator from './actionCreator.js';
import { getUrlParamsString } from '../utils/HtmlUtils.js';
import * as FetchUtils from '../utils/FetchUtils.js';

const COMMENT_URL = "/api/comments";

export const COMMENT_RECEIVE = 'COMMENT_RECEIVE';
export const COMMENT_OPERATIONDONE = 'COMMENT_OPERATIONDONE';
export const COMMENT_SAVED = 'COMMENT_SAVED';
export const COMMENT_SAVEDERROR = 'COMMENT_SAVEDERROR';
export const COMMENT_EMAIL_KP = 'COMMENT_EMAIL_KP';
export const COMMENT_NAME_KP = 'COMMENT_NAME_KP';
export const COMMENT_TEXT_KP = 'COMMENT_TEXT_KP';

export const doCommentReceive = makeActionCreator(COMMENT_RECEIVE, 'comments', 'page');
export const doCommentSaved = makeActionCreator(COMMENT_SAVED, 'comment');
export const doCommentSavedError = makeActionCreator(COMMENT_SAVEDERROR, 'error');
export const doCommentEmailKp = makeActionCreator(COMMENT_EMAIL_KP, 'email');
export const doCommentNameKp = makeActionCreator(COMMENT_NAME_KP, 'name');
export const doCommentTextKp = makeActionCreator(COMMENT_TEXT_KP, 'text');
export const doCommentOperationDone = makeActionCreator(COMMENT_OPERATIONDONE, 'comment');

export function doCommentFetch(messageId, page) {
    let urlParam = getUrlParamsString(page, messageId ? ['messageid=' + encodeURIComponent(messageId)] : null);

    return dispatch => {
        return FetchUtils.get(dispatch, COMMENT_URL + urlParam, {credentials: 'include'}, doCommentReceive, doCommentSavedError);
    };
}

export function doCommentAdd(messageId, comment) {
    if (!messageId) {
        dispatch(doCommentSavedError(new Error('Missing message id.')));
        return;
    }

    comment.messageId = messageId;

    return dispatch => {
        return FetchUtils.post(dispatch, COMMENT_URL, comment, doCommentSaved, doCommentSavedError);
    };
}

export function doCommentApprove(commentId) {
    return doCommentOperation(commentId, 'approve');
}

export function doCommentDelete(commentId) {
    return doCommentOperation(commentId, 'delete');
}

export function doCommentOperation(commentId, operation) {

    if (!commentId) {
        dispatch(doCommentSavedError(new Error('Missing comment id.')));
        return;
    }

    return dispatch => {
        return FetchUtils.put(dispatch, COMMENT_URL + '/' + commentId, {operation: operation}, doCommentOperationDone, doCommentSavedError);
    }

}
