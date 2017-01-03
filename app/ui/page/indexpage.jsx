import React from 'react';
import { connect } from 'react-redux';
import { doNavigationTo } from '../actions/navigationActions.js';

const mapStateToProps = (state) => {
    return {
        modules: state.modules
    };
};

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        // Go to blog
        dispatch(doNavigationTo(this.props.modules.codeindex['BLOG']));
    }

    render() {
        return (
            <div>
            Loading...
            </div>
        );
    }
}

export default connect(mapStateToProps)(IndexPage);