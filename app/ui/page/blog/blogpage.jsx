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
                    .catch(e => console.log("Booo" + e));

    }


    render() {
        var t = null;

        if (this.state.tags) {
            var t = this.state.tags.map((v, idx) => {
                return <a className="tag" href="#" key={v._id}>{v.name}</a>
            });
        }

        return (
            <div>
                <h1>Blog Page</h1>
                <div>
                    {t}
                </div>
            </div>
        );
    }
}