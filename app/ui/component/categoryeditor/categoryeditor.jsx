import React from 'react';

const CATEGORY_URL = '/api/categories';

class CategoryEditor extends React.Component {

    constructor(props) {
        super(props);
        this.onAddCategory = this.onAddCategory.bind(this);
        this.onCategoryAddInputChange = this.onCategoryAddInputChange.bind(this);
        this.onSaveCategory = this.onSaveCategory.bind(this);
        this.state = {
            categories: [],
            showAddInput: false
        };
    }

    componentWillMount() {
        this.fetchCategory();
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
        .catch(e => self.setState({error: e}))

    }

    onCategoryAddInputChange(event) {
        this.setState({newcategory: event.target.value});
    }

    fetchCategory() {
        let self = this;

        window.fetch(CATEGORY_URL, {credentials: 'include'})
                .then(r => r.json())
                .then(cats => self.setState({categories: cats}))
                .catch(e => self.setState({error: e}));
    }

    render() {

        let cs = this.state.categories.map((v, idx) => {
            let key = 'c-' + v._id;
            return (
                <li key={key}>
                    <label>
                        <input type="checkbox" onClick={this.props.onComponentSelect} /> {v.name}
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
                            <input type="text" className={this.state.showAddInput ? '' : 'hidden'} onChange={this.onCategoryAddInputChange} />
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

                    <ul className="simple-list">
                        {cs}
                    </ul>
                </div>
            </div>
        );
    }
}


CategoryEditor.propTypes = {
    onComponentSelect: React.PropTypes.func
};

export default CategoryEditor;