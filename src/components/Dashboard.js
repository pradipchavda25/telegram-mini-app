import React from 'react';
import { BlockTitle, List, ListItem } from 'konsta/react';

const Dashboard = () => {
    return (
        <div>
            <BlockTitle>Sharpe AI</BlockTitle>
            <List strongIos outlineIos>
                <ListItem title="Total Prize Pool" after="10,000,000 $SAI" />
                <ListItem title="Onboarding" after="+500 💎" />
                <ListItem title="Basic Task" after="+16,500 💎" />
                <ListItem title="OG Task" after="+44,000 💎" />
                <ListItem title="Daily Task" after="+6,500 💎" />
            </List>
        </div>
    );
};

export default Dashboard;
