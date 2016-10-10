import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import { PublicLayout }      from './layout/publiclayout.jsx';
import ProtectedLayout from './layout/protectedlayout.jsx';

// Pages
import { NotFound } from './page/notfound.jsx';
import BlogPage from './page/blog/blogpage.jsx';
import DashboardPage from './page/dashboard/dashboardpage.jsx'
import LoginPage from './page/login/loginpage.jsx';
import MessageList from './page/messagelist/messagelist.jsx';
import MessageEditor from './page/messageeditor/messageeditor.jsx';

const AppRoute = () => {

    return (
        <Router history={ browserHistory }>
            <Route path="/" component={ PublicLayout }>
                <IndexRoute component={ BlogPage } />
                <Route path="login" component={ LoginPage } />

                <Route path="/dashboard" component={ ProtectedLayout }>
                    <IndexRoute component={ DashboardPage } />
                    <Route path="" component={ DashboardPage }>
                        <Route path="messages" component={ MessageList } />
                        <Route path="messages/:messageId" component={ MessageEditor } />
                    </Route>
                </Route>
                <Route path="*" component={ NotFound } />
            </Route>
        </Router>
    );
}

export default AppRoute;
