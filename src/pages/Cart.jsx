import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { money } from '../data/products.js'
import { Tile } from './Shop.jsx'

export const SHIPPING = 4.99
export const shippingFor = (subtotal) => (subtotal === 0 || subtotal >= 60 ? 0 : SHIPPING)

export default function Cart() {
  const { lines, subtotal, dispatch } = useCart()
  if (!lines.length)
    return (
      <div className="empty">
        <h1>Your cart is empty</h1>
        <p>Add a few items and they will wait here, even after you close the tab.</p>
        <Link className="btn" to="/">Browse the shop</Link>
      </div>
    )
  const ship = shippingFor(subtotal)
  return (
    <>
      <p className="eyebrow">Your Halloween, collected</p>
      <div className="page-heading"><h1>Your cart</h1><Link to="/">Continue shopping ↗</Link></div>
      <div className="cols">
        <ul className="lines">
          {lines.map((l) => (
            <li key={l.id}>
              <Tile product={l} size="sm" />
              <div className="info">
                <Link to={`/product/${l.id}`}>{l.name}</Link>
                <span>{money(l.price)} each</span>
                <button className="link" onClick={() => dispatch({ type: 'remove', id: l.id })}>Remove</button>
              </div>
              <div className="qty" role="group" aria-label={`Quantity for ${l.name}`}>
                <button onClick={() => dispatch({ type: 'set', id: l.id, qty: l.qty - 1 })} aria-label="Decrease quantity">−</button>
                <output>{l.qty}</output>
                <button onClick={() => dispatch({ type: 'set', id: l.id, qty: l.qty + 1 })} aria-label="Increase quantity">+</button>
              </div>
              <strong className="lt">{money(l.price * l.qty)}</strong>
            </li>
          ))}
        </ul>
        <aside className="sum" aria-label="Order summary">
          <h2>Summary</h2>
          <dl>
            <div><dt>Subtotal</dt><dd>{money(subtotal)}</dd></div>
            <div><dt>Shipping</dt><dd>{ship ? money(ship) : 'Free'}</dd></div>
            <div className="total"><dt>Total</dt><dd>{money(subtotal + ship)}</dd></div>
          </dl>
          {ship > 0 && <p className="hint">Add {money(60 - subtotal)} more for free shipping.</p>}
          <Link className="btn wide" to="/checkout">Go to checkout</Link>
        </aside>
      </div>
    </>
  )
}
