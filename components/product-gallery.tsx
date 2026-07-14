'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type ProductGalleryProps = {
  images: string[]
  alt: string
  inStock: boolean
  isNew?: boolean
  badge?: string
}

export function ProductGallery({
  images,
  alt,
  inStock,
  isNew,
  badge,
}: ProductGalleryProps) {
  const [active, setActive] = useState(0)
  const total = images.length

  function go(delta: number) {
    setActive((prev) => (prev + delta + total) % total)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Основное фото */}
      <div className="group relative aspect-square overflow-hidden rounded-3xl border border-border bg-secondary">
        <Image
          key={images[active]}
          src={images[active] || '/placeholder.svg'}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          className={cn(
            'object-cover transition-opacity duration-300',
            !inStock && 'opacity-75 saturate-50',
          )}
          priority
        />

        {/* Бейджи */}
        {badge && inStock && (
          <span className="absolute left-4 top-4 rounded-full bg-brand-deep px-3 py-1.5 text-sm font-semibold text-brand-foreground shadow-sm">
            {badge}
          </span>
        )}
        {inStock && isNew && !badge && (
          <span className="absolute left-4 top-4 rounded-full bg-chart-2 px-3 py-1.5 text-sm font-bold text-card">
            Новинка
          </span>
        )}
        {!inStock && (
          <>
            <div className="pointer-events-none absolute inset-0 bg-foreground/10" />
            <span className="absolute left-4 top-4 rounded-full bg-foreground/75 px-3 py-1.5 text-sm font-semibold text-card backdrop-blur-sm">
              Нет в наличии
            </span>
          </>
        )}

        {/* Стрелки */}
        {total > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Предыдущее фото"
              className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/85 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-card"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Следующее фото"
              className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/85 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-card"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Точки */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
              {images.map((src, i) => (
                <span
                  key={src}
                  className={cn(
                    'h-1.5 rounded-full transition-all',
                    i === active
                      ? 'w-5 bg-card'
                      : 'w-1.5 bg-card/60',
                  )}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Миниатюры */}
      {total > 1 && (
        <div className="grid grid-cols-3 gap-3">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Показать фото ${i + 1}`}
              aria-current={i === active}
              className={cn(
                'relative aspect-square overflow-hidden rounded-2xl border-2 bg-secondary transition-colors',
                i === active
                  ? 'border-brand'
                  : 'border-transparent hover:border-border',
              )}
            >
              <Image
                src={src || '/placeholder.svg'}
                alt={`${alt} — фото ${i + 1}`}
                fill
                sizes="180px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
