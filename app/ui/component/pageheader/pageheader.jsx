import React, { Component, PropTypes } from 'react';
import { IndexLink, Link, withRouter } from 'react-router';
import AuthenticationService from '../../utils/AuthenticationService.js';

import './pageheader.scss';

class PageHeader extends Component {

    constructor(props) {
        super(props);
        this.disconnect = this.disconnect.bind(this);
    }

    isAuthenticated() {
        return AuthenticationService.isAuthenticated();
    }

    disconnect(event) {
        var self = this;
        event.preventDefault();
        AuthenticationService.disconnect(function() {
            self.props.router.push('/');
        });

    }

    render() {

        var links = [];
        links.push(<IndexLink to="/" activeClassName="active" key="pagehead_1">Blog</IndexLink>);
        links.push(<Link to="/ecriture" activeClassName="active" key="pagehead_2">Écriture</Link>);
        links.push(<Link to="/projet" activeClassName="active" key="pagehead_3">Projets</Link>);
        links.push(<Link to="/about" activeClassName="active" key="pagehead_4">À Propos</Link>);

        if (this.isAuthenticated()) {
            links.push(<Link to="/dashboard" activeClassName="active" key="pagehead_5">Administration</Link>);
            links.push(<a href="#" onClick={this.disconnect} key="pagehead_6">Déconnexion</a>);
        } else {
            links.push(<Link to="/login" activeClassName="active" key="pagehead_7">Connexion</Link>);
        }

        return (
            <div className="row site-header">
                <div className="col-6">
                    <h1 className="site-title"><Link to="/">4nakama</Link></h1>
                </div>
                <div className="col-6">
                    <nav className="site-menu">
                        {links}
                    </nav>
                </div>
            </div>
        );
    }
}

export default withRouter(PageHeader);
