import React from 'react';
import './alertbox.scss';

const AlertBox = (props) => {

    return (
        <div className="alert">
            <p>
                {props.message}
            </p>
        </div>
    );
};

export default AlertBox;