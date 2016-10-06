import React from 'react';
import {Link} from 'react-router';

export default class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div className="dashboard">
                <div className="dashboard-menu">
                    <ul className="menu-list">
                        <li className="menu-item">
                            <Link to="/dashboard/messages">Messages</Link>
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