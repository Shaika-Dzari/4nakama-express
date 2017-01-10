import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';

// Layouts
import SimpleLayout from './layout/simplelayout.jsx';
import PublicLayout from './layout/publiclayout.jsx';
import ProtectedLayout from './layout/protectedlayout.jsx';

// Pages
import IndexPage from './page/indexpage.jsx';
import NotFound from './page/notfound.jsx';
import BlogPage from './page/blog/blogpage.jsx';
import DashboardPage from './page/dashboard/dashboardpage.jsx'
import LoginPage from './page/login/loginpage.jsx';
import MessageEditor from './page/messageeditor/messageeditor.jsx';
import MessagePage from './page/message/messagepage.jsx';
import AboutPage from './page/about/aboutpage.jsx';
import StoryPage from './page/story/storypage.jsx';
import ErrorPage from './page/error/errorpage.jsx';

import AdminMessage from './page/adminmessage/adminmessage.jsx';
import AdminFile from './page/adminfile/adminfile.jsx';
import AdminComment from './page/admincomment/admincomment.jsx';

// Store
import store from './store/createstore.js';

const history = syncHistoryWithStore(browserHistory, store)

const AppRoute = () => {

    return (
        <Provider store={store}>
            <Router history={ history }>

                <Route path="/" component={ SimpleLayout }>
                    <IndexRoute component={ IndexPage } />

                    <Route path="blog" component={ PublicLayout }>
                        <IndexRoute component={ BlogPage } />
                        <Route path="blog/:messageId" component={ MessagePage } />
                    </Route>

                    <Route path="login" component={ PublicLayout }>
                        <IndexRoute component={ LoginPage } />
                    </Route>

                    <Route path="about" component={ PublicLayout }>
                        <IndexRoute component={ AboutPage } />
                    </Route>

                    <Route path="story" component={ SimpleLayout }>
                        <IndexRoute component={ StoryPage } />
                    </Route>

                    <Route path="/dashboard" component={ ProtectedLayout }>
                        <IndexRoute component={ DashboardPage } />
                        <Route path="" component={ DashboardPage }>
                            <Route path="messages" component={ AdminMessage } />
                            <Route path="messages/:messageId" component={ MessageEditor } />
                            <Route path="files" component={ AdminFile } />
                            <Route path="comments" component={ AdminComment } />
                        </Route>
                    </Route>
                    <Route path="/error" component={ ErrorPage } />
                    <Route path="*" component={ NotFound } />
                </Route>
            </Router>
        </Provider>
    );
}

export default AppRoute;

/*
<Provider store={store}>
            <Router history={ history }>

                <Route path="/" component={ PublicLayout }>
                    <IndexRoute component={ IndexPage } />
                    <Route path="blog" component={ BlogPage } />
                    <Route path="login" component={ LoginPage } />
                    <Route path="blog/:messageId" component={ MessagePage } />
                    <Route path="about" component={ AboutPage } />

                    <Route path="/dashboard" component={ ProtectedLayout }>
                        <IndexRoute component={ DashboardPage } />
                        <Route path="" component={ DashboardPage }>
                            <Route path="messages" component={ AdminMessage } />
                            <Route path="messages/:messageId" component={ MessageEditor } />
                            <Route path="files" component={ AdminFile } />
                            <Route path="comments" component={ AdminComment } />
                        </Route>
                    </Route>
                    <Route path="*" component={ NotFound } />
                </Route>
            </Router>
        </Provider>

 */
