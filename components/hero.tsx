import Image from 'next/image'
import { Leaf, ShieldCheck, Truck } from 'lucide-react'

const features = [
  { icon: Leaf, title: 'Закрытая корневая система', text: 'Приживаемость 98%' },
  { icon: ShieldCheck, title: 'Районированные сорта', text: 'Для средней полосы' },
  { icon: Truck, title: 'Доставка по России', text: 'Бережная упаковка' },
]

export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-6">
      <div className="relative overflow-hidden rounded-3xl">
        <Image
          src="/farm-hero.png"
          alt="Поле питомника с рядами саженцев голубики и жимолости"
          width={1600}
          height={720}
          className="h-[320px] w-full object-cover md:h-[420px]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep/85 via-brand-deep/55 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-center gap-4 p-6 md:p-12">
          <span className="w-fit rounded-full bg-card/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-card ring-1 ring-inset ring-card/30 backdrop-blur">
            Семейный питомник · Подмосковье
          </span>
          <h1 className="max-w-2xl text-balance font-serif text-3xl leading-tight text-card md:text-5xl">
            Саженцы, выращенные на нашей ферме для вас
          </h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-card/85 md:text-base">
            Голубика и жимолость с закрытой корневой системой. Растим сами, отбираем
            лучшее и отправляем крепкие саженцы прямо с грядки.
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 divide-y divide-border rounded-2xl border border-border bg-card sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex items-center gap-3 px-4 py-3.5">
            <Icon className="size-5 shrink-0 text-brand" aria-hidden="true" />
            <div className="leading-tight">
              <p className="text-sm font-semibold text-foreground">{title}</p>
              <p className="text-xs text-muted-foreground">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
