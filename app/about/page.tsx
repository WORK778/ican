import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { AboutContent } from '@/components/about/about-content'

export const metadata: Metadata = {
  title: 'О питомнике | Питомник «Модный фермер»',
  description:
    'Семейный питомник растений на юге Подмосковья: плодово-ягодные кустарники и декоративные культуры. Опытно-испытательная плантация, районированные саженцы голубики и жимолости, демонстрационные площадки вересковых и метельчатой гортензии.',
}

export default function AboutPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <AboutContent />
      </main>
      <SiteFooter />
    </div>
  )
}
