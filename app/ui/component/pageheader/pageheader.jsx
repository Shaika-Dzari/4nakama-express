import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { IndexLink, Link, withRouter } from 'react-router';
import AuthenticationService from '../../utils/AuthenticationService.js';
import { doLogout } from '../../actions/userActions.js';
import Feedback from '../feedback/feedback.jsx';
import {doMessageFetchAndGo} from '../../actions/messageActions.js';

import './pageheader.scss';

const mapStateToProps = (state) => {

    return {
        modules: state.modules.items,
        index: state.modules.index,
        connectedUser: state.user.connectedUser
    }
}

class PageHeader extends Component {

    constructor(props) {
        super(props);
        this.disconnect = this.disconnect.bind(this);
        this.navigate = this.navigate.bind(this);
    }

    disconnect() {
        const { dispatch } = this.props;
        dispatch(doLogout());
    }

    navigate(e) {
        e.preventDefault();
        let mc = e.target.dataset.n4ModuleCode;
        const { dispatch } = this.props;
        dispatch(doMessageFetchAndGo(null, mc));
    }

    render() {

        let links = [];
        let { modules } = this.props;
        let { index } = this.props;
        let i = 1;
        for (let midx of index) {
            let m = modules[midx];
            if (m.enablemodule) {
                links.push(<a href="#" onClick={this.navigate} key={'pagehead_' + m.id} data-n4-module-code={m.code}><span>{m.name}</span></a>);
            }
        }

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
