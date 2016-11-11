import React, {PropTypes} from 'react';
import {Link, withRouter} from 'react-router';
import { connect } from 'react-redux';
import FileUpload from '../../component/fileupload/fileupload.jsx';
import ToggleBox from '../../component/togglebox/togglebox.jsx';
import FileGrid from '../../component/filegrid/filegrid.jsx';
import AlertBox from '../../component/alertbox/alertbox.jsx';

import {doFileFetch} from '../../actions/fileActions.js';

import './fileadmin.scss';

const mapStateToProps = (state) => {
    return {
        items: state.files.items,
        index: state.files.index,
        error: state.files.error
    }
};

class FileAdmin extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(doFileFetch());
    }

    render() {
        return (
            <div className="fileadmin">
                <ToggleBox>
                    <FileUpload />
                </ToggleBox>

                <div className="file-list">
                    <AlertBox message={this.props.error} />
                    <FileGrid items={this.props.items} index={this.props.index} />
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(FileAdmin);
