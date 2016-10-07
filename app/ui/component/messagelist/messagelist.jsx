import React from 'react';
import {Link, withRouter} from 'react-router';
import Message from '../message/message.jsx';
import AlertBox from '../alertbox/alertbox.jsx';
import Pager from '../pager/pager.jsx';

class MessageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var  msgs = 'Aucun...';

        if (this.props.error) {
            msgs = <AlertBox message={this.props.error} />
        } else if (this.props.data && this.props.data.length) {
            msgs = this.props.data.map((v, idx) => {
                return <Message key={v._id} {...v} />
            });
        }

        // Change that!
        var fromDate = new Date();

        return (
            <div>
                <div>{msgs}</div>
                <Pager fromdate={fromDate} />
            </div>
        )
    }
}

export default withRouter(MessageList);
