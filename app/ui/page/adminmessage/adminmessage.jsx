import React from 'react';
import {Link, withRouter} from 'react-router';
import { connect } from 'react-redux';
import {doMessageFetch, doMessageFetchForEdit, doMessageEditAndNavigate, doFilterAndNavigate, doSwitchModule} from '../../actions/messageActions.js';
import Table from '../../component/table/table.jsx';
import PagingParam from '../../utils/PagingParam.js';
import DatePager from '../../component/pager/datepager.jsx';
import LinkPager from '../../component/pager/linkpager.jsx';

import './adminmessage.scss';

const mapStateToProps = (state, ownProps) => {

    let moduleid = ownProps.location.query.moduleid;

    if (!moduleid) {
        moduleid = state.modules.codeindex['BLOG'];
    }

    return {
        messages: state.messages.items,
        displayed: state.messages.moduleindex[moduleid] || [],
        page: state.messages.page,
        modules: state.modules,
        moduleid: moduleid
    }
}

class AdminMessage extends React.Component {

    constructor(props) {
        super(props);
        this.onNewMessage = this.onNewMessage.bind(this);
        this.onMessageClick = this.onMessageClick.bind(this);
        this.onFilterClick = this.onFilterClick.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        //dispatch(doMessageFetch(new PagingParam(null, null, 10)));
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

    onFilterClick(e) {
        let mc = e.currentTarget || e.target;
        let moduleid = mc.dataset.n4ModuleId;
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(doSwitchModule({moduleid: moduleid, size: 20, url: '/dashboard/messages?moduleid=' + moduleid}));
    }

    render() {
        const { moduleid } = this.props;
        let displayed = this.props.displayed;
        let msgs = this.props.messages;


        let prevdate = null;
        let nextdate = null;

        if (msgs && displayed && displayed.length > 0) {
            prevdate = msgs[displayed[0]].createdat;
            nextdate = msgs[displayed[displayed.length - 1]].createdat;
        }

        let rows = displayed.map(i => {
            let m = msgs[i];
            return (
                <a href={'/editor/' + m.id} key={'ad-msg-' + m.id} className="message-link row" onClick={(e) => { e.preventDefault(); this.onMessageClick(m.id);}}>
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
                creators.push(<button className="btn" onClick={this.onNewMessage} data-n4-module-id={m.id} key={'creator-' + m.code}>{'New ' + m.name}</button>)
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
                <LinkPager size={20} prevdate={prevdate} nextdate={nextdate} callback={this.onChangePage} />
            </div>
        );
    }
}


export default connect(mapStateToProps)(withRouter(AdminMessage));
