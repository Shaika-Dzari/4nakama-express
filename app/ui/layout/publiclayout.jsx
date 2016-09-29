import React from 'react';
import PageHeader from '../component/pageheader/pageheader.jsx';

export const PublicLayout = ({ children }) => (
    <div>
        <PageHeader />
        { children }
    </div>
)
