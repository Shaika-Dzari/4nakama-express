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
        messageId: ownProps.messageId,
        error: state.comments.error
    };
}

class CommentBox extends React.Component {

    constructor(props) {
        super(props);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onNameChange = this.onNameChange.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.state = {
            classes : {
                name: '', email: '', body: ''
            }
        }
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
        if (this.validate()) {

            let comment = {
                name: this.props.name,
                email: this.props.email,
                text: this.props.text
            }

            dispatch(doCommentAdd(this.props.messageId, comment));
        }
    }

    validate() {
        let name = this.props.name;
        let email = this.props.email;
        let text = this.props.text;
        let connected = !!this.props.user;
        let cs = {name: '', email: '', body: ''};
        let ok = true;

        if (!connected) {

            if (!name || name.length < 3) {
                cs.name = 'validation-error';
                ok = false;
            }

            if (!email || !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
                cs.email = 'validation-error';
                ok = false;
            }

        }

        if (!text || text.length < 2) {
            cs.text = 'validation-error';
            ok = false;
        }

        this.setState({classes: cs});

        return ok;
    }

    render() {
        let a = null;

        if (!this.props.user) {
            a = <div>
                    <label htmlFor="comment-name">Name</label>
                    <input type="text" placeholder="Your name" id="comment-name"
                        value={this.props.name} onChange={this.onNameChange} className={this.state.classes.name}  />

                    <label htmlFor="comment-email">Email</label>
                    <input type="text" id="comment-email" placeholder="Email (will not be published)"
                        value={this.props.email} onChange={this.onEmailChange} className={this.state.classes.email} />
                </div>;

        } else {
            a = <span>Connected as {this.props.user.username}</span>;
        }

        let error = null;

        if (this.props.error) {
            error = <div>{this.props.error}</div>;
        }


        return (
            <div className="comment-box">

                <div className="frm">
                    {a}
                    <label htmlFor="comment-body">Your Comment</label>
                    <textarea name="commentbody" id="comment-body" rows="4"
                              value={this.props.text} onChange={this.onTextChange} className={this.state.classes.text}></textarea>
                    <div className="right">
                        <button className="btn" onClick={this.onSave}>Save</button>
                    </div>
                    {error}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(CommentBox);