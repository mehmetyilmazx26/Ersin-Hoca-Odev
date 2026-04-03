import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';
import './App.css';

function App() {
  // Kullanıcı ismini LocalStorage'dan alıyoruz
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('smart_user');
    return saved ? JSON.parse(saved) : { name: "Misafir Kullanıcı", theme: "dark" };
  });

  useEffect(() => {
    localStorage.setItem('smart_user', JSON.stringify(user));
  }, [user]);

  return (
    <Router>
      <div className={`app-layout ${user.theme}`}>
        <Sidebar />
        <div className="main-container">
          <TopBar user={user} />
          <div className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard user={user} />} />
              <Route path="/settings" element={<Settings user={user} setUser={setUser} />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;