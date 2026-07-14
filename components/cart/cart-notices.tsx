import { CalendarClock, Info } from 'lucide-react'

const NOTICES = [
  {
    icon: Info,
    text: 'Стоимость указана только за саженцы. Доставка оплачивается непосредственно в пункте выдачи СДЭК.',
  },
  {
    icon: CalendarClock,
    text: 'Выкопка растений из грунта начнётся в конце сентября / начале октября. Заказавшим доставку СДЭК на электронную почту придёт уведомление после того, как заказ уедет.',
  },
]

export function CartNotices() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {NOTICES.map(({ icon: Icon, text }, i) => (
        <div
          key={i}
          className="flex gap-3 rounded-2xl border border-brand/20 bg-accent/40 p-4"
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
            <Icon className="size-4" />
          </span>
          <p className="text-sm leading-relaxed text-brand-deep">{text}</p>
        </div>
      ))}
    </div>
  )
}
