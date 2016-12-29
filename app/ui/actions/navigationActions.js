export const STARTLOADING = 'STARTLOADING';
export const STOPLOADING = 'STOPLOADING';
export const GLOBAL_ERROR = 'GLOBAL_ERROR';

export function doStartLoading() {
    return {
        type: STARTLOADING
    }
}

export function doStopLoading() {
    return {
        type: STOPLOADING
    }
}

export function doRaiseGlobalError(error) {
    return {
        type: GLOBAL_ERROR,
        error: error
    }
}
