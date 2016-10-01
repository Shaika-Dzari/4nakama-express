import React from 'react';
import {Link} from 'react-router';

import './blogpage.scss';


export default class BlogPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {

        var self = this;
        window.fetch('/api/tags')
                .then(r => r.json())
                .then(data => {
                    self.setState({tags: data});
                })
                .catch(e => self.setState({error: e}));
    }


    render() {
        var t = null;

        if (this.state.tags) {
            t = this.state.tags.map((v, idx) => {
                return <a className="tag" href="#" key={v._id}>{v.name}</a>
            });

        } else if (this.state.error) {
            t = <AlertBox message={this.state.error} />
        }

        return (
            <div className="row">
                <div className="col-10">
                    <h1>Blog Page</h1>
                    <div>

                        ...
                    </div>
                </div>
                <div className="col-2">
                    <div>
                        <h3>Catégories</h3>

                        ....
                    </div>
                    <div>
                        <h3>Tags</h3>
                        {t}
                    </div>
                </div>
            </div>
        );
    }
}