import {FILE_UPLOAD_ONCHANGE, FILE_UPLOAD_REMOVE, FILE_UPLOAD_ERROR, FILE_UPLOAD_SUCCESS, FILE_UPLOAD_PROGRESS,
        FILE_RECEIVED, FILE_REQUESTERROR, FILE_ADDED, FILE_COPYTOSTORE} from '../actions/fileActions.js';
import {indexes} from '../utils/IndexReducer.js';

export function fileReducers(state = {items: {}, index: [], buffer: []}, action) {

    switch (action.type) {

        case FILE_RECEIVED:
            let receivedItems = indexes(action.files);
            receivedItems['page'] = action.page;
            return Object.assign({}, state, receivedItems);

        case FILE_REQUESTERROR:
            return Object.assign({}, state, {error: action.error});

        case FILE_ADDED:
            let currentindex = [...state.index];
            currentindex.splice(0, 0, action.file.id);
            let currentfiles = Object.assign({}, state.items);
            currentfiles[action.file.id] = action.file;
            return Object.assign({}, state, {items: currentfiles, index: currentindex});

        case FILE_COPYTOSTORE:
            let currentBuffer = [...state.buffer];
            currentBuffer.push(action.id);
            return Object.assign({}, state, {buffer: currentBuffer});

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

        case FILE_UPLOAD_REMOVE:
            let fs = Object.assign({}, state);
            delete fs[action.name];
            return fs;

        case FILE_UPLOAD_PROGRESS:
            let fileinprogress = Object.assign({}, state[action.name]);
            fileinprogress.progress = 100;
            return Object.assign({}, state, {[action.name]: fileinprogress});

        case FILE_UPLOAD_ERROR:
            let fileinerror = Object.assign({}, state[action.name]);
            fileinerror.error = action.error;
            return Object.assign({}, state, {[action.name]: fileinerror});


        default:
            return state;
    }
}