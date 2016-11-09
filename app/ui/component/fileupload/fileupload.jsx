import React from 'react';
import { connect } from 'react-redux';
import FileUploadUtils from '../../utils/FileUploadUtils.js';
import OneFile from './onefile.jsx';

import './fileupload.scss';

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.upload = this.upload.bind(this);

        this.state = {
            files: null
        };
    }

    upload() {
        console.log('upload');

    }

    onFileChange(event) {
        let inputFile = event.target;

        let files = Array.from(inputFile.files);
        let filesProgress = {};
        files.forEach(f => {
            filesProgress[f.name] = null;
        });

        if (inputFile.files) {
            this.setState({files: files, filesProgress: filesProgress});
        }
    }

    render() {

        let toUpload = null;

        if (this.state.files) {
            toUpload = this.state.files.map(f => {
                let refid = 'li-' + f.name;
                return <OneFile key={refid}
                                reffileid={refid}
                                name={f.name}
                                type={f.type}
                                size={f.size}
                                progress={this.state.filesProgress[f.name]} />
            });
        }

        return (
            <div className="file-upload">
                <div className="button-section">
                    <div className="select-section">
                        <input id="file-upload-file" type="file" className="file-upload-file" multiple onChange={this.onFileChange} />
                        <label htmlFor="file-upload-file">Sélectioner</label>
                    </div>
                    <div className="upload-section">
                        <button className="btn btnblue" onClick={this.upload} disabled={!this.state.files}>Envoyer</button>
                    </div>
                </div>
                <div className="upload-list">
                    {toUpload}
                </div>
            </div>
        );
    }
}


export default connect()(FileUpload);