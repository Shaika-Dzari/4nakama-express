import React, {PropTypes} from 'react';
import './onefile.scss';

const OneFile = ({reffileid, name, type, size}) => {

    return (
        <div key={reffileid} className="onefile">
            <div className="onefile-row">
                <div>
                    <h5>{name}</h5>
                    <span>{type}</span> - <span>{size}</span>
                </div>
                <div>
                    <a className="link-close">X</a>
                </div>
            </div>
        </div>
    );
}


OneFile.propTypes = {
    reffileid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    size: PropTypes.number
}

export default OneFile;