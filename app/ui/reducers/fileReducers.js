import {FILE_UPLOAD_ONCHANGE, FILE_RECEIVED, FILE_REQUESTERROR} from '../actions/fileActions.js';
import {indexes} from '../utils/IndexReducer.js';

export function fileReducers(state = {items: {}, index: []}, action) {

    switch (action.type) {
        case FILE_UPLOAD_ONCHANGE:
            return Object.assign({}, state, {uploadfiles: action.files});

        case FILE_RECEIVED:
            let receivedItems = indexes(action.files);
            receivedItems['page'] = action.page;
            return Object.assign({}, state, receivedItems);

        case FILE_REQUESTERROR:
            return Object.assign({}, state, {error: action.error});

        default: return state;
    }
}