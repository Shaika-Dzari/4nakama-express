import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import { PublicLayout }      from './layout/publiclayout.jsx';
import ProtectedLayout from './layout/protectedlayout.jsx';

// Pages
import { NotFound } from './page/notfound.jsx';
import { BlogPage } from './page/blog/blogpage.jsx';
import { Dashboard } from './page/dashboard/dashboard.jsx'

const AppRoute = () => {

    render(
        <Router history={ browserHistory }>
            <Route path="/" component={ PublicLayout }>
                <IndexRoute component={ BlogPage } />

                <Route path="/admin" component={ ProtectedLayout }>
                    <IndexRoute component={ Dashboard } />

                </Route>
                <Route path="*" component={ NotFound } />
            </Route>
        </Router>,
        document.getElementById('app')
    );
}


/*
import BlogPage from '../../ui/pages/blog/blog.jsx';
import BlogPostPage from '../../ui/pages/blogpost/blogpost.jsx';
import LoginPage from '../../ui/pages/login/login.jsx';
import AdminPage from '../../ui/pages/admin/admin.jsx';
import AdminBlogPage from '../../ui/pages/admin/blog/blog.jsx';
import AdminFilePage from '../../ui/pages/admin/file/file.jsx';
import BlogEditor from '../../ui/components/blogEditor/blogEditor.jsx';


Meteor.startup(() => {
    render(
        <Router history={ browserHistory }>

            <Route path="/" component={ App }>
                <IndexRoute component={ BlogPage } />
                <Route path="login" component={ LoginPage } />
                <Route path="blog/:id" component={ BlogPostPage } />
                <Route path="/admin" component={ AdminApp }>
                    <IndexRoute component={ AdminPage } />
                    <Route path="blog" component={ AdminBlogPage } />
                    <Route path="file" component={ AdminFilePage } />
                    <Route path="blog/:id" component={ BlogEditor } />
                </Route>
                <Route path="*" component={ NotFound } />
            </Route>
        </Router>,
        document.getElementById('app')
    );
});
*/