import React, {PropType} from 'react';
import {Link} from 'react-router';
import TagList from '../taglist/taglist.jsx';

import './message.scss';

const Message = (props) => {

    var subTitle = 'Par ' + props.authorName + ', le ' + props.createdAt;
    var tags = null;
    var cats = null;

    if (props.tags) {
        tags = <TagList data={props.tags} />;
    }

    if (props.categories) {
        cat = props.categories.map((v, i) => {
            return <span key={v._id}>{v.name}</span> ;
        });
    }

    return (
        <article className="blog-message">
            <header>
                <h3>{props.title}</h3>
                <p>{subTitle}</p>
            </header>

            <div className="blog-message-body">
                {props.text}
            </div>

            <footer>
                <div className="row">
                    <div className="col-6">
                        {cats}
                    </div>
                    <div className="col-6">
                        {tags}
                    </div>
                </div>
            </footer>
        </article>
    );
}

Message.propTypes = {
    title: React.PropTypes.string.isRequired,
    text: React.PropTypes.string.isRequired,
    authorName: React.PropTypes.string.isRequired,
    createdAt: React.PropTypes.instanceOf(Date).isRequired,
    categories: React.PropTypes.array,
    tags: React.PropTypes.array
};

export default Message;