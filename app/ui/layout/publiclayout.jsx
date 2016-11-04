import React from 'react';
import PageHeader from '../component/pageheader/pageheader.jsx';

const PublicLayout = ({ children }) => (
    <div className="page-layout">
        <div className="menu-section">
            <PageHeader />
        </div>

        <div className="content-section">
            { children }
        </div>

    </div>
);

export default PublicLayout;
