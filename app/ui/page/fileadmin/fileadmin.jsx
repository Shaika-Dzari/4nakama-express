import React, {PropTypes} from 'react';
import {Link, withRouter} from 'react-router';
import { connect } from 'react-redux';
import FileUpload from '../../component/fileupload/fileupload.jsx';
import ToggleBox from '../../component/togglebox/togglebox.jsx';
import FileGrid from '../../component/filegrid/filegrid.jsx';
import AlertBox from '../../component/alertbox/alertbox.jsx';
import Pager from '../../component/pager/pager.jsx';

import {doFileFetch, doFileCopyToStore, doFileDelete} from '../../actions/fileActions.js';

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
        this.onRemove = this.onRemove.bind(this);
        this.onCopyToStore = this.onCopyToStore.bind(this);
        this.onPreviousPage = this.onPreviousPage.bind(this);
        this.onNextPage = this.onNextPage.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(doFileFetch());
    }

    onRemove(event) {
        event.preventDefault();
        let fileid = event.target.getAttribute('data-4n-id');
        const { dispatch } = this.props;
        dispatch(doFileDelete(fileid));
    }

    onCopyToStore(event) {
        event.preventDefault();
        let fileid = event.target.getAttribute('data-4n-id');
        const { dispatch } = this.props;
        dispatch(doFileCopyToStore(fileid));
    }

    onPreviousPage(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        let date = null;

        if (this.props.index && this.props.index.length > 0) {
            date = this.props.items[this.props.index[0]].createdAt;
            dispatch(doFileFetch({fromdate: date, dir: 'prev'}));
        }
    }

    onNextPage(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        let date = null;

        if (this.props.index && this.props.index.length > 0) {
            date = this.props.items[this.props.index[this.props.index.length -1]].createdAt;
            dispatch(doFileFetch({fromdate: date}));
        }
    }

    render() {




        return (
            <div className="fileadmin">
                <ToggleBox>
                    <FileUpload />
                </ToggleBox>

                <div className="file-list">
                    <AlertBox message={this.props.error} />
                    <FileGrid items={this.props.items} index={this.props.index} onRemove={this.onRemove} onCopyToStore={this.onCopyToStore} />
                </div>

                <Pager onPrevious={this.onPreviousPage} onNext={this.onNextPage} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(FileAdmin);
