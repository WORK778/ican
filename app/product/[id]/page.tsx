import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ChevronRight, Star } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { ProductGallery } from '@/components/product-gallery'
import { ProductPurchase } from '@/components/product-purchase'
import { SimilarProducts } from '@/components/similar-products'
import {
  categories,
  discountPercent,
  formatPrice,
  getGallery,
  getProduct,
  getRating,
  getReviews,
  getSimilarProducts,
  isInStock,
  products,
} from '@/lib/products'
import { cn } from '@/lib/utils'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = getProduct(id)
  if (!product) return { title: 'Товар не найден' }
  return {
    title: `${product.name} — купить саженец | Питомник Подмосковья`,
    description: product.description,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = getProduct(id)
  if (!product) notFound()

  const category = categories.find((c) => c.slug === product.category)
  const discount = discountPercent(product.price, product.oldPrice)
  const inStock = isInStock(product)
  const gallery = getGallery(product)
  const rating = getRating(product)
  const reviews = getReviews(product)
  const roundedRating = Math.round(rating)
  const similar = getSimilarProducts(product, 12)

  const specs = [
    { label: 'Высота саженца', value: product.height },
    { label: 'Возраст', value: product.age },
    { label: 'Корневая система', value: 'Закрытая (ЗКС)' },
    { label: 'Категория', value: category?.title ?? '—' },
    { label: 'Регион выращивания', value: 'Московская область' },
    { label: 'Посадка', value: 'Весна и осень' },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
          {/* Хлебные крошки */}
          <nav aria-label="Хлебные крошки" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-brand">
                  Каталог
                </Link>
              </li>
              {category && (
                <>
                  <ChevronRight className="size-4 shrink-0 opacity-60" aria-hidden />
                  <li>
                    <Link
                      href="/#catalog"
                      className="transition-colors hover:text-brand"
                    >
                      {category.title}
                    </Link>
                  </li>
                </>
              )}
              <ChevronRight className="size-4 shrink-0 opacity-60" aria-hidden />
              <li className="font-medium text-foreground">{product.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-8">
            {/* Шапка: тег + рейтинг + заголовок (на мобильном — первым) */}
            <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
              <div className="flex flex-wrap items-center gap-3">
                {category && (
                  <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-secondary-foreground">
                    {category.title}
                  </span>
                )}
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'size-4',
                          i < roundedRating
                            ? 'fill-chart-4 text-chart-4'
                            : 'fill-border text-border',
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      {rating.toFixed(1)}
                    </span>{' '}
                    · {reviews} отзывов
                  </span>
                </div>
              </div>

              <h1 className="mt-3 text-balance font-serif text-3xl font-bold leading-tight text-foreground md:text-4xl">
                {product.name}
              </h1>
            </div>

            {/* Галерея */}
            <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-start">
              <div className="mx-auto w-full max-w-md lg:max-w-none">
                <ProductGallery
                  images={gallery}
                  alt={product.name}
                  inStock={inStock}
                  isNew={product.isNew}
                  badge={product.isNew ? 'Сезон 2026' : undefined}
                />
              </div>
            </div>

            {/* Информация */}
            <div className="flex flex-col lg:col-span-7 lg:col-start-6 lg:row-start-2">
              <p className="text-pretty text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>

              {/* Характеристики */}
              <dl className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 rounded-2xl border border-border bg-secondary/50 p-5 sm:grid-cols-2">
                {specs.map((spec) => (
                  <div key={spec.label} className="flex flex-col gap-0.5">
                    <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                      {spec.label}
                    </dt>
                    <dd className="text-sm font-semibold text-foreground">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              {/* Цена */}
              <div className="mt-6 flex flex-wrap items-end gap-3">
                <span
                  className={cn(
                    'text-4xl font-extrabold leading-none tracking-tight md:text-5xl',
                    inStock ? 'text-brand-deep' : 'text-muted-foreground',
                  )}
                >
                  {formatPrice(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="pb-1 text-lg text-muted-foreground/70 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
                {discount > 0 && (
                  <span className="mb-1 rounded-md bg-sale px-2 py-0.5 text-sm font-bold text-sale-foreground">
                    −{discount}%
                  </span>
                )}
              </div>
              <p className="mt-1.5 text-sm text-muted-foreground">
                за саженец в контейнере
              </p>

              {/* Покупка */}
              <div className="mt-6">
                <ProductPurchase
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  inStock={inStock}
                />
                {!inStock && (
                  <p className="mt-3 text-sm text-muted-foreground">
                    Этого сорта сейчас нет на складе. Напишите нам в MAX —
                    подскажем похожие саженцы в наличии.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <SimilarProducts products={similar} />
      </main>

      <SiteFooter />
    </div>
  )
}
