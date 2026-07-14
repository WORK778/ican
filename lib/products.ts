export type Category = {
  slug: string
  title: string
  count: number
  available: boolean
  group: 'berry' | 'decorative'
}

export type Product = {
  id: string
  name: string
  category: string
  description: string
  image: string
  price: number
  oldPrice?: number
  isNew?: boolean
  popularity: number
  height: string
  age: string
  /** Наличие товара. Если не указано — считается, что товар в наличии. */
  inStock?: boolean
  /** Средний рейтинг (1–5). Если не указан — считается на основе популярности. */
  rating?: number
  /** Количество отзывов. Если не указано — считается на основе популярности. */
  reviews?: number
  /** Доп. фото для галереи. Если не указано — берутся фото категории. */
  gallery?: string[]
}

export const categories: Category[] = [
  { slug: 'blueberry', title: 'Голубика', count: 18, available: true, group: 'berry' },
  { slug: 'honeysuckle', title: 'Жимолость', count: 3, available: true, group: 'berry' },
  { slug: 'blackberry', title: 'Ежевика', count: 0, available: false, group: 'berry' },
  { slug: 'raspberry', title: 'Малина', count: 0, available: false, group: 'berry' },
  { slug: 'strawberry', title: 'Земляника (клубника)', count: 0, available: false, group: 'berry' },
  { slug: 'lingonberry', title: 'Брусника', count: 0, available: false, group: 'berry' },
  { slug: 'serviceberry', title: 'Ирга', count: 0, available: false, group: 'berry' },
  { slug: 'cranberry', title: 'Клюква', count: 0, available: false, group: 'berry' },
  { slug: 'currant', title: 'Смородина', count: 0, available: false, group: 'berry' },
  { slug: 'rose', title: 'Роза', count: 0, available: false, group: 'decorative' },
  { slug: 'lilac', title: 'Сирень', count: 0, available: false, group: 'decorative' },
  { slug: 'hydrangea', title: 'Гортензия', count: 0, available: false, group: 'decorative' },
  { slug: 'rhododendron', title: 'Рододендрон', count: 0, available: false, group: 'decorative' },
  { slug: 'heather', title: 'Вереск', count: 0, available: false, group: 'decorative' },
  { slug: 'kalmia', title: 'Калмия', count: 0, available: false, group: 'decorative' },
  { slug: 'barberry', title: 'Барбарис', count: 0, available: false, group: 'decorative' },
  { slug: 'begonia', title: 'Бегония', count: 0, available: false, group: 'decorative' },
  { slug: 'birch', title: 'Береза', count: 0, available: false, group: 'decorative' },
  { slug: 'veronica', title: 'Вероника', count: 0, available: false, group: 'decorative' },
  { slug: 'heuchera', title: 'Гейхера', count: 0, available: false, group: 'decorative' },
  { slug: 'gentian', title: 'Горечавка', count: 0, available: false, group: 'decorative' },
  { slug: 'dogwood', title: 'Дерен', count: 0, available: false, group: 'decorative' },
  { slug: 'willow', title: 'Ива', count: 0, available: false, group: 'decorative' },
  { slug: 'iris', title: 'Ирис', count: 0, available: false, group: 'decorative' },
  { slug: 'clematis', title: 'Клематис', count: 0, available: false, group: 'decorative' },
  { slug: 'cinquefoil', title: 'Лапчатка', count: 0, available: false, group: 'decorative' },
  { slug: 'daylily', title: 'Лилейник', count: 0, available: false, group: 'decorative' },
  { slug: 'ninebark', title: 'Пузыреплодник', count: 0, available: false, group: 'decorative' },
  { slug: 'sedum', title: 'Седум (очиток)', count: 0, available: false, group: 'decorative' },
  { slug: 'spirea', title: 'Спирея', count: 0, available: false, group: 'decorative' },
  { slug: 'phlox', title: 'Флокс', count: 0, available: false, group: 'decorative' },
  { slug: 'hosta', title: 'Хоста', count: 0, available: false, group: 'decorative' },
  { slug: 'mockorange', title: 'Чубушник', count: 0, available: false, group: 'decorative' },
]

