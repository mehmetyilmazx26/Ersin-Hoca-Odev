import React, { useState } from 'react';

const Settings = ({ user, setUser }) => {
  const [tempName, setTempName] = useState(user.name);

  const handleUpdate = (e) => {
    e.preventDefault();
    setUser({ ...user, name: tempName });
    alert("Profil başarıyla güncellendi!");
  };

  const toggleTheme = () => {
    const newTheme = user.theme === 'dark' ? 'light' : 'dark';
    setUser({ ...user, theme: newTheme });
  };

  return (
    <div className="page-content">
      <h1>⚙️ Sistem Ayarları</h1>
      
      <div className="settings-container glass-card">
        <form onSubmit={handleUpdate} className="settings-form">
          <section>
            <h3>Profil Bilgileri</h3>
            <label>Görünen Adın</label>
            <input 
              type="text" 
              value={tempName} 
              onChange={(e) => setTempName(e.target.value)} 
            />
          </section>

          <section>
            <h3>Görünüm</h3>
            <div className="theme-switcher">
              <span>Şu anki Tema: <strong>{user.theme.toUpperCase()}</strong></span>
              <button type="button" onClick={toggleTheme} className="btn-secondary">
                Temayı Değiştir
              </button>
            </div>
          </section>

          <button type="submit" className="btn-primary">Ayarları Kaydet</button>
        </form>
      </div>
    </div>
  );
};

export default Settings;