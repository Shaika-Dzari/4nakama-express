import React, {PropTypes, Component} from 'react';

import './clipboard.scss';

class Clipboard extends Component {
    //= ({elements, onPaste}) => {

    constructor(props) {
        super(props);
        this.onClickElement = this.onClickElement.bind(this);
        this.state = {preview: null};
    }

    onClickElement(val, event) {
        event.preventDefault();
        this.setState({preview: val})
    }

    render() {

        let uiElements = null;

        if (this.props.elements && this.props.elements.length > 0) {
            uiElements = this.props.elements.map(e => {
                return <li key={'clip-' + e.id}><a href="#" onClick={event => this.onClickElement(e, event)}>&#9733; {e.name}</a></li>
            });
        }

        let uiPreview = null;

        if (this.state.preview) {
            let v = this.state.preview;
            let img = '![' + v.name + '](' + v.value + ')';
            uiPreview = <div className="frm">
                            <h4>{v.name}</h4>
                            <label htmlFor="clipboard-img-mk">Image Markdown</label>
                            <input type="text" id="clipboard-img-mk" value={img} autoFocus="autofocus" />
                            <label htmlFor="clipboard-val">Valeur</label>
                            <input type="text" id="clipboard-val" value={v.value} />

                        </div>;
        }

        return (
            <div className="box">
                <div className="heading">
                    <h4>Clipboard</h4>
                </div>
                <div className="body clipboard">
                {uiElements ? <ul className="simple-list">{uiElements}</ul> : <span>Vide</span>}
                {uiPreview}
                </div>
            </div>
        );
    }
};

Clipboard.propTypes = {
    elements: PropTypes.array
};

export default Clipboard;