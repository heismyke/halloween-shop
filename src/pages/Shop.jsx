import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, products, money } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export function Tile({ product, size = '' }) {
  return (
    <div className={`tile ${size}`}>
      <img src={`/images/products/${product.id}.webp`} alt={product.name} loading={size === 'big' ? 'eager' : 'lazy'} width="800" height="800" />
    </div>
  )
}

export default function Shop() {
  const [cat, setCat] = useState('All')
  const { dispatch, count, subtotal } = useCart()
  const [added, setAdded] = useState(null)
  const list = cat === 'All' ? products : products.filter((p) => p.category === cat)

  const add = (p) => {
    dispatch({ type: 'add', id: p.id })
    setAdded(p.name)
  }

  return (
    <>
      <section className="hero">
        <img className="hero-photo" src="/images/hero.webp" alt="Glowing jack-o’-lanterns and candle lanterns on a Halloween porch" fetchPriority="high" width="1600" height="900" />
        <div className="hero-copy">
          <p className="eyebrow">The Halloween collection · October 31</p>
          <h1>A little fright.<br /><em>A lot of delight.</em></h1>
          <p>Set the scene for a wonderfully wicked night. Discover decor, dress-up, and treats worth knocking for.</p>
          <a className="btn" href="#catalog">Shop the collection <span aria-hidden="true">↗</span></a>
          <span className="hero-caption">Make your doorstep the one they remember.</span>
        </div>
      </section>

      <div className="perks"><span>Free shipping over $60</span><span>Little details. Big Halloween energy.</span><span>Decor · Costumes · Treats</span></div>

      <section aria-labelledby="catalog">
        <div className="head">
          <div><p className="eyebrow">Find your kind of spooky</p><h2 id="catalog">Shop the haunt<span className="catalog-count">{list.length} finds</span></h2></div>
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
        {count > 0 && <div className="cart-shortcut"><div><strong>{count} {count === 1 ? 'find' : 'finds'} in your bag · {money(subtotal)}</strong><span role="status">{added ? `${added} added` : 'Your Halloween is taking shape.'}</span></div><Link className="btn" to="/cart">View cart <span aria-hidden="true">→</span></Link></div>}
      </section>
    </>
  )
}
