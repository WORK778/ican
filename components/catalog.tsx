'use client'

import { useEffect, useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import { categories, products } from '@/lib/products'
import { CatalogSidebar } from '@/components/catalog-sidebar'
import { CatalogCategoryBar } from '@/components/catalog-category-bar'
import { CatalogToolbar, type SortKey } from '@/components/catalog-toolbar'
import { CatalogPagination } from '@/components/catalog-pagination'
import { ProductCard } from '@/components/product-card'
import { useCatalog } from '@/components/catalog-context'

const PER_PAGE = 15

export function Catalog() {
  const { category, setCategory } = useCatalog()
  const [sort, setSort] = useState<SortKey>('popular')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)

  const normalizedQuery = query.trim().toLowerCase()
  const searching = normalizedQuery.length > 0

  const activeCategory = categories.find((c) => c.slug === category)

  const sortedProducts = useMemo(() => {
    // When searching, look across the whole catalog and ignore the category filter.
    const list = searching
      ? products.filter((p) => {
          const haystack = `${p.name} ${p.description}`.toLowerCase()
          return haystack.includes(normalizedQuery)
        })
      : products.filter((p) => p.category === category)
    const sorted = [...list]
    switch (sort) {
      case 'price-asc':
        sorted.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        sorted.sort((a, b) => b.price - a.price)
        break
      case 'new':
        sorted.sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.popularity - a.popularity)
        break
      default:
        sorted.sort((a, b) => b.popularity - a.popularity)
    }
    // Keep out-of-stock products at the end regardless of the chosen sort.
    // Array.prototype.sort is stable, so the order within each group is preserved.
    sorted.sort((a, b) => Number(a.inStock === false) - Number(b.inStock === false))
    return sorted
  }, [category, sort, searching, normalizedQuery])

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PER_PAGE))

  // Reset to first page when the filter, sorting or search query changes.
  useEffect(() => {
    setPage(1)
  }, [category, sort, normalizedQuery])

  const visibleProducts = useMemo(() => {
    const start = (page - 1) * PER_PAGE
    return sortedProducts.slice(start, start + PER_PAGE)
  }, [sortedProducts, page])

  function handlePageChange(next: number) {
    setPage(next)
    if (typeof document !== 'undefined') {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="catalog" className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
        <div className="hidden lg:block">
          <CatalogSidebar active={category} onSelect={setCategory} />
        </div>

        <div>
          {!searching && <CatalogCategoryBar active={category} onSelect={setCategory} />}

          <CatalogToolbar
            title={searching ? 'Результаты поиска' : activeCategory?.title ?? 'Каталог'}
            total={sortedProducts.length}
            sort={sort}
            onSortChange={setSort}
            query={query}
            onQueryChange={setQuery}
            searching={searching}
          />

          {sortedProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-4 max-[380px]:grid-cols-1 sm:gap-6 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              <CatalogPagination
                page={page}
                totalPages={totalPages}
                onChange={handlePageChange}
              />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 px-6 py-16 text-center">
              <div className="flex size-14 items-center justify-center rounded-full bg-brand/10">
                <SearchX className="size-7 text-brand" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-serif text-xl text-foreground">Ничего не найдено</h3>
              <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                {searching ? (
                  <>
                    По запросу «{query.trim()}» сортов не нашлось. Попробуйте изменить
                    формулировку или сбросить поиск.
                  </>
                ) : (
                  'В этой категории пока нет товаров в наличии.'
                )}
              </p>
              {searching && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="mt-5 inline-flex items-center rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand/90"
                >
                  Сбросить поиск
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
