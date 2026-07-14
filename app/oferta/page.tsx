import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { OfertaContent } from '@/components/oferta/oferta-content'

export const metadata: Metadata = {
  title: 'Публичная оферта | Питомник «Модный фермер»',
  description:
    'Публичная оферта и пользовательское соглашение интернет-магазина «Модный фермер». Условия продажи, оплаты и доставки саженцев.',
}

export default function OfertaPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <OfertaContent />
      </main>
      <SiteFooter />
    </div>
  )
}
