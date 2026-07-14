import Link from 'next/link'
import { ArrowRight, Phone, ShoppingBasket, Sprout } from 'lucide-react'

export function EmptyCart() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center sm:py-24">
      <span className="relative flex size-24 items-center justify-center rounded-full bg-secondary">
        <ShoppingBasket className="size-11 text-muted-foreground" />
        <span className="absolute -right-1 -top-1 flex size-9 items-center justify-center rounded-full bg-brand/15 text-brand ring-4 ring-background">
          <Sprout className="size-5" />
        </span>
      </span>

      <h1 className="mt-7 text-balance font-serif text-3xl text-foreground sm:text-4xl">
        В корзине пока пусто
      </h1>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Самое время выбрать саженцы. У нас крепкая голубика и жимолость с закрытой корневой
        системой — приживаются легко и радуют урожаем уже на второй год.
      </p>

      <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-deep"
        >
          В каталог саженцев
          <ArrowRight className="size-4" />
        </Link>
        <a
          href="tel:+79000000000"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <Phone className="size-4" />
          Позвонить нам
        </a>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Поможем подобрать сорта под ваш участок — ежедневно с 9:00 до 20:00
      </p>
    </div>
  )
}
