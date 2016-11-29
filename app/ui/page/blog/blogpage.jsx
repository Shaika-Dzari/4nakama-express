import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CategoryList from '../../component/categorylist/categorylist.jsx';
import MessageList from '../../component/messagelist/messagelist.jsx';
import Pager from '../../component/pager/pager.jsx';
import PagingParam from '../../utils/PagingParam.js';
import { scrollToTopPage } from '../../utils/UrlParamUtils.js';
import Remarkable from 'remarkable';

import {doMessageFetch} from '../../actions/messageActions.js';
import {doCategoryFetch} from '../../actions/categoryActions.js';

import './blogpage.scss';


const mapStateToProps = (state) => {
    return {
        messages: state.messages.items,
        messagesindex: state.messages.index,
        page: state.messages.page,
        categories: state.categories.items,
        categoriesindex: state.categories.index
    }
}

class BlogPage extends React.Component {

    constructor(props) {
        super(props);
        this.onPreviousPage = this.onPreviousPage.bind(this);
        this.onNextPage = this.onNextPage.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(doMessageFetch());
        dispatch(doCategoryFetch());
    }

    onPreviousPage(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        let date = null;

        if (this.props.messagesindex && this.props.messagesindex.length > 0) {
            date = this.props.messages[this.props.messagesindex[0]].createdat;
            scrollToTopPage();
            dispatch(doMessageFetch(new PagingParam(date, 'prev')));
        }
    }

    onNextPage(event) {
        event.preventDefault();
        const { dispatch } = this.props;
        let date = null;

        if (this.props.messagesindex && this.props.messagesindex.length > 0) {
            date = this.props.messages[this.props.messagesindex[this.props.messagesindex.length -1]].createdat;
            scrollToTopPage();
            dispatch(doMessageFetch(new PagingParam(date, 'next')));
        }
    }

    render() {
        return (
                <div className="row">
                    <div className="col-10">
                        <div className="list-ctn">
                            <MessageList messages={this.props.messages} index={this.props.messagesindex} />
                        </div>
                        <div className="list-ctn">
                            <Pager onPrevious={this.onPreviousPage} onNext={this.onNextPage} />
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="list-ctn">
                            <div className="info-element">
                                <h3>Catégories</h3>
                                <CategoryList categories={this.props.categories} index={this.props.categoriesindex} />
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}

export default connect(mapStateToProps)(BlogPage);
