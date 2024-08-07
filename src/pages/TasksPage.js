// TasksPage.js
import React, { useEffect, useState } from 'react';
import { Page, Navbar, List, ListItem } from 'konsta/react';
import { useTelegram } from '../context/TelegramContext';

function TasksPage() {
  const { webApp } = useTelegram();
  const [tasks, setTasks] = useState([
    { id: 1, title: "Join GMCAT Group", reward: 500, completed: false },
    { id: 2, title: "Follow GM.AI on X", reward: 2000, completed: false },
  ]);

  useEffect(() => {
    if (webApp) {
      webApp.BackButton.show().onClick(() => webApp.close());

      return () => {
        webApp.BackButton.hide();
      };
    }
  }, [webApp]);

  const completeTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: true } : task
    ));
    webApp.showAlert(`Task completed! You earned ${tasks.find(t => t.id === id).reward} diamonds.`);
  };

  return (
    <Page>
      <Navbar title="Tasks" />
      <List>
        {tasks.map(task => (
          <ListItem
            key={task.id}
            title={task.title}
            after={`+${task.reward} 💎`}
            onClick={() => completeTask(task.id)}
            disabled={task.completed}
          />
        ))}
      </List>
    </Page>
  );
}

export default TasksPage;