export const products: Product[] = [
  {
    id: 'bl-duke',
    name: 'Голубика «Дюк»',
    category: 'blueberry',
    description:
      'Ранний высокоурожайный сорт. Крупные сладкие ягоды, стабильно плодоносит в средней полосе.',
    image: '/products/blueberry-1.png',
    price: 690,
    oldPrice: 890,
    isNew: false,
    popularity: 98,
    height: '30–40 см',
    age: '2 года',
  },
  {
    id: 'bl-bluecrop',
    name: 'Голубика «Блюкроп»',
    category: 'blueberry',
    description:
      'Классика и эталон вкуса. Мощный куст, устойчив к морозам до −34 °C, ягоды хранятся долго.',
    image: '/products/blueberry-2.png',
    price: 750,
    oldPrice: 990,
    isNew: false,
    popularity: 95,
    height: '40–50 см',
    age: '3–4 года',
  },
  {
    id: 'bl-patriot',
    name: 'Голубика «Патриот»',
    category: 'blueberry',
    description:
      'Декоративный и урожайный сорт. Не боится подтопления, ягоды крупные и плотные.',
    image: '/products/blueberry-3.png',
    price: 640,
    isNew: true,
    popularity: 82,
    height: '25–35 см',
    age: '1 год',
  },
  {
    id: 'bl-bluegold',
    name: 'Голубика «Блюголд»',
    category: 'blueberry',
    description:
      'Среднеспелый сорт с обильным плодоношением. Ягоды светло-голубые, ароматные, отлично транспортируются.',
    image: '/products/blueberry-1.png',
    price: 720,
    oldPrice: 950,
    isNew: false,
    popularity: 88,
    height: '35–45 см',
    age: '2–3 года',
  },
  {
    id: 'bl-chandler',
    name: 'Голубика «Чандлер»',
    category: 'blueberry',
    description:
      'Рекордсмен по размеру ягод — до 2,5 см. Длительное плодоношение до месяца, десертный вкус.',
    image: '/products/blueberry-2.png',
    price: 820,
    oldPrice: 1090,
    isNew: false,
    popularity: 93,
    height: '40–50 см',
    age: '3–4 года',
    inStock: false,
  },
  {
    id: 'bl-elizabeth',
    name: 'Голубика «Элизабет»',
    category: 'blueberry',
    description:
      'Поздний сорт с изысканным вкусом. Ягоды сладкие с винным послевкусием, куст мощный и зимостойкий.',
    image: '/products/blueberry-3.png',
    price: 690,
    isNew: false,
    popularity: 80,
    height: '30–40 см',
    age: '2 года',
  },
  {
    id: 'bl-northland',
    name: 'Голубика «Нортланд»',
    category: 'blueberry',
    description:
      'Самый морозостойкий сорт, выдерживает до −40 °C. Компактный куст, стабильный урожай каждый год.',
    image: '/products/blueberry-1.png',
    price: 650,
    isNew: false,
    popularity: 85,
    height: '25–35 см',
    age: '1–2 года',
  },
  {
    id: 'bl-spartan',
    name: 'Голубика «Спартан»',
    category: 'blueberry',
    description:
      'Ранний сорт премиум-класса. Крупные хрустящие ягоды с насыщенным вкусом, высокая урожайность.',
    image: '/products/blueberry-2.png',
    price: 780,
    oldPrice: 990,
    isNew: false,
    popularity: 87,
    height: '40–50 см',
    age: '3–4 года',
  },
  {
    id: 'bl-toro',
    name: 'Голубика «Торо»',
    category: 'blueberry',
    description:
      'Декоративный и урожайный. Ягоды собраны в плотные кисти как виноград, созревают дружно.',
    image: '/products/blueberry-3.png',
    price: 700,
    isNew: false,
    popularity: 79,
    height: '35–45 см',
    age: '2–3 года',
    inStock: false,
  },
  {
    id: 'bl-reka',
    name: 'Голубика «Река»',
    category: 'blueberry',
    description:
      'Неприхотливый ранний сорт из Новой Зеландии. Хорошо растёт даже на тяжёлых почвах, обильно плодоносит.',
    image: '/products/blueberry-1.png',
    price: 630,
    isNew: false,
    popularity: 76,
    height: '30–40 см',
    age: '2 года',
  },
  {
    id: 'bl-nelson',
    name: 'Голубика «Нельсон»',
    category: 'blueberry',
    description:
      'Поздний высокоурожайный сорт. Крупные плотные ягоды с классическим сладким вкусом, долго хранятся.',
    image: '/products/blueberry-2.png',
    price: 760,
    oldPrice: 940,
    isNew: false,
    popularity: 84,
    height: '40–50 см',
    age: '3–4 года',
  },
  {
    id: 'bl-legacy',
    name: 'Голубика «Легаси»',
    category: 'blueberry',
    description:
      'Полувечнозелёный сорт с длительным плодоношением. Ягоды ароматные, куст красив весь сезон.',
    image: '/products/blueberry-3.png',
    price: 740,
    isNew: false,
    popularity: 83,
    height: '40–55 см',
    age: '4–5 лет',
  },
  {
    id: 'bl-draper',
    name: 'Голубика «Дрейпер»',
    category: 'blueberry',
    description:
      'Современный промышленный сорт. Плотные ягоды идеальны для заморозки, вкус сладкий и стабильный.',
    image: '/products/blueberry-1.png',
    price: 800,
    oldPrice: 1050,
    isNew: true,
    popularity: 86,
    height: '35–45 см',
    age: '2–3 года',
  },
  {
    id: 'bl-aurora',
    name: 'Голубика «Аврора»',
    category: 'blueberry',
    description:
      'Самый поздний сорт — продлевает сезон до октября. Крупные ягоды с ярким сладко-кислым вкусом.',
    image: '/products/blueberry-2.png',
    price: 810,
    isNew: true,
    popularity: 81,
    height: '40–50 см',
    age: '3–4 года',
  },
  {
    id: 'bl-liberty',
    name: 'Голубика «Либерти»',
    category: 'blueberry',
    description:
      'Поздний десертный сорт. Ягоды не мельчают к концу сезона, куст устойчив к болезням.',
    image: '/products/blueberry-3.png',
    price: 720,
    isNew: false,
    popularity: 77,
    height: '35–45 см',
    age: '2–3 года',
  },
  {
    id: 'bl-sunrise',
    name: 'Голубика «Санрайз»',
    category: 'blueberry',
    description:
      'Ранний сорт с дружным созреванием. Светлые сладкие ягоды среднего размера, декоративное цветение.',
    image: '/products/blueberry-1.png',
    price: 660,
    isNew: false,
    popularity: 75,
    height: '30–40 см',
    age: '2 года',
  },
  {
    id: 'bl-bluejay',
    name: 'Голубика «Блюджей»',
    category: 'blueberry',
    description:
      'Среднеранний сорт, устойчивый к весенним заморозкам. Ягоды не растрескиваются, отлично хранятся.',
    image: '/products/blueberry-2.png',
    price: 690,
    oldPrice: 860,
    isNew: false,
    popularity: 78,
    height: '35–45 см',
    age: '2–3 года',
  },
  {
    id: 'bl-earliblue',
    name: 'Голубика «Эрлиблю»',
    category: 'blueberry',
    description:
      'Один из самых ранних сортов. Крупные ароматные ягоды, куст раскидистый и зимостойкий.',
    image: '/products/blueberry-3.png',
    price: 640,
    isNew: false,
    popularity: 73,
    height: '30–40 см',
    age: '2 года',
  },
  {
    id: 'hs-bakcharsky',
    name: 'Жимолость «Бакчарский великан»',
    category: 'honeysuckle',
    description:
      'Самые крупные ягоды среди жимолости — до 4 см. Сладкие, с лёгкой кислинкой, почти без осыпания.',
    image: '/products/honeysuckle-1.png',
    price: 590,
    oldPrice: 740,
    isNew: false,
    popularity: 91,
    height: '30–40 см',
    age: '2 года',
  },
  {
    id: 'hs-sineglazka',
    name: 'Жимолость «Синеглазка»',
    category: 'honeysuckle',
    description:
      'Проверенный десертный сорт. Дружное созревание, ягоды сладкие, отлично подходят для заморозки.',
    image: '/products/honeysuckle-2.png',
    price: 520,
    isNew: false,
    popularity: 78,
    height: '35–45 см',
    age: '2–3 года',
  },
  {
    id: 'hs-yugana',
    name: 'Жимолость «Югана»',
    category: 'honeysuckle',
    description:
      'Новинка сезона. Поздний урожайный сорт, ягоды крупные и плотные, не горчат.',
    image: '/products/honeysuckle-3.png',
    price: 610,
    oldPrice: 690,
    isNew: true,
    popularity: 74,
    height: '30–40 см',
    age: '1 год',
    inStock: false,
  },
]

