import { COMMENT_RECEIVE, COMMENT_SAVED, COMMENT_SAVEDERROR, COMMENT_EMAIL_KP, COMMENT_NAME_KP, COMMENT_TEXT_KP } from '../actions/commentActions.js';
import {indexes} from '../utils/IndexReducer.js';

const sortComment = (c0, c1) => {
    return c0.createdat.getTime() - c1.createdat.getTime();
};

export function commentReducers(state = {items: {}, index: [], newcomment: {}}, action) {
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

        default:
            return state;
    }

}