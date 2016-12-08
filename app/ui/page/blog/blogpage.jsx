import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CategoryList from '../../component/categorylist/categorylist.jsx';
import MessageList from '../../component/messagelist/messagelist.jsx';
import LinkPager from '../../component/pager/linkpager.jsx';
import Remarkable from 'remarkable';
import PagingParam from '../../utils/PagingParam.js';
import { scrollToTopPage } from '../../utils/UrlParamUtils.js';

import {doMessageFetchAndGo} from '../../actions/messageActions.js';
import {doCategoryFetch} from '../../actions/categoryActions.js';

import './blogpage.scss';


const mapStateToProps = (state, ownProps) => {

    let fromdate = ownProps.location.query.fromdate;
    let direction = ownProps.location.query.dir;
    let p = null;
    if (fromdate) {
        p = new PagingParam(fromdate, direction, 5);
    }

    return {
        messages: state.messages.items,
        messagesindex: state.messages.index,
        page: p,
        categories: state.categories.items,
        categoriesindex: state.categories.index,
        total: state.messages.total
    }
}

class BlogPage extends React.Component {

    constructor(props) {
        super(props);
        this.onChangePage = this.onChangePage.bind(this);
    }

    onChangePage(pageParam) {
        const { dispatch } = this.props
        dispatch(doMessageFetchAndGo(pageParam));
        scrollToTopPage();
    }

    componentDidMount() {
        const { dispatch } = this.props
        this.onChangePage(this.props.page);
        dispatch(doCategoryFetch());
    }

    render() {

        let prevdate = null;
        let nextdate = null;

        if (this.props.messages && this.props.messagesindex && this.props.messagesindex.length > 0) {
            prevdate = this.props.messages[this.props.messagesindex[0]].createdat;
            nextdate = this.props.messages[this.props.messagesindex[this.props.messagesindex.length - 1]].createdat;
        }

        return (
                <div className="row">
                    <div className="col-10">
                        <div className="list-ctn">
                            <MessageList messages={this.props.messages} index={this.props.messagesindex} />
                        </div>
                        <div className="list-ctn">
                            <LinkPager size={5} prevdate={prevdate} nextdate={nextdate} callback={this.onChangePage} />
                            <span>{this.props.total}</span>
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
