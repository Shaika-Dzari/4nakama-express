import React, {PropTypes} from 'react';
import {Link, withRouter} from 'react-router';
import Message from '../message/message.jsx';
import AlertBox from '../alertbox/alertbox.jsx';
import Pager from '../pager/pager.jsx';

const MessageList = ({messages}) => {

    var  msgs = 'Aucun...';

    if (messages && messages.length) {
        msgs = messages.map((v, idx) => {
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

MessageList.propTypes = {
    messages: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        categories: PropTypes.array
    }).isRequired).isRequired
};

export default withRouter(MessageList);
