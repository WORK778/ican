'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import {
  ChevronDown,
  ChevronRight,
  Leaf,
  Mail,
  Phone,
  Sprout,
  Star,
  Truck,
  X,
} from 'lucide-react'
import { MaxIcon, RutubeIcon, DzenIcon, VkIcon } from '@/components/brand-icons'
import { useCatalog } from '@/components/catalog-context'
import { categories } from '@/lib/products'
import { cn } from '@/lib/utils'

type Props = {
  open: boolean
  onClose: () => void
}

const navLinks = [
  { label: 'Доставка и оплата', href: '#', Icon: Truck },
  { label: 'О питомнике', href: '/about', Icon: Leaf },
  { label: 'Отзывы', href: '#', Icon: Star },
]

const socials = [
  { label: 'MAX', href: 'https://max.ru/modnyfermer', Icon: MaxIcon },
  { label: 'Dzen', href: 'https://dzen.ru/modnyfermer', Icon: DzenIcon },
  { label: 'VK', href: 'https://vk.com/modnyfermer', Icon: VkIcon },
  { label: 'Rutube', href: 'https://rutube.ru/channel/39332611', Icon: RutubeIcon },
]

export function MobileMenu({ open, onClose }: Props) {
  const { category, setCategory } = useCatalog()
  const [showCatalog, setShowCatalog] = useState(true)
  const [showUpcoming, setShowUpcoming] = useState(false)

  // Lock body scroll and close on Escape while the drawer is open.
  useEffect(() => {
    if (!open) return
    const { overflow } = document.body.style
    document.body.style.overflow = 'hidden'
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  function scrollToCatalog() {
    onClose()
    if (typeof document !== 'undefined') {
      requestAnimationFrame(() =>
        document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }),
      )
    }
  }

  function handleSelectCategory(slug: string) {
    setCategory(slug)
    scrollToCatalog()
  }

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href === '#catalog') {
      e.preventDefault()
      scrollToCatalog()
    } else if (href === '#') {
      e.preventDefault()
      onClose()
    } else {
      onClose()
    }
  }

  const availableCats = categories.filter((c) => c.available)
  const upcomingCats = categories.filter((c) => !c.available)

  return (
    <div
      className={`fixed inset-0 z-50 overflow-hidden lg:hidden ${open ? '' : 'pointer-events-none'}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Закрыть меню"
        onClick={onClose}
        className={`absolute inset-0 bg-foreground/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Меню"
        className={`absolute inset-y-0 right-0 flex w-[88%] max-w-sm flex-col bg-background transition-transform duration-300 ease-out ${
          open ? 'translate-x-0 shadow-2xl' : 'translate-x-full'
        }`}
      >
        {/* Brand header */}
        <div className="flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-3.5">
          <a href="/" className="flex items-center gap-2.5" aria-label="На главную" onClick={onClose}>
            <Image
              src="/brand/logo.svg"
              alt="Логотип питомника"
              width={140}
              height={42}
              className="h-9 w-auto"
            />
            <span className="text-xs font-semibold leading-tight text-brand-deep">
              Питомник
              <br />
              Подмосковья
            </span>
          </a>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть меню"
            className="flex size-10 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-brand hover:text-brand"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Primary navigation */}
          <nav className="px-3 py-4">
            <ul className="flex flex-col gap-1">
              {/* Catalog — expandable, holds the categories */}
              <li>
                <button
                  type="button"
                  onClick={() => setShowCatalog((v) => !v)}
                  aria-expanded={showCatalog}
                  className="group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-[15px] font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                    <Sprout className="size-[18px]" />
                  </span>
                  <span className="flex-1">Каталог</span>
                  <ChevronDown
                    className={cn(
                      'size-4 text-muted-foreground transition-transform duration-200',
                      showCatalog && 'rotate-180',
                    )}
                  />
                </button>

                {showCatalog && (
                  <div className="mt-1 pl-3">
                    <ul className="flex flex-col gap-1 border-l border-border pl-3">
                      {availableCats.map((cat) => {
                        const isActive = cat.slug === category
                        return (
                          <li key={cat.slug}>
                            <button
                              type="button"
                              onClick={() => handleSelectCategory(cat.slug)}
                              aria-current={isActive ? 'true' : undefined}
                              className={cn(
                                'flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                                isActive
                                  ? 'bg-brand text-brand-foreground'
                                  : 'text-foreground hover:bg-secondary',
                              )}
                            >
                              <span className="font-medium">{cat.title}</span>
                              <span
                                className={cn(
                                  'rounded-full px-2 py-0.5 text-xs font-semibold',
                                  isActive
                                    ? 'bg-brand-foreground/20 text-brand-foreground'
                                    : 'bg-secondary text-muted-foreground',
                                )}
                              >
                                {cat.count}
                              </span>
                            </button>
                          </li>
                        )
                      })}

                      {/* Upcoming — compact chips */}
                      {upcomingCats.length > 0 && (
                        <li>
                          <button
                            type="button"
                            onClick={() => setShowUpcoming((v) => !v)}
                            aria-expanded={showUpcoming}
                            className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary"
                          >
                            <span className="font-medium">
                              Скоро в прод����же
                              <span className="ml-1.5 text-xs">({upcomingCats.length})</span>
                            </span>
                            <ChevronDown
                              className={cn(
                                'size-4 transition-transform duration-200',
                                showUpcoming && 'rotate-180',
                              )}
                            />
                          </button>
                          {showUpcoming && (
                            <div className="flex flex-wrap gap-1.5 px-1 pb-1 pt-2">
                              {upcomingCats.map((cat) => (
                                <span
                                  key={cat.slug}
                                  className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
                                >
                                  {cat.title}
                                </span>
                              ))}
                            </div>
                          )}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </li>

              {navLinks.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className="group flex items-center gap-3 rounded-xl px-3 py-3 text-[15px] font-medium text-foreground transition-colors hover:bg-secondary"
                  >
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                      <Icon className="size-[18px]" />
                    </span>
                    <span className="flex-1">{label}</span>
                    <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacts — kept, lightly refined */}
          <div className="border-t border-border px-4 pb-4 pt-4">
            <p className="mb-2.5 px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Контакты
            </p>
            <div className="flex flex-col gap-2">
              <a
                href="https://max.ru/modnyfermer"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-2xl bg-brand p-3 text-brand-foreground transition-colors hover:bg-brand-deep"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-brand-foreground/15 text-brand-foreground">
                  <MaxIcon className="size-5" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-semibold">Связаться через MAX</span>
                  <span className="text-xs text-brand-foreground/80">быстрый ответ в мессенджере</span>
                </span>
              </a>
              <a
                href="tel:+79055555555"
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  <Phone className="size-4" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-semibold text-foreground">+7 (905) 555-55-55</span>
                  <span className="text-xs text-muted-foreground">ПН–СБ с 9:00 до 18:00</span>
                </span>
              </a>
              <a
                href="mailto:zakaz@modnyfermer.ru"
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-3"
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
                  <Mail className="size-4" />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-semibold text-foreground">zakaz@modnyfermer.ru</span>
                  <span className="text-xs text-muted-foreground">напишите нам</span>
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Socials footer */}
        <div className="border-t border-border bg-card px-4 py-3.5">
          <div className="flex items-center justify-center gap-2.5">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-full border border-border bg-background text-brand-deep transition-colors hover:border-brand hover:bg-brand hover:text-brand-foreground"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
