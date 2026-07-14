'use client'

import dynamic from 'next/dynamic'
import { useMemo, useRef, useState } from 'react'
import {
  Check,
  ChevronDown,
  Clock,
  LocateFixed,
  MapPin,
  Search,
} from 'lucide-react'
import { cdekCities, getCity, type PvzPoint } from '@/lib/cdek-pvz'
import { cn } from '@/lib/utils'

const CdekMap = dynamic(() => import('@/components/cart/cdek-map'), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-secondary text-sm text-muted-foreground">
      Загрузка карты…
    </div>
  ),
})

type CdekPvzPickerProps = {
  citySlug: string
  onCityChange: (slug: string) => void
  selectedPvzId: string | null
  onSelectPvz: (id: string) => void
}

export function CdekPvzPicker({
  citySlug,
  onCityChange,
  selectedPvzId,
  onSelectPvz,
}: CdekPvzPickerProps) {
  const [cityOpen, setCityOpen] = useState(false)
  const [cityQuery, setCityQuery] = useState('')
  const [pvzQuery, setPvzQuery] = useState('')
  const [locating, setLocating] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  const city = getCity(citySlug) ?? cdekCities[0]

  const filteredCities = useMemo(() => {
    const q = cityQuery.trim().toLowerCase()
    if (!q) return cdekCities
    return cdekCities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) || c.region.toLowerCase().includes(q),
    )
  }, [cityQuery])

  const filteredPoints = useMemo(() => {
    const q = pvzQuery.trim().toLowerCase()
    if (!q) return city.points
    return city.points.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        (p.metro?.toLowerCase().includes(q) ?? false),
    )
  }, [city, pvzQuery])

  function handleDetect() {
    setLocating(true)
    // Демо-геолокация: пытаемся получить координаты и подбираем ближайший город
    // из нашего списка. Если браузер отказал — по умолчанию Москва.
    const finish = (slug: string) => {
      onCityChange(slug)
      setLocating(false)
    }

    if (!('geolocation' in navigator)) {
      finish('moscow')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        let nearest = cdekCities[0]
        let best = Number.POSITIVE_INFINITY
        for (const c of cdekCities) {
          const d =
            (c.center[0] - latitude) ** 2 + (c.center[1] - longitude) ** 2
          if (d < best) {
            best = d
            nearest = c
          }
        }
        finish(nearest.slug)
      },
      () => finish('moscow'),
      { timeout: 6000 },
    )
  }

  function handlePickCity(slug: string) {
    onCityChange(slug)
    setCityOpen(false)
    setCityQuery('')
    setPvzQuery('')
  }

  function handlePickPvz(id: string) {
    onSelectPvz(id)
    listRef.current
      ?.querySelector(`[data-pvz="${id}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-4 sm:p-5">
      {/* Регион + геолокация */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => setCityOpen((v) => !v)}
            aria-expanded={cityOpen}
            aria-label="Выбрать регион"
            className="flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3.5 py-3 text-left text-sm transition-colors hover:border-brand/40"
          >
            <MapPin className="size-4 shrink-0 text-brand" />
            <span className="flex flex-1 flex-col leading-tight">
              <span className="text-xs text-muted-foreground">Ваш регион</span>
              <span className="font-semibold text-foreground">{city.name}</span>
            </span>
            <ChevronDown
              className={cn(
                'size-4 shrink-0 text-muted-foreground transition-transform',
                cityOpen && 'rotate-180',
              )}
            />
          </button>

          {cityOpen && (
            <>
              <button
                type="button"
                aria-label="Закрыть выбор региона"
                className="fixed inset-0 z-20 cursor-default"
                onClick={() => setCityOpen(false)}
              />
              <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
                <div className="border-b border-border p-2">
                  <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
                    <Search className="size-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={cityQuery}
                      onChange={(e) => setCityQuery(e.target.value)}
                      placeholder="Поиск города"
                      autoFocus
                      className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                  </div>
                </div>
                <div className="max-h-60 overflow-y-auto p-1">
                  {filteredCities.length === 0 && (
                    <p className="px-3 py-4 text-center text-sm text-muted-foreground">
                      Город не найден
                    </p>
                  )}
                  {filteredCities.map((c) => (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => handlePickCity(c.slug)}
                      className={cn(
                        'flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-secondary',
                        c.slug === citySlug && 'bg-secondary',
                      )}
                    >
                      <span className="flex flex-col leading-tight">
                        <span className="font-medium text-foreground">{c.name}</span>
                        <span className="text-xs text-muted-foreground">{c.region}</span>
                      </span>
                      {c.slug === citySlug && <Check className="size-4 text-brand" />}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleDetect}
          disabled={locating}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-brand/40 hover:text-brand disabled:opacity-60"
        >
          <LocateFixed className={cn('size-4', locating && 'animate-pulse')} />
          {locating ? 'Определяем…' : 'Определить автоматически'}
        </button>
      </div>

      {/* Карта + список ПВЗ */}
      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_1.2fr]">
        {/* Список */}
        <div className="flex flex-col rounded-xl border border-border bg-background">
          <div className="border-b border-border p-2">
            <div className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2">
              <Search className="size-4 text-muted-foreground" />
              <input
                type="text"
                value={pvzQuery}
                onChange={(e) => setPvzQuery(e.target.value)}
                placeholder="Поиск по адресу или метро"
                className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
          </div>
          <div
            ref={listRef}
            className="max-h-[360px] min-h-[240px] overflow-y-auto p-2"
            role="listbox"
            aria-label="Пункты выдачи СДЭК"
          >
            {filteredPoints.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                Ничего не найдено в этом городе
              </p>
            )}
            {filteredPoints.map((point) => (
              <PvzListItem
                key={point.id}
                point={point}
                active={point.id === selectedPvzId}
                onSelect={() => handlePickPvz(point.id)}
              />
            ))}
          </div>
        </div>

        {/* Карта */}
        <div className="h-[320px] overflow-hidden rounded-xl border border-border sm:h-[440px] lg:h-auto">
          <CdekMap
            center={city.center}
            points={filteredPoints}
            selectedId={selectedPvzId}
            onSelect={handlePickPvz}
          />
        </div>
      </div>
    </div>
  )
}

function PvzListItem({
  point,
  active,
  onSelect,
}: {
  point: PvzPoint
  active: boolean
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      data-pvz={point.id}
      role="option"
      aria-selected={active}
      onClick={onSelect}
      className={cn(
        'mb-1 flex w-full flex-col gap-1 rounded-lg border px-3 py-2.5 text-left transition-colors',
        active
          ? 'border-brand bg-brand/5'
          : 'border-transparent hover:bg-secondary',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex items-center gap-1.5 font-semibold text-foreground">
          <MapPin
            className={cn('size-4 shrink-0', active ? 'text-brand' : 'text-muted-foreground')}
          />
          {point.name}
        </span>
        {active && (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-brand-foreground">
            <Check className="size-3" /> Выбран
          </span>
        )}
      </div>
      <span className="pl-6 text-sm text-muted-foreground">{point.address}</span>
      {point.metro && (
        <span className="pl-6 text-xs text-brand-deep">м. {point.metro}</span>
      )}
      <span className="flex items-center gap-1 pl-6 text-xs text-muted-foreground">
        <Clock className="size-3" /> {point.schedule}
      </span>
    </button>
  )
}
