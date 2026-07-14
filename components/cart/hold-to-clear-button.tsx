'use client'

import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useHoldToConfirm } from '@/components/cart/use-hold-to-confirm'

type HoldToClearButtonProps = {
  /** Вызывается, когда заливка дошла до конца (удержание завершено). */
  onConfirm: () => void
  /** Длительность удержания в мс. */
  duration?: number
}

export function HoldToClearButton({ onConfirm, duration = 1200 }: HoldToClearButtonProps) {
  const { progress, holding, start, cancel } = useHoldToConfirm(onConfirm, duration)

  const active = progress > 0.001

  return (
    <button
      type="button"
      aria-label="Очистить корзину — нажмите и удерживайте"
      title="Нажмите и удерживайте, чтобы очистить корзину"
      onPointerDown={(e) => {
        e.preventDefault()
        e.currentTarget.setPointerCapture?.(e.pointerId)
        start()
      }}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          start()
        }
      }}
      onKeyUp={(e) => {
        if (e.key === 'Enter' || e.key === ' ') cancel()
      }}
      onContextMenu={(e) => e.preventDefault()}
      className={cn(
        'relative inline-flex touch-none select-none items-center gap-1.5 overflow-hidden rounded-full border px-3 py-1.5 text-sm transition-colors',
        active
          ? 'border-destructive/40 text-destructive'
          : 'border-transparent text-muted-foreground hover:bg-brand/10 hover:text-brand',
      )}
    >
      {/* Заливка прогресса удержания (слева направо) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 bg-destructive/10"
        style={{ width: `${progress * 100}%` }}
      />

      <span className="relative inline-flex items-center gap-1.5">
        <Trash2 className={cn('size-4 transition-transform', holding && 'scale-90')} />
        {holding ? 'Удерживайте…' : 'Очистить'}
      </span>

      <span className="sr-only" role="status" aria-live="polite">
        {holding ? 'Удерживайте для очистки корзины' : ''}
      </span>
    </button>
  )
}
