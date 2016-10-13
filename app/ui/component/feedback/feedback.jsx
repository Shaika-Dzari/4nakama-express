import React from 'react';

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