'use client'

import { Search, X } from 'lucide-react'
import { Dropdown, type DropdownOption } from '@/components/ui/dropdown'

export type SortKey =
  | 'popular'
  | 'new'
  | 'price-asc'
  | 'price-desc'

const options: DropdownOption<SortKey>[] = [
  { value: 'popular', label: 'Популярные' },
  { value: 'new', label: 'Новинки' },
  { value: 'price-asc', label: 'Сначала дешевле' },
  { value: 'price-desc', label: 'Сначала дороже' },
]

type Props = {
  title: string
  total: number
  sort: SortKey
  onSortChange: (sort: SortKey) => void
  query: string
  onQueryChange: (query: string) => void
  searching: boolean
}

export function CatalogToolbar({
  title,
  total,
  sort,
  onSortChange,
  query,
  onQueryChange,
  searching,
}: Props) {
  return (
    <div className="mb-6 flex flex-col gap-4 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-2xl text-foreground md:text-3xl">{title}</h2>
          <span className="rounded-full bg-brand/10 px-2.5 py-1 text-xs font-semibold text-brand">
            {total}
          </span>
        </div>
        <p className="mt-1.5 text-sm text-muted-foreground">
          {searching
            ? `${plural(total, ['найден', 'найдено', 'найдено'])} ${plural(total, ['сорт', 'сорта', 'сортов'])}`
            : `${plural(total, ['сорт', 'сорта', 'сортов'])} в наличии`}
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative w-full sm:w-64">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Поиск по сортам..."
            aria-label="Поиск по каталогу"
            className="h-10 w-full rounded-lg border border-border bg-background pl-9 pr-9 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/20 [&::-webkit-search-cancel-button]:appearance-none"
          />
          {query.length > 0 && (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              aria-label="Очистить поиск"
              className="absolute right-2 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <Dropdown
          label="Сортировка:"
          value={sort}
          options={options}
          onChange={onSortChange}
        />
      </div>
    </div>
  )
}

function plural(n: number, forms: [string, string, string]) {
  const mod10 = n % 10
  const mod100 = n % 100
  if (mod10 === 1 && mod100 !== 11) return forms[0]
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1]
  return forms[2]
}
