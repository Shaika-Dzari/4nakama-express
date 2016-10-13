import React from 'react';
import {Map, List} from 'immutable';
import AlertBox from '../alertbox/alertbox.jsx';
import HttpUtils from '../../utils/HttpUtils.js';

const CATEGORY_URL = '/api/categories';

class CategoryEditor extends React.Component {

    constructor(props) {
        super(props);
        this.onAddCategory = this.onAddCategory.bind(this);
        this.onCategoryAddInputChange = this.onCategoryAddInputChange.bind(this);
        this.onSaveCategory = this.onSaveCategory.bind(this);
        this.onCheckCategory = this.onCheckCategory.bind(this);
        this.state = {
            categories: List(),
            showAddInput: false,
            newcategory: '',
            error: ''
        };
    }

    componentWillMount() {

        let self = this;

        HttpUtils.query(CATEGORY_URL, {credentials: 'include'}, r => r.json(), cats => {

                    for (let c of cats) {
                        if (self.props.selectedItems && self.props.selectedItems.indexOf(c) != -1) {
                            c.checked = 'checked';
                        } else {
                            c.checked = '';
                        }
                    }

                    self.setState({categories: List(cats)});
                }, e => {
                    self.setState({error: e})
                });

        //this.fetchCategory();
    }

    onAddCategory() {
        this.setState({showAddInput: true});
    }

    onSaveCategory() {
        this.setState({showAddInput: false});
        let self = this;
        let c = {name: this.state.newcategory};

        fetch(CATEGORY_URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(c),
            credentials: 'include'
        })
        .then(r => r.json())
        .then( newcat => {
            let cats = self.state.categories;
            let catsprime = cats.concat(newcat);


            self.setState({categories: catsprime});
        })
        .catch(e => {
            console.log(e);
            self.setState({error: e})
        });

    }

    onCategoryAddInputChange(event) {
        this.setState({newcategory: event.target.value});
    }

    onCheckCategory(event) {
        // Get category from state
        let value = event.target.value;

        let cat = this.state.categories.find(c => c._id === value);

        if (!cat) {
            console.log('Unable to find category #' + value);
        }
        console.log(cat);
        this.props.onComponentSelect(cat);
    }

    fetchCategory() {
        let self = this;

        window.fetch(CATEGORY_URL, {credentials: 'include'})
                .then(r => r.json())
                .then(cats => {

                    for (let c of cats) {
                        if (self.props.selectedItems && self.props.selectedItems.indexOf(c) != -1) {
                            c.checked = 'checked';
                        } else {
                            c.checked = '';
                        }
                    }

                    self.setState({categories: List(cats)});
                })
                .catch(e => {
                    self.setState({error: e})
                });
    }

    render() {


        let cs = this.state.categories.map((v, idx) => {
            let key = 'c-' + v._id;
            return (
                <li key={key}>
                    <label>
                        <input type="checkbox" onClick={this.onCheckCategory} defaultChecked={v.checked} value={v._id} /> {v.name}
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
                    <AlertBox message={this.state.error} />
                    <ul className="simple-list">
                        {cs}
                    </ul>
                </div>
            </div>
        );
    }
}


CategoryEditor.propTypes = {
    // selectedItems: React.PropTypes.isInstance(List),
    onComponentSelect: React.PropTypes.func
};

export default CategoryEditor;