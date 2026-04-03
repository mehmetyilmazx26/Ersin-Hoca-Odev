import React, { useState, useEffect } from 'react';

const TopBar = ({ user }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="topbar">
      <div className="breadcrumb">Ana Sayfa / {window.location.pathname.replace('/', '') || 'Dashboard'}</div>
      
      <div className="top-meta">
        <div className="live-date">
          📅 {date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </div>
        <div className="user-pill">
          <div className="avatar">{user.name[0]}</div>
          <span>{user.name}</span>
        </div>
      </div>
    </header>
  );
};

export default TopBar;