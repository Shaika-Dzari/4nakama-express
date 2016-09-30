import React from 'react';
import {Link} from 'react-router';

export default class LoginMenu extends React.Component {

    isAuthenticated() {
        return false;
    }

    render() {
        var link = null;

        if (this.isAuthenticated()) {
            link = <Link to="/logout" activeClassName="active">Déconnexion</Link>;
        } else {
            link = <Link to="/login" activeClassName="active">Connexion</Link>;
        }

        return (
            <span>
                {link}
            </span>
        );
    }
}