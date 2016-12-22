import React from 'react';
import { connect } from 'react-redux';

import {doFileUploadPostAll, doFileUploadOnChange, doFileUploadRemove} from '../../actions/fileActions.js'
import FileUploadUtils from '../../utils/FileUploadUtils.js';
import OneFile from './onefile.jsx';

import './fileupload.scss';

const mapStateToProps = (state) => {
    return {
        files: state.uploadfiles
    };
}

class FileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.upload = this.upload.bind(this);
        this.cancelUpload = this.cancelUpload.bind(this);
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

    cancelUpload(name) {
        const { dispatch } = this.props;
        dispatch(doFileUploadRemove(name));
    }

    render() {

        let toUpload = null;
        let toSend = false;

        if (this.props.files) {
            toUpload = [];

            for (let fk in this.props.files) {
                toSend = true;
                let managedFile = this.props.files[fk];
                let f = managedFile.file;
                let progress = managedFile.progress;
                let completed = managedFile.completed;
                let refid = 'li-' + f.name;

                let fileJsx = <OneFile key={refid}
                                reffileid={refid}
                                name={f.name}
                                type={f.type}
                                size={f.size}
                                progress={progress}
                                completed={completed}
                                cancelUpload={this.cancelUpload} />;

                toUpload.push(fileJsx);
            }

        }

        return (

            <div className="box bluebox">
                <div className="heading right file-upload">
                    <div className="button-section">
                        <input id="file-upload-file" type="file" className="file-upload-file" multiple onChange={this.onFileChange} />
                        <label htmlFor="file-upload-file">Sélectioner</label>

                        {toSend ? <button className="btn btnblue" onClick={this.upload}>Envoyer</button> : null}

                    </div>
                </div>
                <div className="body">
                    <div className="upload-list">
                        {toUpload}
                    </div>
                </div>
            </div>

        );
    }
}


export default connect(mapStateToProps)(FileUpload);