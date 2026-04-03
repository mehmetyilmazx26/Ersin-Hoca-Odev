import { useState, useEffect, useMemo } from "react";
import "./App.css";

const SEHIRLER = [ /* Şehir listesi aynı kalıyor */ ];

function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCity, setActiveCity] = useState(SEHIRLER.find(c => c.ad === "Gaziantep"));
    const [query, setQuery] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());

    // Canlı saat güncellemesi
    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const filteredList = useMemo(() => {
        return SEHIRLER.filter(s => s.ad.toLowerCase().includes(query.toLowerCase()));
    }, [query]);

    const loadData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`https://ezanvakti.emushaf.net/vakitler/${activeCity.id}`);
            const json = await res.json();
            setData(json);
        } catch (e) {
            console.error("Veri çekilemedi", e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadData(); }, [activeCity]);

    // Bugünün verisini bul
    const todayData = useMemo(() => {
        const todayStr = currentTime.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\./g, ' ');
        return data.find(d => d.MiladiTarihKisa === todayStr) || data[0];
    }, [data, currentTime]);

    return (
        <div className="dashboard-container">
            {/* Sidebar Geliştirildi */}
            <aside className="sidebar">
                <div className="sidebar-header">
                    <div className="moon-glow">🌙</div>
                    <h1>NUR <span>2026</span></h1>
                </div>
                
                <div className="search-wrapper">
                    <input 
                        type="text" 
                        placeholder="Şehir Ara..." 
                        onChange={(e) => setQuery(e.target.value)}
                    />
                </div>

                <nav className="city-nav">
                    {filteredList.map(city => (
                        <div 
                            key={city.id} 
                            className={`city-pill ${activeCity.id === city.id ? 'active' : ''}`}
                            onClick={() => setActiveCity(city)}
                        >
                            {city.ad}
                        </div>
                    ))}
                </nav>
            </aside>

            {/* Ana Panel */}
            <main className="hero-section">
                {loading ? (
                    <div className="super-loader">Yükleniyor...</div>
                ) : (
                    <>
                        <header className="hero-header">
                            <div className="hero-text">
                                <h2>{activeCity.ad}</h2>
                                <p>{todayData?.HicriTarihUzun}</p>
                            </div>
                            <div className="live-clock">
                                {currentTime.toLocaleTimeString('tr-TR')}
                            </div>
                        </header>

                        {/* Öne Çıkan Vakit Kartları */}
                        <section className="vakit-focus">
                            <div className="focus-card sahur">
                                <span>İMSAK (SAHUR)</span>
                                <h3>{todayData?.Imsak}</h3>
                            </div>
                            <div className="countdown-center">
                                <div className="timer-circle">
                                    <small>İftara Kalan</small>
                                    <div className="timer-val">Hesaplanıyor...</div>
                                </div>
                            </div>
                            <div className="focus-card iftar">
                                <span>AKŞAM (İFTAR)</span>
                                <h3>{todayData?.Aksam}</h3>
                            </div>
                        </section>

                        {/* Yatay İmsakiye Listesi */}
                        <section className="timeline-section">
                            <h3>30 Günlük İmsakiye</h3>
                            <div className="timeline-grid">
                                {data.filter(i => i.HicriTarihUzun.includes("Ramazan")).map((item, idx) => (
                                    <div key={idx} className={`timeline-card ${idx === 0 ? 'current' : ''}`}>
                                        <div className="day-badge">{idx + 1}</div>
                                        <div className="times">
                                            <div><span>İmsak</span> <strong>{item.Imsak}</strong></div>
                                            <div className="divider"></div>
                                            <div><span>İftar</span> <strong>{item.Aksam}</strong></div>
                                        </div>
                                        <div className="date">{item.MiladiTarihKisa}</div>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </>
                )}
            </main>
        </div>
    );
}

export default App;