import React from 'react';

import './taglist.scss';

const TagList = (props) => {

    var t = 'Aucun';

    if (props.data) {

        t = props.data.map((v, idx) => {
            return <a className="tag" href="#" key={v._id}>{v.name}</a>
        });

    } else if (props.error) {
        t = <AlertBox message={props.error} />
    }

    return (
        <div>
            {t}
        </div>
    );

}

export default TagList;