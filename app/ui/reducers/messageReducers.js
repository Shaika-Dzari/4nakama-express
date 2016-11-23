import {MSG_CACHE_HIT, MSG_LIST_FETCH, MSG_OPEN, MSG_EDIT, MSG_LIST_RECEIVE,
        MSG_EDITOR_TITLE_CHANGE, MSG_EDITOR_TITLE_BLUR, MSG_EDITOR_PRETTYURL_CHANGE, MSG_EDITOR_TEXT_CHANGE, MSG_EDITOR_PUBL_CHECK, MSG_EDITOR_CAT_CHECK,
        MSG_UPDATE_RECEIVE, MSG_EDITOR_CAT_UNCHECK , MSG_UPDATE_SAVEERROR} from '../actions/messageActions.js';

function updateMessage(messages, id, action) {
    let update = {};
    for (let k in action) {
        if (k != 'type') {
            update[k] = action[k];
        }
    }
    let msg = Object.assign({}, messages[id], update);
    return Object.assign({}, messages, {[id]: msg});
}

function computePrettyUrl(title) {

    let p = title.replace(/[!$?*&#\\]/g, '');
    p = p.replace(/[^a-z0-9_\-]/gi, '_');

    return p;
}

export function messageReducers(state = {items: {}, index: []}, action) {
    switch (action.type) {

        case MSG_LIST_RECEIVE:

            let msgList = {};
            let msgIdx = [];

            if (action.messages) {
                action.messages.forEach(m => {
                    let id = m.id;
                    msgList[id] = m;
                    msgIdx.push(id);
                });
            }

            return Object.assign({}, state, {items: msgList, index: msgIdx, page: action.page});

        case MSG_OPEN:
            return Object.assign({}, state, {selectedid: action.messageid});

        case MSG_EDIT:
            return Object.assign({}, state, {items: Object.assign({}, state.items, {[action.message.id]: action.message})});

        case MSG_UPDATE_SAVEERROR:
            return Object.assign({}, state, {error: action.error});

        case MSG_UPDATE_RECEIVE:
            let index;

            if (state.index.indexOf(action.message.id) != -1) {
                index = state.index;
            } else {
                index = [...state.index];
                index.push(action.message.id);
            }
            let msgUpdateList = Object.assign({}, state.items, {[action.message.id]: action.message});
            return Object.assign({}, state, {items: msgUpdateList, index: index});


        // Editor changes
        case MSG_EDITOR_TITLE_CHANGE:
        case MSG_EDITOR_TEXT_CHANGE:
        case MSG_EDITOR_PRETTYURL_CHANGE:
        case MSG_EDITOR_PUBL_CHECK:
            return Object.assign({}, state, {items: updateMessage(state.items, action.messageId, action)});

        case MSG_EDITOR_TITLE_BLUR:
            let prettyUrl = computePrettyUrl(action.title);
            return Object.assign({}, state, {items: updateMessage(state.items, action.messageId, {'prettyUrl': prettyUrl})});

        case MSG_EDITOR_CAT_CHECK:
            let csprime = [...state.items[action.messageId].categories];
            csprime.push(action.category);
            return Object.assign({}, state, {items: updateMessage(state.items, action.messageId, {'categories': csprime})});

        case MSG_EDITOR_CAT_UNCHECK:
            let cs = state.items[action.messageId].categories;

            if (cs && action.category) {
                let newCs = cs.filter(c => c.id != action.category.id);
                return Object.assign({}, state, {items: updateMessage(state.items, action.messageId, {'categories': newCs})});
            }

            return state;

        default:
            return state;
    }
}