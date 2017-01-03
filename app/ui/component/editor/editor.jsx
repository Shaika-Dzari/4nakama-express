import React from 'react';
import SimpleMDE from 'simplemde';
import ReactSimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css';

import './editor.scss';

const options = {
    autofocus: true,
    spellChecker: false,
    autoDownloadFontAwesome: false,
    toolbar: [{
        name: "bold",
        action: SimpleMDE.toggleBold,
        className: "editor editor-bold",
        title: "Bold"
    },{
        name: "italic",
        action: SimpleMDE.toggleItalic,
        className: "editor editor-italic",
        title: "Italic"
    }, {
        name: "heading",
        action: SimpleMDE.toggleHeading1,
        className: "editor editor-heading",
        title: "Heading"
    }, {
        name: "code",
        action: SimpleMDE.toggleCodeBlock,
        className: "editor editor-code",
        title: "Code"
    }, {
        name: "quote",
        action: SimpleMDE.toggleBlockquote,
        className: "editor editor-quote",
        title: "Quote"
    }, {
        name: "unordered-list",
        action: SimpleMDE.toggleUnorderedList,
        className: "editor editor-unorderedlist",
        title: "Generic List"
    }, {
        name: "ordered-list",
        action: SimpleMDE.toggleOrderedList,
        className: "editor editor-orderedlist",
        title: "Numbered List"
    }, {
        name: "link",
        action: SimpleMDE.drawLink,
        className: "editor editor-link",
        title: "Create Link"
    }, {
        name: "image",
        action: SimpleMDE.drawImage,
        className: "editor editor-image",
        title: "Insert Image"
    }

    ]
};


const Editor = ({value, onEditorChange}) => {

    options.initialValue = value;

    return (
        <ReactSimpleMDE onChange={onEditorChange}
                   value={value}
                   options={options}
                   />
    );
};

Editor.propTypes = {
    value: React.PropTypes.string,
    onEditorChange: React.PropTypes.func.isRequired
};

export default Editor;
