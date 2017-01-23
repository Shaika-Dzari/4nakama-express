import React from 'react';
import { connect } from 'react-redux';
import AlertBox from '../alertbox/alertbox.jsx';
import {doCategorySave, doCategoryFetch, doCategoryInputChange} from '../../actions/categoryActions.js';

const CATEGORY_URL = '/api/categories';

const mapStateToProps = (state, ownProps) => {

    let modidx = ownProps.moduleid || state.modules.codeindex['BLOG'];
    let obj = {
        categories: state.categories.items,
        index: state.categories.moduleindex[modidx] || [],
        error: state.categories.error,
        newcategoryname: state.categories.newcategoryname
    };

    console.log('mapStateToProps => ', obj);
    return obj;
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

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(doCategoryFetch(this.props.moduleid));
    }


    onAddCategory() {
        this.setState({showAddInput: true});
    }

    onSaveCategory() {
        let c = Object.assign({}, {id: 'new', name: this.props.newcategoryname, moduleid: this.props.moduleid});
        const { dispatch } = this.props;
        dispatch(doCategorySave(c));

       // this.setState({showAddInput: false});
    }

    onCategoryAddInputChange(event) {
        const {dispatch} = this.props;
        let name = event.target.value;
        dispatch(doCategoryInputChange(name));
    }

    onCheckCategory(event) {
        let checked = event.target.checked;
        let value = event.target.value;
        let cat = this.props.categories[value];
        if (cat) {
            checked ? this.props.onComponentSelect(cat) : this.props.onComponentUnSelect(cat);
        } else {
            console.log('Unable to find category #' + value);
        }
    }

    isSelected(cId) {
        if (this.props.selectedItems) {
            for (let c in this.props.selectedItems) {
                if (this.props.selectedItems[c].id == cId) {
                    return true;
                }
            }
        }
        return false;
    }

    render() {
        console.log('render()', this.props.index);
        let cs = this.props.index.map(cid => {
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
                        <div className="col-8">
                            <h4 className={this.state.showAddInput ? 'hidden' : ''}>Catégories</h4>
                            <input type="text" className={this.state.showAddInput ? '' : 'hidden'}
                                   onChange={this.onCategoryAddInputChange} value={this.props.newcategoryname} style={{width: '99%'}} />
                        </div>
                        <div className="col-4 right">
                            <button className={this.state.showAddInput ? 'hidden' : 'btn'} onClick={this.onAddCategory}>
                            +
                            </button>
                            <button className={this.state.showAddInput ? 'btn' : 'hidden'} onClick={this.onSaveCategory}>
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
    moduleid: React.PropTypes.number.isRequired,
    onComponentSelect: React.PropTypes.func.isRequired,
    onComponentUnSelect: React.PropTypes.func.isRequired
};

export default connect(mapStateToProps)(CategoryEditor);