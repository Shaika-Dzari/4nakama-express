import React from 'react';
import {Link} from 'react-router';

import './pager.scss';

const PAGE_SIZE = 5;

const Pager = (props) => {

    // <Link to="/ecriture" activeClassName="active" key="link_2">Écriture</Link>

    var precLink = 'to=' + encodeURIComponent(props.startdate) + '&size=' + PAGE_SIZE;
    var nextLink = 'from=' + encodeURIComponent(props.enddate) + '&size=' + PAGE_SIZE;

    return (
        <div className="pager">
            <Link className="btn" to={precLink}>Précédent</Link>
            <Link className="btn" to={nextLink}>Suivant</Link>
        </div>
    );
}

export default Pager;