import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
import LoginMenu from '../loginmenu/loginmenu.jsx';

import './pageheader.scss';

export default class PageHeader extends Component {

    render() {
        return (
            <div className="row">
                <div className="col-6">
                    <h1>4nakama</h1>
                </div>

                <div className="col-6">
                    <nav className="site-menu">
                        <IndexLink to="/" activeClassName="active">Blog</IndexLink>
                        <Link to="/ecriture" activeClassName="active">Écriture</Link>
                        <Link to="/projet" activeClassName="active">Projets</Link>
                        <Link to="/about" activeClassName="active">À Propos</Link>
                        <LoginMenu />
                        <Link to="/admin" activeClassName="active">Administration</Link>
                    </nav>
                </div>
            </div>
        );
    }
}