"use client"

import type React from "react"
import { createContext, useContext, useMemo } from "react"
import type { ClassConfig } from "@/lib/class-config"
import { defaultClassConfig } from "@/lib/class-config"

type CtxValue = { config: ClassConfig }

const ConfigContext = createContext<CtxValue>({ config: defaultClassConfig })

export function ClassConfigProvider({
  children,
  value,
}: {
  children: React.ReactNode
  value?: Partial<CtxValue>
}) {
  const ctx = useMemo<CtxValue>(() => {
    return { config: value?.config ?? defaultClassConfig }
  }, [value])

  return <ConfigContext.Provider value={ctx}>{children}</ConfigContext.Provider>
}

export function useClassConfig() {
  return useContext(ConfigContext)
}
