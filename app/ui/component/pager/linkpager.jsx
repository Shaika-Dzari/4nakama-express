import React from 'react';
import { Link } from 'react-router';
import PagingParam from '../../utils/PagingParam.js';

import './pager.scss';

const LinkPager = ({prevdate, nextdate, size, callback}) => {

    let pp = new PagingParam(prevdate, 'prev', size);
    let np = new PagingParam(nextdate, 'next', size);

    return (
        <div className="pager">
            <a href="#" onClick={(event) => {event.preventDefault(); callback(pp); }}>Previous</a>
            <a href="#" onClick={(event) => {event.preventDefault(); callback(np); }}>Next</a>
        </div>
    );
}

export default LinkPager;