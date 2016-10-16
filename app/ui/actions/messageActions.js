import 'whatwg-fetch';
import Remarkable from 'remarkable';
import {doStartLoading, doStopLoading} from './navigationActions.js';


export const MESSAGE_FETCH = 'MESSAGE_FETCH';
export const MESSAGE_OPEN  = 'MESSAGE_OPEN';
export const MESSAGE_RECEIVE  = 'MESSAGE_RECEIVE';

const remarkable = new Remarkable();

export function doMessageFetch(page) {

    return dispatch => {

        dispatch(doStartLoading());

        return fetch('/api/messages', {credentials: 'include'})
                .then(r => r.json())
                .then(msgs => {

                    dispatch(doStopLoading());

                    // Parse Markdown
                    if (msgs && msgs.length > 0) {
                        for (let msg of msgs) {
                            msg.texthtml = remarkable.render(msg.text);
                        }
                    }

                    dispatch(doMessageReceive(msgs, page));
                });
    }
}

export function doMessageOpen(messageId) {
    return {type: MESSAGE_OPEN, messageId};
}

export function doMessageReceive(messages, page) {
   return {
        type: MESSAGE_RECEIVE,
        messages,
        page
    };
}