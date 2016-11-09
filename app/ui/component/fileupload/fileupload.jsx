import React from 'react';

import OneFile from './onefile.jsx';
import './fileupload.scss';

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.state = {};
    }

    upload() {

    }

    // 20:12:30.324 File { name: "GIGA_1.jpg", lastModified: 1416340547000, lastModifiedDate: Date 2014-11-18T19:55:47.000Z, size: 15180, type: "image/jpeg" }1

    onFileChange(event) {
        let inputFile = event.target;

        if (inputFile.files) {
            let files = Array.from(inputFile.files);
            this.setState({files: files.map(f => {
                return {name: f.name, type: f.type, size: f.size};
            })});
        }
    }

    render() {

        let toUpload = null;

        if (this.state.files) {
            toUpload = this.state.files.map(f => {
                let refid = 'li-' + f.name;
                return <OneFile key={refid} reffileid={refid} name={f.name} type={f.type} size={f.size} />
            });
        }

        return (
            <div className="file-upload">
                <input id="file-upload-file" type="file" className="file-upload-file" multiple onChange={this.onFileChange} />
                <label htmlFor="file-upload-file">Sélectioner</label>
                <div className="upload-list">
                    {toUpload}
                </div>
            </div>
        );
    }
}

export default FileUpload;