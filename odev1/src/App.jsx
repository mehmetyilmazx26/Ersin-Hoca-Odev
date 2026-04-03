import { useState } from 'react'; // State kullanımı için
import DeviceCard from './components/DeviceCard';
import './App.css';

function App() {
  // Veriyi bir state içinde tutmak, ileride bu verinin 
  // değişebileceği (API'den gelmesi gibi) durumlar için en iyi pratiktir.
  const [pc] = useState({
    marka: "Apple",
    model: "MacBook Pro",
    yil: 2024
  });

  return (
    <div className="container">
      <header>
        <span className="badge">JS Frameworks - Hafta 1</span>
        <h1>React Öğreniyorum</h1>
      </header>

      {/* Veriyi 'prop' olarak alt bileşene gönderiyoruz */}
      <DeviceCard data={pc} />
    </div>
  );
}

export default App;