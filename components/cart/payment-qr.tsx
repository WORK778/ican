'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowLeft, CheckCircle2, Clock, Smartphone, Sprout } from 'lucide-react'

type PaymentQrProps = {
  total: number
  /** Данные для QR подставит ЮKassa (confirmation_data). Пока плейсхолдер-картинка. */
  qrImageSrc?: string
  /** Время на оплату в секундах. */
  expiresIn?: number
  onPaid: () => void
  onCancel: () => void
}

function formatPrice(value: number) {
  return `${value.toLocaleString('ru-RU')} ₽`
}

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

export function PaymentQr({
  total,
  qrImageSrc = '/payment/sbp-qr-placeholder.png',
  expiresIn = 300,
  onPaid,
  onCancel,
}: PaymentQrProps) {
  const [remaining, setRemaining] = useState(expiresIn)

  useEffect(() => {
    if (remaining <= 0) return
    const id = window.setInterval(() => {
      setRemaining((prev) => (prev <= 1 ? 0 : prev - 1))
    }, 1000)
    return () => window.clearInterval(id)
  }, [remaining])

  const expired = remaining <= 0

  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-16 text-center sm:py-24">
      <span className="relative flex size-24 items-center justify-center rounded-full bg-brand/12">
        <Smartphone className="size-12 text-brand" />
        <span className="absolute -right-1 -top-1 flex size-9 items-center justify-center rounded-full bg-brand/15 text-brand ring-4 ring-background">
          <Sprout className="size-5" />
        </span>
      </span>

      <h1 className="mt-7 text-balance font-serif text-3xl text-foreground sm:text-4xl">
        Оплатите по QR-коду
      </h1>
      <p className="mt-4 max-w-md text-pretty leading-relaxed text-muted-foreground">
        Отсканируйте код камерой телефона или приложением банка и подтвердите оплату через Систему
        быстрых платежей (СБП).
      </p>

      {/* QR-код */}
      <div className="mt-8 w-full rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="mx-auto flex w-full max-w-64 flex-col items-center">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-border bg-background">
            <Image
              src={qrImageSrc}
              alt="QR-код для оплаты через СБП"
              fill
              sizes="256px"
              className={expired ? 'object-contain opacity-20 blur-sm' : 'object-contain'}
              priority
            />
            {expired && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-background/90 px-4 py-2 text-sm font-medium text-destructive">
                  Время истекло
                </span>
              </div>
            )}
          </div>

          <div className="mt-5 flex items-baseline justify-between gap-4 self-stretch border-t border-border pt-5">
            <span className="text-sm text-muted-foreground">К оплате</span>
            <span className="font-serif text-2xl text-foreground">{formatPrice(total)}</span>
          </div>
        </div>
      </div>

      {/* Таймер / статус */}
      <div className="mt-6 flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm">
        <Clock className="size-4 text-brand" />
        {expired ? (
          <span className="text-muted-foreground">Срок действия кода истёк — обновите оплату</span>
        ) : (
          <span className="text-muted-foreground">
            Код действителен ещё{' '}
            <span className="font-semibold text-foreground">{formatTime(remaining)}</span>
          </span>
        )}
      </div>

      {/* Инструкция */}
      <ol className="mt-6 w-full space-y-2 rounded-2xl border border-border bg-secondary/50 p-4 text-left text-sm leading-relaxed text-muted-foreground">
        <li className="flex gap-2">
          <span className="font-semibold text-brand">1.</span> Откройте камеру или приложение своего
          банка
        </li>
        <li className="flex gap-2">
          <span className="font-semibold text-brand">2.</span> Наведите на QR-код и выберите оплату
          через СБП
        </li>
        <li className="flex gap-2">
          <span className="font-semibold text-brand">3.</span> Подтвердите платёж — статус заказа
          обновится автоматически
        </li>
      </ol>

      {/* Действия */}
      <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
        <button
          type="button"
          onClick={onPaid}
          disabled={expired}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCircle2 className="size-4" />
          Я оплатил
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="size-4" />
          Вернуться к заказу
        </button>
      </div>

      <p className="mt-6 text-sm text-muted-foreground">
        Оплата защищена. Деньги спишутся только после подтверждения в приложении банка.
      </p>
    </div>
  )
}
