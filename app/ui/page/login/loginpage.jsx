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

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.onLoginClick = this.onLoginClick.bind(this);
        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
    }

    onLoginClick(event) {
        event.preventDefault();
        const {dispatch} = this.props;
        dispatch(doLoginPageSubmit(this.props.username, this.props.passwd));
    }

    onUsernameChange(event) {
        const {dispatch} = this.props;
        let v = event.target.value;
        event.preventDefault();
        dispatch(doLoginPageUsernameKp(v));
    }

    onPasswordChange(event) {
        const {dispatch} = this.props;
        let v = event.target.value;
        event.preventDefault();
        dispatch(doLoginPagePasswdKp(v));
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
                            <input type="text" id="username" name="username" onChange={this.onUsernameChange} />
                            <label htmlFor="passwd">Nom d'utilisateur</label>
                            <input type="password" id="passwd" name="password" onChange={this.onPasswordChange} />
                            <button className="btn btnblue" onClick={this.onLoginClick}>Connexion</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps)(LoginPage);