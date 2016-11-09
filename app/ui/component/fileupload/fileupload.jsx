import React from 'react';
import { connect } from 'react-redux';

import {doFileUploadPostAll, doFileUploadOnChange} from '../../actions/fileActions.js'
import FileUploadUtils from '../../utils/FileUploadUtils.js';
import OneFile from './onefile.jsx';

import './fileupload.scss';

const mapStateToProps = (state) => {
    return {
        files: state.files.uploadfiles
    };
}

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.upload = this.upload.bind(this);
    }

    upload() {
        const { dispatch } = this.props;
        dispatch(doFileUploadPostAll());
    }

    onFileChange(event) {
        let inputFile = event.target;
        let files = Array.from(inputFile.files);
        const { dispatch } = this.props;
        dispatch(doFileUploadOnChange(files));
    }

    render() {

        let toUpload = null;

        if (this.props.files) {
            toUpload = this.props.files.map(f => {
                let refid = 'li-' + f.name;
                return <OneFile key={refid}
                                reffileid={refid}
                                name={f.name}
                                type={f.type}
                                size={f.size} />
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
                        <button className="btn btnblue" onClick={this.upload} disabled={!this.props.files}>Envoyer</button>
                    </div>
                </div>
                <div className="upload-list">
                    {toUpload}
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps)(FileUpload);