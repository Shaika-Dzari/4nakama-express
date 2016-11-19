import { COMMENT_RECEIVE, COMMENT_SAVED, COMMENT_SAVEDERROR } from '../actions/commentActions.js';
import {indexes} from '../utils/IndexReducer.js';

const sortComment = (c0, c1) => {
    return c0.createdAt.getTime() - c1.createdAt.getTime();
};

export function commentReducers(state = {items: {}, index: []}, action) {
    switch (action.type) {
        case COMMENT_RECEIVE:
            let receivedItems = indexes(action.comments);
            receivedItems['page'] = action.page;
            return Object.assign({}, state, receivedItems);

        default:
            return state;
    }

}