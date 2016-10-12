import React from 'react';
import './alertbox.scss';

const AlertBox = (props) => {

    if (!props.message) {
        return null;
    }

    return (
        <div className="alert">
            <p>{props.message}</p>
        </div>
    );
};

export default AlertBox;