import React, {PropType} from 'react';
import {Link} from 'react-router';

import './message.scss';

const Message = (props) => {


    var cats = null;

    if (props.categories) {
        cats = props.categories.map((v, i) => {
            return <span key={v._id}>{v.name}</span> ;
        });
    }

    return (
        <article className="blog-message">
            <header>
                <h1>{props.title}</h1>

                <div className="row">
                    <div className="col-6">
                        <p>{props.authorName} - {props.createdAt}</p>
                    </div>
                    <div className="col-6 right">
                        {cats}
                    </div>
                </div>

            </header>

            <div className="blog-message-body">
                <div dangerouslySetInnerHTML={{__html: props.texthtml}}></div>
            </div>

        </article>
    );
}

Message.propTypes = {
    title: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    authorName: React.PropTypes.string.isRequired,
    createdAt: React.PropTypes.string.isRequired,
    categories: React.PropTypes.array
};

export default Message;