'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Общая механика «нажми и удерживай».
 * Возвращает прогресс (0..1), флаг удержания и обработчики start/cancel.
 * Прогресс плавно откатывается, если отпустить раньше времени.
 */
export function useHoldToConfirm(onConfirm: () => void, duration = 1000) {
  const [progress, setProgress] = useState(0)
  const [holding, setHolding] = useState(false)

  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)
  const holdingRef = useRef(false)
  const confirmedRef = useRef(false)
  const progressRef = useRef(0)

  // Держим актуальный колбэк в ref, чтобы не пересоздавать обработчики.
  const onConfirmRef = useRef(onConfirm)
  useEffect(() => {
    onConfirmRef.current = onConfirm
  }, [onConfirm])

  const setProgressValue = useCallback((value: number) => {
    progressRef.current = value
    setProgress(value)
  }, [])

  const stopLoop = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
    startRef.current = null
  }, [])

  // Плавный откат кольца/заливки назад, если отпустили раньше времени.
  const releaseBack = useCallback(() => {
    stopLoop()
    const from = performance.now()
    const startProgress = progressRef.current
    if (startProgress <= 0) return

    const step = (now: number) => {
      const t = Math.min((now - from) / 200, 1)
      setProgressValue(startProgress * (1 - t))
      if (t < 1) {
        rafRef.current = requestAnimationFrame(step)
      } else {
        rafRef.current = null
      }
    }
    rafRef.current = requestAnimationFrame(step)
  }, [setProgressValue, stopLoop])

  const start = useCallback(() => {
    if (holdingRef.current) return
    holdingRef.current = true
    confirmedRef.current = false
    setHolding(true)
    stopLoop()

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const next = Math.min(elapsed / duration, 1)
      setProgressValue(next)

      if (next >= 1) {
        confirmedRef.current = true
        stopLoop()
        holdingRef.current = false
        setHolding(false)
        onConfirmRef.current()
        return
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [duration, setProgressValue, stopLoop])

  const cancel = useCallback(() => {
    if (!holdingRef.current) return
    holdingRef.current = false
    setHolding(false)
    if (!confirmedRef.current) releaseBack()
  }, [releaseBack])

  // Уборка при размонтировании.
  useEffect(() => stopLoop, [stopLoop])

  return { progress, holding, start, cancel }
}
