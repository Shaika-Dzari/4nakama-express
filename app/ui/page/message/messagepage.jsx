import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import Message from '../../component/message/message.jsx';


const mapStateToProps = (state, ownProps) => {
    let messageId = ownProps.params.messageId
    return {
        selectedid: messageId,
        message: state.messages.items[messageId]
    };
}

class MessagePage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.message);

        return (
            <div className="row">
                <div className="col-10">
                    <Message {...this.props.message} />
                </div>
                <div className="col-2">
                    commentaires
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(MessagePage);