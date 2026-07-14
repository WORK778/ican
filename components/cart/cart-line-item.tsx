'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus } from 'lucide-react'
import type { CartLine } from '@/components/cart-context'
import { formatPrice } from '@/lib/products'
import { HoldToDeleteButton } from '@/components/cart/hold-to-delete-button'

type CartLineItemProps = {
  line: CartLine
  onIncrement: () => void
  onDecrement: () => void
  onRemove: () => void
}

export function CartLineItem({
  line,
  onIncrement,
  onDecrement,
  onRemove,
}: CartLineItemProps) {
  const { product, qty } = line

  return (
    <div className="flex gap-3 py-4 sm:gap-4">
      {/* Фото */}
      <Link
        href={`/product/${product.id}`}
        className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-secondary sm:size-24"
      >
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="96px"
          className="object-cover"
        />
      </Link>

      {/* Информация */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              href={`/product/${product.id}`}
              className="line-clamp-2 text-pretty font-semibold text-foreground transition-colors hover:text-brand"
            >
              {product.name}
            </Link>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {product.height} · {product.age}
            </p>
          </div>
          <HoldToDeleteButton
            onConfirm={onRemove}
            label={`Удалить «${product.name}» из корзины`}
          />
        </div>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          {/* Количество */}
          <div className="flex items-center gap-1 rounded-full border border-border bg-card p-1">
            <button
              type="button"
              onClick={onDecrement}
              disabled={qty <= 1}
              aria-label="Уменьшить количество"
              className="flex size-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="min-w-7 text-center text-sm font-semibold tabular-nums" aria-live="polite">
              {qty}
            </span>
            <button
              type="button"
              onClick={onIncrement}
              aria-label="Увеличить количество"
              className="flex size-8 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
            >
              <Plus className="size-3.5" />
            </button>
          </div>

          {/* Цена */}
          <div className="flex flex-col items-end leading-tight">
            <span className="font-extrabold text-brand-deep">{formatPrice(product.price * qty)}</span>
            {qty > 1 && (
              <span className="text-xs text-muted-foreground">
                {formatPrice(product.price)} / шт.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
