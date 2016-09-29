import React from 'react';
import {Link} from 'react-router';

export default class LoginMenu extends React.Component {

    isAuthenticated() {
        return false;
    }

    render() {
        var link = null;

        if (this.isAuthenticated()) {
            link = <div><Link to="/dashboard" activeClassName="active">Dashboard</Link> <Link to="/logout" activeClassName="active">Déconnexion</Link> </div>
        } else {
            link = <Link to="/login" activeClassName="active">Connexion</Link>;
        }

        return (
            {link}
        );
    }
}