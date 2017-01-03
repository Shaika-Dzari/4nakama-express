import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {doSwitchModule} from '../../actions/messageActions.js';
import DashboardContent from './dashboardcontent.jsx';
import './dashboardpage.scss';

const mapStateToProps = (state) => {
    return {
        modules: state.modules
    };
};

class DashboardPage extends React.Component {

    constructor(props) {
        super(props);
        this.onAdminMessage = this.onAdminMessage.bind(this);
    }

    onAdminMessage(e) {
        e.preventDefault();
        const {modules, dispatch} = this.props;
        console.log(modules, dispatch);
        dispatch(doSwitchModule(modules.codeindex['BLOG'], 20, '/dashboard/messages'));
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
                            <a href="#" onClick={this.onAdminMessage}>Messages</a>
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

export default connect(mapStateToProps)(DashboardPage);
