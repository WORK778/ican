'use client'

import { ShoppingBag } from 'lucide-react'
import { formatPrice } from '@/lib/products'
import type { DeliveryMethod } from '@/components/cart/delivery-selector'

type OrderSummaryProps = {
  count: number
  subtotal: number
  delivery: DeliveryMethod
  submitting: boolean
}

export function OrderSummary({ count, subtotal, delivery, submitting }: OrderSummaryProps) {
  const deliveryLabel = delivery === 'cdek' ? 'СДЭК' : 'WB Track'

  return (
    <div className="rounded-2xl border border-border bg-card p-5">
      <h2 className="text-lg font-semibold text-foreground">Ваш заказ</h2>

      <dl className="mt-4 flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Саженцы, {count} шт.</dt>
          <dd className="font-semibold text-foreground tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Доставка ({deliveryLabel})</dt>
          <dd className="text-right font-medium text-brand-deep">при получении</dd>
        </div>
      </dl>

      <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
        <span className="text-base font-semibold text-foreground">Итого за саженцы</span>
        <span className="text-2xl font-extrabold leading-none tracking-tight text-brand-deep">
          {formatPrice(subtotal)}
        </span>
      </div>
      <p className="mt-1.5 text-xs text-muted-foreground">
        Стоимость доставки рассчитывается перевозчиком и оплачивается отдельно при получении.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-base font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-70"
      >
        <ShoppingBag className="size-5" />
        {submitting ? 'Оформляем…' : 'Оформить заказ'}
      </button>
    </div>
  )
}
