import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronRight,
  Sprout,
  FlaskConical,
  Trees,
  MapPin,
  Clock,
  Phone,
  Navigation,
} from 'lucide-react'

const stats = [
  { value: '15+', label: 'лет наблюдений за сортами' },
  { value: '98%', label: 'приживаемость саженцев' },
  { value: '100+', label: 'сортов на плантации' },
]

const advantages = [
  {
    icon: FlaskConical,
    title: 'Опытно-испытательная плантация',
    text: 'Все плодовые растения высаживаются на специальном участке и наблюдаются несколько лет — мы оцениваем их пригодность к средней полосе и способность давать стабильный и вкусный урожай.',
  },
  {
    icon: Sprout,
    title: 'Плодово-ягодные культуры',
    text: 'Основное направление питомника — плодово-ягодные кустарники. Мы выращиваем крепкие районированные саженцы голубики и жимолости с закрытой корневой системой.',
  },
  {
    icon: Trees,
    title: 'Декоративные площадки',
    text: 'Для вересковых культур создан своеобразный арборетум, а при въезде на плантацию высажен парк метельчатой гортензии — все сорта рядами, чтобы вы могли увидеть растения вживую.',
  },
]

export function AboutContent() {
  return (
    <>
      {/* Заголовок */}
      <section className="relative overflow-hidden bg-brand-deep text-card">
        <Image
          src="/about/nursery-rows.png"
          alt="Ряды саженцев в питомнике на юге Подмосковья"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-deep via-brand-deep/85 to-brand-deep/40" />

        <div className="relative mx-auto max-w-5xl px-4 py-14 sm:py-20">
          <nav aria-label="Хлебные крошки" className="mb-5 flex items-center gap-1.5 text-sm text-card/60">
            <Link href="/" className="transition-colors hover:text-brand-green">
              Главная
            </Link>
            <ChevronRight className="size-4" aria-hidden="true" />
            <span className="text-card/90">О питомнике</span>
          </nav>

          <h1 className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-balance sm:text-5xl">
            Питомник растений на юге Подмосковья
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-sm leading-relaxed text-card/80 sm:text-base">
            Наш питомник был организован немного позже, чем сама ягодная плантация.
            Основное направление — плодово-ягодные кустарники и декоративные культуры,
            особенно вересковые.
          </p>
        </div>
      </section>

      {/* Показатели */}
      <section className="mx-auto max-w-5xl px-4">
        <div className="relative z-10 -mt-8 grid grid-cols-1 divide-y divide-border rounded-2xl border border-border bg-card shadow-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1 px-4 py-6 text-center">
              <span className="font-serif text-3xl text-brand sm:text-4xl">{stat.value}</span>
              <span className="text-sm text-muted-foreground text-balance">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* О питомнике */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <h2 className="font-serif text-2xl text-foreground text-balance sm:text-3xl">
              Растим сами и отбираем лучшее
            </h2>
            <div className="mt-4 flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground text-pretty sm:text-base">
              <p>
                Уникальной особенностью питомника является опытно-испытательная
                направленность. Все плодовые растения, которые мы предлагаем покупателю,
                сначала высаживаются на специальном участке и наблюдаются несколько лет.
              </p>
              <p>
                Мы оцениваем их на пригодность к выращиванию в средней полосе, а также на
                возможность получения стабильного и вкусного урожая. К продаже попадают
                только проверенные, надёжные сорта.
              </p>
              <p>
                Для декоративных культур организованы специальные демонстрационные
                площадки: для вересковых — своеобразный арборетум, где высажены все
                предлагаемые растения, а для метельчатой гортензии при въезде на плантацию
                создан парк с рядами всех сортов.
              </p>
            </div>
          </div>

          <div className="order-1 overflow-hidden rounded-3xl lg:order-2">
            <Image
              src="/about/heather-arboretum.png"
              alt="Демонстрационная площадка с вересковыми и метельчатой гортензией"
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        {/* Преимущества */}
        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
          {advantages.map(({ icon: Icon, title, text }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-6">
              <span className="flex size-11 items-center justify-center rounded-2xl bg-brand-green/15 ring-1 ring-brand-green/30">
                <Icon className="size-5 text-brand-green-deep" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-lg text-foreground text-balance">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground text-pretty">{text}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Как нас найти */}
      <section className="border-t border-border bg-accent">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <h2 className="font-serif text-2xl text-accent-foreground text-balance sm:text-3xl">
                Как нас найти
              </h2>

              <div className="mt-6 flex flex-col gap-4 text-sm sm:text-base">
                <p className="flex items-start gap-3 text-muted-foreground">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  <span>
                    Деревня Семёнково, Серебряно-Прудский городской округ, Московская
                    область. По указателям «Ягодная Ферма Голубики».
                  </span>
                </p>
                <p className="flex items-start gap-3 text-muted-foreground">
                  <Clock className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  <span>
                    Время работы: ПН–СБ с 9:00 до 18:00, обед с 13:00 до 14:00. Воскресенье —
                    выходной, кроме сезона ягод (июль/август).
                  </span>
                </p>
                <p className="flex items-start gap-3 text-muted-foreground">
                  <Phone className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
                  <a href="tel:+79055555555" className="transition-colors hover:text-brand">
                    +7 (905) 555-55-55
                  </a>
                </p>
              </div>

              <a
                href="https://yandex.ru/maps/?text=деревня Семёнково Серебряно-Прудский городской округ"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-2.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-deep"
              >
                <Navigation className="size-4" aria-hidden="true" />
                Открыть в Яндекс Картах
              </a>
            </div>

            <div className="overflow-hidden rounded-3xl border border-border">
              <iframe
                title="Карта проезда к питомнику в деревне Семёнково"
                src="https://yandex.ru/map-widget/v1/?text=деревня%20Семёнково%20Серебряно-Прудский%20городской%20округ&z=12"
                className="h-72 w-full sm:h-80"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Соцсети */}
      <section className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
        <div className="rounded-2xl bg-brand-deep px-6 py-10 text-center text-card sm:px-10">
          <h2 className="mx-auto max-w-2xl font-serif text-2xl text-balance sm:text-3xl">
            О том, как мы выращиваем голубику, смотрите в наших социальных сетях
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-card/70">
            Делимся жизнью питомника, советами по посадке и уходу, а также показываем
            урожай на плантации.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {[
              { label: 'MAX', href: 'https://max.ru' },
              { label: 'Dzen', href: 'https://dzen.ru' },
              { label: 'VK', href: 'https://vk.com' },
              { label: 'Rutube', href: 'https://rutube.ru' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-card/10 px-5 py-2.5 text-sm font-semibold text-card transition-colors hover:bg-brand-green hover:text-brand-green-foreground"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
