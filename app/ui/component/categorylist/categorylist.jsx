import React from 'react';

const CategoryList = (props) => {

    var c = 'Aucun';

    if (props.data) {

        c = props.data.map((v, idx) => {
            return <li key={v._id}><a href="#">{v.name}</a></li>
        });

    } else if (props.error) {
        c = <AlertBox message={props.error} />
    }

    return (
        <ul>
            {c}
        </ul>
    );
}

export default CategoryList;