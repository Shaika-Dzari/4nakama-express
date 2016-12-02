import React from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'simplemde/dist/simplemde.min.css';

/*
const selectImage = (editor, event) => {
    console.log('selectimage', editor, event);

    var cm = editor.codemirror;
    var output = '';
    var selectedText = cm.getSelection();
    var text = selectedText || 'placeholder';

    output = '!!' + text + '!!';
    cm.replaceSelection(output);
}
     ,
                        toolbar: [
                            {
                                name: 'Select Image',
                                className: 'fa fa-picture-o',
                                title: 'Select Image',
                                action: selectImage
                            }
                        ]
*/
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
