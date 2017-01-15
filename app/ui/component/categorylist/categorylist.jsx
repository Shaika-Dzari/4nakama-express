import React, { PropTypes } from 'react';

const CategoryList = ({categories, index, listClass, callback}) => {

    let cats = 'Aucun';
    listClass = listClass || '';

    if (categories && index) {
        cats = index.map((v, idx) => {
            let c = categories[v];

            if (callback) {

                return (
                        <li key={'catlist-cat-' + v}>
                            <a href="#" className="link" onClick={callback} data-n4-id={c.id}>{c.name}</a>
                            { c.description ? <p>{c.description}</p> : null }
                        </li>);
            } else {

                return (
                    <li key={'catlist-cat-' + v}>
                        <span>{c.name}</span>
                        { c.description ? <p>{c.description}</p> : null }
                    </li>);
            }
        });
    }

    return (
        <ul className={listClass}>
            {cats}
        </ul>
    );
}

CategoryList.propTypes = {
    categories: PropTypes.object.isRequired,
    index: PropTypes.array.isRequired,
    listClass: PropTypes.string,
    callback: PropTypes.func
};

/*
PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }).isRequired)
 */

export default CategoryList;