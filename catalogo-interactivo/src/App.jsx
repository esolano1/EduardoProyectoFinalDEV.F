import { useEffect, useState, useMemo, useCallback, useDeferredValue, useTransition } from 'react';
import { getProducts, getCategories } from './services/products';
import Header from "./components/Header";

export default function App() {
  const [items, setItems] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // estados para búsqueda y filtros
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("relevance");

  const [isPending, startTransition] = useTransition();
  const deferredQ = useDeferredValue(q);

  useEffect(() => {
    getProducts()
      .then(setItems)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));

    getCategories()
      .then(setCats)
      .catch(console.error);
  }, []);

  // callbacks estables
  const onChangeQ = useCallback((e) => setQ(e.target.value), []);
  const onChangeCategory = useCallback((e) => setCategory(e.target.value), []);
  const onChangeSort = useCallback((e) => {
    const next = e.target.value;
    startTransition(() => setSort(next));
  }, []);

  // lista derivada optimizada
  const filteredSorted = useMemo(() => {
    const term = deferredQ.trim().toLowerCase();
    let list = items;

    if (term) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(term) ||
        p.category.toLowerCase().includes(term)
      );
    }
    if (category !== "all") {
      list = list.filter(p => p.category === category);
    }
    if (sort === "price_asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list = [...list].sort((a, b) => b.price - a.price);

    return list;
  }, [items, deferredQ, category, sort]);

  return (
    <main style={{ padding: 24 }}>
      <Header />
      <h1>Catálogo Interactivo — Fake Store API</h1>

      {/* controles */}
      <div style={{ display: "grid", gap: 12, gridTemplateColumns: "1fr 200px 200px", maxWidth: 800, marginBottom: 16 }}>
        <input
          placeholder="Buscar…"
          value={q}
          onChange={onChangeQ}
        />
        <select value={category} onChange={onChangeCategory}>
          <option value="all">Todas las categorías</option>
          {cats.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={sort} onChange={onChangeSort}>
          <option value="relevance">Relevancia</option>
          <option value="price_asc">Precio ↑</option>
          <option value="price_desc">Precio ↓</option>
        </select>
      </div>

      {loading && <p>Cargando productos...</p>}
      {error && <p style={{ color: 'crimson' }}>Error: {error}</p>}
      {isPending && <p style={{ color: "#666" }}>Aplicando orden…</p>}

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
          {filteredSorted.map((p) => (
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
