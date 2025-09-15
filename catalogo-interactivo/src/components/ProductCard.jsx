// src/components/ProductCard.jsx
import React from "react";

function ProductCardBase({ product, onSelect }) {
  return (
    <li role="article" style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: '100%', height: 180, objectFit: 'contain', borderRadius: 6 }}
        loading="lazy"
      />
      <h3 style={{ margin: '8px 0 4px', fontSize: 16 }}>{product.title}</h3>
      <p style={{ margin: '0 0 4px', fontWeight: 600 }}>${product.price.toFixed(2)}</p>
      <small style={{ color: '#666' }}>{product.category}</small>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => onSelect(product.id)}>Ver detalle</button>
      </div>
    </li>
  );
}

// Evita re-render si product/onSelect no cambiaron
export const ProductCard = React.memo(ProductCardBase);
