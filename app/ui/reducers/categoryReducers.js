import {CATEGORY_RECEIVE, CATEGORY_UPDATED, CATEGORY_ERROR} from '../actions/categoryActions.js';


export function categoryReducers(state = {items: {}, index: [], moduleindex: {}}, action) {
    switch (action.type) {

        case CATEGORY_RECEIVE:

            let catList = {};
            let catIdx = [];
            let modidx = {};

            if (action.categories) {
                action.categories.forEach(c => {
                    let id = c.id;
                    catList[id] = c;
                    catIdx.push(id);

                    if (!modidx[c.moduleid]) {
                        modidx[c.moduleid] = [];
                    }

                    modidx[c.moduleid].push(id);
                });
            }

            return Object.assign({}, state, {items: catList, index: catIdx});

        case CATEGORY_UPDATED:
            let index;

            if (state.index.indexOf(action.category.id) != -1) {
                index = state.index;
            } else {
                index = [...state.index];
                index.push(action.category.id);
            }
            let upcatList = Object.assign({}, state.items, {[action.category.id]: action.category});
            return Object.assign({}, state, {items: upcatList, index: index});

        case CATEGORY_ERROR:
            return Object.assign({}, state, {error: action.error});

        default:
            return state;
    }
}