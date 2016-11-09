import React, {PropTypes} from 'react';
import {Link, withRouter} from 'react-router';
import { connect } from 'react-redux';
import FileUpload from '../../component/fileupload/fileupload.jsx';
import ToggleBox from '../../component/togglebox/togglebox.jsx';

class FileAdmin extends React.Component {

    render() {
        return (
            <div className="fileadmin">
                <ToggleBox>
                    <FileUpload />
                </ToggleBox>

                <div className="file-list">
                    liste de fichiers...
                </div>
            </div>
        );
    }
}

export default FileAdmin;
