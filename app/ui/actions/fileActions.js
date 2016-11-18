import 'whatwg-fetch';
import {doStartLoading, doStopLoading} from './navigationActions.js';
import makeActionCreator from './actionCreator.js';
import FileUploadUtils from '../utils/FileUploadUtils.js';

export const FILE_UPLOAD_ONCHANGE = 'FILE_UPLOAD_ONCHANGE';
export const FILE_UPLOAD_POSTALL = 'FILE_UPLOAD_POSTALL';
export const FILE_UPLOAD_ONEFILE = 'FILE_UPLOAD_ONEFILE';
export const FILE_UPLOAD_SUCCESS = 'FILE_UPLOAD_SUCCESS';
export const FILE_UPLOAD_ERROR = 'FILE_UPLOAD_ERROR';
export const FILE_UPLOAD_PROGRESS = 'FILE_UPLOAD_PROGRESS';
export const FILE_UPLOAD_REMOVE = 'FILE_UPLOAD_REMOVE';
export const FILE_FETCH = 'FILE_FETCH';
export const FILE_RECEIVED = 'FILE_RECEIVED';
export const FILE_ADDED = 'FILE_ADDED';
export const FILE_DELETE = 'FILE_DELETE';
export const FILE_REQUESTERROR = 'FILE_REQUESTERROR';
export const FILE_COPYTOSTORE = 'FILE_COPYTOSTORE';

const FILE_URL = "/api/files";

export const doFileUploadOnChange = makeActionCreator(FILE_UPLOAD_ONCHANGE, 'files');
export const doFileUploadSuccess = makeActionCreator(FILE_UPLOAD_SUCCESS, 'file');
export const doFileUploadError = makeActionCreator(FILE_UPLOAD_ERROR, 'name', 'error');
export const doFileUploadRemove = makeActionCreator(FILE_UPLOAD_REMOVE, 'name');
export const doFileUploadProgress = makeActionCreator(FILE_UPLOAD_PROGRESS, 'name', 'progress');
export const doFileReceived = makeActionCreator(FILE_RECEIVED, 'files', 'page');
export const doFileRequestError = makeActionCreator(FILE_REQUESTERROR, 'error');
export const doFileAdded = makeActionCreator(FILE_ADDED, 'file');
export const doFileCopyToStore = makeActionCreator(FILE_COPYTOSTORE, 'id');

export function doFileUploadOneFile(file) {
    return dispatch => {
        let opts = {
            progressCallback: (progress) => {
                dispatch(doFileUploadProgress(file.name, progress));
            },
            errorCallback: (request) => {
                dispatch(doFileUploadError(file.name, request));
            },
            completeCallback: (status, request) => {
                dispatch(doFileUploadSuccess(request));
                dispatch(doFileAdded(request));
            }
        };

        let uploadUtils = new FileUploadUtils(FILE_URL, opts);
        uploadUtils.upload(file);
    }
}

export function doFileUploadPostAll() {
    return (dispatch, getState) => {
        for (let fileObj in getState().uploadfiles) {
            let file = getState().uploadfiles[fileObj].file;
            dispatch(doFileUploadOneFile(file));
        }
    }
}

export function doFileFetch(page) {
    return dispatch => {
            dispatch(doStartLoading());

            let body = [];
            let urlParams = '';

            if (page) {

                if (page.fromdate)
                    body.push('fromdate=' + encodeURIComponent(page.fromdate));

                if (page.sort)
                    body.push('sort=' + encodeURIComponent(page.sort || '-1'));

                if (page.dir)
                    body.push('dir=' + encodeURIComponent(page.dir || 'next'));

                urlParams = '?' + body.join('&');
            }

            return fetch(FILE_URL + urlParams, {credentials: 'include'})
                    .then(fs => fs.json())
                    .then(files => {
                        dispatch(doStopLoading());
                        dispatch(doFileReceived(files, page));
                    })
                    .catch(e => {
                        dispatch(doStopLoading());
                        dispatch(doFileRequestError(e));
                    });
    };
}

export function doFileDelete(fileid) {
    //TODO
}
