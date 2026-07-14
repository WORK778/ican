'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin, Clock, Truck, Leaf, ShieldCheck, CreditCard } from 'lucide-react'
import { MaxIcon, RutubeIcon, DzenIcon, VkIcon } from '@/components/brand-icons'

const menu = [
  {
    title: 'Покупателям',
    links: [
      { label: 'Доставка и оплата', href: '#' },
      { label: 'О питомнике', href: '/about' },
      { label: 'Гарантия', href: '#' },
      { label: 'Отзывы', href: '#' },
      { label: 'Вопросы и ответы', href: '#' },
    ],
  },
]

const socials = [
  { label: 'MAX', href: 'https://max.ru', Icon: MaxIcon },
  { label: 'Dzen', href: 'https://dzen.ru', Icon: DzenIcon },
  { label: 'VK', href: 'https://vk.com', Icon: VkIcon },
  { label: 'Rutube', href: 'https://rutube.ru', Icon: RutubeIcon },
]

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="relative mt-8 bg-brand-deep text-card">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-green/50 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* CTA-полоса подписки */}
        <div className="mb-10 rounded-2xl bg-card/5 px-5 py-6 ring-1 ring-card/10 sm:px-8">
          <form
            onSubmit={handleSubscribe}
            className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex items-center gap-3">
              <Leaf className="hidden size-6 text-brand-green sm:block" />
              <div>
                <p className="text-lg font-semibold text-card text-balance">
                  Подпишитесь на сезонные предложения
                </p>
                <p className="mt-0.5 text-sm text-card/60">
                  Советы по посадке и первыми узнавайте о новых саженцах
                </p>
              </div>
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
              <label htmlFor="footer-email" className="sr-only">
                Email
              </label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваш e-mail"
                className="w-full rounded-full bg-card px-5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-green sm:w-64"
              />
              <button
                type="submit"
                className="rounded-full bg-brand-green-deep px-6 py-2.5 text-sm font-semibold text-brand-green-foreground transition-colors hover:bg-brand-green"
              >
                Подписаться
              </button>
            </div>
          </form>
          {subscribed && (
            <p className="mt-3 text-sm text-brand-green" role="status">
              Спасибо! Вы подписались на сезонные предложения.
            </p>
          )}
        </div>

        {/* Колонки */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1.3fr]">
          {/* Бренд + соцсети */}
          <div>
            <Image
              src="/brand/footer-logo.svg"
              alt="Логотип питомника"
              width={170}
              height={50}
              className="h-11 w-auto"
            />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-card/75">
              Семейный питомник саженцев в Подмосковье. Выращиваем крепкие
              районированные растения и отправляем по всей России.
            </p>

            <div className="mt-5 flex items-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-full bg-card/10 text-card transition-all duration-200 hover:-translate-y-1 hover:bg-brand-green hover:text-brand-green-foreground"
                >
                  <Icon className="size-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Меню-ссылки */}
          {menu.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-card">{col.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-card/70 transition-colors hover:text-brand-green"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Контакты */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-card">Контакты</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm">
              <a href="tel:+79055555555" className="flex items-center gap-2.5 hover:text-brand-green">
                <Phone className="size-4 shrink-0 text-brand-green" />
                +7 (905) 555-55-55
              </a>
              <a href="mailto:zakaz@zakaz.ru" className="flex items-center gap-2.5 hover:text-brand-green">
                <Mail className="size-4 shrink-0 text-brand-green" />
                zakaz@zakaz.ru
              </a>
              <p className="flex items-center gap-2.5 text-card/75">
                <Clock className="size-4 shrink-0 text-brand-green" />
                Ежедневно с 9:00 до 21:00
              </p>
              <p className="flex items-start gap-2.5 text-card/75">
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-green" />
                Московская обл., Дмитровский р-н, питомник «Модный фермер»
              </p>
              <p className="flex items-center gap-2.5 font-medium text-card">
                <Truck className="size-4 shrink-0 text-brand-green" />
                Отправляем по всей России
              </p>
            </div>
          </div>
        </div>

        {/* Нижняя строка: копирайт + бейджи доверия */}
        <div className="mt-10 flex flex-col gap-5 border-t border-card/15 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-card/60">© 2026 Модный фермер. Все права защищены.</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-card/60 md:justify-center">
            <Link href="/legal" className="transition-colors hover:text-card">
              Политика конфиденциальности
            </Link>
            <Link href="/oferta" className="transition-colors hover:text-card">
              Публичная оферта
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card/10 px-3 py-1.5 text-xs font-semibold text-card">
              <CreditCard className="size-4 text-brand-green" />
              СБП
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-card/10 px-3 py-1.5 text-xs font-semibold text-card">
              <CreditCard className="size-4 text-brand-green" />
              Карты МИР / Visa
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-green/15 px-3 py-1.5 text-xs font-semibold text-card ring-1 ring-brand-green/30">
              <ShieldCheck className="size-4 text-brand-green" />
              Гарантия качества
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
