import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css';

const Editor = (props) => {

    return (
        <SimpleMDE onChange={props.onEditorChange}
                   value={props.value}
                   options={{
                        autofocus: true,
                        spellChecker: false,
                        initialValue: props.value
                   }}
                   />
    );
};

Editor.propTypes = {
    value: React.PropTypes.string,
    onEditorChange: React.PropTypes.func.isRequired
};

export default Editor;
