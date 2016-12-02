import React, {PropTypes} from 'react';

class ToggleBox extends React.Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            showed: false
        };
    }

    toggle() {
        this.setState({showed: !this.state.showed});
    }

    render() {
        let cssClass = this.state.showed ? 'show' : 'hidden';

        return (
            <div className="box">
                <div className="heading">
                    <div className="right">
                        <button className="btn btnblue" onClick={this.toggle}>&#9776;</button>
                    </div>
                </div>
                <div className="body">
                    <div className={cssClass}>
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

ToggleBox.propTypes = {

};

export default ToggleBox;