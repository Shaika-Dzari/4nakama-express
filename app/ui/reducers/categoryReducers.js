import {CATEGORY_RECEIVE} from '../actions/categoryActions.js';


export function categoryReducers(state = {items: []}, action) {
    switch (action.type) {
        case CATEGORY_RECEIVE:
            return Object.assign({}, state, {items: action.categories});
        default:
            return state;
    }
}