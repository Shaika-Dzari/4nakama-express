import 'whatwg-fetch';
import Remarkable from 'remarkable';
import {doStartLoading, doStopLoading} from './navigationActions.js';

export const MSG_LIST_FETCH = 'MSG_LIST_FETCH';
export const MSG_OPEN  = 'MSG_OPEN';
export const MSG_EDIT  = 'MSG_EDIT';
export const MSG_LIST_RECEIVE  = 'MSG_LIST_RECEIVE';
export const MSG_EDITOR_TITLE_CHANGE = 'MSG_EDITOR_TITLE_CHANGE';
export const MSG_EDITOR_TITLE_BLUR = 'MSG_EDITOR_TITLE_BLUE';
export const MSG_EDITOR_PRETTYURL_CHANGE = 'MSG_EDITOR_PRETTYURL_CHANGE';
export const MSG_EDITOR_TEXT_CHANGE = 'MSG_EDITOR_TEXT_CHANGE';
export const MSG_UPDATE_RECEIVE = 'MSG_UPDATE_RECEIVE';
export const MSG_UPDATE_SAVEERROR = 'MSG_EDITOR_SAVEERROR';

const MSG_URL = '/api/messages';
const remarkable = new Remarkable();

export function doMessageFetch(page) {

    return dispatch => {

        dispatch(doStartLoading());

        return fetch(MSG_URL, {credentials: 'include'})
                .then(r => r.json())
                .then(msgs => {

                    dispatch(doStopLoading());

                    // Parse Markdown
                    if (msgs && msgs.length > 0) {
                        for (let msg of msgs) {
                            msg.texthtml = remarkable.render(msg.text);
                        }
                    }

                    dispatch(doMessagesReceive(msgs, page));
                });
    }
}

export function doMessageOpen(messageId) {
    return {type: MSG_OPEN, messageId};
}

export function doMessageFetchForEdit(messageId) {

    return (dispatch, getState) => {

        return fetch('/api/messages', {credentials: 'include'})
                .then(r => r.json())
                .then(msg => {
                    dispatch(doStopLoading());
                    dispatch(doMessageEdit(msg));
                });
    };
}

export function doMessageEdit(editMessage) {
    return {
        type: MSG_EDIT,
        editMessage
    }
}



export function doMessagesReceive(messages, page) {
   return {
        type: MSG_LIST_RECEIVE,
        messages,
        page
    };
}

export function doMessageEditorTitleChange(value) {
    return {
        type: MSG_EDITOR_TITLE_CHANGE,
        value
    }
}

export function doMessageEditorTitleBlur(value) {
    return {
        type: MSG_EDITOR_TITLE_BLUR,
        value
    }
}

export function doMessageEditorPrettyUrlChange(value) {
    return {
        type: MSG_EDITOR_PRETTYURL_CHANGE,
        value
    }
}

export function doMessageEditorTextChange(value) {
    return {
        type: MSG_EDITOR_TEXT_CHANGE,
        value
    }
}

export function doMessageEditorSaveError(error) {
    return {
        type: MSG_UPDATE_SAVEERROR,
        error
    };
}

export function doMessageUpdateReceive(message) {
    return {
        type: MSG_UPDATE_RECEIVE,
        message
    }
}

export function doMessageEditorSave() {

    return (dispatch, getState) => {

        let id = getState().messages.selectedMessage.id;
        let url = MSG_URL + (id === 'new' ? '' : '/' + id);
        let protocol = id === 'new' ? 'PUT' : 'POST'
        let message = {}; // get from state

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