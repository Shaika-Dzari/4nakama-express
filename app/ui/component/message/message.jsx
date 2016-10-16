import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import './message.scss';

const Message = ({title, text, texthtml, authorName, createdAt, categories}) => {

    var cats = null;

    if (categories) {
        cats = categories.map((v, i) => {
            return <span key={v._id}>{v.name}</span> ;
        });
    }

    return (
        <article className="blog-message">
            <header>
                <h1>{title}</h1>

                <div className="row">
                    <div className="col-6">
                        <p>{authorName} - {createdAt}</p>
                    </div>
                    <div className="col-6 right">
                        {cats}
                    </div>
                </div>

            </header>

            <div className="blog-message-body">
                <div dangerouslySetInnerHTML={{__html: texthtml}}></div>
            </div>

        </article>
    );
}

Message.propTypes = {
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    categories: PropTypes.array
};

export default Message;