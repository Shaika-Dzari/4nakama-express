import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import './pager.scss';

const Pager = ({onPrevious, onNext}) => {

    return (
        <div className="pager">
            {onPrevious ? <a href="#" onClick={onPrevious}>&lt; précédent</a> : null}
            {onNext ? <a href="#" onClick={onNext}>suivant &gt;</a> : null}
        </div>
    );
}

Pager.propTypes = {
    onPrevious: PropTypes.func,
    onNext: PropTypes.func
};

export default Pager;