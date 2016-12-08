import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';
import { doChallenge } from '../actions/userActions.js';

const mapStateToProps = (state, ownProps) => {
    return {
        connectedUser: state.user.connectedUser,
        location: ownProps.location
    }
}

class ProtectedLayout extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // Check that the user is logged in before the component mounts

        if (!this.props.connectedUser) {
            const { dispatch } = this.props;

            if (sessionStorage.getItem('4nuser')) {
                dispatch(doChallenge(location.pathname));
            } else {
                dispatch(push('/login'));
            }
        }
    }

    // When the data changes, this method is called
    componentDidUpdate(prevProps, prevState) {
        // Now check that they are still logged in. Redirect to sign in page if they aren't.
        if (!this.props.connectedUser) {
            const { dispatch } = this.props;
            dispatch(push('/login'));
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


export default connect(mapStateToProps)(withRouter(ProtectedLayout));

//export default withRouter(ProtectedLayout);
