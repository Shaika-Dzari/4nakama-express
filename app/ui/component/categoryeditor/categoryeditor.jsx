import React from 'react';
import { connect } from 'react-redux';
import AlertBox from '../alertbox/alertbox.jsx';
import {doCategorySave} from '../../actions/categoryActions.js';

const CATEGORY_URL = '/api/categories';

const mapStateToProps = (state) => {
    return {
        categories: state.categories.items,
        index: state.categories.index,
        error: state.categories.error
    };
};

class CategoryEditor extends React.Component {

    constructor(props) {
        super(props);
        this.onAddCategory = this.onAddCategory.bind(this);
        this.onCategoryAddInputChange = this.onCategoryAddInputChange.bind(this);
        this.onSaveCategory = this.onSaveCategory.bind(this);
        this.onCheckCategory = this.onCheckCategory.bind(this);
        this.state = {
            showAddInput: false
        };
    }

    onAddCategory() {
        this.setState({showAddInput: true});
    }

    onSaveCategory() {
        this.setState({showAddInput: false});
        this.setState({newcategory: ''});

        let c = { _id: 'new', name: this.state.newcategory };
        const { dispatch } = this.props;
        dispatch(doCategorySave(c));
    }

    onCategoryAddInputChange(event) {
        this.setState({newcategory: event.target.value});
    }

    onCheckCategory(event) {
        let value = event.target.value;
        let cat = this.props.categories[value];
        if (cat) {
            this.props.onComponentSelect(cat);
        } else {
            console.log('Unable to find category #' + value);
        }
    }

    isSelected(cId) {
        for (let c in this.props.selectedItems) {
            if (c._id === cId) {
                return true;
            }
        }
        return false;
    }

    render() {

        let cs = this.props.index.map((cid) => {
            let key = 'c-' + cid;
            let cat = this.props.categories[cid];
            let checked = this.isSelected(cid);
            return (
                <li key={key}>
                    <label>
                        <input type="checkbox" onClick={this.onCheckCategory} defaultChecked={checked} value={cid} /> {cat.name}
                    </label>
                </li>
            );
        });

        return (
            <div className="box bluebox">
                <div className="heading">
                    <div className="row">
                        <div className="col-6">
                            <h4 className={this.state.showAddInput ? 'hidden' : ''}>Catégories</h4>
                            <input type="text" className={this.state.showAddInput ? '' : 'hidden'} onChange={this.onCategoryAddInputChange} value={this.state.newcategory} />
                        </div>
                        <div className="col-6 right">
                            <button className="btn" className={this.state.showAddInput ? 'hidden' : ''} onClick={this.onAddCategory}>
                            +
                            </button>
                            <button className="btn" className={this.state.showAddInput ? '' : 'hidden'} onClick={this.onSaveCategory}>
                            Créer
                            </button>
                        </div>
                    </div>
                </div>
                <div className="body">
                    <AlertBox message={this.props.error} />
                    <ul className="simple-list">
                        {cs}
                    </ul>
                </div>
            </div>
        );
    }
}

CategoryEditor.propTypes = {
    categories: React.PropTypes.object.isRequired,
    selectedItems: React.PropTypes.array,
    onComponentSelect: React.PropTypes.func
};

export default connect(mapStateToProps)(CategoryEditor);