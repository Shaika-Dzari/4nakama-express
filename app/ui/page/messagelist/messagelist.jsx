import React from 'react';
import {Link, withRouter} from 'react-router';
import Table from '../../component/table/table.jsx';

const MESSAGE_TABLE_DEF = {
    id: '_id', name: 'title', rowdate: 'createdAt', link: 'link'
};

class MessageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: {
                data: [],
                error: null
            }
        };

        this.onNewMessage = this.onNewMessage.bind(this);
    }

    componentWillMount() {
        var self = this;
        // params ? check if children is null
        // Messages
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
                    <Table cdef={MESSAGE_TABLE_DEF} items={this.state.messages.data} />
                </div>
            </div>
        );
    }
}

export default withRouter(MessageList);