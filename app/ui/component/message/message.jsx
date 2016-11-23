import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import './message.scss';

const Message = ({id, title, text, texthtml, authorName, createdAt, categories, prettyUrl, withLink}) => {

    let cats = null;
    let innerTitle = null;

    if (categories) {
        cats = categories.map((v, i) => {
            return <span key={v.id} className="category">{v.name}</span> ;
        });
    }

    if (withLink) {
        innerTitle = <Link to={'/blog/' + id}>{title}</Link>;
    } else {
        innerTitle = title;
    }

    return (
        <article className="blog-message">
            <header>
                <h1>{innerTitle}</h1>
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
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    authorName: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    categories: PropTypes.array,
    prettyUrl: PropTypes.string.isRequired,
    withLink: PropTypes.bool
};

export default Message;