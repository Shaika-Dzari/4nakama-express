import React, {PropTypes} from 'react';

const Thumbnail = ({file, action}) => {

    let preview = null;

    return (
        <div className="thumbnail">
            {preview}
        </div>
    );
};

Thumbnail.propTypes = {
    file: PropTypes.object.isRequired,
    action: PropTypes.func
};

export default Thumbnail;