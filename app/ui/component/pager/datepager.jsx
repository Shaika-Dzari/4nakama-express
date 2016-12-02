import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Pager from './pager.jsx';
import PagingParam from '../../utils/PagingParam.js';
import { scrollToTopPage } from '../../utils/UrlParamUtils.js';

const DEFAULT_SIZE = 10;

class DatePager extends React.Component {

    constructor(props) {
        super(props);
        this.onPreviousPage = this.onPreviousPage.bind(this);
        this.onNextPage = this.onNextPage.bind(this);
    }

    onPreviousPage(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        let date = null;

        if (this.props.index && this.props.index.length > 0) {
            date = this.props.items[this.props.index[0]].createdat;
        }

        if (this.props.scrollToTop) {
            scrollToTopPage();
        }

        dispatch(this.props.fetchFunction(new PagingParam(date, 'prev', this.props.size || DEFAULT_SIZE)));
    }

    onNextPage(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        let date = null;

        if (this.props.scrollToTop) {
            scrollToTopPage();
        }

        if (this.props.index && this.props.index.length > 0) {
            date = this.props.items[this.props.index[this.props.index.length -1]].createdat;
            dispatch(this.props.fetchFunction(new PagingParam(date, 'next', this.props.size || DEFAULT_SIZE)));
        }
    }
    render() {
        return <Pager onPrevious={this.onPreviousPage} onNext={this.onNextPage} />
    }
}

DatePager.propTypes = {
    fetchFunction: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired,
    index: PropTypes.array.isRequired,
    size: PropTypes.number,
    scrollToTop: PropTypes.bool
};

export default connect()(DatePager);
