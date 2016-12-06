import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

// Layouts
import PublicLayout from './layout/publiclayout.jsx';
import ProtectedLayout from './layout/protectedlayout.jsx';

// Pages
import NotFound from './page/notfound.jsx';
import BlogPage from './page/blog/blogpage.jsx';
import DashboardPage from './page/dashboard/dashboardpage.jsx'
import LoginPage from './page/login/loginpage.jsx';
import MessageAdmin from './page/messageadmin/messageadmin.jsx';
import MessageEditor from './page/messageeditor/messageeditor.jsx';
import MessagePage from './page/message/messagepage.jsx';
import FileAdmin from './page/fileadmin/fileadmin.jsx';

// Store
import store from './store/createstore.js';

const history = syncHistoryWithStore(browserHistory, store)

const AppRoute = () => {

    return (
        <Provider store={store}>
            <Router history={ history }>
                <Route path="/" component={ PublicLayout }>
                    <IndexRoute component={ BlogPage } />
                    <Route path="blog" component={ BlogPage } />
                    <Route path="login" component={ LoginPage } />
                    <Route path="blog/:messageId" component={ MessagePage } />

                    <Route path="/dashboard" component={ ProtectedLayout }>
                        <IndexRoute component={ DashboardPage } />
                        <Route path="" component={ DashboardPage }>
                            <Route path="messages" component={ MessageAdmin } />
                            <Route path="messages/:messageId" component={ MessageEditor } />
                            <Route path="files" component={ FileAdmin } />
                        </Route>
                    </Route>
                    <Route path="*" component={ NotFound } />
                </Route>
            </Router>
        </Provider>
    );
}

export default AppRoute;
