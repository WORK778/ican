'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, type MouseEvent } from 'react'
import { Check, Ruler, ShoppingCart, Sprout } from 'lucide-react'
import { discountPercent, formatPrice, isInStock, type Product } from '@/lib/products'
import { useCart } from '@/components/cart-context'
import { cn } from '@/lib/utils'

export function ProductCard({
  product,
  compact = false,
}: {
  product: Product
  /** Компактный режим для слайдеров: без описания, цена над кнопкой во всю ширину. */
  compact?: boolean
}) {
  const { addItem } = useCart()
  const [added, setAdded] = useState(false)
  const discount = discountPercent(product.price, product.oldPrice)
  const inStock = isInStock(product)

  function handleAdd(e: MouseEvent<HTMLButtonElement>) {
    // Кнопка живёт внутри кликабельной карточки-ссылки —
    // гасим переход и только добавляем товар в корзину.
    e.preventDefault()
    e.stopPropagation()
    addItem(product.id)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-[transform,box-shadow,border-color] duration-200 ease-out will-change-transform hover:-translate-y-1 hover:border-brand/25 hover:shadow-lg hover:shadow-brand/10">
      {/* Вся карточка кликабельна: ссылка растянута на весь блок через ::after.
          Интерактивные элементы (кнопка) поднимаются над ней через z-10. */}
      <Link
        href={`/product/${product.id}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        aria-label={`Открыть страницу «${product.name}»`}
      />

      <div className="relative aspect-[4/3] overflow-hidden bg-secondary sm:aspect-square">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className={cn(
            'object-cover transition-transform duration-500 group-hover:scale-105',
            // Приглушаем фото у товаров не в наличии: обесцвечивание + лёгкое затемнение.
            !inStock && 'scale-100 opacity-75 saturate-50 group-hover:scale-100',
          )}
        />

        {!inStock && (
          <>
            {/* Мягкая вуаль поверх фото, чтобы статус читался, а картинка осталась узнаваемой */}
            <div className="pointer-events-none absolute inset-0 bg-foreground/10" />
            <span className="absolute left-3 top-3 z-10 w-fit rounded-full bg-foreground/75 px-2.5 py-1 text-xs font-semibold text-card backdrop-blur-sm">
              Нет в наличии
            </span>
          </>
        )}

        {inStock && product.isNew && (
          <span className="absolute left-3 top-3 z-10 w-fit rounded-full bg-chart-2 px-2.5 py-1 text-xs font-bold text-card">
            Новинка
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        {/* Название: ровно 2 строки, фиксированная высота для одинаковых карточек */}
        <h3 className="line-clamp-2 text-pretty text-base font-semibold leading-snug text-foreground sm:min-h-[2.75rem]">
          {product.name}
        </h3>

        {/* Характеристики под названием: только высота и возраст */}
        <div className="mt-1 flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
            <Ruler className="size-3" />
            {product.height}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs text-secondary-foreground">
            <Sprout className="size-3" />
            {product.age}
          </span>
        </div>

        {!compact && (
          <p className="mt-3 hidden line-clamp-2 text-sm leading-relaxed text-muted-foreground sm:block">
            {product.description}
          </p>
        )}

        {/* Блок цены — главный акцент после фото.
            Со скидкой цена выравнивается по низу (над ней старая цена),
            без скидки — центрируется по кнопке, чтобы не провисать вниз. */}
        <div
          className={cn(
            'mt-auto flex flex-col gap-3 pt-4',
            !compact && 'sm:flex-row sm:justify-between',
            !compact && (product.oldPrice ? 'sm:items-end' : 'sm:items-center'),
          )}
        >
          <div className="flex flex-col gap-1">
            {/* Строка старой цены/скидки — только когда скидка есть */}
            {product.oldPrice && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-muted-foreground/70 line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                {discount > 0 && (
                  <span className="rounded-md bg-sale/10 px-1.5 py-0.5 text-xs font-semibold text-sale">
                    −{discount}%
                  </span>
                )}
              </div>
            )}
            <span
              className={cn(
                'text-2xl font-extrabold leading-none tracking-tight',
                inStock ? 'text-brand-deep' : 'text-muted-foreground',
              )}
            >
              {formatPrice(product.price)}
            </span>
          </div>

          {inStock ? (
            <button
              type="button"
              onClick={handleAdd}
              aria-label={`Добавить «${product.name}» в корзину`}
              className={cn(
                'relative z-20 inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors',
                !compact && 'sm:w-auto sm:justify-start',
                added
                  ? 'bg-chart-2 text-card'
                  : 'bg-brand text-brand-foreground hover:bg-brand-deep',
              )}
            >
              {added ? (
                <>
                  <Check className="size-4" /> В корзине
                </>
              ) : (
                <>
                  <ShoppingCart className="size-4" /> В корзину
                </>
              )}
            </button>
          ) : (
            <button
              type="button"
              disabled
              aria-label={`«${product.name}» временно нет в наличии`}
              className={cn(
                'relative z-20 inline-flex w-full shrink-0 cursor-not-allowed items-center justify-center gap-2 rounded-full border border-border bg-secondary px-4 py-2.5 text-sm font-semibold text-muted-foreground',
                !compact && 'sm:w-auto sm:justify-start',
              )}
            >
              Нет в наличии
            </button>
          )}
        </div>
      </div>
    </article>
  )
}
