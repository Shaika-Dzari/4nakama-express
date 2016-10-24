import {CATEGORY_RECEIVE} from '../actions/categoryActions.js';


export function categoryReducers(state = {items: {}, index: []}, action) {
    switch (action.type) {
        case CATEGORY_RECEIVE:

            var catList = {};
            var catIdx = [];

            if (action.categories) {
                action.categories.forEach(c => {
                    let id = c._id;
                    catList[id] = c;
                    catIdx.push(id);
                });
            }

            return Object.assign({}, state, {items: catList, index: catIdx});
        default:
            return state;
    }
}