import React from 'react';
import PageHeader from '../components/pageheader/pageheader.jsx';

export const PublicLayout = ({ children }) => (
    <div>
        <PageHeader />
        { children }
    </div>
)
