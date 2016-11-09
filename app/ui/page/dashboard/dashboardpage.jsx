import React from 'react';
import {Link} from 'react-router';

import './dashboardpage.scss';

export default class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {

        return (
            <div className="dashboard">
                <div className="dashboard-menu">
                    <div className="row">
                        <div className="col-3 menu-item">
                            <Link to="/dashboard/messages">Messages</Link>
                        </div>
                        <div className="col-3 menu-item">
                            <a href="#">Histoires</a>
                        </div>
                        <div className="col-3 menu-item">
                            <Link to="/dashboard/files">Fichiers</Link>
                        </div>
                        <div className="col-3 menu-item">
                            <a href="#">Commentaires</a>
                        </div>
                    </div>
                </div>

                <div className="dashboard-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
}