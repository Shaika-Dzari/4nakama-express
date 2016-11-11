import React from 'react';

import FileGridItem from './filegriditem.jsx';
import './filegrid.scss';

const FileGrid = ({items, index, prevPageCallback, nextPageCallback}) => {

    let fs = null;
    if (items) {
        fs = index.map(i => {
            let f = items[i];
            return <FileGridItem key={'fgi-' + f._id} file={f} />
        });
    }

    return (
        <div className="grid-list clear-float">
            <h4>Fichiers</h4>
            {fs}
        </div>
    );
}

export default FileGrid;