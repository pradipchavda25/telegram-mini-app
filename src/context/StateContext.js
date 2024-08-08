import React, { createContext, useContext, useState } from 'react';

// Create the context
const StateContext = createContext();

// Create a provider component
export const StateProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("tab-1");

  return (
    <StateContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </StateContext.Provider>
  );
};

// Create a custom hook to use the StateContext
export const useStateContext = () => useContext(StateContext);
