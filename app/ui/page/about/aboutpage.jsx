import React from 'react';
import { connect } from 'react-redux';
import {doSwitchModule} from '../../actions/messageActions.js';
import tr from '../../i18n/i18n.js';

import './aboutpage.scss';

const mapStateToProps = (state) => {
    let aboutmoduleid = state.modules.codeindex['ABOUT'];

    return {
        aboutmoduleid: aboutmoduleid,
        items: state.messages.items,
        displayed: state.messages.index[aboutmoduleid],
        locale: state.language.locale
    }
}

class AboutPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        if (!this.props.displayed) {
            dispatch(doSwitchModule({moduleid: this.props.aboutmoduleid}));
        }
    }

    render() {

        let divs = null;
        let locale = this.props.locale;

        if (this.props.displayed) {

            divs = this.props.displayed.map(i => {
                let m = this.props.items[i];

                return (
                    <div key={'about-' + m.id} className="about-page-msg">
                        <div dangerouslySetInnerHTML={{__html: m.bodyhtml}}></div>
                    </div>
                );
            });
        }

        return (
            <div className="about-page-ctn">
                <h1>{tr(locale, 'page_about_title')}</h1>
                {divs}
            </div>
        );
    }
}

export default connect(mapStateToProps)(AboutPage);