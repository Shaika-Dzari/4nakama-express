import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {doStatsFetch} from '../../actions/statisticActions.js';

import './dashboardcontent.scss';

const mapStateToProps = (state) => {
    return {
        statistics: state.statistics.items
    }
}

class DashboardContent extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(doStatsFetch());
    }

    render() {

        let sts = null;

        if (this.props.statistics && this.props.statistics.length > 0) {

            sts = this.props.statistics.map(s => {
                return <div key={'stats-' + s.id} className="dashboard-content-stats">
                            <span>{s.tablename}</span>
                            <span>{s.statistic}</span>
                            <span>{s.value}</span>
                       </div>;
            });
        }

        return (
            <div>
                <div className="row">
                    <div className="col-4">
                        <div className="dashboard-content-section">
                            <h4>Derniers Commentaires</h4>
                            <div className="dashboard-content-section-data">

                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="dashboard-content-section">
                            <h4>Création</h4>
                            <div className="dashboard-content-section-data">

                            </div>
                        </div>
                    </div>
                    <div className="col-4">
                        <div className="dashboard-content-section">
                            <h4>Statistics</h4>
                            <div className="dashboard-content-section-data">
                                {sts}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

DashboardContent.propTypes = {
    statistics: PropTypes.array,
    comments: PropTypes.array
};

export default connect(mapStateToProps)(DashboardContent);