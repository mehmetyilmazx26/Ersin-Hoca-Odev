import React, { useState, useMemo } from 'react';
import './App.css';

// İkonlar ve Statik Veriler (Opsiyonel olarak buraya alınabilir)
const STATS_ICONS = { total: "👥", engineering: "💻", arts: "🎨", other: "📚" };

function App() {
  const [ogrenciler, setOgrenciler] = useState([
    { id: 1, ad: "Ahmet Yılmaz", bolum: "Bilgisayar Mühendisliği", tarih: "2024-03-15" },
    { id: 2, ad: "Ayşe Demir", bolum: "Mimarlık", tarih: "2024-03-16" }
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  // Öğrenci Ekleme (Gelişmiş)
  const ogrenciEkle = (yeniVeri) => {
    setOgrenciler([{ 
      id: Date.now(), 
      ...yeniVeri, 
      tarih: new Date().toISOString().split('T')[0] 
    }, ...ogrenciler]);
  };

  // Silme (Onay Mekanizmalı)
  const ogrenciSil = (id) => {
    if(window.confirm("Bu kaydı silmek istediğinize emin misiniz?")) {
      setOgrenciler(ogrenciler.filter(o => o.id !== id));
    }
  };

  // Arama Filtresi
  const filteredStudents = useMemo(() => {
    return ogrenciler.filter(o => 
      o.ad.toLowerCase().includes(searchQuery.toLowerCase()) || 
      o.bolum.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [ogrenciler, searchQuery]);

  return (
    <div className="admin-layout">
      {/* Sol Sidebar (Branding) */}
      <aside className="sidebar">
        <div className="logo-area">
          <span className="logo-icon">EDU</span>
          <h2>Portal<span>.v2</span></h2>
        </div>
        <nav className="side-nav">
          <div className="nav-item active">📊 Dashboard</div>
          <div className="nav-item">📋 Kayıtlar</div>
          <div className="nav-item">⚙️ Ayarlar</div>
        </nav>
      </aside>

      {/* Ana İçerik */}
      <main className="main-viewport">
        <header className="top-bar">
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Öğrenci veya bölüm ara..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="user-profile">Admin Üye</div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <span className="s-icon">{STATS_ICONS.total}</span>
            <div className="s-info"><h3>{ogrenciler.length}</h3><p>Toplam Kayıt</p></div>
          </div>
          <div className="stat-card">
            <span className="s-icon">{STATS_ICONS.engineering}</span>
            <div className="s-info">
              <h3>{ogrenciler.filter(o => o.bolum.includes("Müh")).length}</h3>
              <p>Mühendislik</p>
            </div>
          </div>
        </section>

        <div className="content-grid">
          {/* Sol: Form */}
          <div className="glass-card form-section">
            <h3>Yeni Kayıt</h3>
            <OgrenciFormu onKaydet={ogrenciEkle} />
          </div>

          {/* Sağ: Liste */}
          <div className="glass-card list-section">
            <div className="list-header">
              <h3>Öğrenci Listesi</h3>
              <span className="count-pill">{filteredStudents.length} Sonuç</span>
            </div>
            
            <div className="student-list">
              {filteredStudents.length > 0 ? (
                filteredStudents.map(o => (
                  <div key={o.id} className="student-item slide-in">
                    <div className="st-avatar">{o.ad[0]}</div>
                    <div className="st-details">
                      <h4>{o.ad}</h4>
                      <p>{o.bolum}</p>
                    </div>
                    <div className="st-meta">{o.tarih}</div>
                    <button onClick={() => ogrenciSil(o.id)} className="action-btn delete">🗑️</button>
                  </div>
                ))
              ) : (
                <div className="empty-state">Aranan kriterde kayıt bulunamadı.</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function OgrenciFormu({ onKaydet }) {
  const [form, setForm] = useState({ ad: "", bolum: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.ad && form.bolum) {
      onKaydet(form);
      setForm({ ad: "", bolum: "" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="modern-form">
      <div className="field">
        <label>Tam Adı</label>
        <input 
          value={form.ad} 
          onChange={(e) => setForm({...form, ad: e.target.value})} 
          placeholder="Ad Soyad" 
          required 
        />
      </div>
      <div className="field">
        <label>Fakülte / Bölüm</label>
        <input 
          value={form.bolum} 
          onChange={(e) => setForm({...form, bolum: e.target.value})} 
          placeholder="Bölüm Adı" 
          required 
        />
      </div>
      <button type="submit" className="submit-btn">Kayıt Oluştur</button>
    </form>
  );
}

export default App;