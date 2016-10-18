export const USER_LP_USERNAME_KEYPRESS = 'USER_LP_LOGIN_KEYPRESS';
export const USER_LP_PASSWD_KEYPRESS = 'USER_LP_PASSWD_KEYPRESS';
export const USER_LP_SUBMIT = 'USER_LP_SUBMIT';
export const USER_SUCCESS_LOGIN = 'USER_SUCCESS_LOGIN';
export const USER_BAD_CREDENTIAL = 'USER_BAD_CREDENTIAL';

export function doLoginPageUsernameKp(value) {
    return {
        type: USER_LP_USERNAME_KEYPRESS,
        value
    };
}

export function doLoginPagePasswdKp(value) {
    return {
        type: USER_LP_PASSWD_KEYPRESS,
        value
    };
}

export function doLoginPageSubmit() {
    return {
        type: USER_LP_SUBMIT
    };
}

export function doSuccessLogin(user) {
    return {
        type: USER_SUCCESS_LOGIN,
        user
    }
}


export function doBadCredential(error) {
    return {
        type: USER_BAD_CREDENTIAL,
        error
    };
}