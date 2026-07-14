'use client'

import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useHoldToConfirm } from '@/components/cart/use-hold-to-confirm'

type HoldToDeleteButtonProps = {
  /** Вызывается, когда кольцо полностью заполнилось (удержание завершено). */
  onConfirm: () => void
  /** Подпись для скринридеров, напр. «Удалить «Голубика Патриот» из корзины». */
  label: string
  /** Длительность удержания в мс. */
  duration?: number
}

// Геометрия кольца прогресса.
const RING_SIZE = 36
const STROKE = 2
const RADIUS = (RING_SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function HoldToDeleteButton({
  onConfirm,
  label,
  duration = 1000,
}: HoldToDeleteButtonProps) {
  const { progress, holding, start, cancel } = useHoldToConfirm(onConfirm, duration)

  const active = progress > 0.001
  const dashOffset = CIRCUMFERENCE * (1 - progress)

  return (
    <button
      type="button"
      aria-label={label}
      title="Нажмите и удерживайте, чтобы удалить"
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
        'relative flex size-9 shrink-0 touch-none select-none items-center justify-center rounded-full text-muted-foreground transition-colors',
        active ? 'bg-primary/10 text-primary' : 'hover:bg-primary/10 hover:text-primary',
      )}
    >
      {/* Кольцо прогресса удержания */}
      <svg
        className={cn(
          '-rotate-90 pointer-events-none absolute inset-0 transition-opacity',
          active ? 'opacity-100' : 'opacity-0',
        )}
        width={RING_SIZE}
        height={RING_SIZE}
        viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
        aria-hidden="true"
      >
        <circle
          cx={RING_SIZE / 2}
          cy={RING_SIZE / 2}
          r={RADIUS}
          fill="none"
          stroke="currentColor"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          className="text-primary"
        />
      </svg>

      <Trash2
        className={cn(
          'size-4 transition-transform',
          holding && 'scale-90',
        )}
      />
      <span className="sr-only" role="status" aria-live="polite">
        {holding ? 'Удерживайте для удаления' : ''}
      </span>
    </button>
  )
}
