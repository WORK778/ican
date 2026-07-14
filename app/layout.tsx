import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Nunito_Sans, Prata } from 'next/font/google'
import { CartProvider } from '@/components/cart-context'
import { CatalogProvider } from '@/components/catalog-context'
import './globals.css'

const nunito = Nunito_Sans({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-nunito',
  display: 'swap',
})

const prata = Prata({
  subsets: ['latin', 'cyrillic'],
  weight: '400',
  variable: '--font-prata',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Саженцы — питомник Подмосковья | Голубика и жимолость',
  description:
    'Саженцы голубики и жимости с собственной фермы в Подмосковье. Крепкие районированные растения с закрытой корневой системой, доставка по России.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#4C85AA',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`light ${nunito.variable} ${prata.variable}`}>
      <body className="bg-background font-sans antialiased">
        <CartProvider>
          <CatalogProvider>{children}</CatalogProvider>
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
