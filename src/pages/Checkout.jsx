import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { money } from '../data/products.js'
import { shippingFor } from './Cart.jsx'

const fields = [
  ['name', 'Full name', 'text', 'name'],
  ['email', 'Email', 'email', 'email'],
  ['address', 'Street address', 'text', 'street-address'],
  ['city', 'City', 'text', 'address-level2'],
  ['zip', 'Postal code', 'text', 'postal-code']
]

export default function Checkout() {
  const { lines, subtotal, dispatch } = useCart()
  const nav = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '', card: '' })
  const [errors, setErrors] = useState({})

  if (!lines.length) return <Navigate to="/cart" replace />
  const ship = shippingFor(subtotal)
  const total = subtotal + ship

  const validate = () => {
    const e = {}
    if (form.name.trim().length < 2) e.name = 'Enter your full name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Enter a valid email, like you@example.com.'
    if (form.address.trim().length < 4) e.address = 'Enter your street address.'
    if (form.city.trim().length < 2) e.city = 'Enter your city.'
    if (form.zip.trim().length < 3) e.zip = 'Enter your postal code.'
    if (form.card.replace(/\s/g, '').length < 12) e.card = 'Enter any 12+ digit number. This is a demo, nothing is charged.'
    return e
  }

  const submit = (ev) => {
    ev.preventDefault()
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return document.getElementById(Object.keys(e)[0])?.focus()
    const order = {
      ref: 'HH-' + Math.random().toString(36).slice(2, 8).toUpperCase(),
      name: form.name, email: form.email, address: `${form.address}, ${form.city} ${form.zip}`,
      lines: lines.map(({ name, qty, price }) => ({ name, qty, price })), subtotal, ship, total
    }
    try { sessionStorage.setItem('hollow-hour-order', JSON.stringify(order)) } catch { /* ignore */ }
    dispatch({ type: 'clear' })
    nav('/confirmation', { replace: true })
  }

  const bind = (k) => ({
    id: k, name: k, value: form[k],
    onChange: (e) => setForm({ ...form, [k]: e.target.value }),
    'aria-invalid': !!errors[k], 'aria-describedby': errors[k] ? `${k}-err` : undefined
  })

  return (
    <>
      <h1>Checkout</h1>
      <div className="cols">
        <form onSubmit={submit} noValidate className="form">
          <fieldset>
            <legend>Delivery</legend>
            {fields.map(([k, label, type, ac]) => (
              <div className="field" key={k}>
                <label htmlFor={k}>{label}</label>
                <input type={type} autoComplete={ac} {...bind(k)} />
                {errors[k] && <span className="err" id={`${k}-err`}>{errors[k]}</span>}
              </div>
            ))}
          </fieldset>
          <fieldset>
            <legend>Payment (demo)</legend>
            <div className="field">
              <label htmlFor="card">Card number</label>
              <input inputMode="numeric" autoComplete="off" placeholder="4242 4242 4242 4242" {...bind('card')} />
              {errors.card && <span className="err" id="card-err">{errors.card}</span>}
            </div>
          </fieldset>
          <button className="btn wide" type="submit">Place order, {money(total)}</button>
          <Link to="/cart" className="link">Back to cart</Link>
        </form>
        <aside className="sum" aria-label="Order summary">
          <h2>Your order</h2>
          <ul className="mini">
            {lines.map((l) => <li key={l.id}><span>{l.qty} × {l.name}</span><span>{money(l.qty * l.price)}</span></li>)}
          </ul>
          <dl>
            <div><dt>Shipping</dt><dd>{ship ? money(ship) : 'Free'}</dd></div>
            <div className="total"><dt>Total</dt><dd>{money(total)}</dd></div>
          </dl>
        </aside>
      </div>
    </>
  )
}
