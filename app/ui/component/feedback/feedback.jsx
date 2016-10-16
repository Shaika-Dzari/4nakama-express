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
            return <span>loading...</span>;
        } else {
            return <span>waiting...</span>;
        }
    }
}

export default connect(mapStateToProps)(Feedback);


/*
export default class Feedback extends React.Component {

    constructor(props) {
        super(props);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.state = {
            isloading: false
        };
    }

    componentDidMount() {
        window.addEventListener('httpStart', this.handleStart);
        window.addEventListener('httpStop', this.handleStop);
    }

    componentWillUnmount() {
        window.removeEventListener('httpStart', this.handleStart);
        window.removeEventListener('httpStop', this.handleStop);
    }

    handleStart() {
        this.setState({isloading: true});
    }

    handleStop() {
        this.setState({isloading: false});
    }

    render() {

        if (this.state.isloading) {
            return <img alt="loading..." src="/ajax-loader.gif"></img>;
        } else {
            return null;
        }

    }
}

*/