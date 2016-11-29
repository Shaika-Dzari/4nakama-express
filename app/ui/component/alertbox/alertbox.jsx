import React from 'react';
import './alertbox.scss';

const AlertBox = ({message}) => {
    let show = {};
    if (!message) {
        show.display = 'none';
    } else {
        show.display = 'block';
    }

    return <div style={show} className="alert"><p>{message}</p></div>;
};

export default AlertBox;