import React, {PropType} from 'react';
import {Link} from 'react-router';

const Message = (props) => {

    var subTitle = 'Par ' + this.props.authorName + ', le ' + this.props.createdAt;

    return (
        <article className="blogpost">
            <header>
                <h1>{this.props.title}</h1>
                <p>{subTitle}</p>
            </header>
            <p>
                {this.props.text}
            </p>

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