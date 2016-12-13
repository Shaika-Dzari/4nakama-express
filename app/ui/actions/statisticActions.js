import * as FetchUtils from '../utils/FetchUtils.js';
import makeActionCreator from './actionCreator.js';

const STATS_URL = "/api/statistics";

export const STATS_FETCH = 'STATS_FETCH';
export const STATS_RECEIVED = 'STATS_RECEIVED';
export const STATS_REFRESH = 'STATS_REFRESH';

export const doStatsReceived = makeActionCreator(STATS_RECEIVED, 'stats');

export function doStatsFetch() {
    return dispatch => {
        return FetchUtils.get(dispatch, STATS_URL, {credentials: 'include'}, doStatsReceived, (e) => console.log(e));
    };
}