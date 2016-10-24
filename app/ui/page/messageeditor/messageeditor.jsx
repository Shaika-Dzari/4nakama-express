import React from 'react';
import { connect } from 'react-redux';
import AlertBox from '../../component/alertbox/alertbox.jsx';
import Editor from '../../component/editor/editor.jsx';
import CategoryEditor from '../../component/categoryeditor/categoryeditor.jsx';
import {doMessageEditorTitleChange, doMessageEditorTitleBlur,
        doMessageEditorPrettyUrlChange, doMessageEditorTextChange,
        doMessageEditorPublishedCheck, doMessageEditorCategoryCheck,
        doMessageEditorSave} from '../../actions/messageActions.js';

import './messageeditor.scss';

const MESSAGE_URL = '/api/messages';

const mapStateToProps = (state) => {

    let id = state.messages.selectedid;
    let msg = state.messages.items[id];

    return {
        messageId: id,
        title: msg.title,
        prettyUrl: msg.prettyUrl,
        text: msg.text,
        published: msg.published,
        categories: msg.categories,
        error: state.messages.error
    };
};

class MessageEditor extends React.Component {

    constructor(props) {
        super(props);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onTitleBlur = this.onTitleBlur.bind(this);
        this.onPrettyUrlChange = this.onPrettyUrlChange.bind(this);
        this.onPublishedClick = this.onPublishedClick.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);

    }

    onEditorChange(value) {
        const { dispatch } = this.props;
        dispatch(doMessageEditorTextChange(this.props.messageId, value));
    }

    onTitleChange(event) {
        let v = event.target.value;
        const { dispatch } = this.props;
        dispatch(doMessageEditorTitleChange(this.props.messageId, v));
    }

    onPrettyUrlChange(event) {
        let v = event.target.value;
        const { dispatch } = this.props;
        dispatch(doMessageEditorPrettyUrlChange(this.props.messageId, v));
    }

    onTitleBlur(event) {
        let v = event.target.value;
        const { dispatch } = this.props;
        dispatch(doMessageEditorTitleBlur(this.props.messageId, v));
    }

    onPublishedClick(event) {
        let published = event.target.checked;
        const { dispatch } = this.props;
        dispatch(doMessageEditorPublishedCheck(this.props.messageId, published));
    }

    onCategorySelect(category) {
        const { dispatch } = this.props;
        dispatch(doMessageEditorCategoryCheck(this.props.messageId, category));
    }

    onSave(event) {
        const { dispatch } = this.props;
        dispatch(doMessageEditorSave(this.props.messageId));
    }

    render() {

        return (
            <div className="message-editor-ctn box bluebox">
                <div className="heading">
                    <div className="row">
                        <div className="col-6">
                            <h4>#{this.props.messageId}</h4>
                        </div>
                        <div className="col-6 right">
                            <button className="btn" onClick={this.onSave}>Save</button>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <AlertBox message={this.props.error} />
                    <div className="row">
                        <div className="col-9">
                            <div className="box">
                                <div className="body">
                                    <div className="frm">
                                        <label htmlFor="msg-title">Titre</label>
                                        <input type="text" value={this.props.title} onChange={this.onTitleChange} onBlur={this.onTitleBlur} id="msg-title" />
                                        <label htmlFor="msg-url">URL</label>
                                        <input type="text" value={this.props.prettyUrl} onChange={this.onPrettyUrlChange} id="msg-url" />
                                        <label htmlFor="msg-text">Message</label>
                                        <Editor value={this.props.text} onEditorChange={this.onEditorChange} id="msg-text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="box">
                                <div className="body">
                                    <div className="box bluebox">
                                        <div className="heading">
                                            <h4>
                                                <input type="checkbox" defaultChecked={this.props.published} onClick={this.onPublishedClick} /> Publié
                                            </h4>
                                        </div>
                                    </div>
                                    <CategoryEditor onComponentSelect={this.onCategorySelect} selectedItems={this.props.categories} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}


export default connect(mapStateToProps)(MessageEditor);