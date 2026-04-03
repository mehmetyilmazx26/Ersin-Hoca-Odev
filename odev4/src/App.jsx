import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setError('');
    
    if (!email || !password) {
      setError('Lütfen tüm alanları doldurunuz!');
      return;
    }

    setLoading(true);

    // Yapay bir bekleme süresi ekleyerek profesyonel bir hava katıyoruz
    setTimeout(() => {
      if (email === 'ornek@xyz.com' && password === '12345') {
        setIsLoggedIn(true);
      } else {
        setError('E-posta veya parola hatalı!');
      }
      setLoading(false);
    }, 1500);
  };

  if (isLoggedIn) {
    return (
      <div className="auth-wrapper">
        <div className="status-card success fade-in">
          <div className="check-icon">✓</div>
          <h1>Hoş Geldin!</h1>
          <p>Yönetim paneline başarıyla yönlendiriliyorsun.</p>
          <button onClick={() => setIsLoggedIn(false)} className="btn-secondary">Çıkış Yap</button>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-wrapper">
      <div className="login-box">
        <div className="login-header">
          <div className="logo-placeholder">G</div>
          <h2>Tekrar Merhaba</h2>
          <p>Lütfen bilgilerinle giriş yap.</p>
        </div>

        <div className="input-group">
          <div className={`field ${error ? 'error-field' : ''}`}>
            <label>E-Posta</label>
            <input 
              type="email" 
              value={email}
              placeholder="ornek@xyz.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className={`field ${error ? 'error-field' : ''}`}>
            <label>Parola</label>
            <input 
              type="password" 
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <div className="error-alert">{error}</div>}

        <div className="action-area">
          <button 
            onClick={handleLogin} 
            className={`btn-primary ${loading ? 'btn-loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
          </button>
          
          <button onClick={() => {setEmail(''); setPassword(''); setError('');}} className="btn-link">
            Formu Temizle
          </button>
        </div>

        <div className="login-footer">
          <p>Hesabın yok mu? <span>Kayıt Ol</span></p>
        </div>
      </div>
    </div>
  );
}

export default App;