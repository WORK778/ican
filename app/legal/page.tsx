import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { LegalContent } from '@/components/legal/legal-content'

export const metadata: Metadata = {
  title: 'Политика конфиденциальности | Питомник «Модный фермер»',
  description:
    'Политика в отношении обработки персональных данных питомника «Модный фермер». Порядок обработки и меры по обеспечению безопасности персональных данных.',
}

export default function LegalPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <LegalContent />
      </main>
      <SiteFooter />
    </div>
  )
}
