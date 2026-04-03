import React from 'react';
import NoteWidget from '../components/NoteWidget';

const Dashboard = ({ user }) => {
  return (
    <div className="page-content">
      <header className="page-intro">
        <h1>Selam, {user.name.split(' ')[0]}!</h1>
        <p>Bugün her şey yolunda görünüyor. İşte dijital özetin:</p>
      </header>

      <div className="bento-grid">
        {/* Hızlı Bilgi Kartı */}
        <div className="widget info-card highlight">
          <h3>🚀 Performans</h3>
          <div className="value">%98.4</div>
          <small>Sistem kararlılığı mükemmel.</small>
        </div>

        {/* Not Widget (Local Storage ile çalışır) */}
        <NoteWidget />

        {/* Depolama Analizi */}
        <div className="widget storage-card">
          <h3>📂 Bulut Depolama</h3>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: '65%' }}></div>
          </div>
          <div className="storage-meta">
            <span>6.5 GB / 10 GB</span>
            <span>%65</span>
          </div>
        </div>

        {/* Aktivite Özeti */}
        <div className="widget activity-card">
          <h3>🔔 Son Aktiviteler</h3>
          <ul>
            <li>• Profil bilgileri güncellendi</li>
            <li>• Not defteri kaydedildi</li>
            <li>• Yeni oturum açıldı</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;