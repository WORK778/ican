import Link from 'next/link'
import { AlertCircle, CreditCard, Info, Phone, RefreshCw, ShieldCheck, Sprout } from 'lucide-react'

type OrderFailedProps = {
  firstName: string
  deliveryLabel: string
  total: number
  reason?: string
  onRetry: () => void
}

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`
}

export function OrderFailed({ firstName, deliveryLabel, total, reason, onRetry }: OrderFailedProps) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center sm:py-24">
      <span className="relative flex size-24 items-center justify-center rounded-full bg-destructive/12">
        <AlertCircle className="size-12 text-destructive" />
        <span className="absolute -right-1 -top-1 flex size-9 items-center justify-center rounded-full bg-brand/15 text-brand ring-4 ring-background">
          <Sprout className="size-5" />
        </span>
      </span>

      <h1 className="mt-7 text-balance font-serif text-3xl text-foreground sm:text-4xl">
        Оплата не прошла
      </h1>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
        {firstName ? `${firstName}, к` : 'К'}ажется, платёж не удалось завершить, поэтому заказ пока
        не оформлен. Ваши саженцы всё ещё в корзине — деньги не списаны.
      </p>

      <div className="mt-8 w-full rounded-2xl border border-border bg-card p-5 text-left sm:p-6">
        <dl className="flex flex-col gap-4 text-sm">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 size-5 shrink-0 text-destructive" />
            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">Причина</dt>
              <dd className="text-right font-medium text-foreground">
                {reason ?? 'Банк отклонил платёж'}
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CreditCard className="mt-0.5 size-5 shrink-0 text-brand" />
            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">Способ доставки</dt>
              <dd className="text-right font-medium text-foreground">{deliveryLabel}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3 border-t border-border pt-4">
            <ShieldCheck className="mt-0.5 size-5 shrink-0 text-brand" />
            <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <dt className="text-muted-foreground">К оплате</dt>
              <dd className="font-serif text-lg text-foreground">{formatPrice(total)}</dd>
            </div>
          </div>
        </dl>
      </div>

      <div className="mt-6 w-full rounded-2xl border border-border bg-secondary/50 p-4 text-left">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Что можно сделать: проверьте баланс и данные карты, убедитесь, что оплата в интернете
          разрешена, или попробуйте другую карту. Если ошибка повторяется — позвоните нам, оформим
          заказ вместе.
        </p>
      </div>

      <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-deep"
        >
          <RefreshCw className="size-4" />
          Повторить оплату
        </button>
        <a
          href="tel:+79000000000"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <Phone className="size-4" />
          Позвонить нам
        </a>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Нужна помощь с оплатой? Мы на связи ежедневно с 9:00 до 20:00 ·{' '}
        <Link href="/" className="font-medium text-brand underline underline-offset-2">
          вернуться в каталог
        </Link>
      </p>
    </div>
  )
}
