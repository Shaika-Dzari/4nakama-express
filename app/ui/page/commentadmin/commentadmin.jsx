import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import LinkPager from '../../component/pager/linkpager.jsx';
import {doCommentOperation, doCommentFetch} from '../../actions/commentActions.js';

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
            return (
                <tr key={'comment-' + c.id}>
                    <td>{c.id}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td>
                        <a href="#" onClick={callback} data-n4-op="approved">Approuved</a>
                        <a href="#" onClick={callback} data-n4-op="delete">Delete</a>
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
                    <th>ID</th>
                    <th>Email</th>
                    <th>Text</th>
                    <th>Message</th>
                    <th>-</th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
};

class CommentAdmin extends React.Component {

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
        const { dispatch } = this.props
        this.onChangePage(this.props.page);
    }

    doOneOperation(event) {
        event.preventDefault();
        let link = event.target;
        console.log(link.dataset.n4Op);
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


export default connect(mapStateToProps)(CommentAdmin);
