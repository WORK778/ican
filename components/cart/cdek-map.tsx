'use client'

import { useEffect, useRef, useState } from 'react'
import { MapPin } from 'lucide-react'
import type { PvzPoint } from '@/lib/cdek-pvz'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type YMaps = any

const YANDEX_API_KEY = process.env.NEXT_PUBLIC_YANDEX_MAPS_API_KEY ?? ''

let ymapsPromise: Promise<YMaps> | null = null

// Однократная загрузка Yandex Maps JS API (требуется ключ).
function loadYandexMaps(): Promise<YMaps> {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'))
  const w = window as unknown as { ymaps?: YMaps }
  if (w.ymaps) return Promise.resolve(w.ymaps)
  if (!ymapsPromise) {
    ymapsPromise = new Promise<YMaps>((resolve, reject) => {
      const script = document.createElement('script')
      script.src = `https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_API_KEY}&lang=ru_RU`
      script.async = true
      script.onload = () => {
        const ym = (window as unknown as { ymaps?: YMaps }).ymaps
        if (ym) ym.ready(() => resolve(ym))
        else reject(new Error('ymaps missing'))
      }
      script.onerror = () => reject(new Error('failed to load Yandex Maps'))
      document.head.appendChild(script)
    })
  }
  return ymapsPromise
}

type CdekMapProps = {
  center: [number, number]
  points: PvzPoint[]
  selectedId: string | null
  onSelect: (id: string) => void
}

export default function CdekMap({ center, points, selectedId, onSelect }: CdekMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<YMaps | null>(null)
  const ymapsRef = useRef<YMaps | null>(null)
  const placemarksRef = useRef<Map<string, YMaps>>(new Map())
  const onSelectRef = useRef(onSelect)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>(
    YANDEX_API_KEY ? 'loading' : 'error',
  )

  onSelectRef.current = onSelect

  // Инициализация карты один раз.
  useEffect(() => {
    if (!YANDEX_API_KEY) return
    let cancelled = false

    loadYandexMaps()
      .then((ymaps) => {
        if (cancelled || !containerRef.current || mapRef.current) return
        ymapsRef.current = ymaps
        const map = new ymaps.Map(
          containerRef.current,
          { center, zoom: 12, controls: ['zoomControl', 'geolocationControl'] },
          { suppressMapOpenBlock: true },
        )
        mapRef.current = map
        setStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
      if (mapRef.current) {
        mapRef.current.destroy()
        mapRef.current = null
      }
      placemarksRef.current.clear()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Перерисовка меток при изменении точек/выбора.
  useEffect(() => {
    const map = mapRef.current
    const ymaps = ymapsRef.current
    if (!map || !ymaps) return

    map.geoObjects.removeAll()
    placemarksRef.current.clear()

    for (const point of points) {
      const active = point.id === selectedId
      const placemark = new ymaps.Placemark(
        point.coords,
        {
          balloonContentHeader: point.name,
          balloonContentBody: point.address,
        },
        {
          preset: active ? 'islands#greenDotIcon' : 'islands#blueDotIcon',
          iconColor: active ? '#16a34a' : '#2f5d7c',
          zIndex: active ? 1000 : 1,
        },
      )
      placemark.events.add('click', () => onSelectRef.current(point.id))
      map.geoObjects.add(placemark)
      placemarksRef.current.set(point.id, placemark)
    }
  }, [points, selectedId, status])

  // Центрирование при смене города.
  useEffect(() => {
    if (mapRef.current) mapRef.current.setCenter(center, 12, { duration: 400 })
  }, [center])

  // Приближение к выбранному ПВЗ.
  useEffect(() => {
    const selected = points.find((p) => p.id === selectedId)
    if (mapRef.current && selected) {
      mapRef.current.setCenter(selected.coords, 14, { duration: 400 })
      placemarksRef.current.get(selected.id)?.balloon.open()
    }
  }, [selectedId, points])

  if (status === 'error') {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-secondary p-6 text-center">
        <MapPin className="size-6 text-muted-foreground" />
        <p className="text-sm font-medium text-foreground">
          {YANDEX_API_KEY ? 'Не удалось загрузить карту' : 'Карта скоро появится'}
        </p>
        <p className="max-w-xs text-xs text-muted-foreground">
          {YANDEX_API_KEY
            ? 'Проверьте подключение к интернету. Пункты выдачи можно выбрать в списке слева.'
            : 'Выберите пункт выдачи в списке слева — он будет добавлен к заказу.'}
        </p>
      </div>
    )
  }

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center bg-secondary text-sm text-muted-foreground">
          Загрузка карты…
        </div>
      )}
    </div>
  )
}
