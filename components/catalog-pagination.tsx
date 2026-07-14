'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  page: number
  totalPages: number
  onChange: (page: number) => void
}

export function CatalogPagination({ page, totalPages, onChange }: Props) {
  if (totalPages <= 1) return null

  const pages = getPageItems(page, totalPages)

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
      aria-label="Постраничная навигация"
    >
      <button
        type="button"
        onClick={() => onChange(page - 1)}
        disabled={page === 1}
        aria-label="Предыдущая страница"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-[color,border-color,box-shadow] duration-200 ease-out hover:border-brand hover:text-brand hover:shadow-md hover:shadow-brand/10 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      {pages.map((item, i) =>
        item === '…' ? (
          <span
            key={`gap-${i}`}
            className="flex h-10 w-10 items-center justify-center text-sm text-muted-foreground"
          >
            …
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => onChange(item)}
            aria-current={item === page ? 'page' : undefined}
            className={cn(
              'flex h-10 min-w-10 items-center justify-center rounded-full border px-3 text-sm font-medium transition-[color,border-color,box-shadow] duration-200 ease-out',
              item === page
                ? 'border-brand bg-brand text-brand-foreground shadow-md shadow-brand/20'
                : 'border-border bg-card text-foreground hover:border-brand hover:text-brand hover:shadow-md hover:shadow-brand/10',
            )}
          >
            {item}
          </button>
        ),
      )}

      <button
        type="button"
        onClick={() => onChange(page + 1)}
        disabled={page === totalPages}
        aria-label="Следующая страница"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-[color,border-color,box-shadow] duration-200 ease-out hover:border-brand hover:text-brand hover:shadow-md hover:shadow-brand/10 disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  )
}

function getPageItems(page: number, total: number): (number | '…')[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const items: (number | '…')[] = [1]
  const start = Math.max(2, page - 1)
  const end = Math.min(total - 1, page + 1)

  if (start > 2) items.push('…')
  for (let i = start; i <= end; i++) items.push(i)
  if (end < total - 1) items.push('…')

  items.push(total)
  return items
}
