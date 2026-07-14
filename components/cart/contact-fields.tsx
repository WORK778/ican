'use client'

import { cn } from '@/lib/utils'

export type ContactValues = {
  firstName: string
  lastName: string
  email: string
  phone: string
  comment: string
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>

// Форматирует ввод в российский номер: +7 (XXX) XXX-XX-XX.
// Любые нецифровые символы отбрасываются, ведущая 8 превращается в 7.
export function formatRuPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '')
  if (!digits) return ''
  if (digits[0] === '8') digits = '7' + digits.slice(1)
  if (digits[0] !== '7') digits = '7' + digits
  digits = digits.slice(0, 11)

  const rest = digits.slice(1) // до 10 цифр абонентского номера
  let out = '+7'
  if (rest.length > 0) out += ' (' + rest.slice(0, 3)
  if (rest.length >= 3) out += ')'
  if (rest.length > 3) out += ' ' + rest.slice(3, 6)
  if (rest.length > 6) out += '-' + rest.slice(6, 8)
  if (rest.length > 8) out += '-' + rest.slice(8, 10)
  return out
}

type ContactFieldsProps = {
  values: ContactValues
  errors: ContactErrors
  onChange: (field: keyof ContactValues, value: string) => void
}

const FIELDS: {
  name: keyof ContactValues
  label: string
  type: string
  placeholder: string
  autoComplete: string
  half: boolean
}[] = [
  { name: 'firstName', label: 'Имя', type: 'text', placeholder: 'Иван', autoComplete: 'given-name', half: true },
  { name: 'lastName', label: 'Фамилия', type: 'text', placeholder: 'Иванов', autoComplete: 'family-name', half: true },
  { name: 'email', label: 'Эл. почта', type: 'email', placeholder: 'you@example.com', autoComplete: 'email', half: true },
  { name: 'phone', label: 'Номер телефона', type: 'tel', placeholder: '+7 (___) ___-__-__', autoComplete: 'tel', half: true },
]

export function ContactFields({ values, errors, onChange }: ContactFieldsProps) {
  return (
    <div>
      <h2 className="mb-3 text-base font-semibold text-foreground">Получатель</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <div key={field.name} className={cn('flex flex-col gap-1.5', !field.half && 'sm:col-span-2')}>
            <label htmlFor={field.name} className="text-sm font-medium text-foreground">
              {field.label} <span className="text-sale">*</span>
            </label>
            <input
              id={field.name}
              name={field.name}
              type={field.type}
              inputMode={field.type === 'tel' ? 'tel' : undefined}
              value={values[field.name]}
              onChange={(e) =>
                onChange(
                  field.name,
                  field.name === 'phone' ? formatRuPhone(e.target.value) : e.target.value,
                )
              }
              onFocus={
                field.name === 'phone'
                  ? (e) => {
                      if (!e.target.value) onChange('phone', '+7 ')
                    }
                  : undefined
              }
              placeholder={field.placeholder}
              autoComplete={field.autoComplete}
              aria-invalid={Boolean(errors[field.name])}
              className={cn(
                'w-full rounded-xl border bg-background px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:ring-2 focus:ring-brand/30',
                errors[field.name] ? 'border-destructive' : 'border-border focus:border-brand',
              )}
            />
            {errors[field.name] && (
              <span className="text-xs text-destructive">{errors[field.name]}</span>
            )}
          </div>
        ))}

        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="comment" className="text-sm font-medium text-foreground">
            Комментарий к заказу
          </label>
          <textarea
            id="comment"
            name="comment"
            value={values.comment}
            onChange={(e) => onChange('comment', e.target.value)}
            placeholder="Например: удобное время для звонка, пожелания по сортам…"
            rows={3}
            className="w-full resize-y rounded-xl border border-border bg-background px-3.5 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-brand/30"
          />
        </div>
      </div>
    </div>
  )
}
