import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Message from '../../component/message/message.jsx';
import {doCommentFetch} from '../../actions/commentActions.js';

import CommentBox from '../../component/commentbox/commentbox.jsx';
import Comment from '../../component/comment/comment.jsx';

import './messagepage.scss';

const mapStateToProps = (state, ownProps) => {
    let messageId = ownProps.params.messageId
    return {
        selectedid: messageId,
        message: state.messages.items[messageId],
        comments: state.comments.items,
        commentsindex: state.comments.index
    };
}

class MessagePage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props
        if (this.props.selectedid) {
            dispatch(doCommentFetch(this.props.selectedid));
        }
    }

    render() {

        let commentlist = null;

        if (this.props.commentsindex && this.props.commentsindex.length > 0) {
            commentlist = this.props.commentsindex.map(i => {
                let c = this.props.comments[i];
                return <Comment key={'comment-' + c.id} name={c.authorname} body={c.body} />
            });
        } else {
            commentlist = 'No comment yet.';
        }

        return (
            <div className="row">
                <div className="col-10">
                    <div className="messagepage-details">

                        <Message {...this.props.message} />
                        <CommentBox messageId={this.props.selectedid} />
                        <div className="messagepage-comments">
                            {commentlist}
                        </div>
                    </div>
                </div>
                <div className="col-2">

                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(MessagePage);