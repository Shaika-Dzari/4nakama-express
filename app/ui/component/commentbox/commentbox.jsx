import React from 'react';
import { connect } from 'react-redux';

import {doCommentEmailKp, doCommentNameKp, doCommentTextKp, doCommentAdd} from '../../actions/commentActions.js';

import './commentbox.scss';

const mapStateToProps = (state, ownProps) => {
    let u = state.user ? state.user.connectedUser : null;
    let newcomment = state.comments.newcomment || {};
    return {
        user: u,
        name: newcomment.name || '',
        email: newcomment.email || '',
        text: newcomment.text || '',
        messageId: ownProps.messageId
    };
}

class CommentBox extends React.Component {

    constructor(props) {
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onEmailChange(event) {
        event.preventDefault();
        const {dispatch} = this.props;
        dispatch(doCommentEmailKp(event.target.value));
    }

    onNameChange(event) {
        event.preventDefault();
        const {dispatch} = this.props;
        dispatch(doCommentNameKp(event.target.value));
    }

    onTextChange(event) {
        event.preventDefault();
        const {dispatch} = this.props;
        dispatch(doCommentTextKp(event.target.value));
    }

    onSave(event) {
        event.preventDefault();
        const {dispatch} = this.props;
        let comment = {
            name: this.props.name,
            email: this.props.email,
            text: this.props.text
        }

        dispatch(doCommentAdd(this.props.messageId, comment));
    }

    render() {
        let a = null;

        if (!this.props.user) {
            a = <div>
                <label htmlFor="comment-name">Name</label>
                <input type="text" placeholder="Your name" value={this.props.name} onChange={this.onNameChange} />

                <label htmlFor="comment-email">Email</label>
                <input type="text" id="comment-email" placeholder="Email (will not be published)" value={this.props.email} onChange={this.onEmailChange}  />
            </div>;

        } else {
            a = <span>Connected as {this.props.user.username}</span>;
        }

        return (
            <div className="comment-box">

                <div className="frm">
                    {a}
                    <label htmlFor="comment-body">Your Comment</label>
                    <textarea name="commentbody" id="comment-body" rows="4" value={this.props.text} onChange={this.onTextChange} ></textarea>
                    <div className="right">
                        <button className="btn" onClick={this.onSave}>Save</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CommentBox);