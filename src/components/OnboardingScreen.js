import React from 'react';
import UserInfo from './UserInfo';

const OnboardingScreen = () => {
  const tasks = [
    { icon: '🔒', name: 'Create a aallet', reward: 500 },
    { icon: '𝕏', name: 'Sign Up', reward: 2000 },
  ];

  return (
    <div className="bg-neutral-950 text-white min-h-screen p-4">
      {/* Header */}
      <UserInfo />

      {/* Basic Task Title */}
      <h2 className="text-gray-400 mb-4">ONBOARDING</h2>

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

export default OnboardingScreen;