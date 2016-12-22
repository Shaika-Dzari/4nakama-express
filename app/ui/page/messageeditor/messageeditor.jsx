import React from 'react';
import { connect } from 'react-redux';
import AlertBox from '../../component/alertbox/alertbox.jsx';
import Editor from '../../component/editor/editor.jsx';
import CategoryEditor from '../../component/categoryeditor/categoryeditor.jsx';
import Clipboard from '../../component/clipboard/clipboard.jsx';

import {doMessageEditorTitleChange, doMessageEditorTitleBlur,
        doMessageEditorPrettyUrlChange, doMessageEditorTextChange,
        doMessageEditorPublishedCheck, doMessageEditorCategoryCheck,
        doMessageEditorCategoryUnCheck,
        doMessageEditorSave} from '../../actions/messageActions.js';

import './messageeditor.scss';

const MESSAGE_URL = '/api/messages';

const mapStateToProps = (state, ownProps) => {
    let id = ownProps.params.messageId;
    let msg = state.messages.items[id];
    let clipboards = [];
    let buffer = state.files.buffer;

    if (buffer) {
        clipboards = buffer.map(b => {
            let el = state.files.items[b];
            return {
                id: b,
                name: el.name,
                value: el.filepath
            };
        });
    }

    return {
        messageId: id,
        module: state.modules.items[msg.moduleid],
        title: msg.title,
        prettyurl: msg.prettyurl,
        text: msg.body,
        published: msg.published,
        categories: msg.categories,
        error: state.messages.error,
        clipboardElements: clipboards
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
        this.onCategoryUnSelect = this.onCategoryUnSelect.bind(this);
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
        let target = event.target;
        event.preventDefault();
        let pub = target.dataset.n4Value;
        const { dispatch } = this.props;
        // TODO : publish request instead
        dispatch(doMessageEditorPublishedCheck(this.props.messageId, pub == 'true'));
    }

    onCategorySelect(category) {
        const { dispatch } = this.props;
        dispatch(doMessageEditorCategoryCheck(this.props.messageId, category));
    }

    onCategoryUnSelect(category) {
        const { dispatch } = this.props;
        dispatch(doMessageEditorCategoryUnCheck(this.props.messageId, category));
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
                            <h4>#{this.props.messageId} - {this.props.title} - {this.props.module.name}</h4>
                        </div>
                        <div className="col-6 right">
                            {this.props.published ? <button className="btn" onClick={this.onPublishedClick} data-n4-value="false">Retirer</button> :
                                                    <button className="btn" onClick={this.onPublishedClick} data-n4-value="true">Publier</button>
                            }

                            <button className="btn" onClick={this.onSave}>Sauvegarder</button>
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
                                        <input type="text" value={this.props.prettyurl} onChange={this.onPrettyUrlChange} id="msg-url" />
                                        <label htmlFor="msg-text">Message</label>
                                        <Editor value={this.props.text} onEditorChange={this.onEditorChange} id="msg-text" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div className="box">
                                <div className="body">
                                    {this.props.module.enablecategory ?
                                        <CategoryEditor onComponentSelect={this.onCategorySelect}
                                                        onComponentUnSelect={this.onCategoryUnSelect}
                                                        selectedItems={this.props.categories} />
                                        :
                                        null
                                    }
                                    <Clipboard elements={this.props.clipboardElements} />
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