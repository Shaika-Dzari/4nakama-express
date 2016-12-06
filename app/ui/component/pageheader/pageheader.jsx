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
        links.push(<IndexLink to="/blog" activeClassName="active" key="pagehead_1"><img src="/menu-blog-icon.jpg" /><span>Blog</span></IndexLink>);
        links.push(<Link to="/ecriture" activeClassName="active" key="pagehead_2"><span>Histoire</span></Link>);
        links.push(<Link to="/projet" activeClassName="active" key="pagehead_3"><span>Projets</span></Link>);
        links.push(<Link to="/about" activeClassName="active" key="pagehead_4"><span>A Propos</span></Link>);

        if (this.props.connectedUser) {
            links.push(<Link to="/dashboard" activeClassName="active" key="pagehead_5"><span>Administration</span></Link>);
            links.push(<a href="#" onClick={this.disconnect} key="pagehead_6"><span>Déconnexion</span></a>);
        } else {
            links.push(<Link to="/login" activeClassName="active" key="pagehead_7"><span>Connexion</span></Link>);
        }

        return (
            <div className="site-header">

                <h1 className="site-title">
                    <Link to="/blog"><img src="/logo.jpg" alt="4n" />akama</Link>
                </h1>
                <h5>A whisper from my Ghost</h5>

                <div className="page-header-menu">
                    <nav className="site-menu">
                        {links}
                    </nav>
                </div>

                <Feedback />
            </div>
        );
    }
}

PageHeader.propTypes = {
    connectedUser: PropTypes.object
}

export default connect(mapStateToProps)(withRouter(PageHeader));
