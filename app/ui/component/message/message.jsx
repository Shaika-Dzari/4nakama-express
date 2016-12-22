import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import './message.scss';

const Message = ({id, title, body, bodyhtml, authorname, createdat, categories, prettyurl, withLink, permurl}) => {

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
                <h5>{permurl}</h5>
                <div className="row">
                    <div className="col-6">
                        <p>{authorname} - {createdat}</p>
                    </div>
                    <div className="col-6 right">
                        {cats}
                    </div>
                </div>
            </header>

            <div className="blog-message-body">
                <div dangerouslySetInnerHTML={{__html: bodyhtml}}></div>
            </div>

        </article>
    );
}

Message.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    authorname: PropTypes.string.isRequired,
    createdat: PropTypes.string.isRequired,
    categories: PropTypes.array,
    prettyurl: PropTypes.string.isRequired,
    permurl: PropTypes.string.isRequired,
    withLink: PropTypes.bool
};

export default Message;