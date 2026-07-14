'use client'

import { useState } from 'react'
import { Check, Minus, Plus, ShoppingCart } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { formatPrice } from '@/lib/products'
import { cn } from '@/lib/utils'

type ProductPurchaseProps = {
  id: string
  name: string
  price: number
  inStock: boolean
}

const MAX_QTY = 20

export function ProductPurchase({
  id,
  name,
  price,
  inStock,
}: ProductPurchaseProps) {
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (!inStock) {
    return (
      <button
        type="button"
        disabled
        aria-label={`«${name}» временно нет в наличии`}
        className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-full border border-border bg-secondary px-6 py-3.5 text-base font-semibold text-muted-foreground"
      >
        Нет в наличии
      </button>
    )
  }

  function handleAdd() {
    addItem(id, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1600)
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
      {/* Количество */}
      <div className="flex items-center justify-between gap-2 rounded-full border border-border bg-card px-2 py-2 sm:justify-start">
        <button
          type="button"
          onClick={() => setQty((q) => Math.max(1, q - 1))}
          disabled={qty <= 1}
          aria-label="Уменьшить количество"
          className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Minus className="size-4" />
        </button>
        <span
          className="min-w-8 text-center text-base font-semibold tabular-nums"
          aria-live="polite"
        >
          {qty}
        </span>
        <button
          type="button"
          onClick={() => setQty((q) => Math.min(MAX_QTY, q + 1))}
          disabled={qty >= MAX_QTY}
          aria-label="Увеличить количество"
          className="flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Plus className="size-4" />
        </button>
      </div>

      {/* В корзину */}
      <button
        type="button"
        onClick={handleAdd}
        aria-label={`Добавить «${name}» в корзину, ${qty} шт.`}
        className={cn(
          'inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-base font-semibold transition-colors',
          added
            ? 'bg-chart-2 text-card'
            : 'bg-brand text-brand-foreground hover:bg-brand-deep',
        )}
      >
        {added ? (
          <>
            <Check className="size-5" /> Добавлено в корзину
          </>
        ) : (
          <>
            <ShoppingCart className="size-5" /> В корзину ·{' '}
            {formatPrice(price * qty)}
          </>
        )}
      </button>
    </div>
  )
}
