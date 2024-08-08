// import React from 'react';
// import { App } from 'konsta/react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { TelegramProvider } from './context/TelegramContext';
// import HomePage from './pages/HomePage';
// import TasksPage from './pages/TasksPage';
// import './App.css'
// function TelegramMiniApp() {
//   return (
//     <TelegramProvider>
//       <App theme="ios" dark>
//         <Router>
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/tasks" element={<TasksPage />} />
//             {/* <Route path="/convert" element={<ConvertPage />} /> */}
//           </Routes>
//         </Router>
//       </App>
//     </TelegramProvider>
//   );
// }

// export default TelegramMiniApp;


import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Conversion from './pages/Conversion';
import Dashboard from './pages/Dashboard';
import Earn from './pages/Earn';
import Leaderboard from './pages/Leaderboard';
import Referral from './pages/Referral';
import GMAI from './pages/GMAI';
import Wallet from './pages/Wallet';
import './App.css'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/conversion" element={<Conversion />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/earn" element={<Earn />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/referral" element={<Referral />} />
                <Route path="/gmai" element={<GMAI />} />
                <Route path="/wallet" element={<Wallet />} />
            </Routes>
        </Router>
    );
};

export default App;
