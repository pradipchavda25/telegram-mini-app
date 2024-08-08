import React from 'react';
import { BlockTitle, List, ListItem } from 'konsta/react';

const TaskList = () => {
    return (
        <div>
            <BlockTitle>BASIC TASK</BlockTitle>
            <List strongIos outlineIos>
                <ListItem media="<img src='lock_icon.png' />" title="Join GMCAT Group" after="+500 💎" />
                <ListItem media="<img src='x_icon.png' />" title="Follow Sharpe AI on X" after="+2000 💎" />
                <ListItem media="<img src='telegram_icon.png' />" title="Join Sharpe AI Telegram Group" after="+2000 💎" />
                <ListItem media="<img src='telegram_icon.png' />" title="Subscribe Channel" after="+1000 💎" />
                <ListItem media="<img src='lock_icon.png' />" title="Join Discord Server" after="+500 💎" />
                <ListItem media="<img src='lock_icon.png' />" title="Visit Sharpe AI Website" after="+500 💎" />
                <ListItem media="<img src='lock_icon.png' />" title="Read Sharpe AI Docs" after="+500 💎" />
                <ListItem media="<img src='lock_icon.png' />" title="Check out gmINFRA" after="+500 💎" />
            </List>
        </div>
    );
};

export default TaskList;
