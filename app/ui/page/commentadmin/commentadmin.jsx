import React, {PropTypes} from 'react';

const mapStateToProps = (state, ownProps) => {

    return {
        comments: state.comments.items,
        index: state.comments.index,
        messageindex: state.comments.messageindex,
        frommessageid: ownProps.messageId
    };
}

const CommentAdmin = ({comments, index, frommessageid}) => {

    return (
        <div></div>
    );
}