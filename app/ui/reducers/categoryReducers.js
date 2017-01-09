import expand from '../utils/StateUtils.js';

import {CATEGORY_RECEIVE, CATEGORY_UPDATED, CATEGORY_ERROR} from '../actions/categoryActions.js';


export function categoryReducers(state = {items: {}, index: [], moduleindex: {}}, action) {
    switch (action.type) {

        case CATEGORY_RECEIVE:
            return expand(state, action.categories);

        case CATEGORY_UPDATED:
            return expand(state, [action.category]);

        case CATEGORY_ERROR:
            return Object.assign({}, state, {error: action.error});

        default:
            return state;
    }
}