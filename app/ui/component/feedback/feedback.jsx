import React from 'react';
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
    return {
        isloading: state.navigation.isloading
    }
}

class Feedback extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        if (this.props.isloading) {
            return <span>Loading...</span>;
        } else {
            return <span>Waiting</span>;
        }
    }
}

export default connect(mapStateToProps)(Feedback);