import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { IndexLink, Link, withRouter } from 'react-router';
import AuthenticationService from '../../utils/AuthenticationService.js';
import { doLogout } from '../../actions/userActions.js';
import Feedback from '../feedback/feedback.jsx';

import './pageheader.scss';

const mapStateToProps = (state) => {
    return {
        connectedUser: state.user.connectedUser
    }
}

class PageHeader extends Component {

    constructor(props) {
        super(props);
        this.disconnect = this.disconnect.bind(this);
    }

    disconnect() {
        const { dispatch } = this.props;
        dispatch(doLogout());
    }

    render() {

        var links = [];
        links.push(<IndexLink to="/" activeClassName="active" key="pagehead_1">Blog</IndexLink>);
        links.push(<Link to="/ecriture" activeClassName="active" key="pagehead_2">Histoire</Link>);
        links.push(<Link to="/projet" activeClassName="active" key="pagehead_3">Projets</Link>);
        links.push(<Link to="/about" activeClassName="active" key="pagehead_4">A Propos</Link>);

        if (this.props.connectedUser) {
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
                <div className="col-1">
                    <Feedback />
                </div>
                <div className="col-5">
                    <nav className="site-menu">
                        {links}
                    </nav>
                </div>
            </div>
        );
    }
}

PageHeader.propTypes = {
    connectedUser: PropTypes.object
}

export default connect(mapStateToProps)(withRouter(PageHeader));
