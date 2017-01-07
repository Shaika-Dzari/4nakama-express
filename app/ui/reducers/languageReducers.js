
export function languageReducers(state = {locale: 'en_CA'}, action) {
    switch (action.type) {
        case 'CHANGE_LANGUAGE':
            return {locale: action.locale};

        default:
            return state;
    }
}