import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import AlertBox from '../../component/alertbox/alertbox.jsx';
import BlogAuth from '../../utils/BlogAuth.js';

import './loginpage.scss';


class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.login = this.login.bind(this);
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    onSuccessLogin() {
        this.props.router.goBack();
    }


    login(event) {
        event.preventDefault();

        var self = this;
        var u = this.state.username;
        var p = this.state.passwd;

        //console.log(BlogAuth);

        BlogAuth.connection(u, p);
    }

    handleUserNameChange(event) {
        this.setState({
            username : event.target.value
        });
    }

    handlePasswordChange(event) {
        this.setState({
            passwd : event.target.value
        });
    }


    render () {

        var msg = this.state.loginErrMsg;
        var alertBox = msg ? <AlertBox message={msg} /> : '';

                            //<button className="btn btnblue" onClick={this.login}>Connexion</button>
        return (
            <div className="login">
                <div className="box darkbox">
                    <div className="body">
                        {alertBox}
                        <form className="frm" method="post" action="/api/sec/login">
                            <label htmlFor="username">Nom d'utilisateur</label>
                            <input type="text" id="username" name="username" onChange={this.handleUserNameChange} />
                            <label htmlFor="passwd">Nom d'utilisateur</label>
                            <input type="password" id="passwd" name="password" onChange={this.handlePasswordChange} />
                            <input type="submit" value="submit"></input>
                        </form>
                    </div>
                </div>

            </div>
        );
    }
}

export default withRouter(LoginPage);