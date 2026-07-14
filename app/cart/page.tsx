import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { CartView } from '@/components/cart/cart-view'

export const metadata: Metadata = {
  title: 'Корзина и оформление заказа | Питомник Подмосковья',
  description:
    'Оформите заказ саженцев голубики и жимолости: доставка СДЭК или WB Track, выбор пункта выдачи на карте.',
}

export default function CartPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <CartView />
      </main>
      <SiteFooter />
    </div>
  )
}
