import React, { Component, PropTypes } from 'react';
import { IndexLink, Link } from 'react-router';
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
                        <ul className="simple-list">
                            <li><IndexLink to="/" activeClassName="active">Index</IndexLink></li>
                            <li><Link to="/project" activeClassName="active">Projets</Link></li>
                            <li><Link to="/about" activeClassName="active">À Propos</Link></li>
                            <li><Link to="/login" activeClassName="active">Connexion</Link></li>
                            <li><Link to="/admin" activeClassName="active">Administration</Link></li>
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}