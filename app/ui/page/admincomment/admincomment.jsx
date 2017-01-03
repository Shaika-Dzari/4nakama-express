import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import LinkPager from '../../component/pager/linkpager.jsx';
import {doCommentOperation, doCommentFetch} from '../../actions/commentActions.js';
import ConfirmButton from '../../component/confirmbutton/confirmbutton.jsx';
import { escapeHTML } from '../../utils/HtmlUtils.js';

const mapStateToProps = (state, ownProps) => {

    return {
        items: state.comments.items,
        index: state.comments.index,
        messageindex: state.comments.messageindex
    };
}

const CommentList = ({items, index, callback}) => {

    let rows = null;

    if (items && index && index.length > 0) {
        rows = index.map(i => {
            let c = items[i];
            let body = escapeHTML(c.body);

            if (body.length > 200) {
                body = body.substr(0, 200) + '...';
            }

            return (
                <tr key={'comment-' + c.id}>
                    <td className="cell-250">{c.authorname} / {c.email}</td>
                    <td>{body}</td>
                    <td className="cell-125">{c.messageid}</td>
                    <td className="cell-125">{c.approved ? <span>&#10003;</span> : <span>&#8709;</span>}</td>
                    <td className="right cell-250">
                        {!c.approved ? <button className="btn" href="#" onClick={() => callback(c.id, 'approve')}>Approve</button> : null}
                        <ConfirmButton text="Delete" action={() => callback(c.id, 'delete')} level="warning" />
                    </td>
                </tr>
            );
        })
    } else {
        rows = <tr key={'comment-none'}><td colSpan="5">None</td></tr>
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Name / Email</th>
                    <th>Text</th>
                    <th>Message</th>
                    <th>Approved</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

class AdminComment extends React.Component {

    // ({comments, index, messageindex})

    constructor(props) {
        super(props);
        this.onChangePage = this.onChangePage.bind(this);
        this.doOneOperation = this.doOneOperation.bind(this);
    }

    onChangePage(pageParam) {
        const { dispatch } = this.props
        dispatch(doCommentFetch(pageParam));
    }

    componentDidMount() {
        this.onChangePage(this.props.page);
    }

    doOneOperation(id, op) {
        const { dispatch } = this.props;

        dispatch(doCommentOperation(id, op));
    }

    render() {
        let prevdate = null;
        let nextdate = null;

        if (this.props.items && this.props.index && this.props.index.length > 0) {
            prevdate = this.props.items[this.props.index[0]].createdat;
            nextdate = this.props.items[this.props.index[this.props.index.length - 1]].createdat;
        }

        return (
            <div>
                <CommentList items={this.props.items} index={this.props.index} callback={this.doOneOperation} />
                <LinkPager size={10} prevdate={prevdate} nextdate={nextdate} callback={this.onChangePage} />
            </div>
        );

    }
}


export default connect(mapStateToProps)(AdminComment);
