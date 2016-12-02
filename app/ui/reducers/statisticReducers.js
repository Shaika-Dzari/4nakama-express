import {STATS_RECEIVED} from '../actions/statisticActions.js';

export function statisticReducers(state = {items: []}, action) {
    switch (action.type) {
        case STATS_RECEIVED:
            return Object.assign({}, state, {items: action.stats});
        default:
            return state;
    }
}
