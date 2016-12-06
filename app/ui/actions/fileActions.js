import 'whatwg-fetch';
import { push } from 'react-router-redux';
import {doStartLoading, doStopLoading} from './navigationActions.js';
import makeActionCreator from './actionCreator.js';
import FileUploadUtils from '../utils/FileUploadUtils.js';
import { getUrlParamsString } from '../utils/UrlParamUtils.js';

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

export function doFileFetch(pageParams) {
    return dispatch => {
            dispatch(doStartLoading());

            let urlParams = getUrlParamsString(pageParams);

            return fetch(FILE_URL + urlParams, {credentials: 'include'})
                    .then(fs => fs.json())
                    .then(files => {
                        dispatch(doStopLoading());
                        dispatch(doFileReceived(files, pageParams));
                        dispatch(push('/dashboard/files' + urlParams));
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
