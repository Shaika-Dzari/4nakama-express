import React from 'react';
import {Link, withRouter} from 'react-router';
import { connect } from 'react-redux';
import Table from '../../component/table/table.jsx';

const MESSAGE_TABLE_DEF = {
    id: '_id', name: 'title', rowdate: 'createdAt', link: 'link'
};


const mapStateToProps = (state) => {
    return {
        messages: state.messages.items,
        page: state.messages.page
    }
}


class MessageAdmin extends React.Component {

    constructor(props) {
        super(props);
        this.onNewMessage = this.onNewMessage.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(doMessageFetch());
    }

    /*
    componentWillMount() {
        var self = this;
        window.fetch('/api/messages', {credentials: 'include'})
                .then(r => r.json())
                .then(function(msgs) {
                    // Add a link

                    if (msgs) {
                        for (let i = 0, j = msgs.length; i < j; i++) {
                            msgs[i].link = '/dashboard/messages/' + msgs[i]._id;
                        }
                    }

                    self.setState({messages: {data: msgs}})
                })
                .catch(e => self.setState({messages: {error: e}}));
    }
    */

    onNewMessage() {
        this.props.router.push('/dashboard/messages/new');
    }

    render() {
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
                    <Table cdef={MESSAGE_TABLE_DEF} items={this.props.messages} linkTo='/dashboard/messages/' />
                </div>
            </div>
        );
    }
}


export default connect(mapStateToProps)(withRouter(MessageAdmin));

//export default withRouter(MessageList);