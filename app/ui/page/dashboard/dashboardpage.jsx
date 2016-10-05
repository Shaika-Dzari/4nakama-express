import React from 'react';

const MESSAGE_TABLE_DEF = {
    id: '_id', name: 'title', rowdate: 'createdAt', link: 'link'
};

export default class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        var self = this;
        // params ? check if children is null
        // Messages
        window.fetch('/api/messages/protected')
                .then(r => r.json())
                .then(msgs => self.setState({messages: {data: msgs}}))
                .catch(e => self.setState({messages: {error: e}}));

    }

    render() {

        return (
            <div className="dashboard">
                <div className="dashboard-menu">
                    <ul className="menu-list">
                        <li className="menu-item">
                            <a href="#">Messages</a>
                        </li>
                        <li className="menu-item">
                            <a href="#">Commentaires</a>
                        </li>
                        <li className="menu-item">
                            <a href="#">Histoires</a>
                        </li>
                        <li className="menu-item">
                            <a href="#">Catégories</a>
                        </li>
                        <li className="menu-item">
                            <a href="#">Tags</a>
                        </li>
                    </ul>
                </div>
                <div className="dashboard-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}