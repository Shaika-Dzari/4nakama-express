import React, {PropTypes} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {doSwitchModule} from '../../actions/messageActions.js';
import tr from '../../i18n/i18n.js';

import './storypage.scss';

const maptStateToProps = (state) => {
    let storymoduleid = state.modules.codeindex['STORY'];
    return {
        storymoduleid: storymoduleid,
        items: state.messages.items,
        displayed: state.messages.moduleindex[storymoduleid] || [],
        locale: state.language.locale
    }
}


class StoryPage extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        if (!this.props.displayed || this.props.displayed.length == 0) {
            dispatch(doSwitchModule({moduleid: this.props.storymoduleid}));
        }
    }

    render() {

        let stories = this.props.displayed.map(i => {
            let m = this.props.items[i];

            return (
                <div key={'story-' + m.id} className="story-page-msg">
                    <div dangerouslySetInnerHTML={{__html: m.bodyhtml}}></div>
                </div>
            );
        });

        return (
            <div className="story-page">

                <div className="row">
                    <div className="col-2">
                        <div className="story-page-menu">
                            <h1><Link to="/" className="link"><span>&#9664; {tr(this.props.locale, 'page_story_menu_back')}</span></Link></h1>
                        </div>
                    </div>
                    <div className="col-8">
                        <div className="story-page-text">
                            <div className="story-page-header">
                                <h1>4nakama - {tr(this.props.locale, 'page_story_title')}</h1>
                            </div>
                            <div className="story-page-items">
                                {stories}
                            </div>
                        </div>
                    </div>
                    <div className="col-2">

                    </div>
                </div>

            </div>
        );
    }
}

export default connect(maptStateToProps)(StoryPage);
