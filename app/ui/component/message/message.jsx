import React, {PropType} from 'react';
import {Link} from 'react-router';

import './message.scss';

const Message = (props) => {

    var subTitle = 'Par ' + props.authorName + ', le ' + props.createdAt;

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
                        Catégories
                    </div>
                    <div className="col-6">
                        Tags
                    </div>
                </div>
            </footer>
        </article>
    );
}


export default Message;