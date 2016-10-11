import React from 'react';
import Editor from '../../component/editor/editor.jsx';
import CategoryEditor from '../../component/categoryeditor/categoryeditor.jsx';

import './messageeditor.scss';

const MESSAGE_URL = '/api/messages';

export default class MessageEditor extends React.Component {

    constructor(props) {
        super(props);
        this.onEditorChange = this.onEditorChange.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onTitleChange = this.onTitleChange.bind(this);
        this.onTitleBlur = this.onTitleBlur.bind(this);
        this.onPrettyUrlChange = this.onPrettyUrlChange.bind(this);
        this.onPublishedClick = this.onPublishedClick.bind(this);
        this.onCategorySelect = this.onCategorySelect.bind(this);

        this.state = {
            message: null,
            editorValue: '',
            titleValue: '',
            prettyUrlValue: '',
            publishedValue: false,
            categories: [],
            selectedCategories: []
        };

        // this.props.params.userId
    }

    componentWillMount() {
        var messageId = this.props.params.messageId;
        var self = this;
        if (messageId) {

            if (messageId !== 'new') {

                // Get message
                window.fetch('/api/messages/' + messageId, {credentials: 'include'})
                        .then(r => r.json())
                        .then(msg => {
                            self.setState({
                                            message: msg,
                                            editorValue: msg.text,
                                            titleValue: msg.title,
                                            prettyUrlValue: msg.prettyUrl || '',
                                            publishedValue: msg.published == 1 ? true : false,
                                            selectedCategories: msg.categories
                                         });
                        })
                        .catch(e => self.setState({messages: {error: e}}));

            }
        }

    }

    onEditorChange(value) {
        this.setState({editorValue: value});
    }

    onTitleChange(event) {
        this.setState({titleValue: event.target.value});
    }

    onPrettyUrlChange(event) {
        this.setState({prettyUrlValue: event.target.value});
    }

    onTitleBlur(event) {
        let titleValue = this.state.titleValue || '';

        titleValue = titleValue.replace(/[!$?*&#\\]/g, '');
        titleValue = titleValue.replace(/[^a-z0-9_\-]/gi, '_');

        this.setState({prettyUrlValue: titleValue.toLowerCase()});
    }

    onPublishedClick(event) {
        this.setState({publishedValue: event.target.checked});
    }

    onCategorySelect(event) {
        let c = [].joint(this.state.selectedCategories);
        c.push(event.target.value);
        this.setState({selectedCategories: c});
    }

    onSave(event) {

        let messageId = this.props.params.messageId;

        let message = Object.assign({},
                                    this.state.message,
                                    {
                                        text: this.state.editorValue,
                                        title: this.state.titleValue,
                                        prettyUrl: this.state.prettyUrlValue,
                                        published: this.state.publishedValue ? 1:0
                                    });

        this.saveMessage(messageId, message);
    }

    saveMessage(messageId, message) {

        let isNew = messageId && messageId != 'new';

        let url = MESSAGE_URL + (isNew ? '/' + messageId : '');
        let protocol = isNew ? 'PUT' : 'POST'

        fetch(url, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: protocol,
            body: JSON.stringify(message),
            credentials: 'include'
        })
        .then(function(res){ console.log(res) })
        .catch(function(res){ console.log(res) })
    }

    render() {


        return (
            <div className="message-editor-ctn box bluebox">
                <div className="heading">
                    <div className="row">
                        <div className="col-6">
                            <h4>#{this.props.params.messageId}</h4>
                        </div>
                        <div className="col-6 right">
                            <button className="btn" onClick={this.onSave}>Save</button>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <div className="row">
                        <div className="col-9">
                            <div className="box">
                                <div className="body">
                                    <div className="frm">
                                        <label htmlFor="msg-title">Titre</label>
                                        <input type="text" value={this.state.titleValue} onChange={this.onTitleChange} onBlur={this.onTitleBlur} id="msg-title" />
                                        <label htmlFor="msg-url">URL</label>
                                        <input type="text" value={this.state.prettyUrlValue} onChange={this.onPrettyUrlChange} id="msg-url" />
                                        <label htmlFor="msg-text">Message</label>
                                        <Editor value={this.state.editorValue} onEditorChange={this.onEditorChange} id="msg-text" />
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
                                                <input type="checkbox" checked={this.state.publishedValue} onClick={this.onPublishedClick} /> Publié
                                            </h4>
                                        </div>
                                    </div>
                                    <CategoryEditor onComponentSelect={this.onCategorySelect} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
