import React, { PropTypes } from 'react';

const CategoryList = ({categories, index}) => {

    let cats = 'Aucun';

    if (categories && index) {
        cats = index.map((v, idx) => {
            let c = categories[v];
            return <li key={v}><a href="#">{c.name}</a></li>
        });
    }

    return (
        <ul>
            {cats}
        </ul>
    );
}

CategoryList.propTypes = {
    categories: PropTypes.object.isRequired,
    index: PropTypes.array.isRequired
};

/*
PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired)
 */

export default CategoryList;