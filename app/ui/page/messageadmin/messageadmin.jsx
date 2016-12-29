import React from 'react';
import {Link, withRouter} from 'react-router';
import { connect } from 'react-redux';
import {doMessageFetch, doMessageFetchForEdit, doMessageEditAndNavigate, doFilterAndNavigate} from '../../actions/messageActions.js';
import Table from '../../component/table/table.jsx';
import PagingParam from '../../utils/PagingParam.js';
import DatePager from '../../component/pager/datepager.jsx';

import './messageadmin.scss';


const MESSAGE_TABLE_DEF = {
    id: 'id', name: 'title', rowdate: 'createdat', link: 'link'
};

const mapStateToProps = (state, ownProps) => {

    let moduleid = ownProps.location.query.moduleid;

    return {
        messages: state.messages.items,
        index: state.messages.index,
        page: state.messages.page,
        modules: state.modules,
        moduleid: moduleid
    }
}

class MessageAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.onNewMessage = this.onNewMessage.bind(this);
        this.onMessageClick = this.onMessageClick.bind(this);
        this.onFilterClick = this.onFilterClick.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(doMessageFetch(new PagingParam(null, null, 10)));
    }

    onNewMessage(event) {
        event.preventDefault();
        let moduleid = event.target.dataset.n4ModuleId;
        const { dispatch } = this.props;
        dispatch(doMessageEditAndNavigate({id: 'new', moduleid: moduleid}));
    }

    onMessageClick(messageId) {
        const { dispatch } = this.props;
        dispatch(doMessageFetchForEdit(messageId));
    }

    onFilterClick(event) {
        event.preventDefault();
        let moduleid = event.target.dataset.n4ModuleId;
        const { dispatch } = this.props;
        dispatch(doFilterAndNavigate(moduleid));
    }

    render() {

        let rows = this.props.index.map(i => {
            let m = this.props.messages[i];
            return (
                <a href={'/editor/' + m.id} key={m.id} className="message-link row" onClick={(e) => { e.preventDefault(); this.onMessageClick(m.id);}}>
                    <div className="col-1">{m.id}</div>
                    <div className="col-7"><span className="link">{m.title}</span></div>
                    <div className="col-4">{m.createdat} - {m.published ? 'Published' : 'Unpublished'}</div>
                </a>
            );
        });

        let filters = [];
        let creators = [];

        this.props.modules.index.forEach(i => {
            let m = this.props.modules.items[i];

            if (m.enablemodule) {
                filters.push(<a href="#" onClick={this.onFilterClick} data-n4-module-id={m.id} className="link" key={'filter-' + m.code}>{m.name}</a>);
                creators.push(<button className="btn" onClick={this.onNewMessage} data-n4-module-id={m.id} key={'creator-' + m.code}>{'New ' + m.name + ' message'}</button>)
            }

        });

        return (
            <div>
                <div className="box bluebox">
                    <div className="heading">
                        <div className="row">
                            <div className="col-6">
                                <h4>Messages</h4>
                            </div>
                            <div className="col-6 right">
                                {creators}
                            </div>
                        </div>
                    </div>
                    <div className="body">

                        <div className="right filtermenu">
                            Filters: {filters}
                        </div>

                        <div className="message-table">
                            <div className="row header">
                                <div className="col-1"><span>ID</span></div>
                                <div className="col-7"><span>Title</span></div>
                                <div className="col-4"><span>Informations</span></div>
                            </div>
                            {rows}
                        </div>
                    </div>
                </div>

                <DatePager items={this.props.messages} index={this.props.index} fetchFunction={doMessageFetch} />
            </div>
        );
    }
}


export default connect(mapStateToProps)(withRouter(MessageAdmin));
