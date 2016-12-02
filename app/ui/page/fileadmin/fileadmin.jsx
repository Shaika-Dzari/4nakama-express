import React, {PropTypes} from 'react';
import {Link, withRouter} from 'react-router';
import { connect } from 'react-redux';
import FileUpload from '../../component/fileupload/fileupload.jsx';
import ToggleBox from '../../component/togglebox/togglebox.jsx';
import FileGrid from '../../component/filegrid/filegrid.jsx';
import AlertBox from '../../component/alertbox/alertbox.jsx';
import DatePager from '../../component/pager/datepager.jsx';
import PagingParam from '../../utils/PagingParam.js';

import {doFileFetch, doFileCopyToStore, doFileDelete} from '../../actions/fileActions.js';

import './fileadmin.scss';

const mapStateToProps = (state) => {
    return {
        items: state.files.items,
        index: state.files.index,
        error: state.files.error || null
    }
};

class FileAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.onRemove = this.onRemove.bind(this);
        this.onCopyToStore = this.onCopyToStore.bind(this);
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

    render() {

        return (
            <div className="fileadmin">
                <ToggleBox>
                    <FileUpload />
                </ToggleBox>

                <div className="file-list">
                    {this.props.error ? <AlertBox message={this.props.error} /> : false }
                    <FileGrid items={this.props.items} index={this.props.index} onRemove={this.onRemove} onCopyToStore={this.onCopyToStore} />
                </div>

                <DatePager items={this.props.items} index={this.props.index} fetchFunction={doFileFetch} size={15} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(FileAdmin);
