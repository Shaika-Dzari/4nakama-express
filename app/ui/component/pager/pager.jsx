import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import './pager.scss';

const Pager = ({onPrevious, onNext}) => {

    return (
        <div className="pager">
            {onPrevious ? <button className="btn" onClick={onPrevious}>&#9664; précédent</button> : null}
            {onNext ? <button className="btn" onClick={onNext}>suivant  &#9654;</button> : null}
        </div>
    );
}

Pager.propTypes = {
    onPrevious: PropTypes.func,
    onNext: PropTypes.func
};

export default Pager;