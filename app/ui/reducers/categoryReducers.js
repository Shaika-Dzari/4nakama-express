import expand from '../utils/StateUtils.js';

import {CATEGORY_RECEIVE, CATEGORY_UPDATED, CATEGORY_ERROR, CATEGORY_INPUT_CHANGE} from '../actions/categoryActions.js';

const initialState = {
    items: {},
    index: [],
    moduleindex: {}
};

export function categoryReducers(state = initialState, action) {
    switch (action.type) {

        case CATEGORY_RECEIVE:
            return expand(state, action.categories, action.moduleid, true);

        case CATEGORY_UPDATED:
            return expand(state, [action.category], action.category.moduleid);

        case CATEGORY_ERROR:
            return Object.assign({}, state, {error: action.error});

        case CATEGORY_INPUT_CHANGE:
            return Object.assign({}, state, {newcategoryname: action.categoryname});

        default:
            return state;
    }
}
