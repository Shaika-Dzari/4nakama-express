const logger = store => next => action => {
    let actionType = action.type;
    let result = next(action);
    console.log('> ' + actionType, store.getState());
    return result;
}

export default logger;
