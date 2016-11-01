import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import './pager.scss';

const PAGE_SIZE = 5;

const Pager = ({startdate, enddate}) => {

    // <Link to="/ecriture" activeClassName="active" key="link_2">Écriture</Link>

    var precLink = 'to=' + encodeURIComponent(startdate) + '&size=' + PAGE_SIZE;
    var nextLink = 'from=' + encodeURIComponent(enddate) + '&size=' + PAGE_SIZE;

    return (
        <div className="pager">
            <a href="#">&lt; Précédent</a>
            <a href="#">Suivant &gt;</a>
        </div>
    );
}

Pager.propTypes = {
    startdate: PropTypes.string,
    enddate: PropTypes.string
};

export default Pager;