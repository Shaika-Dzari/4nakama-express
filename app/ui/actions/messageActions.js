import 'whatwg-fetch';
import Remarkable from 'remarkable';
import {  push } from 'react-router-redux';
import {doStartLoading, doStopLoading} from './navigationActions.js';

export const MSG_CACHE_HIT  = 'MSG_CACHE_HIT';
export const MSG_LIST_FETCH = 'MSG_LIST_FETCH';
export const MSG_OPEN = 'MSG_OPEN';
export const MSG_EDIT  = 'MSG DIT';
export const MSG_LIST_RECEIVE  = 'MSG_LIST_RECEIVE';
export const MSG_EDITOR_TITLE_CHANGE = 'MSG_EDITOR_TITLE_CHANGE';
export const MSG_EDITOR_TITLE_BLUR = 'MSG_EDITOR_TITLE_BLUE';
export const MSG_EDITOR_PRETTYURL_CHANGE = 'MSG_EDITOR_PRETTYURL_CHANGE';
export const MSG_EDITOR_TEXT_CHANGE = 'MSG_EDITOR_TEXT_CHANGE';
export const MSG_EDITOR_PUBL_CHECK = 'MSG_EDITOR_PUBL_CHECK';
export const MSG_EDITOR_CAT_CHECK = 'MSG_EDITOR_CAT_CHECK';
export const MSG_UPDATE_RECEIVE = 'MSG_UPDATE_RECEIVE';
export const MSG_UPDATE_SAVEERROR = 'MSG_EDITOR_SAVEERROR';

const MSG_URL = '/api/messages';
const remarkable = new Remarkable();

function makeActionCreator(type, ...argNames) {
    return function (...args) {
        let action = { type };
        argNames.forEach((arg, index) => {
            action[argNames[index]] = args[index]
        });
        return action;
    }
}

export function doMessageFetch(page) {

    return (dispatch, getState) => {

        if (getState() .messages && getState().messages.index && getState().messages.index.length > 0) {
            dispatch({type: MSG_CACHE_HIT});

        } else {

            dispatch(doStartLoading());

            return fetch(MSG_URL, {credentials: 'include'})
                    .then(r => r.json())
                    .then(msgs => {

                        dispatch(doStopLoading());

                        if(msgs && msgs.length > 0) {
                            for(let msg of msgs) {
                                msg.texthtml = remarkable.render(msg.text);
                            }
                        }

                        dispatch(doMessagesReceive(msgs, page));
                    });
        }
    }
}



export function doMessageFetchForEdit(messageId) {

    return (dispatch, getState) => {

        return fetch('/api/messages/' + messageId, {credentials: 'include'})
            .then(r => r.json())
            .then(msg => {
                    dispatch(doStopLoading());
                    dispatch(doMessageEdit(msg));
                    dispatch(push('/dashboard/messages/' + messageId));
                });
    };
}

export function doMessageEditorSave(messageId) {

    return (dispatch, getState) => {

        //let id = getState().messages.selectedMessage.id;
        let url = MSG_URL + (messageId === 'new' ? '' : '/' + messageId);
        let protocol = messageId === 'new' ? 'PUT' : 'POST'
        let message = getState().messages[messageId];


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
            .then(r = r.json())
            .then(m => {
                dispatch(doStopLoading());
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


export const doMessageEdit = makeActionCreator(MSG_EDIT, 'message');
export const doMessageOpen = makeActionCreator(MSG_OPEN, 'messageId');
export const doMessagesReceive = makeActionCreator(MSG_LIST_RECEIVE, 'messages', 'page');
export const doMessageEditorTextChange = makeActionCreator(MSG_EDITOR_TEXT_CHANGE, 'messageId', 'text');
export const doMessageEditorTitleChange = makeActionCreator(MSG_EDITOR_TITLE_CHANGE, 'messageId', 'title');
export const doMessageEditorTitleBlur = makeActionCreator(MSG_EDITOR_TITLE_BLUR, 'messageId', 'title');
export const doMessageEditorPrettyUrlChange = makeActionCreator(MSG_EDITOR_PRETTYURL_CHANGE, 'messageId', 'prettyUrl');
export const doMessageEditorSaveError = makeActionCreator(MSG_UPDATE_SAVEERROR, 'error');
export const doMessageEditorPublishedCheck = makeActionCreator(MSG_EDITOR_PUBL_CHECK, 'messageId', 'published');
export const doMessageEditorCategoryCheck = makeActionCreator(MSG_EDITOR_CAT_CHECK, 'messageId', 'category');
