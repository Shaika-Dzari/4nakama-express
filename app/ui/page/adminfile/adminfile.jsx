import React, {PropTypes} from 'react';
import {Link, withRouter} from 'react-router';
import { connect } from 'react-redux';
import FileUpload from '../../component/fileupload/fileupload.jsx';
import ToggleBox from '../../component/togglebox/togglebox.jsx';
import FileGrid from '../../component/filegrid/filegrid.jsx';
import AlertBox from '../../component/alertbox/alertbox.jsx';
import LinkPager from '../../component/pager/linkpager.jsx';
import PagingParam from '../../utils/PagingParam.js';
import { scrollToTopPage } from '../../utils/HtmlUtils.js';

import {doFileFetch, doFileCopyToStore, doFileDelete} from '../../actions/fileActions.js';

import './adminfile.scss';

const mapStateToProps = (state) => {
    return {
        items: state.files.items,
        index: state.files.index,
        page: state.files.page,
        error: state.files.error || null
    }
};

class AdminFile extends React.Component {

    constructor(props) {
        super(props);
        this.onRemove = this.onRemove.bind(this);
        this.onCopyToStore = this.onCopyToStore.bind(this);
        this.onChangePage = this.onChangePage.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(doFileFetch(this.props.page));
    }

    onRemove(event) {
        event.preventDefault();
        let fileid = event.target.getAttribute('data-4n-id');
        const { dispatch } = this.props;
        dispatch(doFileDelete(fileid));
    }


    onChangePage(pageParam) {
        const { dispatch } = this.props
        dispatch(doFileFetch(pageParam));
        scrollToTopPage();
    }


    onCopyToStore(event) {
        event.preventDefault();
        let fileid = event.target.getAttribute('data-4n-id');
        const { dispatch } = this.props;
        dispatch(doFileCopyToStore(fileid));
    }

    render() {
        let prevdate = null;
        let nextdate = null;

        if (this.props.items && this.props.index && this.props.index.length > 0) {
            prevdate = this.props.items[this.props.index[0]].createdat;
            nextdate = this.props.items[this.props.index[this.props.index.length - 1]].createdat;
        }

        return (
            <div className="fileadmin">
                <FileUpload />

                <div className="file-list">
                    {this.props.error ? <AlertBox message={this.props.error} /> : false }
                    <FileGrid items={this.props.items} index={this.props.index} onRemove={this.onRemove} onCopyToStore={this.onCopyToStore} />
                </div>

                <LinkPager size={15} prevdate={prevdate} nextdate={nextdate} callback={this.onChangePage} />
            </div>
        );
    }
}

export default connect(mapStateToProps)(AdminFile);
