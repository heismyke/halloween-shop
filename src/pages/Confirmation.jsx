import { Link } from 'react-router-dom'
import { money } from '../data/products.js'

export default function Confirmation() {
  let order = null
  try { order = JSON.parse(sessionStorage.getItem('hollow-hour-order')) } catch { /* ignore */ }
  if (!order)
    return <div className="empty"><h1>No recent order</h1><Link className="btn" to="/">Back to the shop</Link></div>
  return (
    <section className="done">
      <div className="seal" aria-hidden="true">🎃</div>
      <h1>Order confirmed</h1>
      <p>Thanks, {order.name.split(' ')[0]}. Your demo order is complete. No payment was taken and no email will be sent.</p>
      <p className="ref">Order number <strong>{order.ref}</strong></p>
      <div className="sum flat">
        <ul className="mini">
          {order.lines.map((l, i) => <li key={i}><span>{l.qty} × {l.name}</span><span>{money(l.qty * l.price)}</span></li>)}
        </ul>
        <dl>
          <div><dt>Shipping</dt><dd>{order.ship ? money(order.ship) : 'Free'}</dd></div>
          <div className="total"><dt>Demo total</dt><dd>{money(order.total)}</dd></div>
        </dl>
        <p className="hint">Delivering to {order.address}</p>
      </div>
      <Link className="btn" to="/">Keep shopping</Link>
    </section>
  )
}
