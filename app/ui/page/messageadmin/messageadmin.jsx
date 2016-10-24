import React from 'react';
import {Link, withRouter} from 'react-router';
import { connect } from 'react-redux';
import {doMessageFetch, doMessageFetchForEdit} from '../../actions/messageActions.js';
import Table from '../../component/table/table.jsx';

const MESSAGE_TABLE_DEF = {
    id: '_id', name: 'title', rowdate: 'createdAt', link: 'link'
};


const mapStateToProps = (state) => {
    return {
        messages: state.messages.items,
        index: state.messages.index,
        page: state.messages.page
    }
}

class MessageAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.onNewMessage = this.onNewMessage.bind(this);
        this.onMessageClick = this.onMessageClick.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(doMessageFetch());
    }

    onNewMessage() {
        this.props.router.push('/dashboard/messages/new');
    }

    onMessageClick(messageId) {
        const { dispatch } = this.props;
        dispatch(doMessageFetchForEdit(messageId));
    }

    render() {

        let msgs = this.props.index.map(i => {
            return this.props.messages[i];
        });

        return (
            <div className="box bluebox">
                <div className="heading">
                    <div className="row">
                        <div className="col-6">
                            <h4>Messages</h4>
                        </div>
                        <div className="col-6 right">
                            <button className="btn" onClick={this.onNewMessage}>Créer</button>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <Table cdef={MESSAGE_TABLE_DEF} items={msgs} linkTo={this.onMessageClick} />
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps)(withRouter(MessageAdmin));
