import React from 'react';
import { Link } from 'react-router';
import PagingParam from '../../utils/PagingParam.js';

import './pager.scss';

const LinkPager = ({prevdate, nextdate, size, callback}) => {

    let pp = new PagingParam(prevdate, 'prev', size);
    let np = new PagingParam(nextdate, 'next', size);

    return (
        <div className="pager">
            { prevdate ? <button className="btn" onClick={(event) => {event.preventDefault(); callback(pp); }}>&#9664; Previous</button> : null }
            { nextdate ? <button className="btn" onClick={(event) => {event.preventDefault(); callback(np); }}>Next &#9654;</button> : null }
        </div>
    );
}

export default LinkPager;