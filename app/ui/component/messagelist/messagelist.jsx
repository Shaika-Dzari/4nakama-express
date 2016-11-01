import React, {PropTypes} from 'react';
import Message from '../message/message.jsx';
import AlertBox from '../alertbox/alertbox.jsx';
import Pager from '../pager/pager.jsx';

const MessageList = ({messages, index, openMessage}) => {

    var  msgs = 'Aucun...';

    if (messages && index) {
        msgs = index.map((v, idx) => {
            console.log(v);
            let m = messages[v];
            return <Message key={v} {...m} withLink={true} />
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
    messages: PropTypes.object.isRequired,
    index: PropTypes.array.isRequired
};

/*
TODO: validate message form.

messages: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        authorName: PropTypes.string.isRequired,
        createdAt: PropTypes.string.isRequired,
        categories: PropTypes.array
    }).isRequired).isRequired,
 */

export default MessageList;
