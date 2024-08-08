import React from 'react';
import { Page, Navbar } from 'konsta/react';
import Dashboard from '../components/Dashboard';

const DashboardPage = () => {
    return (
        <Page>
            <Navbar title="Sharpe AI" backLink="Back" />
            <Dashboard />
        </Page>
    );
};

export default DashboardPage;
