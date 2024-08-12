// TabContext.js
import React, { createContext, useState, useContext } from 'react';

const TabContext = createContext();

export const TabProvider = ({ children }) => {
  const [currentTab, setCurrentTab] = useState("home");
  const [userPoints, setUserPoints] = useState(0);

  return (
    <TabContext.Provider value={{ currentTab, setCurrentTab, userPoints, setUserPoints }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => useContext(TabContext);