export function getProduct(id: string) {
  return products.find((p) => p.id === id)
}

/**
 * Похожие товары для карточки товара.
 * Сначала — та же категория, приоритет у товаров в наличии и более популярных.
 * Если в категории не набирается нужное число — добираем из остальных категорий.
 */
export function getSimilarProducts(product: Product, limit = 4) {
  const rank = (a: Product, b: Product) => {
    const stock = Number(isInStock(b)) - Number(isInStock(a))
    if (stock !== 0) return stock
    return b.popularity - a.popularity
  }

  const others = products.filter((p) => p.id !== product.id)
  const sameCategory = others
    .filter((p) => p.category === product.category)
    .sort(rank)
  const rest = others
    .filter((p) => p.category !== product.category)
    .sort(rank)

  return [...sameCategory, ...rest].slice(0, limit)
}

export function isInStock(product: Product) {
  return product.inStock !== false
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat('ru-RU').format(value) + ' ₽'
}

export function discountPercent(price: number, oldPrice?: number) {
  if (!oldPrice || oldPrice <= price) return 0
  return Math.round((1 - price / oldPrice) * 100)
}

/** Доп. фото для галереи по категории товара. */
const galleryByCategory: Record<string, string[]> = {
  blueberry: ['/products/blueberry-bush.png', '/products/blueberry-detail.png'],
  honeysuckle: [
    '/products/honeysuckle-bush.png',
    '/products/honeysuckle-detail.png',
  ],
}

/** Полный набор фото товара: основное + гал��рея (без дубликатов). */
export function getGallery(product: Product) {
  const extra = product.gallery ?? galleryByCategory[product.category] ?? []
  return [product.image, ...extra.filter((src) => src !== product.image)]
}

/** Рейтинг товара. Если не задан — стабильно выводится из популярности (4.6–4.9). */
export function getRating(product: Product) {
  if (product.rating) return product.rating
  return Math.round((4.6 + (product.popularity / 100) * 0.3) * 10) / 10
}

/** Число отзывов. Если не задано — стабильно выводится из популярности. */
export function getReviews(product: Product) {
  if (product.reviews) return product.reviews
  return Math.round(40 + product.popularity * 1.8)
}
