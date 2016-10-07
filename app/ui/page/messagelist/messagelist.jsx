import React from 'react';
import {Link} from 'react-router';
import Table from '../../component/table/table.jsx';

const MESSAGE_TABLE_DEF = {
    id: '_id', name: 'title', rowdate: 'createdAt', link: 'link'
};

export default class MessageList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: {
                data: [],
                error: null
            }
        };
    }

    componentWillMount() {
        var self = this;
        // params ? check if children is null
        // Messages
        window.fetch('/api/messages', {credentials: 'include'})
                .then(r => r.json())
                .then(msgs => self.setState({messages: {data: msgs}}))
                .catch(e => self.setState({messages: {error: e}}));
    }

    render() {
        return (
            <div className="box bluebox">
                <div className="heading">
                    Messages
                </div>
                <div className="body">
                    <Table cdef={MESSAGE_TABLE_DEF} items={this.state.messages.data} />
                </div>
            </div>
        );
    }
}