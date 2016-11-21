import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Message from '../../component/message/message.jsx';
import {doCommentFetch} from '../../actions/commentActions.js';

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

        return (
            <div className="row">
                <div className="col-10">
                    <Message {...this.props.message} />
                </div>
                <div className="col-2">

                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(MessagePage);