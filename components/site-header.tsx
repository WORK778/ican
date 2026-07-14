'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Mail, Menu, Phone, ShoppingCart } from 'lucide-react'
import { MaxIcon } from '@/components/brand-icons'
import { useCart } from '@/components/cart-context'
import { MobileMenu } from '@/components/mobile-menu'

export function SiteHeader() {
  const { count } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 md:h-20 md:gap-6">
        {/* Logo */}
        <a href="/" className="flex shrink-0 items-center gap-3" aria-label="На главную">
          <Image
            src="/brand/logo.svg"
            alt="Логотип питомника"
            width={154}
            height={46}
            className="h-10 w-auto md:h-11"
            priority
          />
          <span className="hidden text-sm font-semibold leading-tight text-brand-deep lg:block">
            Питомник
            <br />
            Подмосковья
          </span>
        </a>

        {/* Contacts — hidden on mobile, available inside the burger menu instead */}
        <div className="ml-auto hidden items-center gap-6 lg:flex">
          <a
            href="tel:+79055555555"
            className="group flex items-center gap-2.5 text-sm"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
              <Phone className="size-4" />
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="font-semibold text-foreground">+7 (905) 555-55-55</span>
              <span className="text-xs text-muted-foreground">ежедневно 9:00–20:00</span>
            </span>
          </a>

          <a
            href="mailto:zakaz@zakaz.ru"
            className="group hidden items-center gap-2.5 text-sm lg:flex"
          >
            <span className="flex size-9 items-center justify-center rounded-full bg-secondary text-brand transition-colors group-hover:bg-brand group-hover:text-brand-foreground">
              <Mail className="size-4" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="font-semibold text-foreground">zakaz@zakaz.ru</span>
              <span className="text-xs text-muted-foreground">напишите нам</span>
            </span>
          </a>
        </div>

        {/* Actions */}
        <div className="ml-auto flex shrink-0 items-center gap-3 md:ml-0">
          <a
            href="https://max.ru"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-brand px-4 py-2.5 text-sm font-semibold text-brand-foreground shadow-sm transition-colors hover:bg-brand-deep lg:inline-flex"
          >
            <MaxIcon className="size-4" />
            <span>Написать в MAX</span>
          </a>

          <Link
            href="/cart"
            aria-label="Открыть корзину"
            className="relative flex size-11 items-center justify-center rounded-full border border-border bg-card text-brand-deep transition-colors hover:border-brand hover:text-brand"
          >
            <ShoppingCart className="size-5" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-sale px-1 text-xs font-bold text-sale-foreground">
                {count}
              </span>
            )}
          </Link>

          {/* Burger — mobile only */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Открыть меню"
            aria-expanded={menuOpen}
            className="flex size-11 items-center justify-center rounded-full border border-border bg-card text-brand-deep transition-colors hover:border-brand hover:text-brand lg:hidden"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>
    </header>

    <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
