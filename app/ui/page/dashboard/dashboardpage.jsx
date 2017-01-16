import React from 'react';
import {Link} from 'react-router';
import { connect } from 'react-redux';
import {doSwitchModule} from '../../actions/messageActions.js';
import DashboardContent from './dashboardcontent.jsx';
import tr from '../../i18n/i18n.js';

import './dashboardpage.scss';

const mapStateToProps = (state) => {
    return {
        modules: state.modules,
        locale: state.language.locale
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
        dispatch(doSwitchModule({moduleid: modules.codeindex['BLOG'], size: 20, url: '/dashboard/messages', args: ['published=false']}));
    }

    render() {
        let subview = null;
        let locale = this.props.locale;

        if (this.props.children) {
            subview = this.props.children;
        } else {
            subview = <DashboardContent />;
        }

        return (
            <div className="dashboard">
                <div className="dashboard-menu">
                    <div className="row">
                        <div className="col-3 menu-item">
                            <a href="#" onClick={this.onAdminMessage}>{tr(locale, 'dashboard_menu_messages')}</a>
                        </div>
                        <div className="col-3 menu-item">
                            <Link to="/dashboard/files">{tr(locale, 'dashboard_menu_files')}</Link>
                        </div>
                        <div className="col-3 menu-item">
                            <Link to="/dashboard/comments">{tr(locale, 'dashboard_menu_comments')}</Link>
                        </div>
                        <div className="col-3 menu-item">
                            <Link to="/dashboard/categories">{tr(locale, 'dashboard_menu_categories')}</Link>
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
