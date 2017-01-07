import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { IndexLink, Link, withRouter } from 'react-router';
import AuthenticationService from '../../utils/AuthenticationService.js';
import { doLogout } from '../../actions/userActions.js';
import Feedback from '../feedback/feedback.jsx';
import {doNavigationTo} from '../../actions/navigationActions.js';
import tr from '../../i18n/i18n.js';

import './pageheader.scss';

const mapStateToProps = (state) => {

    return {
        modules: state.modules.items,
        index: state.modules.index,
        connectedUser: state.user.connectedUser,
        lang: state.language.locale
    }
}

class PageHeader extends Component {

    constructor(props) {
        super(props);
        this.disconnect = this.disconnect.bind(this);
        this.navigate = this.navigate.bind(this);
        this.onChangeLanguage = this.onChangeLanguage.bind(this);
    }

    disconnect() {
        const { dispatch } = this.props;
        dispatch(doLogout());
    }

    navigate(e) {
        let mc = e.currentTarget || e.target;
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(doNavigationTo(mc.dataset.n4ModuleId));
    }

    onChangeLanguage(lang) {
        const { dispatch } = this.props;
        dispatch({type: 'CHANGE_LANGUAGE', locale: lang});
    }

    render() {

        let links = [];
        let { modules } = this.props;
        let { index } = this.props;
        let { lang } = this.props;
        let i = 1;
        for (let midx of index) {
            let m = modules[midx];
            if (m.enablemodule) {
                links.push(<a href="#" onClick={this.navigate} key={'pagehead_' + m.id} data-n4-module-id={m.id}>
                                <span>{tr(lang, 'module_name_' + m.code.toLowerCase())}</span>
                           </a>);
            }
        }

        if (this.props.connectedUser) {
            links.push(<Link to="/dashboard" activeClassName="active" key="pagehead_ad"><span>{tr(lang,'menu_admin')}</span></Link>);
            links.push(<a href="#" onClick={this.disconnect} key="pagehead_dc"><span>{tr(lang,'menu_logout')}</span></a>);
        } else {
            links.push(<Link to="/login" activeClassName="active" key="pagehead_cn"><span>{tr(lang,'menu_login')}</span></Link>);
        }

        return (
            <div className="site-header">

                <h1 className="site-title">
                    <Link to="/"><img src="/logo.jpg" alt="4n" />akama</Link>
                </h1>
                <h5>A whisper from my Ghost</h5>

                <div className="page-header-menu">
                    <nav className="site-menu">
                        {links}
                    </nav>
                </div>

                <div className="page-header-lang">
                    <a href="#" className="link" onClick={e => {e.preventDefault(); this.onChangeLanguage('fr_CA');}}>{tr(lang,'menu_lang_frca')}</a>
                    <a href="#" className="link" onClick={e => {e.preventDefault(); this.onChangeLanguage('en_CA');}}>{tr(lang,'menu_lang_enca')}</a>
                </div>

                <div className="page-header-feedback">
                    <Feedback />
                </div>
            </div>
        );
    }
}

PageHeader.propTypes = {
    connectedUser: PropTypes.object
}

export default connect(mapStateToProps)(withRouter(PageHeader));
