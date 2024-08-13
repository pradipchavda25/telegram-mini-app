// TabContext.js
import React, { createContext, useState, useContext } from 'react';

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState("home");
  const [userPoints, setUserPoints] = useState(0);
  const [completedTasks, setCompletedTasks] = useState({ onboarding: 0, basictasks: 0, dailytasks: 0 });

  return (
    <TabContext.Provider value={{ currentTab, setCurrentTab, userPoints, setUserPoints, completedTasks, setCompletedTasks }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => useContext(TabContext);
