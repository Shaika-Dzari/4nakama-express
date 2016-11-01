import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css';

const Editor = ({value, onEditorChange}) => {

    return (
        <SimpleMDE onChange={onEditorChange}
                   value={value}
                   options={{
                        autofocus: true,
                        spellChecker: false,
                        initialValue: value
                   }}
                   />
    );
};

Editor.propTypes = {
    value: React.PropTypes.string,
    onEditorChange: React.PropTypes.func.isRequired
};

export default Editor;
