import {CATEGORY_RECEIVE, CATEGORY_UPDATED, CATEGORY_ERROR} from '../actions/categoryActions.js';


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

        case CATEGORY_UPDATED:
            let index;

            if (state.index.indexOf(action.category._id) != -1) {
                index = this.state.index;
            } else {
                index = [...this.state.index];
                index.push(action.category._id);
            }
            let catList = Object.assign({}, this.state.items, {[action.category._id]: action.category});
            return Object.assign({}, state, {items: catList, index: catIdx});

        case CATEGORY_ERROR:
            return Object.assign({}, state, {error: action.error});

        default:
            return state;
    }
}