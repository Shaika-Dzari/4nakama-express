import React from 'react';
import PageHeader from '../component/pageheader/pageheader.jsx';
import { withRouter } from 'react-router';
import AuthenticationService from '../utils/AuthenticationService.js';

class ProtectedLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.disconnect = this.disconnect.bind(this);
    }

    getUser() {
        // Reactively know if the user is authenticated
        return {
            user: sessionStorage.getItem("4nuser")
        };
    }

    disconnect(event) {
        event.preventDefault();
        this.props.router.push('/');
    }


    componentWillMount() {
        // Check that the user is logged in before the component mounts
        if (!this.getUser().user) {
            this.props.router.push('/login');
        }
    }

    // When the data changes, this method is called
    componentDidUpdate(prevProps, prevState) {
        // Now check that they are still logged in. Redirect to sign in page if they aren't.
        if (!this.getUser().user) {
            this.props.router.push('/login');
        }
    }

    render() {

        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default withRouter(ProtectedLayout);
