import React from 'react';
import {Link} from 'react-router';

import DashboardContent from './dashboardcontent.jsx';
import './dashboardpage.scss';


export default class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        let subview = null;

        if (this.props.children) {
            subview = this.props.children;
        } else {
            subview = <DashboardContent />;
        }

        return (
            <div className="dashboard">
                <div className="dashboard-menu">
                    <div className="row">
                        <div className="col-4 menu-item">
                            <Link to="/dashboard/messages">Messages</Link>
                        </div>
                        <div className="col-4 menu-item">
                            <Link to="/dashboard/files">Fichiers</Link>
                        </div>
                        <div className="col-4 menu-item">
                            <Link to="/dashboard/comments">Commentaires</Link>
                        </div>
                    </div>
                </div>

                <div className="dashboard-content">
                    {subview}
                </div>
            </div>
        );
    }
}