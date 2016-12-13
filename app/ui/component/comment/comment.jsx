import React from 'react';

import './comment.scss';

const Comment = ({name, createdat, body}) => {
    return (
        <div className="box noborder single-comment">
            <div className="heading">
                <span className="comment-author">{name}</span> - <span className="comment-date">{createdat}</span>
            </div>
            <div className="body">
                <p>{body}</p>
            </div>

        </div>
    );
}

export default Comment;