import React from 'react';
import './alertbox.scss';

const AlertBox = ({message}) => {

    if (!message) {
        return null;
    }

    return (
        <div className="alert">
            <p>{message}</p>
        </div>
    );
};

export default AlertBox;