import React from 'react';
import { connect } from 'react-redux';
import { doNavigationTo } from '../actions/navigationActions.js';
import { doFetchModules } from '../actions/moduleActions.js';

import './indexpage.scss';

const mapStateToProps = (state, ownProps) => {
    let to = ownProps.location.query.to;

    return {
        modules: state.modules,
        to: to
    };
};

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const {module} = this.props;
        const {dispatch} = this.props;

        // Modules need to be loaded before doing anything.
        if (!module || !module.items) {
            dispatch(doFetchModules());
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
        // Go to blog
        let to = this.props.to || 'blog';
        dispatch(doNavigationTo(this.props.modules.codeindex[to.toUpperCase()]));
    }

    render() {
        return (
            <div className="empty-index">
                <img src="/ajax-loader.gif" alt="..." />;
            </div>
        );
    }
}

export default connect(mapStateToProps)(IndexPage);