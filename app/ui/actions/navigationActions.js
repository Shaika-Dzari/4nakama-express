export const STARTLOADING = 'STARTLOADING';
export const STOPLOADING = 'STOPLOADING';

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