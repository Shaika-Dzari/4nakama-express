import React from 'react';
import { connect } from 'react-redux';

import './admincategory.scss';

const mapStateToProps = (state) => {
    return {
        locale: state.language.locale
    }
}

const AdminCategory = () => {

    return (
        <div className="admin-category-page">
            <h1>Admin Category</h1>
            <p>...</p>
        </div>
    );
}

export default connect(mapStateToProps)(AdminCategory);
