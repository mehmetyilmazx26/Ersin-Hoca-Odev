import React from 'react';
import './UrunCard.css';

const UrunCard = ({ ad, fiyat, stokAdedi, kategori }) => {
  const isStokYok = stokAdedi === 0;

  // Fiyatı formatlayan basit bir yardımcı fonksiyon
  const formatFiyat = (deger) => new Intl.NumberFormat('tr-TR').format(deger);

  return (
    <div className={`product-card ${isStokYok ? 'out-of-stock' : 'in-stock'}`}>
      <div className="card-header">
        <span className="category-tag">{kategori}</span>
        {isStokYok && <span className="sold-out-badge">TÜKENDİ</span>}
      </div>

      <div className="card-body">
        <h2 className="product-title">{ad}</h2>
        
        {!isStokYok ? (
          <div className="price-container">
            <span className="currency">₺</span>
            <span className="amount">{formatFiyat(fiyat)}</span>
          </div>
        ) : (
          <div className="sold-out-message">Gelecek hafta stokta</div>
        )}
      </div>

      <div className="card-footer">
        {!isStokYok ? (
          <div className="stock-counter">
            <div className="pulse-indicator"></div>
            Son {stokAdedi} ürün
          </div>
        ) : (
          <button className="notify-btn">Haber Ver</button>
        )}
      </div>
    </div>
  );
};

export default UrunCard;