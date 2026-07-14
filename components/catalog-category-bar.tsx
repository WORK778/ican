'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Flower2, Sprout } from 'lucide-react'
import { categories } from '@/lib/products'
import { cn } from '@/lib/utils'

type Props = {
  active: string
  onSelect: (slug: string) => void
}

const groupOrder = ['berry', 'decorative'] as const
type GroupKey = (typeof groupOrder)[number]

const groupMeta: Record<GroupKey, { label: string; icon: typeof Sprout }> = {
  berry: { label: 'Ягодные', icon: Sprout },
  decorative: { label: 'Декоративные', icon: Flower2 },
}

export function CatalogCategoryBar({ active, onSelect }: Props) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const availableCats = categories.filter((c) => c.available)
  const upcomingCats = categories.filter((c) => !c.available)

  const activeCat = categories.find((c) => c.slug === active)

  // Group available categories, keeping only groups that actually have items.
  const groups = groupOrder
    .map((key) => ({
      key,
      ...groupMeta[key],
      items: availableCats.filter((c) => c.group === key),
    }))
    .filter((g) => g.items.length > 0)

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const ActiveIcon = activeCat ? groupMeta[activeCat.group].icon : Sprout

  return (
    <div ref={ref} className="relative mb-6 lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 rounded-xl border-2 border-brand/25 bg-brand/5 px-4 py-3 text-left shadow-sm transition-colors hover:border-brand/50 hover:bg-brand/10"
      >
        <span className="flex min-w-0 items-center gap-2.5">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand text-brand-foreground">
            <ActiveIcon className="size-4" aria-hidden="true" />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="text-[11px] font-semibold uppercase tracking-wide text-brand">
              Выбрать раздел
            </span>
            <span className="truncate text-sm font-semibold text-foreground">
              {activeCat?.title ?? 'Все растения'}
            </span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          {activeCat && (
            <span className="rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-brand-foreground">
              {activeCat.count}
            </span>
          )}
          <ChevronDown
            className={cn(
              'size-4 shrink-0 text-brand transition-transform duration-200',
              open && 'rotate-180',
            )}
            aria-hidden="true"
          />
        </span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-30 mt-2 max-h-[70vh] w-full overflow-y-auto rounded-xl border border-border bg-card p-1.5 shadow-lg"
        >
          {groups.map((group) => {
            const GroupIcon = group.icon
            return (
              <div key={group.key} className="mb-1 last:mb-0">
                <div className="flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                  <GroupIcon className="size-3.5 text-brand" aria-hidden="true" />
                  {group.label}
                </div>
                {group.items.map((cat) => {
                  const isActive = cat.slug === active
                  return (
                    <button
                      key={cat.slug}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => {
                        onSelect(cat.slug)
                        setOpen(false)
                      }}
                      className={cn(
                        'flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2.5 text-left text-sm transition-colors',
                        isActive
                          ? 'bg-secondary font-semibold text-foreground'
                          : 'text-foreground hover:bg-secondary',
                      )}
                    >
                      <span className="flex items-center gap-2">
                        {cat.title}
                        <span className="text-xs text-muted-foreground">
                          {cat.count}
                        </span>
                      </span>
                      {isActive && <Check className="size-4 text-brand" aria-hidden="true" />}
                    </button>
                  )
                })}
              </div>
            )
          })}

          {upcomingCats.length > 0 && (
            <div className="mt-1 border-t border-border pt-1">
              <div className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Скоро в продаже
              </div>
              {upcomingCats.map((cat) => (
                <div
                  key={cat.slug}
                  className="flex w-full items-center justify-between gap-2 rounded-lg px-2.5 py-2 text-left text-sm text-muted-foreground/70"
                >
                  {cat.title}
                  <span className="rounded-full border border-dashed border-border px-2 py-0.5 text-[10px] uppercase tracking-wide">
                    скоро
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
