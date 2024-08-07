import React from 'react';
import { App } from 'konsta/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TelegramProvider } from './context/TelegramContext';
import HomePage from './pages/HomePage';
import TasksPage from './pages/TasksPage';
import './App.css'
function TelegramMiniApp() {
  return (
    <TelegramProvider>
      <App theme="ios" dark>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TasksPage />} />
            {/* <Route path="/convert" element={<ConvertPage />} /> */}
          </Routes>
        </Router>
      </App>
    </TelegramProvider>
  );
}

export default TelegramMiniApp;
