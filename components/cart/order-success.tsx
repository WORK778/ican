import Link from 'next/link'
import { ArrowRight, CheckCircle2, Mail, MapPin, Package, Phone, Sprout } from 'lucide-react'

type OrderSuccessProps = {
  orderNumber: string
  firstName: string
  email: string
  deliveryLabel: string
  pvzName?: string
  total: number
  onReset: () => void
}

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`
}

export function OrderSuccess({
  orderNumber,
  firstName,
  email,
  deliveryLabel,
  pvzName,
  total,
  onReset,
}: OrderSuccessProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center sm:py-24">
      <span className="relative flex size-24 items-center justify-center rounded-full bg-chart-2/15">
        <CheckCircle2 className="size-12 text-chart-2" />
        <span className="absolute -right-1 -top-1 flex size-9 items-center justify-center rounded-full bg-brand/15 text-brand ring-4 ring-background">
          <Sprout className="size-5" />
        </span>
      </span>

      <h1 className="mt-7 text-balance font-serif text-3xl text-foreground sm:text-4xl">
        Заказ оформлен!
      </h1>
      <p className="mt-3 text-sm font-medium text-muted-foreground">
        Номер заказа <span className="text-foreground">{orderNumber}</span>
      </p>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Спасибо, {firstName || 'дорогой покупатель'}! Мы уже начали собирать ваши саженцы и свяжемся
        с вами для подтверждения. Как только заказ уедет, вы получите уведомление на почту.
      </p>

      <div className="mt-8 w-full rounded-2xl border border-border bg-card p-5 text-left sm:p-6">
        <dl className="flex flex-col gap-4 text-sm">
          <div className="flex items-start gap-3">
            <Mail className="mt-0.5 size-5 shrink-0 text-brand" />
            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">Подтверждение на почту</dt>
              <dd className="font-medium text-foreground">{email}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-brand" />
            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">Доставка</dt>
              <dd className="text-right font-medium text-foreground">
                {deliveryLabel}
                {pvzName ? `, ${pvzName}` : ''}
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-3 border-t border-border pt-4">
            <Package className="mt-0.5 size-5 shrink-0 text-brand" />
            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">Сумма заказа</dt>
              <dd className="font-serif text-lg text-foreground">{formatPrice(total)}</dd>
            </div>
          </div>
        </dl>
      </div>

      <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <Link
          href="/"
          onClick={onReset}
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
        Появились вопросы по заказу? Мы на связи ежедневно с 9:00 до 20:00
      </p>
    </div>
  )
}
