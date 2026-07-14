'use client'

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react'
import { getProduct, type Product } from '@/lib/products'

export type CartLine = {
  product: Product
  qty: number
}

type CartContextValue = {
  /** Сырые позиции корзины: id → количество. */
  items: Record<string, number>
  /** Позиции с полными данными о товаре (только существующие товары). */
  lines: CartLine[]
  /** Суммарное число единиц товара. */
  count: number
  /** Стоимость всех саженцев без доставки. */
  subtotal: number
  addItem: (id: string, qty?: number) => void
  setQty: (id: string, qty: number) => void
  increment: (id: string) => void
  decrement: (id: string) => void
  removeItem: (id: string) => void
  clear: () => void
}

const MAX_QTY = 20

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Record<string, number>>({})

  const value = useMemo<CartContextValue>(() => {
    const clamp = (n: number) => Math.max(1, Math.min(MAX_QTY, n))

    const lines: CartLine[] = Object.entries(items)
      .map(([id, qty]) => {
        const product = getProduct(id)
        return product ? { product, qty } : null
      })
      .filter((line): line is CartLine => line !== null)

    const count = lines.reduce((sum, { qty }) => sum + qty, 0)
    const subtotal = lines.reduce((sum, { product, qty }) => sum + product.price * qty, 0)

    return {
      items,
      lines,
      count,
      subtotal,
      addItem: (id, qty = 1) =>
        setItems((prev) => ({ ...prev, [id]: clamp((prev[id] ?? 0) + qty) })),
      setQty: (id, qty) => setItems((prev) => ({ ...prev, [id]: clamp(qty) })),
      increment: (id) =>
        setItems((prev) => ({ ...prev, [id]: clamp((prev[id] ?? 0) + 1) })),
      decrement: (id) =>
        setItems((prev) => ({ ...prev, [id]: clamp((prev[id] ?? 1) - 1) })),
      removeItem: (id) =>
        setItems((prev) => {
          const next = { ...prev }
          delete next[id]
          return next
        }),
      clear: () => setItems({}),
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
