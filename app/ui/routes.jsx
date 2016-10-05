import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import { PublicLayout }      from './layout/publiclayout.jsx';
import ProtectedLayout from './layout/protectedlayout.jsx';

// Pages
import { NotFound } from './page/notfound.jsx';
import BlogPage from './page/blog/blogpage.jsx';
import { DashboardPage } from './page/dashboard/dashboardpage.jsx'
import LoginPage from './page/login/loginpage.jsx';

const AppRoute = () => {

    return (
        <Router history={ browserHistory }>
            <Route path="/" component={ PublicLayout }>
                <IndexRoute component={ BlogPage } />
                <Route path="login" component={ LoginPage } />

                <Route path="/admin" component={ ProtectedLayout }>
                    <IndexRoute component={ DashboardPage } />

                </Route>
                <Route path="*" component={ NotFound } />
            </Route>
        </Router>
    );
}

export default AppRoute;
