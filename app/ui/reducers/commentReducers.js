import { COMMENT_RECEIVE, COMMENT_SAVED, COMMENT_SAVEDERROR } from '../actions/commentActions.js';

/*
{
    items: {
        1: {comment 1},
        2: {comment 2},
        3: {comment 3}
    },
    sortedindex: [2, 3, 1],
    msgindex: {
        21: [2, 3],
        22: [1]
    }
}

[0, 1, 2, 3, 4].reduce( (prev, curr) => prev + curr );

 */

const sortComment = (c0, c1) => {
    return c0.createdAt.getTime() - c1.createdAt.getTime();
};

export function commentReducers(state = {items: {}, sortedindex: [], msgindex: {}}, action) {
    switch (action.type) {
        case COMMENT_RECEIVE:
            let lstComment = action.comments.reduce( (p, c) => {
                p[c._id] = c;
                return p;
            }, {});

            let sortedindexPrime = [];
            let msgindexPrime = {};

            for (let c in lstComment) {

            }

        default:
            return state;
    }

}