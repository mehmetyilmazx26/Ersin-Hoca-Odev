import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="icon">S</div>
        <h2>SmartNode</h2>
      </div>
      
      <nav className="side-nav">
        <NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <span className="icon">📊</span> Dashboard
        </NavLink>
        <NavLink to="/settings" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
          <span className="icon">⚙️</span> Ayarlar
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <p>v1.0.2 Beta</p>
      </div>
    </aside>
  );
};

export default Sidebar;