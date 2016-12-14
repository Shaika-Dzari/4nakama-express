import React, {PropTypes} from 'react';

import './confirmbutton.scss';

class ConfirmButton extends React.Component {

    constructor(props) {
        super(props);
        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.state = {
            confirming: false
        }
    }

    confirm() {
        this.setState({confirming: true});
    }

    cancel() {
        this.setState({confirming: false});
    }

    render() {

        let btn = null;

        if (this.state.confirming) {
            btn = (
                <span>
                    <button className={'btn ' + this.props.level} onClick={this.props.action}>Sure?</button>
                    <button className="btn btn-x" onClick={this.cancel}>X</button>
                </span>
            );
        } else {
            btn = <button className="btn btn-action" onClick={this.confirm}>{this.props.text}</button>;
        }

        return (
            <span className="confirm">
                {btn}
            </span>
        );
    }
}

ConfirmButton.propTypes = {
    action: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired,
    level: PropTypes.oneOf(['warning', 'info'])
}

export default ConfirmButton;