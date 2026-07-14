'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

type CatalogContextValue = {
  category: string
  setCategory: (slug: string) => void
}

const CatalogContext = createContext<CatalogContextValue | null>(null)

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState('blueberry')
  return (
    <CatalogContext.Provider value={{ category, setCategory }}>
      {children}
    </CatalogContext.Provider>
  )
}

export function useCatalog() {
  const ctx = useContext(CatalogContext)
  if (!ctx) throw new Error('useCatalog must be used within CatalogProvider')
  return ctx
}
