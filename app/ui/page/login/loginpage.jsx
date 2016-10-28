import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import AlertBox from '../../component/alertbox/alertbox.jsx';
import {doLoginPageUsernameKp, doLoginPagePasswdKp, doLoginPageSubmit} from '../../actions/userActions.js';

import './loginpage.scss';

const mapStateToProps = (state) => {
    return {
        username: state.user.username,
        passwd: state.user.passwd,
        error: state.user.error
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: (event) => { event.preventDefault(); dispatch(doLoginPageSubmit()); },
        onUsernameChange: (event) => dispatch(doLoginPageUsernameKp(event.target.value)),
        onPasswordChange: (event) => dispatch(doLoginPagePasswdKp(event.target.value))
    };
}

class LoginPage extends Component {

    constructor(props) {
        super(props);
    }

    render () {

        var msg = this.props.error;
        var alertBox = msg ? <AlertBox message={msg} /> : '';

        return (
            <div className="login">
                <div className="box darkbox">
                    <div className="body">
                        {alertBox}
                        <form className="frm">
                            <label htmlFor="username">Nom d'utilisateur</label>
                            <input type="text" id="username" name="username" onChange={this.props.onUsernameChange} />
                            <label htmlFor="passwd">Nom d'utilisateur</label>
                            <input type="password" id="passwd" name="password" onChange={this.props.onPasswordChange} />
                            <button className="btn btnblue" onClick={this.props.onLoginClick}>Connexion</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);