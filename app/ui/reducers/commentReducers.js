import { COMMENT_RECEIVE, COMMENT_SAVED, COMMENT_SAVEDERROR, COMMENT_EMAIL_KP, COMMENT_NAME_KP, COMMENT_TEXT_KP, COMMENT_OPERATIONDONE } from '../actions/commentActions.js';
import {indexes} from '../utils/IndexReducer.js';

const sortComment = (c0, c1) => {
    return c0.createdat.getTime() - c1.createdat.getTime();
};

export function commentReducers(state = {items: {}, index: [], newcomment: {}, error: null}, action) {
    switch (action.type) {
        case COMMENT_RECEIVE:
            let receivedItems = indexes(action.comments);
            receivedItems['page'] = action.page;
            return Object.assign({}, state, receivedItems);

        case COMMENT_EMAIL_KP:
        case COMMENT_NAME_KP:
        case COMMENT_TEXT_KP:
            let anewcomment = Object.assign({}, state.newcomment, action);
            delete anewcomment.type;
            return Object.assign({}, state, {newcomment: anewcomment});

        case COMMENT_SAVED:
            return Object.assign({}, state, {newcomment: null});

        case COMMENT_SAVEDERROR:
            return Object.assign({}, state, {error: action.error.message});

        case COMMENT_OPERATIONDONE:

            let cid = parseInt(action.comment.id);
            let newitems = Object.assign({}, state.items);
            let newindex = [...state.index];
            let itemidx = newindex.indexOf(cid);

            if (itemidx != -1) {

                if (action.comment.operation == 'approved') {
                    newitems[cid].approved = true;
                } else if (action.comment.operation == 'deleted') {
                    newindex.splice(itemidx, 1);
                    delete newitems[cid];
                }

                return Object.assign({}, state, {items: newitems, index: newindex});
            }

        default:
            return state;
    }

}