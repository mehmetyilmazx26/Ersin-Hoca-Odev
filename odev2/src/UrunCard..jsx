import React from 'react';
import './UrunCard.css';

const UrunCard = ({ ad, fiyat, stokAdedi, kategori }) => {
  const isOutOfStock = stokAdedi === 0;

  return (
    <div className={`card-container ${isOutOfStock ? 'out-of-stock' : 'in-stock'}`}>
      <div className="card-badge">{kategori}</div>
      
      <div className="card-content">
        <h3 className="product-title">{ad}</h3>
        
        {/* Koşullu Render: Stok Durumu */}
        {!isOutOfStock ? (
          <div className="pricing-section">
            <span className="price-tag">{fiyat} ₺</span>
            <div className="stock-info">
              <span className="pulse-dot"></span>
              Stokta {stokAdedi} adet
            </div>
          </div>
        ) : (
          <div className="sold-out-overlay">
            <span className="error-text">TÜKENDİ</span>
          </div>
        )}
      </div>

      <button className="action-button" disabled={isOutOfStock}>
        {isOutOfStock ? 'Gelince Haber Ver' : 'Sepete Ekle'}
      </button>
    </div>
  );
};

export default UrunCard;