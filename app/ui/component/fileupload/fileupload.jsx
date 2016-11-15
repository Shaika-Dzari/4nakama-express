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

    cancelUpload(id) {
        const { dispatch } = this.props;
        dispatch(doFileUploadRemove(id));
    }

    render() {

        let toUpload = null;

        if (this.props.files) {
            toUpload = [];
            console.log(this.props.files);

            for (let fk in this.props.files) {
                let managedFile = this.props.files[fk];
                let f = managedFile.file;
                let progress = managedFile.progress;
                let completed = managedFile.completed;
                let refid = 'li-' + f.name;
                console.log(f, progress,completed);

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
            /*
            toUpload = this.props.files.map(f => {
                let refid = 'li-' + f.name;
                return <OneFile key={refid}
                                reffileid={refid}
                                name={f.name}
                                type={f.type}
                                size={f.size} />
            });*/
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