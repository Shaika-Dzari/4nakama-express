import React from 'react';
import PageHeader from '../component/pageheader/pageheader.jsx';
import { withRouter } from 'react-router';

class ProtectedLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    getMeteorData() {
        // Reactively know if the user is authenticated
        return {
            isAuthenticated: Meteor.userId() !== null
        };
    }

    signOut(e) {
        e.preventDefault();

        // Log out the user and navigate back to the home page on success
        Meteor.logout(this.signOutCallback);
    }

    signOutCallback(error) {
        if (error === undefined) {
            this.props.router.push('/')
        }
    }

    componentWillMount() {
        // Check that the user is logged in before the component mounts
        if (!this.getMeteorData().isAuthenticated) {
            this.props.router.push('/login');
        }
    }

    // When the data changes, this method is called
    componentDidUpdate(prevProps, prevState) {
        // Now check that they are still logged in. Redirect to sign in page if they aren't.
        if (!getMeteorData().isAuthenticated) {
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
