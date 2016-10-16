import React, { PropTypes } from 'react';

const CategoryList = ({categories}) => {

    let c = 'Aucun';

    if (categories) {
        c = categories.map((v, idx) => {
            return <li key={v._id}><a href="#">{v.name}</a></li>
        });
    }

    return (
        <ul>
            {c}
        </ul>
    );
}

CategoryList.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired)
};

export default CategoryList;