import 'whatwg-fetch';
import {doStartLoading, doStopLoading} from './navigationActions.js';
import makeActionCreator from './actionCreator.js';

const STATS_URL = "/api/statistics";

export const STATS_FETCH = 'STATS_FETCH';
export const STATS_RECEIVED = 'STATS_RECEIVED';
export const STATS_REFRESH = 'STATS_REFRESH';

export const doStatsReceived = makeActionCreator(STATS_RECEIVED, 'stats');

export function doStatsFetch() {
    return dispatch => {
        dispatch(doStartLoading());

        return fetch(STATS_URL, {credentials: 'include'})
                    .then(s => s.json())
                    .then(stats => {
                        dispatch(doStopLoading());
                        dispatch(doStatsReceived(stats));
                    })
                    .catch(e => {
                        dispatch(doStopLoading());
                        //dispatch(doFileRequestError(e));
                    });
    };
}
export function doStatsRefresh() {

}