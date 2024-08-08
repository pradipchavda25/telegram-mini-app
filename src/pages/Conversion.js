import React from 'react';
import { Page, Navbar } from 'konsta/react';
import Conversion from '../components/Conversion';

const ConversionPage = () => {
    return (
        <Page>
            <Navbar title="Sharpe AI" backLink="Back" />
            <Conversion />
        </Page>
    );
};

export default ConversionPage;
