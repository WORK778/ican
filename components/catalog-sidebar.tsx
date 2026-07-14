'use client'

import { useState } from 'react'
import { ChevronDown, ChevronRight, Flower2, Sprout } from 'lucide-react'
import { categories, type Category } from '@/lib/products'
import { MaxBlock } from '@/components/max-block'
import { cn } from '@/lib/utils'

type Props = {
  active: string
  onSelect: (slug: string) => void
}

type MenuBlockProps = {
  title: string
  icon: React.ReactNode
  items: Category[]
  active: string
  onSelect: (slug: string) => void
}

function MenuBlock({ title, icon, items, active, onSelect }: MenuBlockProps) {
  const [showUpcoming, setShowUpcoming] = useState(false)

  const availableCats = items.filter((c) => c.available)
  const upcomingCats = items.filter((c) => !c.available)

  return (
    <nav className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex items-center gap-2.5 border-b border-border bg-secondary/40 px-4 py-4">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-brand/10">
          {icon}
        </span>
        <span className="text-lg font-semibold tracking-tight text-foreground">{title}</span>
      </div>

      {availableCats.length > 0 && (
        <ul className="p-2">
          {availableCats.map((cat) => {
            const isActive = cat.slug === active
            return (
              <li key={cat.slug}>
                <button
                  type="button"
                  onClick={() => onSelect(cat.slug)}
                  aria-current={isActive ? 'true' : undefined}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                    isActive
                      ? 'bg-brand text-brand-foreground'
                      : 'text-foreground hover:bg-secondary',
                  )}
                >
                  <span className="font-medium">{cat.title}</span>
                  <span
                    className={cn(
                      'flex items-center gap-1 text-xs',
                      isActive ? 'text-brand-foreground/80' : 'text-muted-foreground',
                    )}
                  >
                    {cat.count}
                    <ChevronRight className="size-3.5" />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {upcomingCats.length > 0 && (
        <div className={cn('p-2', availableCats.length > 0 && 'border-t border-border')}>
          <button
            type="button"
            onClick={() => setShowUpcoming((v) => !v)}
            aria-expanded={showUpcoming}
            className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary"
          >
            <span className="font-medium">
              Скоро в продаже
              <span className="ml-1.5 text-xs">({upcomingCats.length})</span>
            </span>
            <ChevronDown
              className={cn(
                'size-4 transition-transform duration-200',
                showUpcoming && 'rotate-180',
              )}
            />
          </button>

          {showUpcoming && (
            <ul className="mt-1 space-y-0.5">
              {upcomingCats.map((cat) => (
                <li key={cat.slug}>
                  <div className="flex w-full cursor-not-allowed items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm opacity-55">
                    <span className="font-medium text-foreground">{cat.title}</span>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase text-muted-foreground">
                      скоро
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </nav>
  )
}

export function CatalogSidebar({ active, onSelect }: Props) {
  const berryCats = categories.filter((c) => c.group === 'berry')
  const decorativeCats = categories.filter((c) => c.group === 'decorative')

  return (
    <aside className="flex flex-col gap-6">
      <MenuBlock
        title="Ягодные"
        icon={<Sprout className="size-4 text-brand" />}
        items={berryCats}
        active={active}
        onSelect={onSelect}
      />
      <MenuBlock
        title="Декоративные"
        icon={<Flower2 className="size-4 text-brand" />}
        items={decorativeCats}
        active={active}
        onSelect={onSelect}
      />

      <MaxBlock />
    </aside>
  )
}
