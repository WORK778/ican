'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export type DropdownOption<T extends string> = {
  value: T
  label: string
}

type DropdownProps<T extends string> = {
  /** Optional muted prefix shown before the selected label, e.g. "Сортировка:" */
  label?: string
  value: T
  options: DropdownOption<T>[]
  onChange: (value: T) => void
  /** Horizontal alignment of the menu relative to the trigger. */
  align?: 'start' | 'end'
  className?: string
  triggerClassName?: string
  menuClassName?: string
}

export function Dropdown<T extends string>({
  label,
  value,
  options,
  onChange,
  align = 'end',
  className,
  triggerClassName,
  menuClassName,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const activeLabel = options.find((o) => o.value === value)?.label ?? ''

  useEffect(() => {
    if (!open) return
    function onPointerDown(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          'flex w-full items-center justify-between gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-brand lg:w-auto',
          triggerClassName,
        )}
      >
        {label && <span className="text-muted-foreground">{label}</span>}
        <span className="flex items-center gap-1.5">
          <span className="font-semibold text-foreground">{activeLabel}</span>
          <ChevronDown
            className={cn(
              'size-4 text-muted-foreground transition-transform duration-200',
              open && 'rotate-180',
            )}
          />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className={cn(
            'absolute z-20 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-card p-1 shadow-lg',
            align === 'end' ? 'right-0' : 'left-0',
            menuClassName,
          )}
        >
          {options.map((opt) => {
            const isActive = opt.value === value
            return (
              <li key={opt.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    onChange(opt.value)
                    setOpen(false)
                  }}
                  className={cn(
                    'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors',
                    isActive
                      ? 'bg-secondary font-medium text-foreground'
                      : 'text-foreground hover:bg-secondary',
                  )}
                >
                  {opt.label}
                  {isActive && <Check className="size-4 text-brand" />}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
