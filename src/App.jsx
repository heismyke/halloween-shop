import { useEffect } from 'react'
import { Link, NavLink, Route, Routes, useLocation } from 'react-router-dom'
import { useCart } from './context/CartContext.jsx'
import Shop from './pages/Shop.jsx'
import Product from './pages/Product.jsx'
import Cart from './pages/Cart.jsx'
import Checkout from './pages/Checkout.jsx'
import Confirmation from './pages/Confirmation.jsx'

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

export default function App() {
  const { count } = useCart()
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <header className="bar">
        <Link to="/" className="brand" aria-label="Hollow Hour, home">
          <span aria-hidden="true">🎃</span> Hollow Hour
        </Link>
        <nav aria-label="Main">
          <NavLink to="/" end>Shop</NavLink>
          <NavLink to="/cart" className="cartlink">
            Cart <span className="badge" aria-label={`${count} items in cart`}>{count}</span>
          </NavLink>
        </nav>
      </header>
      <ScrollTop />
      <main id="main">
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="*" element={<div className="empty"><h1>Nothing lurks here</h1><Link className="btn" to="/">Back to the shop</Link></div>} />
        </Routes>
      </main>
      <footer className="foot">Demo store for a project evaluation. No real payments are taken.</footer>
    </>
  )
}
