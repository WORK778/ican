'use client'

import Image from 'next/image'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export type DeliveryMethod = 'cdek' | 'wb'

const OPTIONS: {
  id: DeliveryMethod
  logo: string
  logoAlt: string
  logoClass: string
  logoWrapClass: string
  title: string
  subtitle: string
}[] = [
  {
    id: 'cdek',
    logo: '/brand/cdek.png',
    logoAlt: 'СДЭК',
    logoClass: 'h-6 w-auto',
    logoWrapClass: '',
    title: 'СДЭК',
    subtitle: 'Пункт выдачи на карте',
  },
  {
    id: 'wb',
    logo: '/brand/wb.webp',
    logoAlt: 'WB Track',
    logoClass: 'h-6 w-auto',
    logoWrapClass: 'rounded-lg bg-[#481173] px-2.5 py-1',
    title: 'WB Track',
    subtitle: 'Доставка через Wildberries',
  },
]

export function DeliverySelector({
  value,
  onChange,
}: {
  value: DeliveryMethod
  onChange: (method: DeliveryMethod) => void
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-base font-semibold text-foreground">
        Способ доставки
      </legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {OPTIONS.map((opt) => {
          const active = value === opt.id
          return (
            <label
              key={opt.id}
              className={cn(
                'relative flex cursor-pointer items-center gap-3 rounded-2xl border-2 bg-card p-4 transition-colors',
                active ? 'border-brand' : 'border-border hover:border-brand/40',
              )}
            >
              <input
                type="radio"
                name="delivery"
                value={opt.id}
                checked={active}
                onChange={() => onChange(opt.id)}
                className="sr-only"
              />
              <span
                className={cn(
                  'flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                  active ? 'border-brand bg-brand' : 'border-muted-foreground/40',
                )}
              >
                {active && <Check className="size-3 text-brand-foreground" />}
              </span>
              <span className="flex min-w-0 flex-1 flex-col">
                <span className="flex h-8 items-center">
                  <span className={cn('inline-flex items-center', opt.logoWrapClass)}>
                    <Image
                      src={opt.logo || '/placeholder.svg'}
                      alt={opt.logoAlt}
                      width={96}
                      height={28}
                      className={opt.logoClass}
                    />
                  </span>
                </span>
                <span className="mt-1 text-xs text-muted-foreground">{opt.subtitle}</span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
