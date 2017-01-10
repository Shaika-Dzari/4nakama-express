import { push } from 'react-router-redux';
import * as FetchUtils from '../utils/FetchUtils.js';
import makeActionCreator from './actionCreator.js';

export const MODULE_LIST_RECEIVE = 'MODULE_LIST_RECEIVE';

const MODULE_URL = '/api/modules';

export const doFetchModules = () => {
    return dispatch => {
        FetchUtils.get(dispatch, MODULE_URL, {}, doModulesReceive, {action: error => {
            dispatch(push('/error'));
        }})
    }
}

export const doModulesReceive = makeActionCreator(MODULE_LIST_RECEIVE, 'modules');