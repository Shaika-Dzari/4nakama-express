import {FILE_UPLOAD_ONCHANGE} from '../actions/fileActions.js';

export function fileReducers(state = {items: {}, index: []}, action) {

    switch (action.type) {
        case FILE_UPLOAD_ONCHANGE:
            return Object.assign({}, state, {uploadfiles: action.files});
        default: return state;
    }
}