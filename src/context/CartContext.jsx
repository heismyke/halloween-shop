import { createContext, useContext, useEffect, useMemo, useReducer } from 'react'
import { getProduct } from '../data/products.js'

const KEY = 'hollow-hour-cart'
const CartContext = createContext(null)

const load = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY))
    if (!Array.isArray(raw)) return []
    const normalized = new Map()
    for (const item of raw) {
      const product = item && getProduct(item.id)
      const qty = Number(item?.qty)
      if (!product || !Number.isFinite(qty) || qty < 1) continue
      normalized.set(product.id, Math.min(20, (normalized.get(product.id) || 0) + Math.floor(qty)))
    }
    return [...normalized].map(([id, qty]) => ({ id, qty }))
  } catch {
    return []
  }
}

function reducer(items, a) {
  switch (a.type) {
    case 'add': {
      const found = items.find((i) => i.id === a.id)
      return found
        ? items.map((i) => (i.id === a.id ? { ...i, qty: Math.min(i.qty + (a.qty || 1), 20) } : i))
        : [...items, { id: a.id, qty: a.qty || 1 }]
    }
    case 'set':
      return a.qty < 1 ? items.filter((i) => i.id !== a.id) : items.map((i) => (i.id === a.id ? { ...i, qty: Math.min(a.qty, 20) } : i))
    case 'remove':
      return items.filter((i) => i.id !== a.id)
    case 'clear':
      return []
    default:
      return items
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], load)
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* storage unavailable */ }
  }, [items])

  const value = useMemo(() => {
    const lines = items.map((i) => ({ ...getProduct(i.id), qty: i.qty }))
    const count = lines.reduce((s, l) => s + l.qty, 0)
    const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0)
    return { lines, count, subtotal, dispatch }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)
