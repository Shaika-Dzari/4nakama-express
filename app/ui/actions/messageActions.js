import 'whatwg-fetch';
import { push } from 'react-router-redux';
import {doStartLoading, doStopLoading} from './navigationActions.js';
import { getUrlParamsString } from '../utils/HtmlUtils.js';
import * as FetchUtils from '../utils/FetchUtils.js';
import Remarkable from 'remarkable';
import makeActionCreator from './actionCreator.js';

export const MSG_CACHE_HIT  = 'MSG_CACHE_HIT';
export const MSG_LIST_FETCH = 'MSG_LIST_FETCH';
export const MSG_OPEN = 'MSG_OPEN';
export const MSG_EDIT  = 'MSG_EDIT';
export const MSG_LIST_RECEIVE  = 'MSG_LIST_RECEIVE';
export const MSG_EDITOR_TITLE_CHANGE = 'MSG_EDITOR_TITLE_CHANGE';
export const MSG_EDITOR_TITLE_BLUR = 'MSG_EDITOR_TITLE_BLUE';
export const MSG_EDITOR_PRETTYURL_CHANGE = 'MSG_EDITOR_PRETTYURL_CHANGE';
export const MSG_EDITOR_TEXT_CHANGE = 'MSG_EDITOR_TEXT_CHANGE';
export const MSG_EDITOR_PUBL_CHECK = 'MSG_EDITOR_PUBL_CHECK';
export const MSG_EDITOR_CAT_CHECK = 'MSG_EDITOR_CAT_CHECK';
export const MSG_EDITOR_CAT_UNCHECK = 'MSG_EDITOR_CAT_UNCHECK';
export const MSG_UPDATE_RECEIVE = 'MSG_UPDATE_RECEIVE';
export const MSG_UPDATE_SAVEERROR = 'MSG_EDITOR_SAVEERROR';
export const MSG_CONSUME_PRELOAD = 'MSG_CONSUME_PRELOAD';

const MSG_URL = '/api/messages';
const remarkable = new Remarkable();

const MODULE_URLS = {
    blog: '/blog',
    about: '/about',
    project: '/project',
    story: '/story'
};

export function doMessageFetchAndGo(pageParams, modulecode = 'BLOG') {

    return (dispatch, getState) => {
        let urlParam = getUrlParamsString(pageParams);
        let clientUrl = MODULE_URLS[modulecode.toLowerCase()]
        dispatch(push(clientUrl + urlParam));

        if (!getState().messages.preloaded) {
            dispatch(doMessageFetch(pageParams));
        } else {
            dispatch(doMessageConsumePreload());
        }
    }
}

export function doMessageFetch(pageParams) {

    return (dispatch, getState) => {
        dispatch(doStartLoading());
        let urlParam = getUrlParamsString(pageParams);

        return fetch(MSG_URL + urlParam, {credentials: 'include'})
                .then(r => r.json())
                .then(msgs => {
                    dispatch(doStopLoading());
                    if (msgs) {
                        msgs.forEach(m => m.bodyhtml = remarkable.render(m.body));
                    }
                    dispatch(doMessagesReceive(msgs, pageParams));
                });
    }
}

export function doMessageFetchForEdit(messageId) {

    return (dispatch, getState) => {

        return fetch('/api/messages/' + messageId, {credentials: 'include'})
            .then(r => r.json())
            .then(msg => {
                    dispatch(doStopLoading());
                    dispatch(doMessageEditAndNavigate(msg));
                });
    };
}

export function doMessageEditorSave(messageId) {

    return (dispatch, getState) => {

        //let id = getState().messages.selectedMessage.id;
        let url = MSG_URL + (messageId === 'new' ? '' : '/' + messageId);
        let protocol = messageId === 'new' ? 'POST' : 'PUT';
        let message = getState().messages.items[messageId];


        let params = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: protocol,
            body: JSON.stringify(message),
            credentials: 'include'
        };

        dispatch(doStartLoading());

        return fetch(url, params)
            .then(r => r.json())
            .then(m => {
                dispatch(doStopLoading());

                if (m) {
                    m.bodyhtml = remarkable.render(m.body);
                }

                dispatch(doMessageUpdateReceive(m))
            }).catch(e => dispatch(doMessageEditorSaveError(e)));

    };
}

export function doMessageUpdateReceive(message) {
    return {
        type: MSG_UPDATE_RECEIVE,
        message
    }
}

export function doMessageEditAndNavigate(message) {
    return dispatch => {
        dispatch(doMessageEdit(message));
        dispatch(push('/dashboard/messages/' + message.id));
    }
}


export function doFilterAndNavigate(moduleid) {
    return dispatch => {
        dispatch(push('/dashboard/messages?moduleid=' + moduleid));
        return FetchUtils.get(dispatch, MSG_URL + '?moduleid=' + moduleid, {credentials: 'include'}, doMessagesReceive, doMessageEditorSaveError);
    }
}


export const doMessageEdit = makeActionCreator(MSG_EDIT, 'message');
export const doMessageOpen = makeActionCreator(MSG_OPEN, 'messageId');
export const doMessagesReceive = makeActionCreator(MSG_LIST_RECEIVE, 'messages', 'page');
export const doMessageEditorTextChange = makeActionCreator(MSG_EDITOR_TEXT_CHANGE, 'messageId', 'body');
export const doMessageEditorTitleChange = makeActionCreator(MSG_EDITOR_TITLE_CHANGE, 'messageId', 'title');
export const doMessageEditorTitleBlur = makeActionCreator(MSG_EDITOR_TITLE_BLUR, 'messageId', 'title');
export const doMessageEditorPrettyUrlChange = makeActionCreator(MSG_EDITOR_PRETTYURL_CHANGE, 'messageId', 'prettyurl');
export const doMessageEditorSaveError = makeActionCreator(MSG_UPDATE_SAVEERROR, 'error');
export const doMessageEditorPublishedCheck = makeActionCreator(MSG_EDITOR_PUBL_CHECK, 'messageId', 'published');
export const doMessageEditorCategoryCheck = makeActionCreator(MSG_EDITOR_CAT_CHECK, 'messageId', 'category');
export const doMessageEditorCategoryUnCheck = makeActionCreator(MSG_EDITOR_CAT_UNCHECK, 'messageId', 'category');
export const doMessageConsumePreload = makeActionCreator(MSG_CONSUME_PRELOAD);