import React from 'react';
import {Link} from 'react-router';
import TagList from '../../component/taglist/taglist.jsx';
import CategoryList from '../../component/categorylist/categorylist.jsx';
import MessageList from '../../component/messagelist/messagelist.jsx';

import './blogpage.scss';


export default class BlogPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tags: {
                data: [],
                error: null
            },
            messages: {
                data: [],
                error: null
            },
            categories: {
                data: [],
                error: null
            }
        };
    }

    componentWillMount() {

        var self = this;
        // Messages
        window.fetch('/api/messages/public')
                .then(r => r.json())
                .then(msgs => self.setState({messages: {data: msgs}}))
                .catch(e => self.setState({messages: {error: e}}));
        
        // Tags
        window.fetch('/api/tags')
                .then(r => r.json())
                .then(tgs => self.setState({tags: {data: tgs}}))
                .catch(e => self.setState({tags: {error: e}}));
        
        // Categories
        window.fetch('/api/categories')
                .then(r => r.json())
                .then(cats => self.setState({categories: {data: cats}}))
                .catch(e => self.setState({categories: {error: e}}));
        
        
    }


    render() {

        return (
            <div className="row">
                <div className="col-10">
                    <div className="list-ctn">
                        <MessageList {...this.state.messages} />
                    </div>
                </div>
                <div className="col-2">
                    <div className="list-ctn">
                        <h3>Catégories</h3>
                        <CategoryList {...this.state.categories} />
                    </div>
                    <div className="list-ctn">
                        <h3>Tags</h3>
                        <TagList {...this.state.tags} />
                    </div>
                </div>
            </div>
        );
    }
}