import React from 'react';
import UserInfo from './UserInfo';

const BasicTaskScreen = () => {
  const tasks = [
    { icon: '🔒', name: 'Join GMCAT Group', reward: 500 },
    { icon: '𝕏', name: 'Follow Sharpe AI on X', reward: 2000 },
    { icon: '✈️', name: 'Join Sharpe AI Telegram Group', reward: 2000 },
    { icon: '✈️', name: 'Subscribe Channel', reward: 1000 },
    { icon: '🔒', name: 'Join Discord Server', reward: 500 },
    { icon: '🔒', name: 'Visit Sharpe AI Website', reward: 500 },
    { icon: '🔒', name: 'Read Sharpe AI Docs', reward: 500 },
    { icon: '🔒', name: 'Check out gmINFRA', reward: 500 },
  ];

  return (
    <div className="bg-neutral-950 text-white min-h-screen p-4">
      {/* Header */}
      <UserInfo />

      {/* Basic Task Title */}
      <h2 className="text-gray-400 mb-4">BASIC TASK</h2>

      {/* Task List */}
      {tasks.map((task, index) => (
        <div key={index} className="bg-neutral-900 rounded-lg p-4 mb-2 flex justify-between items-center">
          <div className="flex items-center">
            <span className="mr-3 text-xl">{task.icon}</span>
            <span>{task.name}</span>
          </div>
          <div className="text-sm">+{task.reward} 💎</div>
        </div>
      ))}
    </div>
  );
};

export default BasicTaskScreen;