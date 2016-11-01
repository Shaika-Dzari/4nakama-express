import React from 'react';
import PageHeader from '../component/pageheader/pageheader.jsx';

const PublicLayout = ({ children }) => (
    <div>
        <PageHeader />
        { children }
    </div>
);

export default PublicLayout;
