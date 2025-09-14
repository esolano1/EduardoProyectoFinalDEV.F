import { useEffect, useState } from 'react';
import { getProducts } from './services/products';

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main style={{ padding: 24 }}>
      <h1>Catálogo Interactivo — Fake Store API</h1>

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}

      {!loading && !error && (
        <ul
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 16,
            listStyle: 'none',
            padding: 0,
          }}
        >
          {items.map((p) => (
            <li key={p.id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 12 }}>
              <img
                src={p.image}
                alt={p.title}
                style={{ width: '100%', height: 180, objectFit: 'contain', borderRadius: 6 }}
                loading="lazy"
              />
              <h3 style={{ margin: '8px 0 4px', fontSize: 16 }}>{p.title}</h3>
              <p style={{ margin: '0 0 4px', fontWeight: 600 }}>${p.price.toFixed(2)}</p>
              <small style={{ color: '#666' }}>{p.category}</small>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
