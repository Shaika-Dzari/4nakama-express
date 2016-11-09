import 'whatwg-fetch';
import {doStartLoading, doStopLoading} from './navigationActions.js';
import makeActionCreator from './actionCreator.js';
import FileUploadUtils from '../utils/FileUploadUtils.js';

export const FILE_UPLOAD_ONCHANGE = 'FILE_UPLOAD_ONCHANGE';
export const FILE_UPLOAD_POSTALL = 'FILE_UPLOAD_POSTALL';
export const FILE_UPLOAD_ONEFILE = 'FILE_UPLOAD_ONEFILE';
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS';
export const FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';
export const FILE_UPLOAD_REMOVE = 'FILE_UPLOAD_REMOVE';
export const FILE_FETCH = 'FILE_FETCH';
export const FILE_RECEIVED = 'FILE_RECEIVED';
export const FILE_DELETE = 'FILE_DELETE';

const FILE_URL = "/api/files";

export const doFileUploadOnChange = makeActionCreator(FILE_UPLOAD_ONCHANGE, 'files');
export const doFileUploadSuccess = makeActionCreator(FILE_UPLOAD_SUCCESS, 'file');
export const doFileUploadProgress = makeActionCreator(FILE_UPLOAD_PROGRESS, 'progress');
export const doFileReceived = makeActionCreator(FILE_RECEIVED, 'files', 'page');


export function doFileUploadOneFile(file) {
    return dispatch => {
        let opts = {
            progressCallback: (progress) => {
                console.log('progressCallback', progress);
            },
            errorCallback: (request) => {
                console.log('errorCallback', request);
            },
            completeCallback: (request) => {
                console.log('completeCallback', request);
            }
        };

        let uploadUtils = new FileUploadUtils(FILE_URL, opts);
        uploadUtils.upload(file);
    }
}

export function doFileUploadPostAll() {
    return (dispatch, getState) => {
        for (let file of getState().files.uploadfiles) {
            dispatch(doFileUploadOneFile(file));
        }
    }
}