import Link from 'next/link'
import { ArrowLeft, Phone, Sprout } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16 md:py-24">
        <div className="mx-auto flex max-w-xl flex-col items-center text-center">
          {/* Decorative sprout badge */}
          <span className="mb-8 flex size-20 items-center justify-center rounded-full bg-accent text-brand-deep shadow-sm">
            <Sprout className="size-9" />
          </span>

          <p className="font-serif text-7xl leading-none text-brand md:text-8xl">404</p>

          <h1 className="mt-6 text-balance font-serif text-2xl text-brand-deep md:text-3xl">
            Эта грядка пока пустует
          </h1>

          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Страница, которую вы искали, не прижилась или переехала на другой участок.
            Вернитесь в каталог — там уже подрастают крепкие саженцы голубики и жимолости.
          </p>

          <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Link
              href="/"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand-deep sm:w-auto"
            >
              <ArrowLeft className="size-4" />
              В каталог саженцев
            </Link>
            <a
              href="tel:+79055555555"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-brand-deep transition-colors hover:border-brand hover:text-brand sm:w-auto"
            >
              <Phone className="size-4" />
              Позвонить нам
            </a>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Или напишите нам ежедневно с 9:00 до 20:00 — поможем подобрать растения.
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
