// HomePage.js
import React, { useEffect, useState } from 'react';
import { Page, Navbar, Block, List, ListItem, Button } from 'konsta/react';
import { Link } from 'react-router-dom';
import { useTelegram } from '../context/TelegramContext';

function HomePage() {
  const { webApp, user } = useTelegram();
  const [diamonds, setDiamonds] = useState(500);

  useEffect(() => {
    if (webApp) {
      // Example of handling a custom event from the Telegram app
      webApp.onEvent('mainButtonClicked', () => {
        webApp.showAlert('Main button was clicked!');
      });

      // Set up main button
      webApp.MainButton.setText('EARN MORE').show().onClick(() => {
        webApp.showAlert('Ready to earn more diamonds?');
      });

      // Clean up
      return () => {
        webApp.offEvent('mainButtonClicked');
        webApp.MainButton.hide();
      };
    }
  }, [webApp]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDiamonds(prev => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Page>
      <Navbar title="Sharpe AI" />
      <Block>
        <List>
          <ListItem
            title={user ? `${user.first_name} ${user.last_name}` : 'Anonymous'}
            after={`${diamonds} 💎`}
            subtitle="Wallet: Not Created"
          />
        </List>
      </Block>
      <Block>
        <Link to="/tasks">
          <Button>View Tasks</Button>
        </Link>
        <Link to="/convert">
          <Button>Convert Diamonds</Button>
        </Link>
      </Block>
    </Page>
  );
}

export default HomePage;