'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, type FormEvent } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useCart } from '@/components/cart-context'
import { CartLineItem } from '@/components/cart/cart-line-item'
import { HoldToClearButton } from '@/components/cart/hold-to-clear-button'
import { EmptyCart } from '@/components/cart/empty-cart'
import { OrderSuccess } from '@/components/cart/order-success'
import { OrderFailed } from '@/components/cart/order-failed'
import { PaymentQr } from '@/components/cart/payment-qr'
import { CartNotices } from '@/components/cart/cart-notices'
import { ContactFields, type ContactErrors, type ContactValues } from '@/components/cart/contact-fields'
import { DeliverySelector, type DeliveryMethod } from '@/components/cart/delivery-selector'
import { CdekPvzPicker } from '@/components/cart/cdek-pvz-picker'
import { OrderSummary } from '@/components/cart/order-summary'
import { getCity } from '@/lib/cdek-pvz'
import { cn } from '@/lib/utils'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function CartView() {
  const { lines, count, subtotal, increment, decrement, removeItem, clear } = useCart()

  const [contact, setContact] = useState<ContactValues>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comment: '',
  })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [delivery, setDelivery] = useState<DeliveryMethod>('cdek')
  const [citySlug, setCitySlug] = useState('moscow')
  const [pvzId, setPvzId] = useState<string | null>(null)
  const [agree, setAgree] = useState(false)
  const [agreeError, setAgreeError] = useState(false)
  const [pvzError, setPvzError] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [failed, setFailed] = useState(false)
  const [paying, setPaying] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')

  function updateContact(field: keyof ContactValues, value: string) {
    setContact((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  function validate() {
    const next: ContactErrors = {}
    if (!contact.firstName.trim()) next.firstName = 'Укажите имя'
    if (!contact.lastName.trim()) next.lastName = 'Укажите фамилию'
    if (!contact.email.trim()) next.email = 'Укажите эл. почту'
    else if (!EMAIL_RE.test(contact.email)) next.email = 'Проверьте формат почты'
    const digits = contact.phone.replace(/\D/g, '')
    if (!contact.phone.trim()) next.phone = 'Укажите телефон'
    else if (digits.length !== 11) next.phone = 'Введите номер полностью: +7 (XXX) XXX-XX-XX'

    const noPvz = delivery === 'cdek' && !pvzId
    setErrors(next)
    setAgreeError(!agree)
    setPvzError(noPvz)

    return Object.keys(next).length === 0 && agree && !noPvz
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) {
      document
        .querySelector('[aria-invalid="true"], [data-error="true"]')
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setSubmitting(true)
    // Демо-оформление: имитируем создание платежа и переход к оплате по QR (СБП).
    // Реальную интеграцию с ЮKassa (создание платежа, confirmation_data) подключим в Cursor.
    window.setTimeout(() => {
      setSubmitting(false)
      setPaying(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 900)
  }

  function handlePaid() {
    // Демо: часть платежей «отклоняется», чтобы показать экран неудачной оплаты.
    // В проде статус придёт по webhook от ЮKassa.
    setPaying(false)
    const paymentFailed = Math.random() < 0.3
    if (paymentFailed) {
      setFailed(true)
    } else {
      setOrderNumber(`МФ-${Math.floor(100000 + Math.random() * 900000)}`)
      setDone(true)
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleRetry() {
    setFailed(false)
    setPaying(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // --- Оплата по QR-коду (СБП) ---
  if (paying) {
    return (
      <PaymentQr
        total={subtotal}
        onPaid={handlePaid}
        onCancel={() => {
          setPaying(false)
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
      />
    )
  }

  // --- Оплата не прошла ---
  if (failed) {
    return (
      <OrderFailed
        firstName={contact.firstName}
        deliveryLabel={delivery === 'cdek' ? 'СДЭК' : 'WB Track'}
        total={subtotal}
        onRetry={handleRetry}
      />
    )
  }

  // --- Успешное оформление ---
  if (done) {
    const city = getCity(citySlug)
    const pvz = city?.points.find((p) => p.id === pvzId)
    return (
      <OrderSuccess
        orderNumber={orderNumber}
        firstName={contact.firstName}
        email={contact.email}
        deliveryLabel={delivery === 'cdek' ? 'СДЭК' : 'WB Track'}
        pvzName={pvz?.name}
        total={subtotal}
        onReset={() => clear()}
      />
    )
  }

  // --- Пустая корзина ---
  if (lines.length === 0) {
    return <EmptyCart />
  }

  // --- Оформление ---
  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-brand"
          >
            <ArrowLeft className="size-4" /> Продолжить покупки
          </Link>
          <h1 className="mt-2 font-serif text-2xl text-foreground sm:text-3xl">Оформление заказа</h1>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3 lg:gap-8">
        {/* Левая колонка */}
        <div className="flex flex-col gap-6 lg:col-span-2">
          {/* Товары */}
          <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-foreground">
                Товары в корзине · {count} шт.
              </h2>
              <HoldToClearButton onConfirm={clear} />
            </div>
            <div className="mt-2 divide-y divide-border">
              {lines.map((line) => (
                <CartLineItem
                  key={line.product.id}
                  line={line}
                  onIncrement={() => increment(line.product.id)}
                  onDecrement={() => decrement(line.product.id)}
                  onRemove={() => removeItem(line.product.id)}
                />
              ))}
            </div>
          </section>

          {/* Доставка */}
          <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <DeliverySelector value={delivery} onChange={setDelivery} />

            <div className="mt-4">
              {delivery === 'cdek' ? (
                <>
                  <div
                    data-error={pvzError ? 'true' : undefined}
                    className={cn(
                      'rounded-2xl',
                      pvzError && 'ring-2 ring-destructive ring-offset-2',
                    )}
                  >
                    <CdekPvzPicker
                      citySlug={citySlug}
                      onCityChange={(slug) => {
                        setCitySlug(slug)
                        setPvzId(null)
                      }}
                      selectedPvzId={pvzId}
                      onSelectPvz={(id) => {
                        setPvzId(id)
                        setPvzError(false)
                      }}
                    />
                  </div>
                  {pvzError && (
                    <p className="mt-2 text-sm text-destructive">
                      Выберите пункт выдачи СДЭК на карте или в списке
                    </p>
                  )}
                </>
              ) : (
                <div className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/50 p-4">
                  <Image
                    src="/brand/wb-icon-color.svg"
                    alt="WB Track"
                    width={32}
                    height={32}
                    className="mt-0.5 size-8 shrink-0 object-contain"
                  />
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    После оформления мы свяжемся с вами и передадим заказ в WB Track. Трек-номер для
                    отслеживания придёт на указанную электронную почту.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Получатель */}
          <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
            <ContactFields values={contact} errors={errors} onChange={updateContact} />
          </section>
        </div>

        {/* Правая колонка */}
        <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
          {/* Согласие */}
          <label
            data-error={agreeError ? 'true' : undefined}
            className={cn(
              'flex cursor-pointer items-start gap-3 rounded-2xl border bg-card p-4 transition-colors',
              agreeError ? 'border-destructive' : 'border-border',
            )}
          >
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => {
                setAgree(e.target.checked)
                if (e.target.checked) setAgreeError(false)
              }}
              className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-border accent-brand"
            />
            <span className="text-sm leading-relaxed text-muted-foreground">
              Я согласен с{' '}
              <Link
                href="/oferta"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="font-medium text-brand underline underline-offset-2"
              >
                условиями оферты
              </Link>{' '}
              и даю согласие на{' '}
              <Link
                href="/legal"
                target="_blank"
                onClick={(e) => e.stopPropagation()}
                className="font-medium text-brand underline underline-offset-2"
              >
                обработку своих персональных данных
              </Link>
            </span>
          </label>
          {agreeError && (
            <p className="-mt-2 text-sm text-destructive">
              Подтвердите согласие, чтобы оформить заказ
            </p>
          )}

          <OrderSummary
            count={count}
            subtotal={subtotal}
            delivery={delivery}
            submitting={submitting}
          />
        </aside>
      </div>

      <div className="mt-6">
        <CartNotices />
      </div>
    </form>
  )
}
