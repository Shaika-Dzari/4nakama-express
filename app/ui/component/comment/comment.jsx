import React from 'react';

const Comment = ({name, body}) => {
    return (
        <div className="box">
            <div className="body">
                <p>{body}</p>
            </div>
            <div className="footer right">
                By {name}
            </div>
        </div>
    );
}

export default Comment;