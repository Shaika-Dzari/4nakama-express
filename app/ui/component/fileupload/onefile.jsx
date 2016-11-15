import React, {PropTypes} from 'react';
import './onefile.scss';

const OneFile = ({reffileid, name, type, size, progress, completed, cancelUpload}) => {

    let progressScore = progress != null ? progress + '%' : null;
    let completedStatus = completed ? 'Done!' : '-';
    return (
        <div key={reffileid} className="onefile">
            <div className="onefile-row">
                <div>
                    <h5>{name}</h5>
                    <span>{type}</span> - <span>{size}</span>
                </div>
                <div>
                    <span>{progressScore}</span> <span>{completedStatus}</span>
                    <a className="link-close" onclick={() => { cancelUpload(name); }}>X</a>
                </div>
            </div>
        </div>
    );
}


OneFile.propTypes = {
    reffileid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    size: PropTypes.number,
    progress: PropTypes.number,
    completed: PropTypes.bool,
    cancelUpload: PropTypes.func.isRequired
}

export default OneFile;