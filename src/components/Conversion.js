import React from 'react';
import { BlockTitle, List, ListItem } from 'konsta/react';

const Conversion = () => {
    return (
        <div>
            <BlockTitle>Sharpe AI</BlockTitle>
            <List strongIos outlineIos>
                <ListItem title="Airdrop Snapshot Phase One" />
                <ListItem title="You need at least 20,000 diamonds to convert them into $SAI." />
                <ListItem title="1,000 💎" after="⬇️ 1" />
                <ListItem title="2,000 💎" after="⬇️ 2" />
                <ListItem title="5,000 💎" after="⬇️ 7" />
                <ListItem title="10,000 💎" after="⬇️ 17" />
                <ListItem title="20,000 💎" after="⬇️ 50,000" />
            </List>
        </div>
    );
};

export default Conversion;
