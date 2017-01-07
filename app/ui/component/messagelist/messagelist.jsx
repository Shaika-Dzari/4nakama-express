import React, {PropTypes} from 'react';
import Message from '../message/message.jsx';

const MessageList = ({messages, index, openMessage}) => {

    var  msgs = 'Aucun...';

    if (messages && index) {
        msgs = index.map((v, idx) => {
            let m = messages[v];
            return <Message key={'msglist-msg-' + v} {...m} withLink={true} />
        });
    }

    return (
        <div>{msgs}</div>
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
        createdat: PropTypes.string.isRequired,
        categories: PropTypes.array
    }).isRequired).isRequired,
 */

export default MessageList;
