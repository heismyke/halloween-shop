import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getProduct, money, products } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'
import { Tile } from './Shop.jsx'

export default function Product() {
  const { id } = useParams()
  const nav = useNavigate()
  const { dispatch } = useCart()
  const [qty, setQty] = useState(1)
  const [done, setDone] = useState(false)
  const p = getProduct(id)

  if (!p) return <div className="empty"><h1>Product not found</h1><Link className="btn" to="/">Back to the shop</Link></div>
  const related = products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3)

  return (
    <>
      <p className="crumb"><Link to="/">Shop</Link> / {p.category}</p>
      <section className="detail">
        <Tile product={p} size="big" />
        <div>
          <h1>{p.name}</h1>
          <p className="price">{money(p.price)}</p>
          <p className="lead">{p.description}</p>
          <div className="buy">
            <div className="qty" role="group" aria-label="Quantity">
              <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Decrease quantity">−</button>
              <output aria-live="polite">{qty}</output>
              <button onClick={() => setQty(Math.min(20, qty + 1))} aria-label="Increase quantity">+</button>
            </div>
            <button className="btn" onClick={() => { dispatch({ type: 'add', id: p.id, qty }); setDone(true) }}>Add to cart</button>
          </div>
          <p className="sr" role="status">{done ? 'Added to cart' : ''}</p>
          {done && (
            <p className="note">
              Added. <Link to="/cart">View cart</Link> or <button className="link" onClick={() => nav('/checkout')}>check out now</button>.
            </p>
          )}
        </div>
      </section>
      {related.length > 0 && (
        <section aria-labelledby="rel">
          <h2 id="rel">More {p.category.toLowerCase()}</h2>
          <ul className="grid three">
            {related.map((r) => (
              <li key={r.id} className="card">
                <Link to={`/product/${r.id}`} aria-label={r.name}><Tile product={r} /></Link>
                <div className="body"><h3><Link to={`/product/${r.id}`}>{r.name}</Link></h3><strong>{money(r.price)}</strong></div>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
