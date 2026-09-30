import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, products, money } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export function Tile({ product, size = '' }) {
  return (
    <div className={`tile ${size}`} style={{ '--tone': product.tone }} aria-hidden="true">
      <span>{product.emoji}</span>
    </div>
  )
}

export default function Shop() {
  const [cat, setCat] = useState('All')
  const { dispatch } = useCart()
  const [added, setAdded] = useState(null)
  const list = cat === 'All' ? products : products.filter((p) => p.category === cat)

  const add = (p) => {
    dispatch({ type: 'add', id: p.id })
    setAdded(p.name)
  }

  return (
    <>
      <section className="hero">
        <div>
          <h1>The 31st arrives whether you are ready or not.</h1>
          <p>Decor, costumes, candy and light for every doorway. Ships in time.</p>
        </div>
        <div className="moon" aria-hidden="true" />
      </section>

      <section aria-labelledby="catalog">
        <div className="head">
          <h2 id="catalog">Shop the haunt</h2>
          <div className="chips" role="group" aria-label="Filter by category">
            {categories.map((c) => (
              <button key={c} className="chip" aria-pressed={cat === c} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
        </div>
        <p className="sr" role="status">{added ? `${added} added to cart` : ''}</p>
        <ul className="grid">
          {list.map((p) => (
            <li key={p.id} className="card">
              <Link to={`/product/${p.id}`} aria-label={`${p.name}, ${money(p.price)}`}>
                <Tile product={p} />
              </Link>
              <div className="body">
                <small>{p.category}</small>
                <h3><Link to={`/product/${p.id}`}>{p.name}</Link></h3>
                <div className="row">
                  <strong>{money(p.price)}</strong>
                  <button className="btn sm" onClick={() => add(p)} aria-label={`Add ${p.name} to cart`}>Add to cart</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
