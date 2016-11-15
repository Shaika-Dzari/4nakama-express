import {FILE_UPLOAD_ONCHANGE, FILE_RECEIVED, FILE_REQUESTERROR, FILE_UPLOAD_SUCCESS, FILE_ADDED} from '../actions/fileActions.js';
import {indexes} from '../utils/IndexReducer.js';

export function fileReducers(state = {items: {}, index: []}, action) {

    switch (action.type) {

        case FILE_RECEIVED:
            let receivedItems = indexes(action.files);
            receivedItems['page'] = action.page;
            return Object.assign({}, state, receivedItems);

        case FILE_REQUESTERROR:
            return Object.assign({}, state, {error: action.error});

        case FILE_ADDED:
            let currentindex = [...state.index];
            currentindex.splice(0, 0, action.file._id);
            let currentfiles = Object.assign({}, state.items);
            currentfiles[action.file._id] = action.file;
            return Object.assign({}, state, {items: currentfiles, index: currentindex});

        default: return state;
    }
}

export function fileUploadReducers(state = {}, action) {

    switch (action.type) {
        case FILE_UPLOAD_ONCHANGE:
            let uploadedFiles = {};
            action.files.forEach(f => {
                uploadedFiles[f.name] = {file: f, progress: 0, completed: false};
            });

            return Object.assign({}, state, uploadedFiles);


        case FILE_UPLOAD_SUCCESS:
            let file = Object.assign({}, state[action.file.name]);
            file.progress = 100;
            file.completed = true;
            return Object.assign({}, state, {[action.file.name]: file});


        default:
            return state;
    }
}