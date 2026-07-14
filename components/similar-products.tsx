'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from '@/components/product-card'
import type { Product } from '@/lib/products'
import { cn } from '@/lib/utils'

export function SimilarProducts({ products }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current
    if (!el) return
    const { scrollLeft, scrollWidth, clientWidth } = el
    setCanScrollLeft(scrollLeft > 4)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return
    updateArrows()
    el.addEventListener('scroll', updateArrows, { passive: true })
    window.addEventListener('resize', updateArrows)
    return () => {
      el.removeEventListener('scroll', updateArrows)
      window.removeEventListener('resize', updateArrows)
    }
  }, [updateArrows])

  const scrollByStep = useCallback((direction: 1 | -1) => {
    const el = scrollerRef.current
    if (!el) return
    // Прокручиваем примерно на ширину видимой области, чтобы листать «страницами»
    const step = Math.max(el.clientWidth * 0.85, 280)
    el.scrollBy({ left: step * direction, behavior: 'smooth' })
  }, [])

  // Drag-to-scroll: тянем слайдер мышью/указателем (на тач-устройствах работает нативный свайп)
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false })

  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Только основная кнопка мыши; для touch/pen оставляем нативную прокрутку
    if (e.pointerType === 'mouse' && e.button !== 0) return
    if (e.pointerType !== 'mouse') return
    const el = scrollerRef.current
    if (!el) return
    drag.current = { active: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false }
  }, [])

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    if (!el || !drag.current.active) return
    const dx = e.clientX - drag.current.startX
    if (Math.abs(dx) > 4) {
      drag.current.moved = true
      try {
        el.setPointerCapture?.(e.pointerId)
      } catch {
        // pointer capture недоступен (например, синтетическое событие) — не критично
      }
    }
    el.scrollLeft = drag.current.startScroll - dx
  }, [])

  const endDrag = useCallback(() => {
    drag.current.active = false
  }, [])

  // Гасим клик по карточке, если это был drag, а не тап
  const onClickCapture = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.moved) {
      e.preventDefault()
      e.stopPropagation()
      drag.current.moved = false
    }
  }, [])

  if (products.length === 0) return null

  return (
    <section
      aria-labelledby="similar-heading"
      className="mt-6 border-t border-border bg-secondary/40 md:mt-10"
    >
      <div className="mx-auto max-w-7xl px-4 py-12 md:py-16">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 md:mb-8">
          <div className="flex flex-col gap-1">
            <h2
              id="similar-heading"
              className="text-balance font-serif text-2xl font-bold text-foreground md:text-3xl"
            >
              Похожие саженцы
            </h2>
            <p className="text-sm text-muted-foreground">
              Сорта из той же категории — подойдут для соседней посадки
            </p>
          </div>

          <div className="flex w-full items-center justify-between gap-3 md:w-auto md:justify-start">
            <Link
              href="/#catalog"
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-brand/30 hover:bg-brand hover:text-brand-foreground"
            >
              Смотреть все
              <ArrowRight className="size-4" />
            </Link>

            {/* Стрелки навигации — доступны и на мобильном (плюс нативный свайп) */}
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => scrollByStep(-1)}
                disabled={!canScrollLeft}
                aria-label="Предыдущие саженцы"
                className={cn(
                  'inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors md:size-11',
                  canScrollLeft
                    ? 'hover:border-brand/30 hover:bg-brand hover:text-brand-foreground'
                    : 'cursor-not-allowed opacity-40',
                )}
              >
                <ChevronLeft className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => scrollByStep(1)}
                disabled={!canScrollRight}
                aria-label="Следующие саженцы"
                className={cn(
                  'inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground shadow-sm transition-colors md:size-11',
                  canScrollRight
                    ? 'hover:border-brand/30 hover:bg-brand hover:text-brand-foreground'
                    : 'cursor-not-allowed opacity-40',
                )}
              >
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Слайдер: горизонтальный скролл со snap. Выглядывающая карточка намекает на прокрутку. */}
        <div className="relative">
          <div
            ref={scrollerRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={onClickCapture}
            className="flex cursor-grab snap-x snap-mandatory scroll-pl-4 gap-4 overflow-x-auto -mx-4 px-4 pb-4 pt-2 select-none md:mx-0 md:scroll-pl-1 md:px-1 [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="w-[75%] shrink-0 snap-start sm:w-[45%] md:w-[31%] lg:w-[23.5%] xl:w-[calc((100%-4rem)/5)]"
              >
                <ProductCard product={product} compact />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
